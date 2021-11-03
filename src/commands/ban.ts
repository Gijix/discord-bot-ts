import * as app from "../app.js"

export default new app.Command({
  name: "ban",
  description: "The ban command",
  channelType: "all",
  async run(message) {
    let member = message.mentions.members?.first()
    return member?.ban()
  }
})