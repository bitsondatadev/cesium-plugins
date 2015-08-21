//The build will inline common dependencies into this file.

//For any third party dependencies, like jQuery, place them in the lib folder.

//Configure loading modules from the lib directory,
//except for 'app' ones, which are in a sibling
//directory.
requirejs.config({
    baseUrl: 'Lib/',
    paths: {
        App: '../App',
        Assets: '../Assets',
        Core: '../Core',
        Plugins: '../Plugins',
        Util: '../Util',
        MultiColorTriangle: '../Plugins/MultiColorTriangle/',
        jquery: 'jquery-1.10.2.min',
        "jquery.csv":'jquery.csv-0.71.min',
		Cesium: 'Cesium/Cesium',
		proj4js: 'projLib'
    },
    shim: {
        proj4js: {
            exports: 'proj4js'
        },
        "jquery.csv":['jquery']
    }
});
