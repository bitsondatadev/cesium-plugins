define([
    'jquery',
    './SchemeType',
	'Cesium',
	'Util/Util'
], function (
    $,
    SchemeType,
	Cesium, 
	Util
        ) {
    "use strict";

    function readColorScheme(scheme, schemeType, numClasses, alphaValue) {
		var jsonUrl = require.toUrl("Assets/colorbrewer.json");
		$.ajax({ 
			type: 'GET', 
			url: jsonUrl, 
			dataType: 'json',
			async: false,
			success: function (data) {
			    while (!(numClasses.toString() in data[schemeType])) {
			        numClasses -= 1;
			    }
				var listOfColors = data[schemeType][numClasses.toString()];
				$.each(listOfColors, function(index, color) {
					var rgbValues = color.substring(color.indexOf('(') + 1, color.lastIndexOf(')')).split(/,\s*/);
					scheme.push(Cesium.Color.fromBytes(rgbValues[0], rgbValues[1], rgbValues[2], alphaValue));
				});
			}
		});
		return numClasses;
    }
    

    var ColorScheme = function ColorScheme(options) {
        options = Util.defined(options) ? options : Util.defaultValue.EMPTY_OBJECT;
        this.minValue = Util.defaultValue(options.minValue, 0);
        this.maxValue = Util.defaultValue(options.maxValue, 100);
        this._alphaValue = Util.defaultValue(options.alphaValue, 255);
        this._schemeType = Util.defaultValue(options.color, SchemeType.SEQUENTIAL.RED);
        this._numClasses = Util.defaultValue(options.numClasses, 3);
        this._increment = Util.defaultValue(options.increment, .1);
        this._precision = Util.defaultValue(options.precision, 1);
        this._colorScheme = [];
        this._numClasses = readColorScheme(this._colorScheme, this._schemeType, this._numClasses, this._alphaValue);

        this._scale = (this.maxValue - this.minValue) / this._numClasses;
        //step value will be used if the outer boundaries of the range take up two bins.
        this._stepValue = Util.defined(options.useOuterBoundaries) && options.useOuterBoundaries===true ? this._scale : (this.maxValue - this.minValue) / (this._numClasses - 2);

        this.getColorIndex = function (value) {
            if (value <= this.minValue) {
                return this._colorScheme[0];
            }

            if (value >= this.maxValue) {
                return this._colorScheme[this._numClasses - 1];
            }

            colorIndex = Math.round((value - this.minValue) / this._scale);

            if (colorIndex < 0) {
                colorIndex = 0;
            }

            if (colorIndex > (this._numClasses - 1)) {
                colorIndex = (this._numClasses - 1);
            }

            return this._colorScheme[colorIndex];
        };

        this.updateAlphaValue = function (value) {
            this._alphaValue = value;
            var newScheme = [];
            for (var i = 0; i <= this._colorScheme.length - 1; i++) {
                newScheme.push(Cesium.Color.fromAlpha(this._colorScheme[i], this._alphaValue));
            }
            this._colorScheme = newScheme;
        };

        this.generateLegend = function (elementId, title) {
            var html = "<div class='" + elementId + "-title'>" + title + "</div>\n" +
                "<div class='" + elementId + "-scale'>\n" +
                "<ul class='" + elementId + "-labels'>\n";

            for (var i = 0; i <= this._numClasses - 1; i++) {
                html += "<li><span style='background-color:" + this._colorScheme[i].toCssColorString() + ";'></span>";
                if (i === 0) {
                    html += "<= " + this.minValue.toFixed(this._precision).toString();
                } else if (i < this._numClasses - 1) {
                    html += (this.minValue + (this._stepValue * (i - 1)) + this._increment).toFixed(this._precision).toString() +
                    " - " + (this.minValue + (this._stepValue * i)).toFixed(this._precision).toString();
                } else {
                    html += "> " + this.maxValue.toFixed(this._precision).toString();
                }
                html += "</li>\n";
            }
            html += "</ul>\n</div>\n";
            html += "<div class='" + elementId + "-footer'> Map colors based on <a href='http://colorbrewer2.org/' target='_blank'>ColorBrewer</a>.</div>\n"

            $("#" + elementId).html(html);
            $("#" + elementId).css({
                "float":"right",
                "position":"absolute",
                "right": "0",
                "bottom":"30px",
                "background": "white"
            });

            $("#" + elementId + " ." + elementId + "-title").css({
                "text-align": "center",
                "margin-bottom": "5px",
                "font-weight": "bold",
                "font-size": "100%"
            });

            $("#" + elementId + " ." + elementId + "-scale ul").css({
                "margin": "0",
                "margin-bottom": "5px",
                "padding": "0",
                "float": "left",
                "list-style": "none"
            });

            $("#" + elementId + " ." + elementId + "-scale ul li").css({
                "font-size": "100%",
                "list-style": "none",
                "margin-left": "0",
                "line-height": "23px",
                "margin-bottom": "2px"
            });

            $("#" + elementId + " ul." + elementId + "-labels li span").css({
                "display": "block",
                "float": "left",
                "height": "22px",
                "width": "30px",
                "margin-right": "5px",
                "margin-left": "0",
                "border": "1px solid #999"
            });
            $("#" + elementId + " ul." + elementId + "-footer").css({
                "display": "block",
                "float": "left",
                "height": "22px",
                "width": "30px",
                "margin-right": "5px",
                "margin-left": "0",
                "border": "1px solid #999"
            });
        };
    };



    return ColorScheme;
});