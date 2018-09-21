const CreateJS = require('../../../src/renderers/createjs/Widget').default

describe('CreateJS', function () {
  describe('#classes', function () {
    it('should not contain previous classes removed from source latex', function () {
      const widget = new CreateJS('\\class{a}{1} + \\class{b}{2} = 3')
      expect(widget.classes).toHaveProperty('a')
      expect(widget.classes).toHaveProperty('b')
      widget.latex = '\\class{a}{1} + 2 = 3'
      expect(widget.classes).toHaveProperty('a')
      expect(widget.classes).not.toHaveProperty('b')
    })
  })
  describe('#getObjectsByClass', function () {
    it('should be able to apply different classes to different parts', function () {
      const latex = '\\class{a}{\\boxed{a}} \\class{b}{de}'
      const widget = new CreateJS(latex)
      const classA = widget.getObjectsByClass('a')
      const classB = widget.getObjectsByClass('b')
      expect(classA.length).toBe(2)
      expect(classB.length).toBe(2)
    })
    it('should be able to apply the same class to different parts', function () {
      const latex = '\\class{a}{b} \\class{a}{c}'
      const widget = new CreateJS(latex)
      const classA = widget.getObjectsByClass('a')
      expect(classA.length).toBe(2)
    })
    it('should be able to handled nested classes', function () {
      const latex = '\\class{a}{\\class{b}{c}d}'
      const widget = new CreateJS(latex)
      const classA = widget.getObjectsByClass('a')
      const classB = widget.getObjectsByClass('b')
      expect(classA.length).toBe(2)
      expect(classB.length).toBe(1)
    })
    it('should add lines to a class', function () {
      const latex = `\\class{a}{\\frac{a}{b}}`
      const widget = new CreateJS(latex)
      const classA = widget.getObjectsByClass('a')
      expect(classA.length).toBe(3)
    })
    it('should add svgs to a class', function () {
      const latex = `\\class{a}{\\sqrt{a}}`
      const widget = new CreateJS(latex)
      const classA = widget.getObjectsByClass('a')
      expect(classA.length).toBe(2)
    })
    it('should be undefined if class does not exist', function () {
      const latex = '\\class{a}{b}'
      const widget = new CreateJS(latex)
      const classB = widget.getObjectsByClass('b')
      expect(classB).toBe(undefined)
    })
  })
  describe('#getObjectsByClassSeparated', function () {
    it('should contain separate indexes for separate instance of the same class', function () {
      const latex = `\\class{a}{bc} + \\class{a}{def}`
      const widget = new CreateJS(latex)
      const classA = widget.getObjectsByClassSeparated('a')
      expect(classA.length).toBe(2)
      const part1 = classA[0]
      const part2 = classA[1]
      expect(part1.length).toBe(2)
      expect(part2.length).toBe(3)
    })
    it('should contain one index for one instance of a class', function () {
      const latex = `\\class{a}{bcd}`
      const widget = new CreateJS(latex)
      const classA = widget.getObjectsByClassSeparated('a')
      expect(classA.length).toBe(1)
      const part1 = classA[0]
      expect(part1.length).toBe(3)
    })
  })
})
