import { useState, useRef } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import '../styles/Accompaniment.css';
import SideBarItem from './SideBarItem';
import sideBarItems from './sideBarItems';
import Player from './Player';
import InstrumentSelection from './InstrumentSelection';
import GenerateAccompaniment from './GenerateAccompaniment';
import AccompanimentPlayer from './AccompanimentPlayer';

const BGFOCUSCOLOR = '#F6654B26'
const FONTFOCUSCOLOR = '#F6654B'
const BGCOLOR = '#FFF'
const FONTCOLOR = '#ACACAC'

const Accompaniment = () => {
    const [items, setItems] = useState(sideBarItems)
    const [melody, setMelody] = useState(null)
    const [instruments, setInstruments] = useState([false, false, false, false, false])
    const [accompaniment, setAccompaniment] = useState(null)
    const melodyRef = useRef(null)
    const accompanimentRef = useRef(null)

    const handleClick = (index) => {
        const newItems = []
        for (let i = 0; i < items.length; ++i) {
            newItems[i] = {...items[i], backgroundColor: BGCOLOR, color: FONTCOLOR, src: items[i].src.replace('_focus', '')}
        }
        newItems[index] = {...newItems[index], backgroundColor: BGFOCUSCOLOR, color: FONTFOCUSCOLOR, src: newItems[index].src.replace('.svg', '_focus.svg')}
        setItems(newItems)
    }

    const handleFileChange = (event) => {
        const selectedMelody = event.target.files[0];
        console.log(selectedMelody)
        
        if (selectedMelody) {
            // Check if the file is an mp3 or wav file
            if (!selectedMelody.name.match(/\.(mp3|wav)$/)) {
                setMelody(null)
                melodyRef.current.value = ''
                return;
            }
               
            // If all conditions are met, set the file
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

            <div className='sidebar'>
                <div className='logoOrange'>
                    <Link to='/'>
                        <img src='logo_orange.svg' width='90%' height='90%' alt='logo'></img>
                    </Link>
                </div>
                <div className='items'>
                    {items.map((item, index) => (
                        <SideBarItem key={index} item={item} index={index} handleClick={handleClick}/>
                    ))}
                </div>
            </div>

            <div className='center'>
                <div className='frame1Container'>
                    <img src='frame_1.svg' width='97%' height='100%' alt='frame1'></img>
                </div>
                
                <input id='fileLoader' ref={melodyRef} type='file' onChange={handleFileChange}/>
                <div className='aUploadSong' onClick={() => document.getElementById('fileLoader').click()}>Upload Song</div>

                {melody && (
                    <>
                        <Player waveFile={melody} waveformRef={melodyRef}/>
                        <InstrumentSelection instruments={instruments} setInstruments={setInstruments}/>
                        <GenerateAccompaniment instruments={instruments} melody={melody} setAccompaniment={setAccompaniment}/>
                    </>  
                )}

                {accompaniment && (
                    <AccompanimentPlayer waveFile={accompaniment} waveformRef={accompanimentRef}/>
                )}

            </div>
            <div className='activity'></div>
        </div>
        </HelmetProvider>
    )
}

export default Accompaniment