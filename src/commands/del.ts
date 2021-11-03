import * as app from "../app.js"
import dbtest from "../tables/dbtest.js"

export default new app.Command({
  name: "del",
  description: "The del command",
  channelType: "all",
  async run(message) {
    const data = () => dbtest.query.where("id", message.member?.id).first()
    await dbtest.query
      .update({ gold: (await data())?.gold! - parseInt(message.args[0]) })
      .where("id", message.member?.id)
    return message.send(`you have ${(await data())?.gold}`)
  },
})
