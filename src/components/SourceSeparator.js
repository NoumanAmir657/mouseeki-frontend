import { useState, useRef } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import '../styles/SourceSeparator.css';
import SideBar from './SideBar';
import Player from './Player';
import GenerateSources from './GenerateSources';
import Sources from './Sources';

const SourceSeparator = ({items, setItems}) => {
    const [song, setSong] = useState(null)
    const songRef = useRef(null)
    
    const allRef = useRef(null)

    const [vocals, setVocals] = useState(null)
    const vocalsRef = useRef(null)

    const [instrumental, setInstrumental] = useState(null)
    const instrumentalRef = useRef(null)

    const [drums, setDrums] = useState(null)
    const drumsRef = useRef(null)

    const [bass, setBass] = useState(null)
    const bassRef = useRef(null)

    const handleFileChange = (event) => {
        const selectedSong = event.target.files[0];
        if (selectedSong) {
            if (!selectedSong.name.match(/\.(mp3|wav)$/)) {
                setSong(null)
                songRef.current.value = ''
                return;
            }
            setSong(selectedSong);
        }
    }

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
                    <img src='frame_2.svg' width='97%' height='100%' alt='frame1'></img>
                </div>
                
                <input id='fileLoader' ref={songRef} type='file' onChange={handleFileChange}/>
                <div className='aUploadSong' onClick={() => document.getElementById('fileLoader').click()}>Upload Song</div>

                {song && (
                    <>
                        <Player waveFile={song} waveformRef={songRef}/>
                        <GenerateSources 
                        song={song} 
                        setVocals={setVocals} 
                        setInstrumental={setInstrumental} 
                        setDrums={setDrums}
                        setBass={setBass}/>
                        
                        {vocals && instrumental && drums && bass && (
                            <Sources
                            allRef={allRef} 
                            vocalsRef={vocalsRef} 
                            instrumentalRef={instrumentalRef} 
                            drumsRef={drumsRef}
                            bassRef={bassRef} 
                            song={song} 
                            vocals={vocals} 
                            instrumental={instrumental}
                            drums={drums}
                            bass={bass}/>
                        )}

                    </>
                )}
            </div>
            <div className='activity'></div>
        </div>
        </HelmetProvider>
    )
}

export default SourceSeparator;