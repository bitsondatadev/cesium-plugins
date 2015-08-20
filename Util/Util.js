define(['jquery',
        'Cesium'
],function ($,
        Cesium) {
    return {
        getBody: function () {
            return $('body');
            
        
        },
        defined: Cesium.defined,
        defaultValue: Cesium.defaultValue,
        freezeObject: Cesium.freezeObject
    };
});
