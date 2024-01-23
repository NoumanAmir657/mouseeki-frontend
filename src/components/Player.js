import { useState, useRef, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';
import '../styles/Accompaniment.css'

const Player = ({waveFile, waveformRef}) => {
    const [play, setPlay] = useState(false)
    const [volume, setVolume] = useState(0.5)
    const wavesurferRef = useRef(null);
    
    useEffect(() => {
        if (waveFile) {
          const wavesurfer = WaveSurfer.create({
            container: waveformRef.current,
            waveColor: '#E0E0E0',
            progressColor: '#F6654B',
            responsive: true,
            barWidth: 2,
            barRadius: 10,
            barGap: 2,
            height: 30,
            barHeight: 0,
          });
    
          wavesurfer.load(URL.createObjectURL(waveFile));

          wavesurferRef.current = wavesurfer;
    
          return () => wavesurfer.destroy();
        }
    }, [waveFile, waveformRef]);

    const handlePlayPause = (event) => {
        setPlay(!play)
        wavesurferRef.current.playPause();
    };

    const handleWaveformClick = (event) => {
        wavesurferRef.current.seekTo(event.nativeEvent.offsetX / waveformRef.current.clientWidth)
    };

    const handleVolumeChange = (event) => {
        const newVolume = parseFloat(event.target.value);
        setVolume(newVolume);
        wavesurferRef.current.setVolume(newVolume);
    };

    return (
        <div className='player'>
            <div className='playPause'> 
                {play && (
                    <img src='play.svg' width='100%' height='100%' alt='pause' onClick={handlePlayPause}></img>
                )}
                {!play && (
                    <img src='pause.svg' width='100%' height='100%' alt='pause' onClick={handlePlayPause}></img>
                )}
            </div>
            
            {waveFile && (
                <div className="uploadWave" ref={waveformRef} onClick={(event) => handleWaveformClick(event)}/> 
            )}
            {!waveFile && (
                <div className='playerLine'></div>
            )}


            <div className='volumeControl'>
                <input
                    className='slider1'
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                />
            </div>
        </div>
    )
}

export default Player;