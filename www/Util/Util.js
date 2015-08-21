define(['jquery',
        'Cesium'
],function ($,
        Cesium) {
    return {
        getBody: function () {
            return $('body');
        },
        createMatrix:function(dimensions, value) {
            var matrix = [];
            for (var i = 0; i < dimensions[0]; ++i) {
                matrix.push(dimensions.length == 1 ? value : this.createMatrix(dimensions.slice(1), value));
            }
            return matrix;
        },
        defined: Cesium.defined,
        defaultValue: Cesium.defaultValue,
        freezeObject: Cesium.freezeObject,
        DeveloperError: Cesium.DeveloperError
    };
});
