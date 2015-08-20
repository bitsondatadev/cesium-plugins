define(function(require, exports, module) {
    var projLib = require('proj4');
    
    projLib.defs([[
                 "EPSG:26910",
                 "+proj=utm +zone=10 +ellps=GRS80 +datum=NAD83 +units=m +no_defs"
             ],[
                 "EPSG:26911",
                 "+proj=utm +zone=11 +ellps=GRS80 +datum=NAD83 +units=m +no_defs"
             ],[
                 "EPSG:26912",
                 "+proj=utm +zone=12 +ellps=GRS80 +datum=NAD83 +units=m +no_defs"
             ],[
                 "EPSG:26913",
                 "+proj=utm +zone=13 +ellps=GRS80 +datum=NAD83 +units=m +no_defs"
             ],[
                 "EPSG:26914",
                 "+proj=utm +zone=14 +ellps=GRS80 +datum=NAD83 +units=m +no_defs"
             ],[
                 "EPSG:26915",
                 "+proj=utm +zone=15 +ellps=GRS80 +datum=NAD83 +units=m +no_defs"
             ],[
                 "EPSG:26916",
                 "+proj=utm +zone=16 +ellps=GRS80 +datum=NAD83 +units=m +no_defs"
             ],[
                 "EPSG:26917",
                 "+proj=utm +zone=17 +ellps=GRS80 +datum=NAD83 +units=m +no_defs"
             ],[
                 "EPSG:26918",
                 "+proj=utm +zone=18 +ellps=GRS80 +datum=NAD83 +units=m +no_defs"
             ],[
                 "EPSG:26919",
                 "+proj=utm +zone=19 +ellps=GRS80 +datum=NAD83 +units=m +no_defs"
             ]
     ]);
    
    return projLib;
});