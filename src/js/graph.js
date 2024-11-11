import { ApolloClient,createHttpLink, InMemoryCache } from '@apollo/client/core' 
// import { HttpLink } from '' 
// import { InMemoryCache } from 'apollo-cache-inmemory' 
import gql from 'graphql-tag'
// let data = require('./data.mjs')
import data_obj from './data-obj.js';  



const httpLink = createHttpLink({
    // You should use an absolute URL here
    uri: 'http://localhost:3000/graphql',
  })
  export let scema = gql`
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
    
`
let resolvers = {
  query: {
      RecordWorld: (parent, args) =>{

      },
      currentUser: (parent,args) =>{
        return data_obj.users.find(el => el.user_id = args.id)
      },
      HistoryGamesByUser: (args) =>{
        return data_obj.GameStory.filter((el, i) => el.user_id = args.id)
      }
  },
  User: {
    historyGame: (parent) => {
      return data_obj.GameStory.filter(el => el.userid == parent.user_id)
    }
  },
  Mutation: {
    AddGameRecord: (parent, {content}) => {
      let gameRecord = {
          id: content.id,
          time: content.time,
          user_id: content.user_id,
          record: content.record
      }
      data_obj.GameStory.push(gameRecord);
      return data_obj.GameStory;
    }
  }
}
export let apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    typeDefs: scema,
    resolvers: resolvers,
    
  })
  



  


