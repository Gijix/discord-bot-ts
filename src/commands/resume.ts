import * as app from "../app.js"
import client from "../app/client.js"
export default new app.Command({
  name: "resume",
  description: "The resume command",
  channelType: "all",
  async run(message) {
      let guildQueue = client.player.getQueue(message.guildId!)
      if (guildQueue && guildQueue.isPlaying) return guildQueue.setPaused(false)
      else  return message.channel.send("No song is running")
  }
})