import { useState, useRef } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import SideBar from './SideBar';
import PromptBar from './PrompBar';
import AccompanimentPlayer from './AccompanimentPlayer';
import '../styles/TextToMusic.css'

const TextToMusic = ({items, setItems}) => {
    const [song, setSong] = useState(null);
    const songRef = useRef(null)
    return (
        <HelmetProvider>
        <div className='container'>
            <Helmet>
                <style>
                    {`
                        body {
                            overflow: hidden;
                        }
                    `}
                </style>
            </Helmet>

            <SideBar items={items} setItems={setItems}/>

            <div className='center'>
                <div className='frameContainer'>
                    <img src='frame_4.svg' width='97%' height='100%' alt='frame4'></img>
                </div>
            
            <PromptBar setSong={setSong}/>

            {song && (
                <>
                    <AccompanimentPlayer waveFile={song} waveformRef={songRef}/>
                </>
            )}

            {}
            </div>
            
            <div className='activity'></div>
        </div>
        </HelmetProvider>
    )
}

export default TextToMusic;