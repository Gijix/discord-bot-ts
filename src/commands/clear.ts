import * as app from "../app.js"

export default new app.Command({
  userPermissions:["MANAGE_MESSAGES"],
  name: "clear",
  description: "The clear command",
  channelType: "all",
  async run(message) {
    // return message.send("clear command is not yet implemented.")
    const bulkeDelete = new Promise(async(res,rej)=> {
      const messages = [...((await message.channel.messages.fetch()).values())]
      messages.forEach(async(msg,i) =>{
        await msg.delete()
        if(i === messages.length - 1) res(messages)
      })
      

    })
    await bulkeDelete
    message.channel.send("TextChannel successfuly clear")
      
    
    
  },
})
