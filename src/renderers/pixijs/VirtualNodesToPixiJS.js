import { ContainerNode } from '../../common/virtualCanvasNodes'

const PIXI = window.PIXI

// Converts all virtual nodes to pixi js DisplayObject's, adds them to the given
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
    _virtualNodeToPIXIMapping(node, container, classMapping)
  }
}

function _virtualNodeToPIXIMapping (node, container, classMapping) {
  // This node doesn't get rendered.
  if (node.type === 'HPaddingNode') return
  let displayObj
  switch (node.type) {
    case 'VerticalLineNode':
      displayObj = _verticalLineNodeToPIXI(node, container)
      break
    case 'TextNode':
      displayObj = _textNodeToPIXI(node, container)
      break
    case 'SvgNode':
      displayObj = _svgNodeToPIXI(node, container)
      break
    case 'HorizontalLineNode':
      displayObj = _horizontalLineNodeToPIXI(node, container)
      break
    case 'BoxNode':
      displayObj = _boxNodeToPIXI(node, container)
      break
    default:
      throw new Error(`Node ${node.type} is not a renderable node.`)
  }
  container.addChild(displayObj)
  _addClass(node, displayObj, classMapping)
}

function _verticalLineNodeToPIXI (node) {
  const { x, y, width, height } = node.getBounds()
  const shape = new PIXI.Graphics()
  shape.beginFill(node.color)
  shape.drawRect(0, -height, width, height)
  shape.x = x
  shape.y = y
  return shape
}

function _textNodeToPIXI (node, container) {
  const { x, y } = node.getBounds()
  const fontData = node.font.split(' ')
  const fontSize = +(fontData[2].replace(/px/gi, ''))
  const style = new PIXI.TextStyle({
    fontFamily: fontData[3],
    fontSize,
    fontStyle: fontData[0],
    fontWeight: fontData[1],
    fill: [node.color],
    padding: 40 // TODO: More robust solution for cutting off text rather than use of padding
  })
  const text = new PIXI.Text(node.text, style)
  // Pixi has weird baseline issue so to resolve it we have it to make it correct 'alphabetic' baseline
  text.anchor.set(0, 0.8)
  text.x = x
  text.y = y
  return text
}

function _svgNodeToPIXI (node) {
  const { x, y, height } = node.getBounds()
  const serializer = new XMLSerializer() // eslint-disable-line
  const svgElement = node.virtualHtmlNode.toNode()
  const serializedSvg = serializer.serializeToString(svgElement)
  const texture = new PIXI.Texture.fromImage('data:image/svg+xml;charset=utf8,' + serializedSvg) // eslint-disable-line
  const shape = new PIXI.Sprite(texture)
  shape.x = x
  shape.y = y - height
  return shape
}

function _horizontalLineNodeToPIXI (node) {
  const { width, height, x, y } = node.getBounds()
  const shape = new PIXI.Graphics()
  shape.beginFill(node.color)
  shape.drawRect(0, -height, width, height)
  shape.x = x
  shape.y = y
  return shape
}

function _boxNodeToPIXI (node) {
  const { x, y, width, height } = node.getBounds()
  const shape = new PIXI.Graphics()
  const bgColor = node.backgroundColor
  const borderColor = node.borderColor
  const borderWidth = node.borderWidth
  if (bgColor !== null) shape.beginFill(bgColor)
  shape.lineStyle(borderWidth, borderColor)
  shape.drawRect(0, 0, width, height)
  shape.x = x
  shape.y = y - height
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
