import VirtualNodeBuilder from '../../../src/common/VirtualNodeBuilder'
import { getDefaultOptions } from '../helpers'

describe('VirtualNodeBuilder', function () {
  describe('#build', function () {
    describe('attributes', function () {
      it('should build correct attributes with height, yShift, classes and baselineHeight', function () {
        const builder = new VirtualNodeBuilder('test', getDefaultOptions())
        const attributes = builder.build().attributes
        expect(JSON.stringify(attributes, null, 2)).toMatchSnapshot()
      })
    })
    describe('rootNode', function () {
      it('should build a fraction with nulldelim spacing', function () {
        const builder = new VirtualNodeBuilder('\\frac{a}{b}', getDefaultOptions())
        const root = builder.build().rootNode
        expect(root.toJSON()).toMatchSnapshot()
      })
      it('should build a newline with appropriate spacing', function () {
        const builder = new VirtualNodeBuilder('\\frac{a}{b}\\\\b', getDefaultOptions())
        const root = builder.build().rootNode
        expect(root.toJSON()).toMatchSnapshot()
      })
      it('should build nested fractions with appropriate positioning', function () {
        const latex = '\\frac{aa}{\\frac{a}{b}}'
        const builder = new VirtualNodeBuilder(latex, getDefaultOptions())
        const root = builder.build().rootNode
        expect(root.toJSON()).toMatchSnapshot()
      })
      it('should build a sqrt svg with minWidth', function () {
        const builder = new VirtualNodeBuilder('\\sqrt{a}', getDefaultOptions())
        const root = builder.build().rootNode
        expect(root.toJSON()).toMatchSnapshot()
      })
      it('should build a right-oriented svg', function () {
        const builder = new VirtualNodeBuilder('\\overrightarrow{AB}', getDefaultOptions())
        const root = builder.build().rootNode
        expect(root.toJSON()).toMatchSnapshot()
      })
      it('should build a table with vertical and horizontal separators', function () {
        const latex = '\\begin{array}{|l|c|r|} \\hline left & center & right \\\\ \\hline a & b & c \\\\ \\hline \\end{array}'
        const builder = new VirtualNodeBuilder(latex, getDefaultOptions())
        const root = builder.build().rootNode
        expect(root.toJSON()).toMatchSnapshot()
      })
      it('should build a integral with appropriate margins', function () {
        const latex = 'a\\int_{33}^{222}a'
        const builder = new VirtualNodeBuilder(latex, getDefaultOptions())
        const root = builder.build().rootNode
        expect(root.toJSON()).toMatchSnapshot()
      })
      it('should build mspace as HPaddingNodes', function () {
        const latex = 'a+b + \\ d'
        const builder = new VirtualNodeBuilder(latex, getDefaultOptions())
        const root = builder.build().rootNode
        expect(root.toJSON()).toMatchSnapshot()
      })
      it('should build boldsymbol with bold italic font', function () {
        const latex = '\\boldsymbol{a}\\mathbf{\\boldsymbol{b}}'
        const builder = new VirtualNodeBuilder(latex, getDefaultOptions())
        const root = builder.build().rootNode
        expect(root.toJSON()).toMatchSnapshot()
      })
      it('should build underlineLine as underlined text', function () {
        const latex = '\\underline{underlined}'
        const builder = new VirtualNodeBuilder(latex, getDefaultOptions())
        const root = builder.build().rootNode
        expect(root.toJSON()).toMatchSnapshot()
      })
      it('should build overlinelineLine as overlined text', function () {
        const latex = '\\overline{overlined}'
        const builder = new VirtualNodeBuilder(latex, getDefaultOptions())
        const root = builder.build().rootNode
        expect(root.toJSON()).toMatchSnapshot()
      })
      it('should build smallOp using a small sigma', function () {
        // should also build opLimits
        const latex = '\\textstyle \\sum\\limits_{x \\to \\infty} 1/x'
        const builder = new VirtualNodeBuilder(latex, getDefaultOptions())
        const root = builder.build().rootNode
        expect(root.toJSON()).toMatchSnapshot()
      })
      it('should build delimSizing using binom', function () {
        const latex = '\\binom{n}{k}'
        const builder = new VirtualNodeBuilder(latex, getDefaultOptions())
        const root = builder.build().rootNode
        expect(root.toJSON()).toMatchSnapshot()
      })
      it('should build xArrow as text with an arrow under it', function () {
        const latex = '\\xLeftarrow{hello}'
        const builder = new VirtualNodeBuilder(latex, getDefaultOptions())
        const root = builder.build().rootNode
        expect(root.toJSON()).toMatchSnapshot()
      })
      it('should build root with the cube root of eight', function () {
        const latex = '\\sqrt[3]{8}'
        const builder = new VirtualNodeBuilder(latex, getDefaultOptions())
        const root = builder.build().rootNode
        expect(root.toJSON()).toMatchSnapshot()
      })
      it('should build mainit with dotless i', function () {
        const latex = '\\imath'
        const builder = new VirtualNodeBuilder(latex, getDefaultOptions())
        const root = builder.build().rootNode
        expect(root.toJSON()).toMatchSnapshot()
      })
      it('should build amsrm with a yen symbol', function () {
        const latex = '\\yen'
        const builder = new VirtualNodeBuilder(latex, getDefaultOptions())
        const root = builder.build().rootNode
        expect(root.toJSON()).toMatchSnapshot()
      })
      it('should build mathbf with bold font', function () {
        const latex = '\\mathbf{a}'
        const builder = new VirtualNodeBuilder(latex, getDefaultOptions())
        const root = builder.build().rootNode
        expect(root.toJSON()).toMatchSnapshot()
      })
      it('should build mathbb with bb font', function () {
        // doesn't work unless it's a capital letter
        const latex = '\\mathbb{BB}'
        const builder = new VirtualNodeBuilder(latex, getDefaultOptions())
        const root = builder.build().rootNode
        expect(root.toJSON()).toMatchSnapshot()
      })
      it('should build mathcal with calligraphic font', function () {
        // doesn't work unless it's a capital letter
        const latex = '\\mathcal{CALLIGRAPHIC}'
        const builder = new VirtualNodeBuilder(latex, getDefaultOptions())
        const root = builder.build().rootNode
        expect(root.toJSON()).toMatchSnapshot()
      })
      it('should build mathfrak with fraktur font', function () {
        const latex = '\\mathfrak{fraktur}'
        const builder = new VirtualNodeBuilder(latex, getDefaultOptions())
        const root = builder.build().rootNode
        expect(root.toJSON()).toMatchSnapshot()
      })
      it('should build mathtt with typewriter font', function () {
        const latex = '\\mathtt{typewriter}'
        const builder = new VirtualNodeBuilder(latex, getDefaultOptions())
        const root = builder.build().rootNode
        expect(root.toJSON()).toMatchSnapshot()
      })
      it('should build mathscr with script font', function () {
        // doesn't work unless it's a capital letter
        const latex = '\\mathscr{SCRIPT}'
        const builder = new VirtualNodeBuilder(latex, getDefaultOptions())
        const root = builder.build().rootNode
        expect(root.toJSON()).toMatchSnapshot()
      })
      it('should build mathit with italic font', function () {
        const latex = '\\mathit{italic}\\it{italic}'
        const builder = new VirtualNodeBuilder(latex, getDefaultOptions())
        const root = builder.build().rootNode
        expect(root.toJSON()).toMatchSnapshot()
      })
      it('should build mathrm with katex main font', function () {
        const latex = '\\mathrm{hello world}'
        const builder = new VirtualNodeBuilder(latex, getDefaultOptions())
        const root = builder.build().rootNode
        expect(root.toJSON()).toMatchSnapshot()
      })
      it('should build mathsf with katex sans serif font', function () {
        const latex = '\\mathsf{hello world}'
        const builder = new VirtualNodeBuilder(latex, getDefaultOptions())
        const root = builder.build().rootNode
        expect(root.toJSON()).toMatchSnapshot()
      })
      it('should build textbf with bold font', function () {
        const latex = '\\textbf{a}'
        const builder = new VirtualNodeBuilder(latex, getDefaultOptions())
        const root = builder.build().rootNode
        expect(root.toJSON()).toMatchSnapshot()
      })
      it('should build textit with italic font', function () {
        const latex = '\\textit{italic}'
        const builder = new VirtualNodeBuilder(latex, getDefaultOptions())
        const root = builder.build().rootNode
        expect(root.toJSON()).toMatchSnapshot()
      })
      it('should build textrm with katex main font', function () {
        const latex = '\\textrm{hello world}'
        const builder = new VirtualNodeBuilder(latex, getDefaultOptions())
        const root = builder.build().rootNode
        expect(root.toJSON()).toMatchSnapshot()
      })
      it('should build texttt with typewriter font', function () {
        const latex = '\\texttt{typewriter}'
        const builder = new VirtualNodeBuilder(latex, getDefaultOptions())
        const root = builder.build().rootNode
        expect(root.toJSON()).toMatchSnapshot()
      })
      it('should build colorbox with a teal colorbox', function () {
        const latex = '\\colorbox{teal}{teal}'
        const builder = new VirtualNodeBuilder(latex, getDefaultOptions())
        const root = builder.build().rootNode
        expect(root.toJSON()).toMatchSnapshot()
      })
      it('should build fcolorbox with a red fcolorbox with a blue border', function () {
        const latex = '\\fcolorbox{blue}{red}{C}'
        const builder = new VirtualNodeBuilder(latex, getDefaultOptions())
        const root = builder.build().rootNode
        expect(root.toJSON()).toMatchSnapshot()
      })
      it('should build size1 using tiny font', function () {
        const latex = '\\tiny{tiny}'
        const builder = new VirtualNodeBuilder(latex, getDefaultOptions())
        const root = builder.build().rootNode
        expect(root.toJSON()).toMatchSnapshot()
      })
      it('should build size2', function () {
        const latex = '\\small F_x'
        const builder = new VirtualNodeBuilder(latex, getDefaultOptions())
        const root = builder.build().rootNode
        expect(root.toJSON()).toMatchSnapshot()
      })
      it('should build size3 using scriptsize font', function () {
        const latex = '\\scriptsize{scriptsize}'
        const builder = new VirtualNodeBuilder(latex, getDefaultOptions())
        const root = builder.build().rootNode
        expect(root.toJSON()).toMatchSnapshot()
      })
      it('should build size4 using footnote font', function () {
        const latex = '\\footnotesize{footnotesize}'
        const builder = new VirtualNodeBuilder(latex, getDefaultOptions())
        const root = builder.build().rootNode
        expect(root.toJSON()).toMatchSnapshot()
      })
      it('should build size5 using small font', function () {
        const latex = '\\small{small}'
        const builder = new VirtualNodeBuilder(latex, getDefaultOptions())
        const root = builder.build().rootNode
        expect(root.toJSON()).toMatchSnapshot()
      })
      it('should build size6 using normal font', function () {
        const latex = '\\small{small} \\normalsize{normal}'
        const builder = new VirtualNodeBuilder(latex, getDefaultOptions())
        const root = builder.build().rootNode
        expect(root.toJSON()).toMatchSnapshot()
      })
      it('should build size7 using large font', function () {
        const latex = '\\large{large}'
        const builder = new VirtualNodeBuilder(latex, getDefaultOptions())
        const root = builder.build().rootNode
        expect(root.toJSON()).toMatchSnapshot()
      })
      it('should build size8 using Large font', function () {
        const latex = '\\Large{Large}'
        const builder = new VirtualNodeBuilder(latex, getDefaultOptions())
        const root = builder.build().rootNode
        expect(root.toJSON()).toMatchSnapshot()
      })
      it('should build size9 using LARGE font', function () {
        const latex = '\\LARGE{LARGE}'
        const builder = new VirtualNodeBuilder(latex, getDefaultOptions())
        const root = builder.build().rootNode
        expect(root.toJSON()).toMatchSnapshot()
      })
      it('should build size10 using huge font', function () {
        const latex = '\\huge{huge}'
        const builder = new VirtualNodeBuilder(latex, getDefaultOptions())
        const root = builder.build().rootNode
        expect(root.toJSON()).toMatchSnapshot()
      })
      it('should build size10 using Huge font', function () {
        const latex = '\\Huge{Huge}'
        const builder = new VirtualNodeBuilder(latex, getDefaultOptions())
        const root = builder.build().rootNode
        expect(root.toJSON()).toMatchSnapshot()
      })
    })
    describe('classes', function () {
      it('should build for text', function () {
        const latex = '\\class{a}{ab}'
        const builder = new VirtualNodeBuilder(latex, getDefaultOptions())
        const root = builder.build().rootNode
        expect(root.toJSON()).toMatchSnapshot()
      })
      it('should build for svgs', function () {
        const latex = '\\class{a}{\\sqrt{a}}'
        const builder = new VirtualNodeBuilder(latex, getDefaultOptions())
        const root = builder.build().rootNode
        expect(root.toJSON()).toMatchSnapshot()
      })
      it('should build for boxes', function () {
        const latex = '\\class{a}{\\boxed{a}}'
        const builder = new VirtualNodeBuilder(latex, getDefaultOptions())
        const root = builder.build().rootNode
        expect(root.toJSON()).toMatchSnapshot()
      })
      it('should build for horizontal line nodes', function () {
        const latex = '\\class{a}{\\frac{a}{b}}'
        const builder = new VirtualNodeBuilder(latex, getDefaultOptions())
        const root = builder.build().rootNode
        expect(root.toJSON()).toMatchSnapshot()
      })
      it('should build for nested elements', function () {
        const latex = '\\class{a}{a\\class{b}{b}}'
        const builder = new VirtualNodeBuilder(latex, getDefaultOptions())
        const root = builder.build().rootNode
        expect(root.toJSON()).toMatchSnapshot()
      })
      it('should build for separated classes', function () {
        const latex = '\\class{a}{a}\\class{a}{b}'
        const builder = new VirtualNodeBuilder(latex, getDefaultOptions())
        const root = builder.build().rootNode
        expect(root.toJSON()).toMatchSnapshot()
      })
    })
    describe('rootNode options', function () {
      it('should build the box node with a transparent background color and green border', function () {
        const options = getDefaultOptions()
        options.defaultTextColor = 'green'
        const builder = new VirtualNodeBuilder('\\fcolorbox{default}{none}{a}', options)
        const root = builder.build().rootNode
        expect(root.toJSON()).toMatchSnapshot()
      })
      it('should build using the optional default text color', function () {
        const options = getDefaultOptions()
        options.defaultTextColor = 'green'
        const builder = new VirtualNodeBuilder('\\boxed{3}', options)
        const root = builder.build().rootNode
        expect(root.toJSON()).toMatchSnapshot()
      })
      it('should build using the optional base size', function () {
        const options = getDefaultOptions()
        options.baseSize = 80
        const builder = new VirtualNodeBuilder('a', options)
        const root = builder.build().rootNode
        expect(root.toJSON()).toMatchSnapshot()
      })
      it('should build using custom sizeIndex', function () {
        const options = getDefaultOptions()
        options.sizeIndex = '7'
        const builder = new VirtualNodeBuilder('a', options)
        const root = builder.build().rootNode
        expect(root.toJSON()).toMatchSnapshot()
      })
    })
  })
})
