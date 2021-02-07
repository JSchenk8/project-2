import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

//! The search page of our SPA. Once a user has input a title or actor, this is the page which is displayed. 
//! If title is selected, all movies which contain a title are displayed (for example: 'matrix' returns all the films in the trilogy)
//! If actor is selected, all films by this actor are displayed. 

export default function Search({ location }) {
  //* State to hold the search results and actor ID
  const [results, updateResults] = useState([])
  const [actorID, updateActorID] = useState(null)

  let input = location.state.inputState
  input = input.replace(' ', '-').toLowerCase()
  //* This receives the 'option' from the dropdown on the home page and turns it into the keywords for the API. 
  function declareOption() {
    if (location.state.optionState === 'title') {

      return 'movie'
    } else {

      return 'person'
    }

  }
  const option = declareOption()
  useEffect(() => {
    //* For title, only one fetch is required
    if (option === 'movie') {
      axios.get(`https://api.themoviedb.org/3/search/${option}?query=${input}&api_key=${process.env.apikey}`)
        .then(({ data }) => {
          if (data.results.length === 0) {
            updateResults(['error'])
          } else {
            updateResults(data.results)
          }

        })
    }
    //* However, if a person is searched, first the actor is fetched, and from this their ID is input to a second fetch to get their 
    //* full list of credits.
    if (option === 'person') {
      axios.get(`https://api.themoviedb.org/3/search/${option}?query=${input}&api_key=${process.env.apikey}`)
        .then(({ data }) => {
          if (data.results.length === 0) {
            updateResults(['error'])
          } else {
            updateResults(data.results)
            updateActorID(data.results[0].id)
          }
        })
    }

  }, [])
  useEffect(() => {

    axios.get(`https://api.themoviedb.org/3/person/${actorID}/movie_credits?api_key=${process.env.apikey}`)
      .then(({ data }) => {
        updateResults(data.cast.slice(0, 19))
        console.log(data)
        console.log(data.cast.slice(0, 19))
      })
  }, [actorID])

  //* The display for the results. A bulma column container is used to hold card images for each poster. 
  //* Each poster is itself a link which will take the user onto the 'results' page. 
  //* A class of 'grow3' is added to animate the cards, so that on :hover the image grows. 
  return <div className='container'>
    <div className='columns is-multiline'>{results.map((result, index) => {
      return <div key={index} className='column is-one-fifth card-image grow3'>
        <Link to={result === 'error' ? { pathname: '/project-2/' } : {
          pathname: '/project-2/result/',
          state: { resultState: result.id }
        }} >
          <figure className='image is-2by3'>
            <img src={result === 'error' ? 'https://media.tenor.com/images/d57147e39135ab74561300b307ca3a60/tenor.gif' : `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${result.poster_path}`} />
          </figure>
        </Link>
      </div>
    })}
    </div>
  </div >


}