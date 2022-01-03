import Hero from './../../Components/Hero';
import PanelSearch from './../../Components/PanelSearch';
import './Home.css';
//TODO(jgmurillo10): Refactor cards container.

function Home() {
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
