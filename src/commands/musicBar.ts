import * as app from "../app.js"

export default new app.Command({
  name: "musicBar",
  description: "The musicBar command",
  channelType: "all",
  async run(message) {
    let guildQueue = client.player.getQueue(message.guildId!)
    return message.send("musicBar command is not yet implemented.")
  }
})