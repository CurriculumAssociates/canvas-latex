import StretchyNode from './StretchyNode'

/**
 * A HorizontalLineNode represents a line with a configurable color.
 * It's stretchy as it's size is determined by the content surrounding it.
 *
 * Examples include frac, hline.
 */
export default class HorizontalLineNode extends StretchyNode {
  /**
   * constructor
   * @param {String} color
   * @param {Number} minWidth
   * @param {Array<String>} classes
   */
  constructor (color, minWidth, classes) {
    super(minWidth, classes)

    this.color = color
  }

  /**
   * Converts the VirtualNode model to a JSON Object.
   */
  toJSON () {
    const json = super.toJSON()
    json.color = this.color
    return json
  }

  /**
   * Returns the type of the VirtualCanvasNode
   *
   * @return {String}
   */
  get type () {
    return 'HorizontalLineNode'
  }
}
