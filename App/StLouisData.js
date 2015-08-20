define(['jquery',
        'Util/Util'
],function ($,
            Util) {
    "use strict";
    require('jquery.csv');
    
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
     * XUR 759822
     * YUR 4299991
     * Xdiff 46519
     * Ydiff 41422 
     * */
    var StLouisData = function(options){
        options = Util.defined(options) ? options : Util.defaultValue.EMPTY_OBJECT;
        this.numCols = Util.defaultValue(options.numCols, 52);
        this.numRows = Util.defaultValue(options.numRows, 46);
        this.xLLCorner = Util.defaultValue(options.xLLCorner, 713303);
        this.yLLCorner = Util.defaultValue(options.yLLCorner, 4258569);
        this.cellSize = Util.defaultValue(options.cellSize, 900);
        this.noDataValue = Util.defaultValue(options.noDataValue, -9999);

        this.getSummaryData = function(cssURL){
            var filePath = cssURL.substring(0, cssURL.lastIndexOf("/") + 1);
            var fileName = cssURL.substring(cssURL.lastIndexOf("/") + 1, cssURL.lastIndexOf('.'));
            var ascUrl = filePath + fileName + ".asc";
            $.ajax({
                url:ascUrl,
                type:'GET',
                error: function()
                {
                    $.ajax({
                        url:cssURL,
                        type:'GET',
                        error: function()
                        {
                            throw new Util.DeveloperError('csv file does not exist.');
                        },
                        success: function(csvData)
                        {
                            var csvData = $.csv.toArrays(csvData);
                            var headers = csvData[0];
                            
                            //Process the data and write data to .asc file
                            
                            //return gridData
                        }
                    });
                },
                success: function(asciiData)
                {
                    var packet = loadASCIIRasterData(asciiData);
                    soilMap.fuzzyGridData.push(packet.gridData);
                    header = packet.header;
                    this.numCols = header.NCOLS;
                    this.numRows = header.NROWS;
                    this.xLLCorner = header.XLLCORNER;
                    this.yLLCorner = header.YLLCORNER;
                    this.cellSize = header.CELLSIZE;
                    this.noDataValue = header.NODATA_VALUE;
                    
                    //return gridData (this can be a function since it's called after csv) Later a class
                }
            });
        };
        


    };
    
    
    return StLouisData;
});
