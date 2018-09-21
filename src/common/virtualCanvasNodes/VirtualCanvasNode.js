class Bounds {
  constructor (x, y, width, height) {
    this.x = x || 0
    this.y = y || 0
    this.width = width || 0
    this.height = height || 0
  }

  clone () {
    return new Bounds(this.x, this.y, this.width, this.height)
  }

  /**
   * Extends the current bounds to account for the passed in Rect or Point.
   * @param  {Object} bounds - Object with x and y, with optional width/height
   */
  extend (bounds) {
    const { x, y, width = 0, height = 0 } = bounds
    if (x < this.x) {
      this.width += this.x - x
      this.x = x
    }
    if (y < this.y) {
      this.height += this.y - y
      this.y = y
    }
    if (x + width > this.x + this.width) {
      this.width = (x + width) - this.x
    }
    if (y + height > this.y + this.height) {
      this.height = (y + height) - this.y
    }
  }

  toJSON () {
    return { x: this.x, y: this.y, width: this.width, height: this.height }
  }

  set (props) {
    Object.keys(props).forEach((key) => {
      if (this[key] !== undefined) {
        this[key] = props[key]
      }
    })
  }
}
class Margin {
  constructor () {
    this.left = 0
    this.right = 0
  }

  toJSON () {
    return { left: this.left, right: this.right }
  }

  set (props) {
    Object.keys(props).forEach((key) => {
      if (this[key] !== undefined) {
        this[key] = props[key]
      }
    })
  }
}

/**
 * A Virtual Node represents the interface for a all sub Nodes.
 * They are simple models, which allow the data to be translated to most
 * rendering platforms.
 *
 * @abstract
 */
export default class VirtualCanvasNode {
  /**
   * constructor
   * @param {Array<String>} classes
   */
  constructor (classes) {
    this.margin = new Margin()
    this.bounds = new Bounds()
    this.classes = classes || []
  }

  /**
   * Sets the node's x/y position
   */
  setPosition (x, y) {
    this.bounds.x = x
    this.bounds.y = y
  }

  /**
   * Gets the abolsute bounds of this node relative to (0, 0)
   * @return {Bounds}
   */
  getBounds () {
    return this.bounds
  }

  /**
   * Converts the VirtualNode model to a JSON Object.
   */
  toJSON () {
    const json = {
      margin: this.margin.toJSON(),
      bounds: this.getBounds().toJSON(),
      classes: this.classes,
      type: this.type
    }
    return json
  }

  /**
   * Returns the type of the VirtualCanvasNode
   *
   * @abstract
   * @return {String}
   */
  get type () {
    throw new Error('Type must be implemented by sub node')
  }
}
