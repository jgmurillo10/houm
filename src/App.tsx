import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Menu from './Components/Menu';
import Footer from './Components/Footer';

const Home = lazy(() => import('./Pages/Home'));
const Recipe = lazy(() => import('./Pages/Recipe'));
const Trending = lazy(() => import('./Pages/Trending'));
const Fallback = (
  <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    We are getting ready for you...
  </div>
);

export default function BasicExample() {
  return (
    <Router>
      <Suspense fallback={Fallback}>
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
      </Suspense>
    </Router>
  );
}
