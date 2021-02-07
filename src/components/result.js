import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, StaticRouter } from 'react-router-dom'
import { reverse } from 'lodash'

//! The Result component
//? Three states are held, the movie ID, an array of 'similar movies', and the review of the film

export default function Result({ location }) {

  const filmID = location.state.resultState
  //* States. Movie state has original values for poster path and release date to stop 
  //* render errors on first load (the page tries to render from undefined without these parameters).
  const [movie, updateMovie] = useState({ poster_path: '', release_date: '' })
  const [similarMovies, updateSimilarMovies] = useState([])
  const [filmReview, updateFilmReview] = useState({
    link: {
      url: ''
    }
  })

  function fetchData(filmID) {

    //* Fetch to get the single movie poster and details
    axios.get(`https://api.themoviedb.org/3/movie/${filmID}?api_key=${process.env.apikey}`)
      .then(({ data }) => {
        updateMovie(data)
        getReview(data.title.replace(/ /g, '_').toLowerCase())

      })
      //* Fetch to get the array of 'similar' movies
    axios.get(`https://api.themoviedb.org/3/movie/${filmID}/similar?api_key=${process.env.apikey}`)
      .then(({ data }) => {
        updateSimilarMovies(data.results)

      })



  }
  useEffect(() => {
    fetchData(filmID)
  }, [])
  
  function getReview(filmName) {
    //* Fetch to get the NYT Reviews
    axios.get(`https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=${filmName}&api-key=${process.env.nytapikey}
    `)
      .then(({ data }) => {

        if (!data.results) {
          updateFilmReview({
            link: {
              url: ''
            }
          })
        } else {
          updateFilmReview(_.reverse(data.results)[0])
        }

      })

  }

  //?  Top section produces the single movie display. Bulma 'columns' is used to have the poster cover one third of the screen
  //? centrally, and the text cover another third centrally. 
  //? The information itself is held within two cards, one for the poster, another for the text. 
  //? The text display uses the NYT API to provide a link to the full film review, along with a short summary. 
  //* The second section shows the display of 'similar movies'. Styled using Bulma's column display as an overall container, within
  //* it are individual img tags which display each movie poster.  
  return <div id='similarContainer'>

    <div className='columns has-text-centered' >
      <div className='column is-2'></div>
      <div className='card column is-4 '>
        <div className='card-image'>
          <figure className='image is-2by3'>
            <img src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`} />
          </figure>
        </div>
      </div>
      <div className='card column is-4 '>
        <div className='card-content'>
          <div className='content'>
            <h2>{movie.title}</h2>
            <h3>{movie.tagline}</h3>
            <p>{movie.overview}</p>
            <p><b>Released:</b> {movie.release_date.slice(0, 4)}</p>
            <p><b>What the <i>New York Times</i> said:</b><br /> {filmReview.summary_short}</p>
            <a href={filmReview.link.url} target='_blank'>Read the full review...</a>
          </div>
        </div>
      </div>
      <div className='column is-2'></div>
    </div>


    <div className='container has-text-centered m5 p3' >
      <div className='content'><h1>Similar Movies</h1></div>
      <div className='columns is-multiline'>
        {similarMovies.map((film, index) => {

          return <div key={index} className='column is-one-fifth grow3'>
            <img onClick={() => {
              fetchData(film.id); window.scrollTo(0, 0)
            }
            } src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${film.poster_path}`} />
          </div>
        })}
      </div>
    </div>
  </div>






}