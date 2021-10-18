import discord, { Message, TextChannel } from "discord.js"
import {
  getVoiceConnection,
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  NoSubscriberBehavior,
} from "@discordjs/voice"

import { Player } from "discord-music-player"
import { dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))

import "dotenv/config"

const client = new (class customClient extends discord.Client {
  player = new Player(this)
  join(message: Message, audioPath?: string) {
    const channel = message.member?.voice.channel!
    const botChannel = message.guild?.me?.voice.channel
    if (botChannel?.id && channel.id !== botChannel.id) {
      message.channel.send("The bot is already in a voice channel")
      return
    }
    if (!channel?.id) {
      message.channel.send(
        "You need to be in a voiceChannel for using this command"
      )
      return
    }
    const voiceConnection =
      getVoiceConnection(message.guildId!) ||
      joinVoiceChannel({
        channelId: channel?.id,
        guildId: message.guildId!,
        // @ts-ignore
        adapterCreator: message.guild.voiceAdapterCreator,
      })
    const { player } = voiceConnection.subscribe(
      createAudioPlayer({
        behaviors: { noSubscriber: NoSubscriberBehavior.Pause },
      })
    )!
    if (audioPath) player.play(createAudioResource(__dirname + "/" + audioPath))
    return { voiceConnection, player }
  }
  leave(message: Message) {
    const connection = getVoiceConnection(message.guildId!)
    if (connection) {
      connection.destroy()
    } else {
      message.channel.send("The bot isn't in a voiceChannel")
    }
  }
  bulkDelete(channel: TextChannel, number?: number) {
    const bulkeDelete = new Promise<Message[]>(async (res, rej) => {
      const messages = [...(await channel.messages.fetch()).values()]
      messages.every(async (msg, i) => {
        await msg.delete()
        if (number)
          if (number === i) {
            res(messages)
            return false
          }
        if (i === messages.length - 1) {
          res(messages)
          return false
        }
        return true
      })
    })
    return bulkeDelete
  }
})({
  intents: process.env.BOT_INTENTS
    ? process.env.BOT_INTENTS.split(",").map(
        (intent) => discord.Intents.FLAGS[intent as discord.IntentsString]
      )
    : [],
})

export default client
