import StretchyNode from './StretchyNode'

/**
 * A BoxNode represents a rectangle with a configurable border/background color.
 * It's stretchy as it's size is determined by the content within.
 *
 * Example include colorbox, boxed, fcolorbox.
 */
export default class BoxNode extends StretchyNode {
  /**
   * constructor
   * @param {String} backgroundColor
   * @param {String} borderColor
   * @param {Number} borderWidth
   * @param {Number} minWidth
   * @param {Array<String>} classes
   */
  constructor (backgroundColor, borderColor, borderWidth, minWidth, classes) {
    super(minWidth, classes)

    this.backgroundColor = backgroundColor
    this.borderColor = borderColor
    this.borderWidth = borderWidth
  }

  /**
   * Converts the VirtualNode model to a JSON Object.
   */
  toJSON () {
    const json = super.toJSON()
    json.backgroundColor = this.backgroundColor
    json.borderColor = this.borderColor
    json.borderWidth = this.borderWidth
    return json
  }

  /**
   * Returns the type of the VirtualCanvasNode
   *
   * @return {String}
   */
  get type () {
    return 'BoxNode'
  }
}
