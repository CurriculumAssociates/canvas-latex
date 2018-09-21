var canvas = document.getElementById('canvas');


const getParameterByName = (name) => {
    const url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

const options = {
  displayMode: JSON.parse( getParameterByName('displayMode') || true ),
  debugBounds: JSON.parse( getParameterByName('debugBounds') || true ),
};

// grab the width and height from canvas
var width = +canvas.getAttribute('width')
var height = +canvas.getAttribute('height')

var widget = window.widget = new window.CanvasLatex.PixiJS('', options)
var app = new PIXI.Application(width, height, { view: canvas, backgroundColor : 0xffffff, resolution: 2 })
var stage = app.stage
stage.addChild(widget)

// Resetting canvas widht/height because we doubled the resolution using PIXI
canvas.style.width = (canvas.width / 2) + 'px'
canvas.style.height = (canvas.height / 2) + 'px'
// Scaling contex to match resolution
stage.scale.x = stage.scale.y  = window.devicePixelRatio

var input = document.getElementById('input')
input.oninput = updateWidget

window.WebFont.load({
  custom: {
    families: [
      'KaTeX_AMS:n4,i4,n7',
      'KaTeX_Caligraphic:n4,i4,n7',
      'KaTeX_Fraktur:n4,i4,n7',
      'KaTeX_Main:n4,i4,n7',
      'KaTeX_Math:n4,i4,n7',
      'KaTeX_SansSerif:n4,i4,n7',
      'KaTeX_Script:n4,i4,n7',
      'KaTeX_Typewriter:n4,i4,n7',
      'KaTeX_Size1:n4',
      'KaTeX_Size2:n4',
      'KaTeX_Size3:n4',
      'KaTeX_Size4:n4',
      'muli-bold:n4,i4,n7',
      'Math_SansSerif',
    ],
    testStrings: {
      'KaTeX_Size1': '()[]',
      'KaTeX_Size2': '()[]',
      'KaTeX_Size3': '()[]',
      'KaTeX_Size4': '()[]'
    }
  },
  active: () => {
    window.document.body.classList.add('web-font-loaded');
  }
})

function updateWidget () {
  widget.latex = input.value
  redraw()
}

function redraw () {
  widget.y = 10 - widget.y
}

window.redraw = redraw
window.updateWidget = updateWidget
