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
import Trending from './Pages/Trending';
import Recipe from './Pages/Recipe';

export default function BasicExample() {
  return (
    <Router>
      <div>
        <Menu/>
        <Box sx={{ backgroundColor: 'secondary.main' }}>
          <Container maxWidth="lg">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/recipes/:recipeId" element={<Recipe />} />
              <Route path="/trending" element={<Trending />}></Route>
            </Routes>
            </Container>
        </Box>
      </div>
    </Router>
  );
}
