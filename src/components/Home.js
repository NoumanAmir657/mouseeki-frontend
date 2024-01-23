import { Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import '../styles/Home.css';

const Home = () => {
  return (
    <HelmetProvider>
    <>
    <div className='container'>
      <Helmet>
          <style>
              {`
                  body {
                      background-color: ${'#F6654B'};
                      overflow: hidden;
                  }
              `}
          </style>
      </Helmet>
    
      <div className='redHalf'>
        <div className='logo'>
          <img src='logo.svg' width='100%' height='100%' alt='logo'></img>
        </div>

        <div className='tag'>
          Meet Mouseeki<br></br> - your musical<br></br>playground!
        </div>

        <div className='line'>
          Create killer tunes, karaoke tracks, and guitar tabs<br></br> effortlessly.
          Change keys with a snap, turn text into<br></br> tunes, and dissect tracks like a music ninja.  
        </div>

        <div className='line2'>
          It's your all-in-one toolkit for epic musical adventures! 🚀
        </div>

        <Link to='/accompaniment' style={{textDecoration: 'none'}}>
            <div className='startButton'>
                Start Mouseeki!
            </div>
        </Link>

      </div>
      <div className='otherHalf'>
        <svg width="100%" height="100%" viewBox="0 0 999 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="746.164" cy="479.418" r="745.761" fill="#FFD88B"/>
        </svg>
        <div className='cuate'>
          <img src='./cuate.svg' width='100%' height='100%' alt='cuate'></img>
        </div>
      </div>
    </div>
    </>
    </HelmetProvider>
  )
}

export default Home;
