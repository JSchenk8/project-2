import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Home() {

  //state for input


  //! Movie Covers Display
  const [moviePosterURLs, updatemoviePosterURLs] = useState([])

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?page=${Math.floor(Math.random() * 500) + 1}&api_key=${process.env.apikey}`)
      .then(({ data }) => {
        updatemoviePosterURLs(data.results.slice(0, 12))
        console.log(data)
        console.log(data.results)

      })
  }, [])

  const createRandomMoviePosters = () => {
    return moviePosterURLs.map((movie) => {
      return <div key={movie.id} className='column is-2'>
        <div className='card shadow'>
          <div className='card-image'>
            <figure className='image is-2by3'>
              <img src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`} alt={movie.title} />
            </figure>
          </div>
        </div>
      </div>
    })
  }


  return <div className='blueBackground'>
    <Search />
    <div className='columns is-multiline'>{createRandomMoviePosters()}</div>
  </div>

}

function Search() {
  const [input, updateInput] = useState('')
  const [option, updateOption] = useState('title')
  useEffect(() => {
    console.log(input, option)
  }, [input])
  console.log(option)
  return <div className='modal is-active'>
    <div className='box has-text-centered'>
      <div className='modal-content'>
        <div>
          <input className='input is-rounded m-2' onKeyUp={(event) => updateInput(event.target.value)} type='text' placeholder='What are you searching for?' />
        </div>
        <div className='select is-rounded m-2'>
          <select onChange={(event) => updateOption(event.target.value)} >
            <option value='Title'>Title</option>
            <option value='Actor'>Actor</option>
          </select>
        </div>
        <Link to={{
          pathname: '/project-2/search/',
          state: { optionState: option, inputState: input }
        }}  ><button className='button is-rounded m-2'>Search!</button></Link>
      </div >
    </div>
  </div>
}

