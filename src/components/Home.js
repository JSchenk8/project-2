import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Home() {



  //! Movie Covers Display
  // ? This state holds an array of paths to give our twelve posters on the home page. 
  // ? The API provides 500 pages of 'popular movie' posters, so we use a random number
  // ? to generate a different set of twelve posters every time the page loads.
  const [moviePosterURLs, updatemoviePosterURLs] = useState([])

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?page=${Math.floor(Math.random() * 500) + 1}&api_key=${process.env.apikey}`)
      .then(({ data }) => {
        // * Update State with first 12 posters.
        updatemoviePosterURLs(data.results.slice(0, 12))
        console.log(data)
        console.log(data.results)

      })
  }, [])

  // ! This function displays the twelve posters on the home page
  // ? Each poster is a bulma component 'card' with the correct aspect ratio
  // ? The class 'shadow' gives it the background shadow
  // ? It is run inside of a 'columns' class, to display correctly. 
  const createRandomMoviePosters = () => {
    return moviePosterURLs.map((movie, index) => {

      return <div key={movie.id} className={index % 2 === 0 ? 'column is-2-desktop is-4-tablet is-6-mobile grow' : 'column is-2-desktop is-4-tablet is-6-mobile grow2'}>

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

  // ! Display the background posters. 
  return <div className='blueBackground'>

    <div className='columns is-multiline'>{createRandomMoviePosters()}<Search /></div>
  </div>

}

//! The key component to the home page, the search function
//? The search bar updates the state 'input' to save the value the user has typed
//? The dropdown bar updates the state 'option' to save whether the user is looking for an actor or title
//? The search button activates a react router 'link' to open the search component page and pass it the state
//? for input and dropdown. 
function Search() {
  const [input, updateInput] = useState('')
  const [option, updateOption] = useState('title')
  useEffect(() => {
    console.log(input, option)
  }, [input])
  console.log(option)
  return <div className='box has-text-centered' id='search-box'>
    <div className='content'>
      <div>
        <input className='input is-rounded p-2' id='input-size' onKeyUp={(event) => updateInput(event.target.value)} type='text' placeholder='What are you searching for?' />
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

}

