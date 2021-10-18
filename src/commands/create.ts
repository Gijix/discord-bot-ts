import * as app from "../app.js"
import dbtest from "../tables/dbtest.js"

export default new app.Command({
  name: "create",
  description: "The create command",
  channelType: "all",
  async run(message) {
    const data = async () =>  await dbtest.query.where("id",message.member?.id).first()
    if((await data())) return message.send("already create")
    await dbtest.query.insert({
      gold:0,
      id:message.member?.id
    })
    const gold = (await data())?.gold
    return message.send("you have  :"+gold)
  }
})