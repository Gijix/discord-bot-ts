import * as app from "../app.js"

export interface Dbtest {
  id:string,
  gold:number
}

export default new app.Table<Dbtest>({
  name: "dbtest",
  description: "The dbtest table",
  setup: (table) => {
    table.increments("id").unique().primary()
    table.integer("gold")
    // setup table columns => http://knexjs.org/#Schema-Building
  },
})