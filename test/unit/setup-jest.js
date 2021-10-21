// Mocks out all necessary createjs classes/methods.
function createCJSMock () {
  class ContainerMock {
    dispatchEvent () {}
    addChild () {}
    removeAllChildren () {}
    getBounds () {}
  }
  class TextMock {
    set () {}
  }

  class GraphicsMock {
    beginStroke () {
      return this
    }

    beginFill () {
      return this
    }

    setStrokeStyle () {
      return this
    }

    drawRect () {
      return this
    }

    append () {}
  }
  class ShapeMock {
    constructor () {
      this.graphics = new GraphicsMock()
    }

    set () {}
    setBounds () {}
    cache () {}
  }
  class CreateJSMock {}
  CreateJSMock.Container = ContainerMock
  CreateJSMock.Text = TextMock
  CreateJSMock.Shape = ShapeMock
  return CreateJSMock
}
global.createjs = createCJSMock()

// Mocks out all necessary pixijs classes/methods.
function pixiJSMock () {
  class ContainerMock {
    addChild () {}
    removeChildren () {}
    getBounds () {}
  }
  class TextMock {
    constructor () {
      this.anchor = {
        set: () => {
        }
      }
    }
  }
  class TextStyleMock {}
  class GraphicsMock {
    lineStyle () {
      return this
    }

    beginFill () {
      return this
    }

    setStrokeStyle () {
      return this
    }

    drawRect () {
      return this
    }

    append () {}
  }
  class EventEmitterMock {
    emit () {}
  }
  class SpriteMock {}
  class fromImageMock {}
  class PixiJSMock {}
  PixiJSMock.Container = ContainerMock
  PixiJSMock.Text = TextMock
  PixiJSMock.TextStyle = TextStyleMock
  PixiJSMock.Graphics = GraphicsMock
  PixiJSMock.Sprite = SpriteMock
  PixiJSMock.Graphics = GraphicsMock
  PixiJSMock.Texture = {
    fromImage: fromImageMock
  }
  PixiJSMock.utils = {
    EventEmitter: EventEmitterMock
  }
  return PixiJSMock
}
global.PIXI = pixiJSMock()

// Mocking XMLSerializer
global.XMLSerializer = class XMLSerializer {
  serializeToString () {}
}
