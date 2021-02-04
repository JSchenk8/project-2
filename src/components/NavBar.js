import React from 'react'
import { Link } from 'react-router-dom'
//! Styling imports?

export default function NavBar() {


  return <div>
    <ul>
      <li>
        <Link to={'/project-2/home'}>Home</Link>
      </li>
    </ul>
  </div>

}