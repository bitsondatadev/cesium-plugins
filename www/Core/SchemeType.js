define([
    'Util/Util'
], function (Util) {
    return Util.freezeObject({
        SEQUENTIAL: Util.freezeObject({
            RED: "Reds",
            GREEN: "Greens",
            BLUE: "Blues",
            ORANGE: "Oranges",
            GREY: "Greys",
            PURPLE: "Purples",
            YELLOW_GREEN: "YlGn",
            YELLOW_GREEN_BLUE: "YlGnBu",
            GREEN_BLUE: "GnBu",
            BLUE_GREEN: "BuGn",
            PURPLE_BLUE_GREEN: "PuBuGn",
            PURPLE_BLUE: "PuBu",
            BLUE_PURPLE: "BuPu",
            RED_PURPLE: "RdPu",
            PURPLE_RED: "PuRd",
            ORANGE_RED: "OrRd",
            YELLOW_ORANGE_RED: "YlOrRd",
            YELLOW_ORANGE_BROWN: "YlOrBr"
        }),
        DIVERGING: Util.freezeObject({
            PURPLE_ORANGE: "PuOr",
            BROWN_BLUEGREEN: "BrBG",
            PURPLERED_GREEN: "PRGn",
            PINK_YELLOWGREEN: "PiYG",
            RED_BLUE: "RdBu",
            RED_GREY: "RdGy",
            RED_YELLOW_BLUE: "RdYlBu",
            SPECTRAL: "Spectral",
            RED_YELLOW_GREEN: "RdYlGn"
        }),
        QUALITATIVE: Util.freezeObject({
            SET3: "Set3",
            PASTEL1: "Pastel1",
            SET1: "Set1",
            PASTEL2: "Pastel2",
            SET2: "Set2",
            DARK2: "Dark2",
            PAIRED: "Paired",
            ACCENT: "Accent"
        })

    });
});

