import * as app from "../app.js"
import client from "../app/client.js"

export default new app.Command({
  userPermissions:["ADMINISTRATOR"],
  name: "join",
  description: "The join command",
  channelType: "all",
  async run(message) {
    client.join(message)
  }
})