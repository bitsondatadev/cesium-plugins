#Cesium-plugins library#

###A library of plugins for the WebGl map engine [Cesium](https://github.com/AnalyticalGraphicsInc/cesium).###

**Description:** I started working with Cesium in [my lab at Purdue](https://www.purdue.edu/discoverypark/vaccine/) as the demand for web applications grew from various projects. Our lab is heavily dependent on spatial visualization and had used OpenGL to do this for many years. We needed a library that took care of the map tile rendering, allowed draw using the WebGL graphics, also give us the flexibility to define our own shaders. I had to either find this library or I would have to do everything from scratch. Enter Cesium. However, I needed a few things the library didn't offer, like drawing multi-color polygons. There are more things I intend to add as we need them in the lab

**Comments:** It's worth noting that I threw this plug-in together in my off time so the code may not be perfect and there are probably much better ways to do what I'm doing. If you know such ways of doing things better, I would love to know them too. Please email me at [olsenb@purdue.edu](olsenb@purdue.edu).

**Credit:** 

- Thanks to the [St. Louis Police Department](http://www.slmpd.org/Crimereports.shtml) for their data.
- Thanks to [ColorBrewer](http://colorbrewer2.org/) for the awesome color schemes in JSON.
- Of course thanks to the [Cesium](http://cesiumjs.org/) team for their awesome library.

See the [License](LICENSE.md).

##Plug-ins:##

1. MultiColorTriangle - I needed to have the flexibility to specify multi-color polygons and the traditional way for us to do this was to break any rendering task down into small multi-color triangles. Cesium already had all the tools needed to do this it just needed to be written. I don't claim that this is the best way and I hope to work with the folks at [AGI](http://www.agi.com/). I've added two examples to show MultiColorTriangle:
	- [Simple.html](http://web.ics.purdue.edu/~olsenb/cesium/simple.html) is a set of 4 triangles created from five verteces to display the nice blending capabilities of WebGL. Kind of the typeical "[Hello Triangle examples](http://www.learnopengl.com/#!Getting-Started/Hello-Triangle)" you learn in any GL library. 
		![](images/simple.png)
	- [stlcrime.html](http://web.ics.purdue.edu/~olsenb/cesium/stlcrime.html) is a slightly more complex example that demonstrates a big reason why you would want to have this plug-in. This in particular is just a count (Heat Map) of the public reported crimes in St. Louis during the month of July 2015. This plug-in can visualize outside of the typical heatmap scenario; I just can't think of anything else to do that was quick and dirty. 
		![](images/stlcrime.png)

		- Also, if you're from St. Louis I wan't to note that this is a very biased visualization. I don't take a lot into account and have performed no preprocessing on the raw data. I simply put a +1 where I find a record with spatial information but some records are actually adjustments, meaning they are actually decrementing the count so agian very biased for the time being.

##Extras:##
Some things I don't really consider plug-ins but just extras. These I added to the Core folder.

1. **ColorScheme.js** - A module that helps define "bins" for a color scheme and can identify which color to assign that corresponds to a certain value. It can also automatically generate a legend.

