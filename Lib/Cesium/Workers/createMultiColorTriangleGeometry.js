/*global define*/
define([
        'Cesium',
        'Core/MultiColorTriangleGeometry'
    ], function(
            Cesium,
            MultiColorTriangleGeometry) {
    "use strict";

    function createMultiColorTriangleGeometry(multiColorTriangleGeometry, offset) {
        multiColorTriangleGeometry._ellipsoid = Cesium.Ellipsoid.clone(multiColorTriangleGeometry._ellipsoid);
        return MultiColorTriangleGeometry.createGeometry(multiColorTriangleGeometry);
    }

    return createMultiColorTriangleGeometry;
});