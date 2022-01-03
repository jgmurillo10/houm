import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Home from './Pages/Home';
import Menu from './Components/Menu';
import Footer from './Components/Footer';
import Trending from './Pages/Trending';
import Recipe from './Pages/Recipe';

export default function BasicExample() {
  return (
    <Router>
      <div>
        <Menu/>
        <Box sx={{ backgroundColor: 'secondary.main' }}>
          <Container>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/recipes/:recipeId" element={<Recipe />} />
              <Route path="/trending" element={<Trending />}></Route>
            </Routes>
            </Container>
        </Box>
        <Footer/>
      </div>
    </Router>
  );
}
