import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, StaticRouter } from 'react-router-dom'
import { reverse } from 'lodash'


export default function Result({ location, history }) {

  const filmID = location.state.resultState
  console.log(location)
  const [movie, updateMovie] = useState({ poster_path: '' })
  const [similarMovies, updateSimilarMovies] = useState([])
  const [filmReview, updateFilmReview] = useState({
    link: {
      url: ''
    }
  })

  function fetchData(filmID) {


    axios.get(`https://api.themoviedb.org/3/movie/${filmID}?api_key=${process.env.apikey}`)
      .then(({ data }) => {
        updateMovie(data)
        getReview(data.original_title.replace(/ /g, '_').toLowerCase())

      })
    axios.get(`https://api.themoviedb.org/3/movie/${filmID}/similar?api_key=${process.env.apikey}`)
      .then(({ data }) => {
        updateSimilarMovies(data.results)
        console.log('this is similar movies', data.results)
      })



  }
  useEffect(() => {
    fetchData(filmID)
  }, [])
  ///NYT film review fetch 
  function getReview(filmName) {
    console.log('THIS IS BETTER FILMNAME', filmName)
    axios.get(`https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=${filmName}&api-key=${process.env.nytapikey}
    `)
      .then(({ data }) => {
        console.log('this is NYT review', data)
        updateFilmReview(_.reverse(data.results)[0])

      })

  }



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
            <p><b>Released:</b> {movie.release_date}</p>
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