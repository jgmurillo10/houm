import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Menu from './Components/Menu';
import Footer from './Components/Footer';
import { selectMeta } from './features/meta/metaSlice';
import { useAppSelector } from './app/hooks';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { MetadataI } from './common/types';

const Home = lazy(() => import('./Pages/Home'));
const Recipe = lazy(() => import('./Pages/Recipe'));
const Trending = lazy(() => import('./Pages/Trending'));
const Wishlist = lazy(() => import('./Pages/Wishlist'));

const Fallback = (
  <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    We are getting ready for you...
  </div>
);

export default function BasicExample() {
  const meta = useAppSelector(selectMeta) as MetadataI;
  const metaTitle = `${meta.title}${meta.subtitle ? ` | ${meta.subtitle}` : ''}`;

  return (
    <Router>
      <HelmetProvider>
        <Suspense fallback={Fallback}>
          <Helmet
            title={meta.title}
            titleTemplate={`%s | ${meta.subtitle}`}
            meta={[
              {
                  name: `description`,
                  content: meta.description,
              },
              {
                  property: `og:title`,
                  content: metaTitle,
              },
              {
                  property: `og:description`,
                  content: meta.description,
              },
              {
                  property: `og:type`,
                  content: `website`,
              },
              {
                  name: `twitter:card`,
                  content: `summary`,
              },
              {
                  name: `twitter:title`,
                  content: metaTitle,
              },
              {
                  name: `twitter:description`,
                  content: meta.description,
              },

              {
                property: `og:image`,
                content: meta.image,
              },
              {
                  property: `twitter:image`,
                  content: meta.image,
              },
            ]}
          />
          <Menu/>
          <Box sx={{ backgroundColor: 'secondary.main' }}>
            <Container>
              <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/recipes/:recipeId' element={<Recipe />} />
                <Route path='/trending' element={<Trending />}></Route>
                <Route path='/wishlist' element={<Wishlist />}></Route>
              </Routes>
              </Container>
          </Box>
          <Footer/>
        </Suspense>
      </HelmetProvider>
    </Router>
  );
}
