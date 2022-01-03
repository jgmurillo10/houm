import { useEffect } from 'react';
import Hero from './../../Components/Hero';
import PanelSearch from './../../Components/PanelSearch';
import { setSubtitle } from './../../features/meta/metaSlice';
import { useAppDispatch } from './../../app/hooks';
import './Home.css';
//TODO(jgmurillo10): Refactor cards container.

const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSubtitle('Home'));
  }, [dispatch]);

  return (
    <>
      <Hero
        title={`Let's cook something together`}
        primary={{ text: 'Search recipes', url: '#search' }}
        secondary={{ text: 'Explore trending', url: '/trending' }}
      ></Hero>
      <PanelSearch />
    </>
  );
}

export default Home;
