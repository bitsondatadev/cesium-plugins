define(function (require) {
    /*Third Party Libraries*/
    var $ = require('jquery');
    var Cesium = require('Cesium');
    var viewer = new Cesium.Viewer('cesiumContainer');
    
    /*MultiColorGeometry module dependencies*/
    var Vertex = require('Plugins/Vertex');
    var Triangle = require('Plugins/Triangle');
    var MultiColorTriangleGeometry = require('MultiColorTriangle/MultiColorTriangleGeometry');
    var MultiColorTriangleAppearance = require('MultiColorTriangle/MultiColorTriangleAppearance');
    
    var scene = viewer.scene;

    var vertices = [
        new Vertex({
            vertexFormat: Cesium.VertexFormat.POSITION_AND_COLOR,
            position: Cesium.Cartesian3.fromDegrees(-115.0, 37.0),
            color: Cesium.Color.RED.withAlpha(180/255)
        }),
        new Vertex({
            vertexFormat: Cesium.VertexFormat.POSITION_AND_COLOR,
            position: Cesium.Cartesian3.fromDegrees(-115.0, 32.0),
            color: Cesium.Color.BLUE.withAlpha(180/255)
        }),
        new Vertex({
            vertexFormat: Cesium.VertexFormat.POSITION_AND_COLOR,
            position: Cesium.Cartesian3.fromDegrees(-107.0, 33.0),
            color: Cesium.Color.GREEN.withAlpha(180/255)
        }),
        new Vertex({
            vertexFormat: Cesium.VertexFormat.POSITION_AND_COLOR,
            position: Cesium.Cartesian3.fromDegrees(-102.0, 31.0),
            color: Cesium.Color.ORANGE.withAlpha(180/255)
        }),
        new Vertex({
            vertexFormat: Cesium.VertexFormat.POSITION_AND_COLOR,
            position: Cesium.Cartesian3.fromDegrees(-102.0, 35.0),
            color: Cesium.Color.AQUA.withAlpha(180/255)
        })
    ];


    $(function () {
        var polygonVertices = [[0,1,2], [0,2,4], [3,2,4], [1,2,3]];


        var triangles = [];

        for(var i=0;i<polygonVertices.length;i++){
            var verts = [];
            for(var j=0;j<polygonVertices[i].length;j++){
                var index=polygonVertices[i][j];
                verts.push(vertices[index]);
            }
            triangles.push(new Triangle({
                vertices : verts
            }));
        }

        scene.primitives.add(
            new Cesium.Primitive({
                geometryInstances : new Cesium.GeometryInstance({
                    geometry : MultiColorTriangleGeometry.createGeometry(new MultiColorTriangleGeometry({
                        triangles : triangles
                    }))
                }),
                asynchronous: false,
                appearance : new MultiColorTriangleAppearance()
            })
        );
       
    });
    
});