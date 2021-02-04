import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, StaticRouter } from 'react-router-dom'
// import { StaticRouter } from 'react-router'


export default function Result({ location, history }) {

  const filmID = location.state.resultState
  console.log(location)
  const [movie, updateMovie] = useState({ poster_path: '' })
  const [similarMovies, updateSimilarMovies] = useState([])

  function fetchData(filmID) {


    axios.get(`https://api.themoviedb.org/3/movie/${filmID}?api_key=6be0f587527d60e02a3f3dcf2163bc43`)
      .then(({ data }) => {
        updateMovie(data)

      })
    axios.get(`https://api.themoviedb.org/3/movie/${filmID}/similar?api_key=6be0f587527d60e02a3f3dcf2163bc43`)
      .then(({ data }) => {
        updateSimilarMovies(data.results)
        console.log('this is similar movies', data.results)

      })

  }
  useEffect(() => {
    fetchData(filmID)
  }, [])


  return <div>
    <section>
      <div className='card'>
        <div className='card-image'>
          <figure className='image is-2by3'>
            <img id='main-image' src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`} />
          </figure>
        </div>
        <div className='card-content'>
          <div className='content'>
            <h2>{movie.title}</h2>
            <h3>{movie.tagline}</h3>
            <p>{movie.overview}</p>
            <p>Released: {movie.release_date}</p>
          </div>
        </div>
      </div>
    </section>
    <h3>Similar Movies</h3>
    <div className='container'>
      <div className='columns is-multiline'>
        {similarMovies.map((film, index) => {

          return <div key={index} className='column is-one-fifth'>
            <img onClick={() => {
              fetchData(film.id)
            }
            } src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${film.poster_path}`} />
          </div>
        })}
      </div>
    </div>


    <section>


    </section>
  </div>






}