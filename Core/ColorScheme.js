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
        
	/**
	* Returns an RGB interpolated value between two rgb values. 
	*
	* @param {Object} rgbA - rgb() tuple
	* @param {Object} rgbB - rgb() tuple
	* @param {Number} threshold - float between [0.0, 1.0]
	* @param {function} interpolatorFn - interpolator function
	* @return {Object} rbg
	*/
    function interpolateRgb(rgbA, rgbB, threshold, interpolatorFn) {
        threshold = toArray(threshold, 3);
        return {
            r: ~~interpolatorFn(rgbA.r, rgbB.r, threshold[0]),
            g: ~~interpolatorFn(rgbA.g, rgbB.g, threshold[1]),
            b: ~~interpolatorFn(rgbA.b, rgbB.b, threshold[2])
        };
    }

    /**
     * Returns an interpolated value between two values. 
     *
     * @param {Number} valueA - color channel int value
     * @param {Number} valueB - color channel int value
     * @param {Number} threshold - float between [0.0, 1.0]
     * @param {function} interpolatorFn - interpolator function
     * @return {int}
     */
    function linear(valueA, valueB, threshold) {
        return valueA * (1 - threshold) + valueB * threshold;
    }

    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function toArray(arr, size) {
        var isNum = isNumeric(arr);
        arr = !Array.isArray(arr) ? [arr] : arr;
        for (var i = 1; i < size; i++) {
            if (arr.length < size) {
                arr.push(isNum ? arr[0] : 0);
            }
        }
        return arr;
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

        this._stepValue = (this.maxValue - this.minValue) / this._numClasses;
        
        this.getColorIndex = function (value) {
            if (value < this.minValue) {
                return Cesium.Color.fromBytes(255, 255, 255, this._alphaValue);
            }

            if (value > this.maxValue) {
                return Cesium.Color.fromBytes(0, 0, 0, this._alphaValue);
            }

            var binStepValue = (this.maxValue - this.minValue) / (this._numClasses - 1);
            var index = Math.floor((value - this.minValue) / (binStepValue));
            var weight = (((value - this.minValue) % binStepValue) / binStepValue);


            if (index >= this._numClasses - 1) {
                index = this._numClasses - 2;
                weight = 1;
            }

            var color1 = {
                r: this._colorScheme[index].red * 255,
                g: this._colorScheme[index].green * 255,
                b: this._colorScheme[index].blue * 255
            };
            var color2 = {
                r: this._colorScheme[index + 1].red * 255,
                g: this._colorScheme[index + 1].green * 255,
                b: this._colorScheme[index + 1].blue * 255
            };

            var rgb = interpolateRgb(color1, color2, weight, linear);

            return Cesium.Color.fromBytes(rgb.r, rgb.g, rgb.b, this._alphaValue)
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

                html += (this.minValue + (this._stepValue * i) + (i === 0 ? 0 : this._increment)).toFixed(this._precision).toString() +
                " - " + (this.minValue + (this._stepValue * (i + 1))).toFixed(this._precision).toString();

                html += "</li>\n";
            }
            html += "</ul>\n";
            html += "<div class='" + elementId + "-footer'> Color scheme by <a href='http://colorbrewer2.org/' target='_blank'>ColorBrewer</a>.</div>\n</div>\n"

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
                "margin-left": "10px",
                "border": "1px solid #999"
            });
            $("#" + elementId + " ." + elementId + "-footer").css({
                "clear": "both",
                "height": "22px",
                "margin-right": "5px",
                "margin-left": "5px",
            });
        };
    };



    return ColorScheme;
});