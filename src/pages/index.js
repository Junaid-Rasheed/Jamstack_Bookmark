import React, { useState, useEffect } from "react"
import { useQuery, useMutation } from "@apollo/client"
import gql from "graphql-tag"

const GET_BOOKMARK = gql`
  {
    bookmarks {
      id
      url
      title
    }
  }
`

const ADD_BOOKMARK = gql`
  mutation addBookmark($url: String!, $title: String!) {
    addBookmark(url: $url, title: $title) {
      id
    }
  }
`

export default function Home() {
  let Titlefield
  let Urlfield

  const { loading, error, data } = useQuery(GET_BOOKMARK)
  const [addBookmark] = useMutation(ADD_BOOKMARK)

  const handleSubmit = () => {
    // console.log(Titlefield.value)
    // console.log(Urlfield.value)
    addBookmark({
      variables: {
        url: Urlfield.value,
        title: Titlefield.value,
      },
      refetchQueries: [{ query: GET_BOOKMARK }],
    })
  }

  console.log(data)

  return (
    <div>
      <label>
        <h3>Enter BookMark Title</h3>
        <br />
        <input type="text" ref={node => (Titlefield = node)} />
      </label>
      <br />
      <label>
        <h3>Enter BookMark Url</h3>
        <br />
        <input type="text" ref={node => (Urlfield = node)} />
      </label>
      <br />
      <button onClick={handleSubmit}>Add BookMark</button>
    <p>What you are typing is stored is database 'BookMark' controlled by Junaid Rasheed</p>
    </div>
  )
}
