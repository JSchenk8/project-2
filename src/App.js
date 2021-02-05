import React from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './components/Home'
import Search from './components/search'
import About from './components/about'
import Result from './components/result'
import './styles/style.scss'


const App = () => (
  <BrowserRouter >
    <NavBar />
    <Switch>
      <Route exact path="/project-2/home" component={Home} />
      <Route exact path="/project-2/search" component={Search} />
      <Route exact path="/project-2/result" component={Result} />
      <Route exact path="/project-2/about" component={About} />
    </Switch>
  </BrowserRouter >
)



export default App