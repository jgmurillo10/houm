import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from "./Pages/Home";
import Trending from "./Pages/Trending";
import Menu from "./Components/Menu";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

export default function BasicExample() {
  return (
    <Router>
      <div>
        <Menu/>
        <Box sx={{ backgroundColor: 'secondary.main' }}>
          <Container maxWidth="lg">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/trending" element={<Trending />}></Route>
            </Routes>
            </Container>
        </Box>
      </div>
    </Router>
  );
}
