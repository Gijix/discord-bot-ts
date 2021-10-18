import * as app from "../app.js"
import client from "../app/client.js"
import {AudioPlayerStatus} from "@discordjs/voice"

export default new app.Command({
  botOwnerOnly:true,
  name: "yamete",
  description: "The yamete command",
  channelType: "all",
  async run(message) {
    // return message.send("yamete command is not yet implemented.")
    const connection = client.join(
      message,
      "../../media/sounds/yamete.mp3"
    )!
    if(!connection) {message.send("join error"); return}
    return connection.player.on(AudioPlayerStatus.Idle, () => {
      connection.voiceConnection.destroy()
    })
  },
})
