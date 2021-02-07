import React from 'react'
import { Link } from 'react-router-dom'


//! Navbar component, nested at the top of all pages so that it appears throughout the SPA
//? Contains two react router 'links' to open the home page or the about page. 
//? Styled using Bulma's 'navbar' classes. 

export default function NavBar() {


  return <div>
    <nav className='navbar m2 p2' role='navigation'>
      <div className='navbar-brand'>
        <div className='navbar-item'>
          <Link to={'/project-2/'}>Home</Link>
        </div>
        <div className='navbar-item'>
          <Link to={'/project-2/about'}>About</Link>
        </div>
      </div>
    </nav>
  </div>

}