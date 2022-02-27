import { Message, ChannelLogsQueryOptions, TextChannel } from "discord.js"
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

export default new app.Command({
  userPermissions: ["MANAGE_MESSAGES"],
  name: "clear",
  description: "The clear command",
  channelType: "guild",
  async run(message) {
    const member = message.mentions.members?.first()
    let messages = (await lots_of_messages_getter(message.channel)).filter(msg => {
      if(member) {
        return msg.member?.id === member.id
      }

      return true
    })

    while (messages.length) {
      if(messages.length > 100) {
        let nextMessage = messages.slice(101)
        const deletedNumber = (await message.channel.bulkDelete(messages.slice(0,100))).size
        await message.channel.send("successfuly clear " + deletedNumber + " messages")
        messages = nextMessage
        continue
      }
      await message.channel.bulkDelete(messages)
      message.channel.send("successfuly clear " + messages.length + " messages")
      break
    }
    
  },
})
