import VirtualCanvasNode from './VirtualCanvasNode'

/**
 * A ContainerNode represents the container of child nodes
 * When this position is updated, so are the children's position.
 *
 * @abstract
 */
export default class VirtualContainerNode extends VirtualCanvasNode {
  /**
   * constructor
   * @param {Array<String>} classes
   */
  constructor (classes) {
    super(classes)

    this.nodes = []
  }

  /**
   * Converts the VirtualNode model to a JSON Object.
   */
  toJSON () {
    const json = super.toJSON()
    json.nodes = this.nodes.map((node) => node.toJSON())
    return json
  }

  /**
   * Adds a child node to the Container
   * @param {VirtualCanvasNode} node
   */
  addNode (node) {
    this.nodes.push(node)
  }

  /**
   * Gets the last node in the container
   * @return {Node | null}
   */
  last () {
    return this.nodes[this.nodes.length - 1]
  }

  /**
   * Moves the x position of the VirtualCanvasNode and shift the children
   */
  setPosition (x, y) {
    super.setPosition(x, y)
    const bounds = this.getBounds()
    const delta = x - bounds.x
    this.nodes.forEach((child) => {
      const newX = child.bounds.x + delta
      child.setPosition(newX, child.bounds.y)
    })
  }

  /**
   * Gets the abolsute bounds of this node relative to (0, 0)
   * @return {Bounds}
   */
  getBounds () {
    this.nodes.forEach((child, i) => {
      const childBounds = child.getBounds()
      if (i === 0) {
        this.bounds = childBounds.clone()
      } else {
        this.bounds.extend(childBounds)
      }
    })
    return this.bounds
  }
}
