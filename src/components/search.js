import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Search({ match, search, location }) {
  const [results, updateResults] = useState([])
  const [actorID, updateActorID] = useState(null)

  let input = location.state.inputState
  input = input.replace(' ', '-').toLowerCase()

  function declareOption() {
    if (location.state.optionState === 'title') {

      return 'movie'
    } else {

      return 'person'
    }

  }
  const option = declareOption()
  useEffect(() => {

    if (option === 'movie') {
      axios.get(`https://api.themoviedb.org/3/search/${option}?query=${input}&api_key=6be0f587527d60e02a3f3dcf2163bc43`)
        .then(({ data }) => {
          updateResults(data.results)
        })
    }
    if (option === 'person') {
      axios.get(`https://api.themoviedb.org/3/search/${option}?query=${input}&api_key=6be0f587527d60e02a3f3dcf2163bc43`)
        .then(({ data }) => {
          updateResults(data.results)
          updateActorID(data.results[0].id)
        })
    }
    // if(location.state === 'actor')
  }, [])
  useEffect(() => {

    axios.get(`https://api.themoviedb.org/3/person/${actorID}/movie_credits?api_key=6be0f587527d60e02a3f3dcf2163bc43`)
      .then(({ data }) => {
        updateResults(data.cast.slice(0, 19))
        console.log(data)
        console.log(data.cast.slice(0, 19))
      })
  }, [actorID])

  return <div className='container'>
    <div className='columns is-multiline'>{results.map((result, index) => {
      return <div key={index} className='column is-one-fifth card-image'>
        <Link to={{
          pathname: '/project-2/result/',
          state: { resultState: result.id }
        }} >
          <figure className='image is-2by3'>
            <img src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${result.poster_path}`} />
          </figure>
        </Link>
      </div>
    })}
    </div>
  </div>


}