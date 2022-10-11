
import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Movies from './Movies';
import MovieDetail from './MovieDetail';
import Navbar from './Navbar'
import Home from './Home'
import TVShows from './TVShows';
function App() {
  return (
    <div className="App">   
      <Router>
        <Navbar />


        <Routes>
          <Route path="/home" element={<Home />} />

          <Route path="/movies" element={<Movies />} />
          <Route path="/tvshows" element={<TVShows />} />
          <Route path="/content-detail/:type/:id" element={<MovieDetail />} />


          <Route path="/" element={<Home />} />


        </Routes>


      </Router>
      <footer>
        Made with ❤️ in India
      </footer>
    </div>
  );
}

export default App;
