#gridacord
a jquery accordion for image grids

| contents |
| ------------- |
| [What is](#what-is) |
| [Example](http://tloureiro.github.com/gridacord/example.html)|
| [Requirements](#requirements) |
| [How to use](#how-to-use) |
| [Parameters](#parameters) |
| [Frame center](#frame-center) |
| [Contribute](#contribute) |
| [Limitations](#limitations) |
      

###What is
Gridacord is a jquery plugin that creates an accordion-style image gallery grid with minimum necessary setup yet customizable.

###Requirements
- [jQuery UI](http://jqueryui.com/) 

- [jQuery imagesLoaded](http://desandro.github.com/imagesloaded/) (provided)



###How to use
```html 
$("#mygrid").gridacord(); 
```

or

```html 
$("#mygrid").gridacord({item_margin : 2, transition_time: 1000}); 
```

###Parameters
- <b>item_margin</b> - Margin of each picture frame in pixels
- <b>width</b> - Width of each picture frame in pixels
- <b>height</b> - Height of each picture frame in pixels
- <b>transition_time</b> - Frame expansion animation transition time

###Frame center
To define which spot of the picture will be on the center of frame it's possible to define two extra parameters on ```<div class="item"> ``` like in the example below:
```html
<div class="item" data-spot-x="40" data-spot-y="20">
  <img src="5.jpg"/>
</div>
```

- <b>data-spot-x</b> - the x axis distance in % of the left top corner to the right top corner
- <b>data-spot-y</b> - the y axis distance in % of the left top corner to the left bottom corner

<pre>
-------- x axis ------>100
|0
|
|       
y
axis   IMAGE
|
|
V
100
</pre>

###Limitations
- Only 2x2, 3x3, 4x4 ... grids can be used


###Contribute
Plz.

