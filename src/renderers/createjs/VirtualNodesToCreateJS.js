// TODO move off of Canvg in favor of Path2D
import Canvg from 'canvg-browser'
import { ContainerNode } from '../../common/virtualCanvasNodes'

// Converts all virtual nodes to createjs DisplayObject's, adds them to the given
// container, and returns the class mapping
export function convertAndGetClasses (virtualRoot, container) {
  const classMapping = {}
  _convert(virtualRoot, container, classMapping)
  return classMapping
}

function _convert (node, container, classMapping) {
  if (node instanceof ContainerNode) {
    // Container nodes don't get rendered. We only care about
    // the children
    node.nodes.forEach((child) => {
      _convert(child, container, classMapping)
    })
  } else {
    _virtualNodeToCJSMapping(node, container, classMapping)
  }
}

function _virtualNodeToCJSMapping (node, container, classMapping) {
  // This node doesn't get rendered.
  if (node.type === 'HPaddingNode') return
  let displayObj
  switch (node.type) {
    case 'VerticalLineNode':
      displayObj = _verticalLineNodeToCJS(node, container)
      break
    case 'TextNode':
      displayObj = _textNodeToCJS(node, container)
      break
    case 'SvgNode':
      displayObj = _svgNodeToCJS(node, container)
      break
    case 'HorizontalLineNode':
      displayObj = _horizontalLineNodeToCJS(node, container)
      break
    case 'BoxNode':
      displayObj = _boxNodeToCJS(node, container)
      break
    default:
      throw new Error(`Node ${node.type} is not a renderable node.`)
  }
  container.addChild(displayObj)
  _addClass(node, displayObj, classMapping)
}

function _verticalLineNodeToCJS (node, container) {
  const { x, y, width, height } = node.getBounds()
  const shape = new createjs.Shape()
  const graphics = shape.graphics
  graphics.beginFill(node.color)
    .drawRect(0, -height, width, height)
  shape.setBounds(0, 0, width, height)
  shape.set({ x, y })
  return shape
}

function _textNodeToCJS (node, container) {
  const { x, y } = node.getBounds()
  const text = new createjs.Text(node.text, node.font, node.color)
  text.set({ x, y, textBaseline: 'alphabetic' })
  return text
}

function _svgNodeToCJS (node) {
  const { x, y, width, height } = node.getBounds()
  const shape = new createjs.Shape()
  const options = {
    ignoreDimensions: true,
    ignoreClear: true,
    ignoreMouse: true
  }
  shape.graphics.append({exec: (ctx) => {
    Canvg(ctx.canvas, node.virtualHtmlNode.toMarkup(), options)
  }})
  shape.setBounds(0, 0, width, height)
  shape.cache(0, 0, width, height, window.devicePixelRatio)
  shape.set({ x, y: y - height })
  return shape
}

function _horizontalLineNodeToCJS (node) {
  const { width, height, x, y } = node.getBounds()
  const shape = new createjs.Shape()
  const graphics = shape.graphics
  graphics.beginFill(node.color)
    .drawRect(0, -height, width, height)
  shape.setBounds(0, 0, width, height)
  shape.set({ x, y })
  return shape
}

function _boxNodeToCJS (node) {
  const { x, y, width, height } = node.getBounds()
  const shape = new createjs.Shape()
  const bgColor = node.backgroundColor
  const borderColor = node.borderColor
  const borderWidth = node.borderWidth
  const graphics = shape.graphics
  graphics.beginStroke(borderColor)
          .beginFill(bgColor)
          .setStrokeStyle(borderWidth)
          .drawRect(0, -height, width, height)
  shape.setBounds(0, 0, width, height)
  shape.set({ x, y })
  return shape
}

function _addClass (node, displayObject, classMapping) {
  node.classes.forEach((classData) => {
    if (!classMapping[classData.name]) {
      classMapping[classData.name] = []
    }
    if (!classMapping[classData.name][classData.index]) {
      classMapping[classData.name][classData.index] = []
    }
    classMapping[classData.name][classData.index].push(displayObject)
  })
}
