import * as app from "../app.js"
import client from "../app/client.js"

export default new app.Command({
  name: "play",
  description: "The play command",
  channelType: "all",
  async run(message) {
    let guildQueue = client.player.getQueue(message.guildId!);
    let queue = client.player.createQueue(message.guildId!);
    await queue.join(message.member?.voice.channel!);
    let song = (await queue.play(message.args[0]).catch(e => {
      console.log(e);
      if(!guildQueue)
          queue.stop();
  }))!;
    return message.send(`playing ${song.name}`)
  }
})