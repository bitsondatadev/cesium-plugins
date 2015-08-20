/*global define*/
define([
        'proj4js',
        'Util/Util'
    ], function(
        proj4js,
        Util) {
    "use strict";
    /*Reads an ESRI ASCII Raster format into the grid. Format specified here.
     *http://resources.esri.com/help/9.3/arcgisengine/java/GP_ToolRef/spatial_analyst_tools/esri_ascii_raster_format.htm
     *
     * Uses Proj4js to convert between projection coordinates and Latitude/Longitude coordinates.
     * Below are some typical UTM (Universal Transverse Mercator) projections for North America in meters.
     */
    var Projection = function(options) {
        options = Util.defined(options) ? options : Util.defaultValue.EMPTY_OBJECT;
        this._projectionString = Util.defaultValue(options.projectionString, 'WGS84');

        
        /*From projection WGS84 to projection EPSG:XXXX
         * this means forward is WGS84 -> EPSG:XXXX
         * and inverse is EPSG:XXXX -> WGS84
         */
         this._projection = proj4js(this._projectionString);
    
    
         /*Converts from the specified projection coordinates to Latitude and Longitude in degrees.*/
         this.toWGS84Coordinates = function (x, y) {
             return this._projection.inverse([x, y]);
         };
    
         /*Converts from the Latitude and Longitude in degrees to the specified projection coordinates.*/
         this.toProjectionCoordinates = function (lat, long) {
             return this._projection.forward([long, lat]);
         };
    };

    return Projection;
});

