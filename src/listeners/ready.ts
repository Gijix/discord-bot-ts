import * as app from "../app.js"

const listener: app.Listener<'ready'> = {
    event:"ready",
    description:"event when the bot is ready",
    run : async(client) => {
        client.user.setPresence({
            status:"online",
            activities:[{
                name: `<${await app.prefix()}commandName>`,
                type: "WATCHING",
              }]
        })
       app.success("Esclave is ready")
    }

}
export default listener