import { useState, useRef } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import '../styles/SourceSeparator.css';
import SideBar from './SideBar';

const SourceSeparator = ({items, setItems}) => {
    const [song, setSong] = useState(null)
    const songRef = useRef(null)

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
                <div className='frame1Container'>
                    <img src='frame_2.svg' width='97%' height='100%' alt='frame1'></img>
                </div>
                
                <input id='fileLoader' ref={songRef} type='file' onChange={handleFileChange}/>
                <div className='aUploadSong' onClick={() => document.getElementById('fileLoader').click()}>Upload Song</div>
            </div>
            <div className='activity'></div>
        </div>
        </HelmetProvider>
    )
}

export default SourceSeparator;