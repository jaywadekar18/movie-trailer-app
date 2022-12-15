
import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Movies from '../src/Pages/Movies';
import MovieDetail from '../src/Pages/MovieDetail';
import Navbar from '../src/Components/Navbar'
import Home from '../src/Pages/Home'
import TVShows from '../src/Pages/TVShows';
import Search from '../src/Pages/Search';
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tvshows" element={<TVShows />} />
          <Route path="/content-detail/:type/:id" element={<MovieDetail />} />
          <Route path="/search/:keyword" element={<Search />} />
       
        </Routes>
      </Router>
      <footer>
        Made with ❤️ in India
      </footer>
    </div>
  );
}

export default App;
