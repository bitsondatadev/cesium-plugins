define(function (require) {
    /*Third Party Libraries*/
    var $ = require('jquery');
    require('jquery.csv');
    var Cesium = require('Cesium');
    
    
    /*MultiColorGeometry module dependencies*/
    var Vertex = require('Plugins/Vertex');
    var Triangle = require('Plugins/Triangle');
    var MultiColorTriangleGeometry = require('MultiColorTriangle/MultiColorTriangleGeometry');
    var MultiColorTriangleAppearance = require('MultiColorTriangle/MultiColorTriangleAppearance');
    
    var Util = require('Util/Util');
    
    /*ColorScheem/Legend module dependencies*/
    var ColorScheme = require('Core/ColorScheme');
    var SchemeType = require('Core/SchemeType');
    var legendContainer = document.createElement('div');
    legendContainer.id = "legend";
    Util.getBody().append(legendContainer);
    
    var proj4js = require('Core/Projection');
    var Projection = new proj4js({
        projectionString: "ESRI:102696"
    });
    
    var StLouisData = require('App/StLouisData');
    var STLData = new StLouisData();
    
    function generateCesiumTriangles(gridData, scene) {
        var cellSize = STLData.cellSize;
        var xUL = STLData.xLLCorner;
        var yUL = STLData.yURCorner;
        var triangles = [];
        var verticesHashTable = {};
        
        var i;
        var j;
        var min = Number.MAX_VALUE;
        var max = 0;
        
        
        for(i=0; i<=gridData.length - 1;i++){
            for(j=0; j<=gridData[0].length - 1;j++){
                if(gridData[i][j] != STLData.noDataValue && gridData[i][j] != 0){
                    if(gridData[i][j] > max){
                        max = gridData[i][j];
                    }
                    
                    if(gridData[i][j] < min){
                        min = gridData[i][j];
                    }
                }
            }
        }

        var scheme = new ColorScheme({
            minValue: min,
            maxValue: max,
            alphaValue: 180,
            color: SchemeType.SEQUENTIAL.RED,
            incremenet: 1,
            precision: 0,
            numClasses: 9
        });
        
        scheme.generateLegend(legendContainer.id, "Crime Count");

        for (i = 0; i < STLData.numRows - 1; i++) {
            for (j = 0; j < STLData.numCols - 1; j++) {
                if (gridData[i][j] != STLData.noDataValue && gridData[i][j] != 0) {
                    var UL = Cesium.Cartesian2.fromArray(Projection.toWGS84Coordinates(xUL + cellSize * j, yUL - cellSize * i));
                    var LL = Cesium.Cartesian2.fromArray(Projection.toWGS84Coordinates(xUL + cellSize * j, yUL - cellSize * (i + 1)));
                    var UR = Cesium.Cartesian2.fromArray(Projection.toWGS84Coordinates(xUL + cellSize * (j + 1), yUL - cellSize * i));
                    var LR = Cesium.Cartesian2.fromArray(Projection.toWGS84Coordinates(xUL + cellSize * (j + 1), yUL - cellSize * (i + 1)));

                    var vertUL = getVertex(verticesHashTable, gridData, j, i, UL, scheme);
                    var vertUR = getVertex(verticesHashTable, gridData, j + 1, i, UR, scheme);
                    var vertLL = getVertex(verticesHashTable, gridData, j, i + 1, LL, scheme);
                    var vertLR = getVertex(verticesHashTable, gridData, j + 1, i + 1, LR, scheme);
                    
                    triangles.push(new Triangle({
                        vertices: [vertUL, vertLL, vertLR]
                    }));

                    triangles.push(new Triangle({
                        vertices: [vertUL, vertLR, vertUR]
                    }));
                }
            }
        }

        scene.primitives.add(
            new Cesium.Primitive({
                geometryInstances : new Cesium.GeometryInstance({
                    geometry : MultiColorTriangleGeometry.createGeometry(new MultiColorTriangleGeometry({
                        triangles : triangles
                    }))
                }),
                appearance : new MultiColorTriangleAppearance()
            })
        );
    }

    function getVertex(verticesHashTable,gridData, gridX, gridY, position, scheme) {
        //test if vertices exist in the hash table yet
        if (!(gridX in verticesHashTable)) {
            verticesHashTable[gridX] = {};
        }

        if (!(gridY in verticesHashTable[gridX])) {
            verticesHashTable[gridX][gridY] = new Vertex({
                vertexFormat: Cesium.VertexFormat.POSITION_AND_COLOR,
                position: Cesium.Cartesian3.fromDegrees(position.x, position.y),
                color: scheme.getColorIndex(gridData[gridY][gridX])
            });
        }
        return verticesHashTable[gridX][gridY];
    }
    

    $(function () {
        var LL = Cesium.Cartesian2.fromArray(Projection.toWGS84Coordinates(STLData.xLLCorner, STLData.yLLCorner));
        var UR = Cesium.Cartesian2.fromArray(Projection.toWGS84Coordinates(STLData.xURCorner, STLData.yURCorner));
        var extent = Cesium.Rectangle.fromDegrees(LL.x,LL.y,UR.x,UR.y);

        Cesium.Camera.DEFAULT_VIEW_RECTANGLE = extent;
        Cesium.Camera.DEFAULT_VIEW_FACTOR = 0;
        
        var viewer = new Cesium.Viewer('cesiumContainer',{
            baseLayerPicker : false,
            imageryProvider : new Cesium.BingMapsImageryProvider({
                url : '//dev.virtualearth.net',
                mapStyle : Cesium.BingMapsStyle.AERIAL_WITH_LABELS
            })
        });
        
        STLData.getSummaryData(require.toUrl("Assets/STLCrimeData/July2015.CSV"), generateCesiumTriangles, viewer.scene);
    });
});
