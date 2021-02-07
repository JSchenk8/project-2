import React from 'react'

//! A simple about page, describing ourselves and our project. 
// ? Links at the bottom give access to our Github profiles, opening in new tabs.
export default function About() {


  return <div className='box has-text-centered' >
    <div className='content'>
      <p> We are Clement Knox and Joseph Schenk, two junior software engineers.
<br /><br />
          As part of the General Assembly Software Engineering Immersive course, we were given 48 hours to create a React single page application using a public API.
<br /><br />
            We chose the Movies Data Base as a great freely available API and chose to offer users the chance to search for movies by title and by actor. From there, they could pick similar movie titles or return to the start to search again.  We also chose to integrate a New York Times review API to give the option for users to navigate to their website and read full reviews of each movie.
<br /><br />
              Styled using SCSS/Sass and the Bulma framework, we added custom animations and a responsive design.
<br /><br />
                If you enjoyed our website, please check out our portfolios and Github pages, linked below.
<br /><br />
                  Many thanks,
<br /><br />
        <a target='_blank' href='https://github.com/clem-code'>Clement</a> and <a target='_blank' href='https://github.com/JSchenk8'>Joseph</a></p>
    </div >
  </div>

}