import { Message, ChannelLogsQueryOptions, TextChannel, Channel, PartialDMChannel } from "discord.js"
import * as app from "../app.js"

async function lots_of_messages_getter(channel: TextChannel, limit = 500) {
  const sum_messages: Message[] = [];
  let last_id;

  while (true) {
      const options: ChannelLogsQueryOptions = { limit: 100 };
      if (last_id) {
          options.before = last_id;
      }

      const messages = await channel.messages.fetch(options);
      sum_messages.push(...messages.values());
      last_id = messages.last()?.id

      if (messages.size != 100 || sum_messages.length >= limit) {
          break;
      }
  }

  return sum_messages;
}

function validateText (channel: Channel | PartialDMChannel): channel is TextChannel {
  if(channel.type === "GUILD_TEXT") {
    return true
  }

  return false
}

export default new app.Command({
  userPermissions: ["MANAGE_MESSAGES"],
  name: "clear",
  description: "The clear command",
  channelType: "all",
  async run(message) {
    if(!validateText(message.channel)) {
      return
    }
    const member = message.mentions.members?.first()
    const messages = (await lots_of_messages_getter(message.channel)).filter(msg => {
      if(member) {
        return msg.member?.id === member.id
      }

      return true
    })

    message.channel.bulkDelete(messages)
    message.channel.send("successfuly clear " + messages.length + " messages")
  },
})
