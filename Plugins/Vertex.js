/*global define*/
define([
        'Cesium'
    ], function(
        Cesium) {
    "use strict";

    /**
     * An object that encapsulates attributes that exist at a given vertex. Each vertex is given a
     *  {@link VertexFormat} that will specify the attributes required by this vertex.
     *
     * @alias Vertex
     * @constructor
     *
     * @param {Object} options Object with the following properties:
     * @param {Number} [options.id] required id of the vertex to link vertices.
     * @param {VertexFormat} [options.vertexFormat=VertexFormat.DEFAULT] The vertex attributes to be contained within a vertex. If options does not contain the variables specified by {@link VertexFormat} then an error will be thrown.
     * @param {Cartesian3} [options.position] An xyz Cartesian coordinate defining the location of the vertex.
     * @param {Cartesian3} [options.normal] (normalized), which is commonly used for lighting of the vertex.
     * @param {Cartesian2} [options.st] 2D texture coordinate attribute of the vertex.
     * @param {Cartesian3} [options.binormal] (normalized), which is used for tangent-space effects like bump mapping.
     * @param {Cartesian3} [options.tangent] (normalized), which is used for tangent-space effects like bump mapping.
     * @param {Color} [options.colors] the {@link Color} color of the vertex.
     *
     * @exception {DeveloperError} position must be defined based on the specified vertex format.
     * @exception {DeveloperError} normal must be defined based on the specified vertex format.
     * @exception {DeveloperError} st must be defined based on the specified vertex format.
     * @exception {DeveloperError} binormal must be defined based on the specified vertex format.
     * @exception {DeveloperError} tangent must be defined based on the specified vertex format.
     * @exception {DeveloperError} color must be defined based on the specified vertex format.
     *
     * @see Vertex#createGeometry
     *
     * @demo {@link http://cesiumjs.org/Cesium/Apps/Sandcastle/index.html?src=development/MultiColorTriangle.html|Cesium Sandcastle MultiColorTriangle Demo}
     *
     *
     */

    var Vertex = function(options) {
        this._vertexFormat = Cesium.VertexFormat.clone(Cesium.defaultValue(options.vertexFormat, Cesium.VertexFormat.DEFAULT));

        if (!Cesium.defined(options)) {
            throw new Cesium.DeveloperError('options is required.');
        }
        if (!Cesium.defined(options.position) && this._vertexFormat.position) {
            throw new Cesium.DeveloperError('position must be defined based on the specified vertex format.');
        }
        if (!Cesium.defined(options.normal) && this._vertexFormat.normal) {
            throw new Cesium.DeveloperError('normal must be defined based on the specified vertex format.');
        }
        if (!Cesium.defined(options.st) && this._vertexFormat.st) {
            throw new Cesium.DeveloperError('st must be defined based on the specified vertex format.');
        }
        if (!Cesium.defined(options.binormal) && this._vertexFormat.binormal) {
            throw new Cesium.DeveloperError('binormal must be defined based on the specified vertex format.');
        }
        if (!Cesium.defined(options.tangent) && this._vertexFormat.tangent) {
            throw new Cesium.DeveloperError('tangent must be defined based on the specified vertex format.');
        }
        if (!Cesium.defined(options.color) && this._vertexFormat.color) {
            throw new Cesium.DeveloperError('color must be defined based on the specified vertex format.');
        }

        this.id = options.id;
        this.position = Cesium.defined(options.position)? options.position : undefined;
        this.normal = Cesium.defined(options.normal)? options.normal : undefined;
        this.st = Cesium.defined(options.st)? options.st : undefined;
        this.binormal = Cesium.defined(options.binormal)? options.binormal : undefined;
        this.tangent = Cesium.defined(options.tangent)? options.tangent : undefined;
        this.color = Cesium.defined(options.color)? options.color : undefined;
    };


    return Vertex;
});