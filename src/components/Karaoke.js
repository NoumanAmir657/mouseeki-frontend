import { useState, useRef } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import SideBar from './SideBar';
import KaraokePlayer from './KaraokePlayer';
import Player from './Player';
import GenerateKaraoke from './GenerateKaraoke';

const Karaoke = ({items, setItems}) => {
    const [song, setSong] = useState(null)
    const [instrumental, setInstrumental] = useState(null)
    const [words, setWords] = useState(null)
    const [lyrics, setLyrics] = useState(null)
    const songRef = useRef(null)
    const instrumentalRef = useRef(null)

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
                    <img src='frame_3.svg' width='97%' height='100%' alt='frame3'></img>
                </div>
                
                <input id='fileLoader' ref={songRef} type='file' onChange={handleFileChange}/>
                <div className='aUploadSong' onClick={() => document.getElementById('fileLoader').click()}>Upload Song</div>
                
                {song && (
                    <>
                        <Player waveFile={song} waveformRef={songRef}/>
                        <GenerateKaraoke song={song} setInstrumental={setInstrumental} setLyrics={setLyrics} setWords={setWords}/>
                        {instrumental && lyrics && words && (
                            <>
                                <KaraokePlayer waveFile={instrumental} waveformRef={instrumentalRef} lyrics={lyrics} words={words}/>
                            </>
                        )}
                    </>
                )}


            </div>
            <div className='activity'></div>
        </div>
        </HelmetProvider>
    )
}

export default Karaoke;
