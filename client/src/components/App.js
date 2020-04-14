import React from 'react';
import {BrowserRouter as Router, Route, BrowserRouter} from 'react-router-dom'

import Landing from './pages/Landing';
import About from './pages/About';
import Shop from './pages/shop';
import Header from './Header';
import Chatbot from './chatbot';

const App = () => {
  return (
    <BrowserRouter>
    <div>
      <Header />
      <Route exact path="/" component={Landing} />
      <Route exact path="/about" component={About} />
      <Route exact path="/shop" component={Shop} />
      <Chatbot />
    </div>
    </BrowserRouter>
  )
}

export default App;