import VirtualCanvasNode from './VirtualCanvasNode'

/**
 * An HPaddingNode represents an invisible node (not drawn) with a specific width/x.
 *
 */
export default class HPaddingNode extends VirtualCanvasNode {
  /**
   * Returns the type of the VirtualCanvasNode
   *
   * @return {String}
   */
  get type () {
    return 'HPaddingNode'
  }
}
