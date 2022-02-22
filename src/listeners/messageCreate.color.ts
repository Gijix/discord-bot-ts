import * as app from "../app.js"
import { hsv2rgb } from "../namespaces/colorScript.js"

let i = 0

const listener: app.Listener<"messageCreate"> = {
  event: "messageCreate",
  description: "A messageCreate listener",
  async run(message) {
    const roles = await message.guild?.roles.fetch()
    const role = roles?.get("945457810538373131")!
    role.setColor(hsv2rgb(i))
    if(i >= 360) {
      i = 0
    }
    else i += 3
  }
}

export default listener