import * as app from "../app.js"

export default new app.Command({
  name: "kick",
  description: "The kick command",
  channelType: "all",
  userPermissions: ["MANAGE_MESSAGES"],
  async run(message) {
    let member = message.mentions.members?.first()
    return member?.kick()
  }
})