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

var widget = new window.CanvasLatex.default('', options)
window.widget = widget
var stage = new window.createjs.Stage(canvas)
stage.addChild(widget)

// grab the width and height from canvas
var height = canvas.getAttribute('height')
var width = canvas.getAttribute('width')
// reset the canvas width and height with window.devicePixelRatio applied
canvas.setAttribute('width', Math.round(width * window.devicePixelRatio))
canvas.setAttribute('height', Math.round(height * window.devicePixelRatio))
// force the canvas back to the original size using css
canvas.style.width = width + 'px'
canvas.style.height = height + 'px'
// set CreateJS to render scaled
stage.scaleX = stage.scaleY = window.devicePixelRatio

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
      'KaTeX_Main-BoldItalic:n4,i4,n7',
      'KaTeX_Math-BoldItalic:n4,i4,n7',
      'KaTeX_Size1:n4',
      'KaTeX_Size2:n4',
      'KaTeX_Size3:n4',
      'KaTeX_Size4:n4',
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
  const bounds = widget.getBounds()
  bounds && widget.set({ x: -bounds.x, y: 10 - bounds.y })
  stage.update()
}

window.redraw = redraw
window.updateWidget = updateWidget
