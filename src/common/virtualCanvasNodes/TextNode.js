import VirtualCanvasNode from './VirtualCanvasNode'

const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')

/**
 * A Text Node represents text with configurable text, font, and color.
 *
 * Examples include A, 3, \int, \prod.
 */
export default class TextNode extends VirtualCanvasNode {
  /**
   * constructor
   * @param {String} text
   * @param {String} font
   * @param {String} color
   * @param {Array<String>} classes
   */
  constructor (text, font, color, classes) {
    super(classes)

    this.text = text
    this.font = font
    this.color = color

    ctx.font = font
    this.bounds.width = ctx.measureText(text).width
  }

  /**
   * Converts the VirtualNode model to a JSON Object.
   */
  toJSON () {
    const json = super.toJSON()
    json.text = this.text
    json.font = this.font
    json.color = this.color
    return json
  }

  /**
   * Returns the type of the VirtualCanvasNode
   *
   * @return {String}
   */
  get type () {
    return 'TextNode'
  }
}
