import { useEffect, useState, useRef } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import * as Tone from 'tone';
import SideBar from './SideBar';
import '../styles/KeyChange.css';
import KeyChangePlayer from './KeyChangePlayer';

const PITCHCHANGE = [-2, -1, 1, 2];

const KeyChange = ({items, setItems}) => {
    const [audio, setAudio] = useState(null)
    // const [audioFile, setAudioFile] = useState(null);
    const [pitches, setPitches] = useState([]);
    const [original, setOriginal] = useState(null);
    const waveformRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setAudio(file)
        const reader = new FileReader();
        reader.onload = async (event) => {
        const audioBuffer = await Tone.context.decodeAudioData(event.target.result);

        const audioPlayer = new Tone.Player(audioBuffer).toDestination();
        setOriginal(audioPlayer);

        const newPitches = [];
        for (let i = 0; i < 4; ++i) {
            newPitches.push(new Tone.Player(audioBuffer).toDestination());
        }

            setPitches(newPitches);
        };
        reader.readAsArrayBuffer(file);
    };

    useEffect(() => {
        if (pitches.length !== 0 && original) {
            original.volume.value = 0;

            for (let i = 0; i < pitches.length; ++i) {
                pitches[i].volume.value = -Infinity;
                let pitchShift = new Tone.PitchShift(PITCHCHANGE[i]).toDestination();
                pitches[i].disconnect();
                pitches[i].connect(pitchShift);
            }
        }
    }, [pitches, original]);

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
                
                <input id='fileLoader' accept="audio/*" ref={waveformRef} type='file' onChange={handleFileChange}/>
                <div className='aUploadSong' onClick={() => document.getElementById('fileLoader').click()}>Upload Song</div>
                
                {audio && original && pitches.length !== 0 && (
                    <>
                        <KeyChangePlayer waveFile={audio} waveformRef={waveformRef} pitches={pitches} original={original}/>
                    </>
                )}



            </div>
            <div className='activity'></div>
        </div>
        </HelmetProvider>
    );
};

export default KeyChange;
