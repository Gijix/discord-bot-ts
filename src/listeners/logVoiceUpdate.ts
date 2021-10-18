import * as app from "../app.js"

const listener: app.Listener<"voiceStateUpdate"> = {
  event: "voiceStateUpdate",
  description: "A voiceStateUpdate listener",
  async run(oldState, newState) {
    // todo: code here
  }
}

export default listener