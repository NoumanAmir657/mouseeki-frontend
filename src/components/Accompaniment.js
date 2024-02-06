import { useState, useRef } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import '../styles/Accompaniment.css';
import SideBar from './SideBar';
import Player from './Player';
import InstrumentSelection from './InstrumentSelection';
import GenerateAccompaniment from './GenerateAccompaniment';
import AccompanimentPlayer from './AccompanimentPlayer';

const Accompaniment = ({items, setItems}) => {
    const [melody, setMelody] = useState(null)
    const [instruments, setInstruments] = useState([false, false, false, false, false])
    const [accompaniment, setAccompaniment] = useState(null)
    const melodyRef = useRef(null)
    const accompanimentRef = useRef(null)

    const handleFileChange = (event) => {
        const selectedMelody = event.target.files[0];        
        if (selectedMelody) {
            if (!selectedMelody.name.match(/\.(mp3|wav)$/)) {
                setMelody(null)
                melodyRef.current.value = ''
                return;
            }
            setMelody(selectedMelody);
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
                <div className='frame1Container'>
                    <img src='frame_1.svg' width='97%' height='100%' alt='frame1'></img>
                </div>
                
                <input id='fileLoader' ref={melodyRef} type='file' onChange={handleFileChange}/>
                <div className='aUploadSong' onClick={() => document.getElementById('fileLoader').click()}>Upload Melody</div>

                {melody && (
                    <>
                        <Player waveFile={melody} waveformRef={melodyRef}/>
                        <InstrumentSelection instruments={instruments} setInstruments={setInstruments}/>
                        <GenerateAccompaniment instruments={instruments} melody={melody} setAccompaniment={setAccompaniment}/>
                        {accompaniment && (
                            <AccompanimentPlayer waveFile={accompaniment} waveformRef={accompanimentRef}/>
                        )}
                    </>  
                )}
            </div>
            <div className='activity'></div>
        </div>
        </HelmetProvider>
    )
}

export default Accompaniment