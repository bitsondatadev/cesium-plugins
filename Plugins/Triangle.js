/*global define*/
define([
        'Cesium',
        './Vertex'
    ], function(
        Cesium,
        Vertex) {
    "use strict";
    /**
     * An object that encapsulates exactly 3 {@link Vertex}vertices. Each vertex will contain attributes for the
     * triangle.
     *
     * @alias Vertex
     * @constructor
     *
     * @param {Object} options Object with the following properties:
     * @param {Vertex[]} vertices list of exactly 3 vertices that define the attributes of the vertex for the triangle.
     *
     * @exception {DeveloperError} vertices must be defined.
     *
     * @see Vertex#createGeometry
     *
     * @demo {@link http://cesiumjs.org/Cesium/Apps/Sandcastle/index.html?src=development/MultiColorTriangle.html|Cesium Sandcastle MultiColorTriangle Demo}
     *
     *
     */
    var Triangle = function(options) {
        if (!Cesium.defined(options)) {
            throw new Cesium.DeveloperError('options is required.');
        }

        if (!Cesium.defined(options.vertices) || options.vertices.length !== 3) {
            throw new Cesium.DeveloperError('vertices must be defined and be equal to 3.');
        }


        this.id = options.id;
        this.vertices = Cesium.defined(options.vertices)? options.vertices : undefined;
        this._vertexFormat = Cesium.VertexFormat.clone(Cesium.defaultValue(options.vertexFormat, Cesium.VertexFormat.POSITION_AND_COLOR));
    };

    return Triangle;
});