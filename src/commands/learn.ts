import * as app from "../app.js"

export default new app.Command({
  name: "learn",
  description: "The learn command",
  channelType: "all",
  async run(message) {
    return message.send("learn command is not yet implemented.")
    message.args[0]
  }
})