import VirtualNodeBuilder from '../../common/VirtualNodeBuilder'
import { convertAndGetClasses } from './VirtualNodesToPixiJS'

// events that fire before rendering and after rendering
// NOTE: because this._render() is called in the constructor, the first firing of these events
// cannot be captured since you can only add an event listener to the widget after it's made.
export const EVENTS = {
  PRE_RENDER: 'pre-render',
  POST_RENDER: 'post-render'
}

// TODO: Need to find better way
const PIXI = window.PIXI || { Container: () => {} }

export default class PixiJS extends PIXI.Container {
  /**
   * Constructor
   * @namespace Widget
   *
   * @param  {?String} [latex=''] - Sets the initial latex expression
   * @param  {?Object} [options={}] - Any options to apply to the expression
   */
  constructor (latex = '', options = {}) {
    super()
    this._eventEmitter = new PIXI.utils.EventEmitter()
    this._latex = latex
    this._ids = {}
    this._classes = {}

    this._options = options
    this._render()
  }

  /**
   * Returns a flattened 1d array of all pixijs.DisplayObject's with the specified className
   * @memberof Widget
   *
   * For example, when calling getObjectsByClass('a') with the latex:
   * `\class{a}{ab} \class{a}{c}`, the return value will be a 1d array with
   * "a" at index 0, "b" at index 1, and "c" in index 2. The return values are not distinguishable
   * based on how they appear in the latex, and thus should not be relied on.
   *
   * @param  {string} className
   * @return {Array<pixijs.DisplayObject>}
   */
  getObjectsByClass (className) {
    let objects
    if (this._classes[className]) {
      objects = []
      this._classes[className].forEach((sepClass) => {
        objects = objects.concat(sepClass)
      })
    }
    return objects
  }

  /**
   * Returns a 2d array of pixijs.DisplayObject's separated by their className
   * @memberof Widget
   *
   * For example, when calling getObjectsByClassSeparated('a') with the latex:
   * `\class{a}{ab} \class{a}{c}`, the return value will be a 2d array with
   * ["a", "b"] at index 0 and ["c"] at index 1. The return values are distinguishable
   * based on how they appear separated in the latex, and can be relied on as such.
   *
   * @param  {string} className
   * @type {Array<Array<pixijs.DisplayObject>>}
   */
  getObjectsByClassSeparated (className) {
    return this._classes[className]
  }

  /**
   * Sets the latex string and renders it appropriately.
   * @memberof Widget
   *
   * @param  {?String} [latex=''] The string to render
   */
  set latex (latex = '') {
    this.removeChildren()
    this._latex = latex
    this._render()
  }

  /**
   * Retrieves the latex expression
   * @memberof Widget
   *
   * @return {string} - The latex expression as a string
   */
  get latex () {
    return this._latex
  }

  /**
   * Returns all the classes in the latex expression
   * @memberof Widget
   *
   * @return {Object} - classes
   */
  get classes () {
    return this._classes
  }

  /**
   * Returns all the ids in the latex expression
   * @memberof Widget
   *
   * @return {Object} - ids
   */
  get ids () {
    throw new Error('Not yet implemented.')
  }

  /**
   * Returns the distance from the top of the widget to the baseline of the text
   * @return {Number} distance to the baseline
   */
  get distanceToBaseline () {
    return this._baselineHeight
  }

  /**
   * -------------------------------------------
   * -----------------PRIVATE-------------------
   * -------------------------------------------
   */

  _render () {
    this._eventEmitter.emit(EVENTS.PRE_RENDER)
    const nodeBuilder = new VirtualNodeBuilder(this._latex, this._options)
    const nodeData = nodeBuilder.build()
    this._classes = convertAndGetClasses(nodeData.rootNode, this)
    this._setWidgetBoundsAndBaseline(nodeData.attributes)
    this._eventEmitter.emit(EVENTS.POST_RENDER)
  }

  _setWidgetBoundsAndBaseline (attributes) {
    const strutBounds = attributes.strutBounds
    this._baselineHeight = attributes.baselineHeight
    this.y = strutBounds.y
    // TODO: Add debug for bounds and baseline
  }
}
