define(['jquery',
        'jquery.csv',
        'Util/Util'
],function ($,
            jqueryCsv,
            Util) {
    "use strict";

    jqueryCsv = $.csv;
    function loadASCIIRasterData(data) {
        var gridData;
        var header;
        var numLinesInHeader = 6;
        
        var lines = data.split('\n');
        header = {};
        gridData = [];

        //fill header info
        for (var i = 0; i < numLinesInHeader; i++) {
            var kVPair = lines[i].split(" ");
            header[kVPair[0]] = parseFloat(kVPair[1]);
        }

        //fill grid info
        for (i = numLinesInHeader; i < (header.NROWS + numLinesInHeader) ; i++) {
            tokens = lines[i].split('   ').map(parseFloat);
            tokens.splice(header.NCOLS);
            gridData[i - numLinesInHeader] = tokens;
        }

        return {
            header: header, 
            gridData: gridData
        };
    } 
    
    
    
    /**
     * StLouisData
     * 
     * This class is responsible for pulling out the csv data and transforming it into ESRI ASCII grid data.
     * 
     * */
    var StLouisData = function(options){
        options = Util.defined(options) ? options : Util.defaultValue.EMPTY_OBJECT;
        this.numCols = Util.defaultValue(options.numCols, 61);
        this.numRows = Util.defaultValue(options.numRows, 56);
        this.xLLCorner = Util.defaultValue(options.xLLCorner, 795861.82);
        this.yLLCorner = Util.defaultValue(options.yLLCorner, 954479.69);
        this.cellSize = Util.defaultValue(options.cellSize, 2950);
        this.noDataValue = Util.defaultValue(options.noDataValue, -9999);
        
        this.xURCorner = this.xLLCorner + (this.numCols * this.cellSize);
        this.yURCorner = this.yLLCorner + (this.numRows * this.cellSize);

        
        this.getSummaryData = function(cssURL, callback, scene){
            var filePath = cssURL.substring(0, cssURL.lastIndexOf("/") + 1);
            var fileName = cssURL.substring(cssURL.lastIndexOf("/") + 1, cssURL.lastIndexOf('.'));
            var ascUrl = filePath + fileName + ".asc";
            
            var numRows = this.numRows;
            var numCols = this.numCols;
            var noDataValue = this.noDataValue;
            var maxX = this.xURCorner;
            var minX = this.xLLCorner;
            var maxY = this.yURCorner;
            var minY = this.yLLCorner;
            
            var gridData;
                
            $.ajax({
                url:ascUrl,
                type:'GET',
                async: false,
                error: function()
                {
                    $.ajax({
                        url:cssURL,
                        type:'GET',
                        async: false,
                        error: function()
                        {
                            throw new Util.DeveloperError('csv file does not exist.');
                        },
                        success: function(csvData)
                        {
                            
                            var csvData = $.csv.toArrays(csvData);
                            var headers = csvData[0];
                            var xIndex = headers.indexOf("XCoord");
                            var yIndex = headers.indexOf("YCoord");
                            gridData = Util.createMatrix([numRows,numCols], 0);

                            for(var i=1; i<=csvData.length - 1;i++){
                                var x = parseInt(csvData[i][xIndex]);
                                var y = parseInt(csvData[i][yIndex]);
                                if(x!==0 && y!==0){
                                    gridData[Math.floor(((x - minX) / (maxX - minX)) * numCols)][Math.floor(((maxY - y) / (maxY - minY)) * numRows)] += 1;
                                }
                                
                            }
                            
                            //write data to .asc file

                            callback(gridData, scene);
                        }
                    });
                },
                success: function(asciiData)
                {
                    var packet = loadASCIIRasterData(asciiData);
                    var header = packet.header;
                    this.numCols = header.NCOLS;
                    this.numRows = header.NROWS;
                    this.xLLCorner = header.XLLCORNER;
                    this.yLLCorner = header.YLLCORNER;
                    this.cellSize = header.CELLSIZE;
                    this.noDataValue = header.NODATA_VALUE;
                    
                    callback(packet.gridData, scene);
                }
            });
        };

    };
    

    
    
    return StLouisData;
});
