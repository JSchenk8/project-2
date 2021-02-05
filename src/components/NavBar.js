import React from 'react'
import { Link } from 'react-router-dom'
//! Styling imports?

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