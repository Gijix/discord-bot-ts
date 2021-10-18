import * as app from "../app.js"

export default new app.Command({
  name: "ban",
  description: "The ban command",
  channelType: "all",
  async run(message) {
    return message.send("ban command is not yet implemented.")
    
  }
})