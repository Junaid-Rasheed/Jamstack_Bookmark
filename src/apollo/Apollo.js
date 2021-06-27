import fetch from "cross-fetch"
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"


export const client = new ApolloClient({
  link: new HttpLink({
    uri: '/.netlify/functions/bookmark',
    fetch,
  }),
  cache:new InMemoryCache(),
})



//to add 'new' before INmemoryCache is compulsort otherwise will give error