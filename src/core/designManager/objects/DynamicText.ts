import { fabric } from "fabric"
export class DynamicTextObject extends fabric.Textbox {
  static type = "DynamicText"
  initialize(options: any) {
    const { text, ...textOptions } = options
    // @ts-ignore
    super.initialize(text, {
      ...textOptions,
      backgroundColor: "#ecf0f1",
      fill: "#2c3e50",
      editable: false,
      Path2D,
    })
    return this
  }

  static fromObject(options: any, callback: any) {
    return callback && callback(new fabric.DynamicText(options))
  }
}

fabric.DynamicText = fabric.util.createClass(DynamicTextObject, {
  type: DynamicTextObject.type,
})
fabric.DynamicText.fromObject = DynamicTextObject.fromObject

export type DynamicTextOptions = fabric.ITextboxOptions & { text: string; metadata: any }

declare module "fabric" {
  namespace fabric {
    class DynamicText extends DynamicTextObject {
      metadata: any
      constructor(options: DynamicTextOptions)
    }
  }
}
