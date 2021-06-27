const { ApolloServer, gql } = require("apollo-server-lambda")
var faunadb = require("faunadb")
var q = faunadb.query

// res.set({
//   "Content-Type": "application/json",
//   "Access-Control-Allow-Origin": "*",
// });

const typeDefs = gql`
  type Query {
    bookmarks: [Bookmark]
  }
  type Bookmark {
    id: ID
    url: String!
    title: String!
  }
  type Mutation {
    addBookmark(url: String!, title: String!): Bookmark
  }
`

const todos = {}
let TodoIndex = 0

const resolvers = {
  Query: {
    bookmarks: async (root, args, context) => {
      try {
        var adminClient = new faunadb.Client({
          secret: "fnAEMuT4PGACCZ9JBAWUi7s6rUvgZ4fRhVWINH8w",
        })
        const result = await adminClient.query(
          q.Map(
            q.Paginate(q.Match(q.Index("url"))),
            q.Lambda(x => q.Get(x))
          )
        )
        console.log(result.data)
        return  result.data.Map(d=>{
         return{

           id: d.ts,
           title:d.data.title,
           url : d.data.url
          }
        })
      } catch (err) {
        console.log(err)
      }
      
    },
  },
  Mutation: {
    addBookmark: async(_, { url,title }) => {
      try {
        var adminClient = new faunadb.Client({
          secret: "fnAEMuT4PGACCZ9JBAWUi7s6rUvgZ4fRhVWINH8w",
        })
        const result = await adminClient.query(
          q.Create(
            q.Collection('bookmarks'),
            {
              data:{
               url,
               title
              }
            },
          )
        )
        return result.data
      } catch (err) {
        console.log(err)
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})


// exports.handler = server.createhandler()
const handler = server.createHandler()

module.exports = { handler }
