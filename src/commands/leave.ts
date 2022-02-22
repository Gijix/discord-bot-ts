import * as app from "../app.js"
import client from "../app/client.js"

export default new app.Command({
  userPermissions:["ADMINISTRATOR"],
  name: "leave",
  description: "The leave command",
  channelType: "all",
  async run(message) {
    // client.leave(message)
}})