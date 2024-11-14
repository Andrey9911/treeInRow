var { createHandler } = require("graphql-http/lib/use/express")
var { buildSchema } = require("graphql")
var express = require("express");
var fs = require('fs');
var sys = require('sys');
var path = require('path');

 
// The root provides a resolver function for each API endpoint
var root = {
  hello() {
    return "Hello world!"
  },
}
 
var schema = buildSchema(`
    type Query {
      RecordWorld: [GameStory]
      currentUser(user_id: ID!): User
      HistoryGamesByUser(id: String!): [GameStory]
    }
    type Mutation {
          AddGameRecord(id:Int!, user_id: Int!, score: Int!, time: Int!): [GameStory]
        }

  type User {
    user_id: ID!
    username: String!
    historyGame: [GameStory]
  }

  type GameStory {
    id: ID!
    time: String!
    user_id: Int
    record: Int
  }

`)
var app = express();
app.use(express.static(path.join(__dirname, '../../docs')));
app.get('/', function(req, res){
  res.render('../../docs/index.html');
});
 
// // Create and use the GraphQL handler.
// app.all(
//   "/graphql",
//   createHandler({
//     schema: schema,
//   })
// )
 
// Start the server at port
app.listen(8000)
console.log("Running a GraphQL API server at http://localhost:3000/graphql")