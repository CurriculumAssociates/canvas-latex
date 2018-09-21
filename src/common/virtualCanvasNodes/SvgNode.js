import StretchyNode from './StretchyNode'

/**
 * An SvgNode represents an svg element, which gets converted to canvas drawing commands.
 * It's stretchy as it's size is determined by the content surrounding it.
 *
 * Examples include sqrt, overleftarrow.
 */
export default class SvgNode extends StretchyNode {
  /**
   * constructor
   * @param {Object} virtualHtmlNode
   * @param {Number} minWidth
   * @param {Array<String>} classes
   */
  constructor (virtualHtmlNode, minWidth, classes) {
    super(minWidth, classes)

    this.virtualHtmlNode = virtualHtmlNode
  }

  /**
   * Converts the VirtualNode model to a JSON Object.
   */
  toJSON () {
    const json = super.toJSON()
    json.virtualHtmlNode = this.virtualHtmlNode
    return json
  }

  /**
   * Returns the type of the VirtualCanvasNode
   *
   * @return {String}
   */
  get type () {
    return 'SvgNode'
  }

  /**
   * Sets the table width for the node and adjusts the Svg attributes
   * @param  {Number} tableWidth
   */
  set listWidth (listWidth) {
    this.bounds.width = listWidth
    this.virtualHtmlNode.attributes.width = listWidth
  }
}
