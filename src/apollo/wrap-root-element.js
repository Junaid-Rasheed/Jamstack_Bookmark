import React from "react"
import { ApolloProvider } from "@apollo/client"
import { client } from "./Apollo"

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>
    {element}
  </ApolloProvider>
)

