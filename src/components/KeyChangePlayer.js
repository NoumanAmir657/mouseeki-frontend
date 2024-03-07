import { useState, useRef, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';
import '../styles/Accompaniment.css'

const KeyChangePlayer = ({waveFile, waveformRef, pitches, original}) => {
    const [play, setPlay] = useState(false)
    const wavesurferRef = useRef(null);
    const [focus, setFocus] = useState([false, false, false, false, true])    
    
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
                interact: false,
            });

            wavesurfer.load(URL.createObjectURL(waveFile));
            wavesurfer.setVolume(0)

            wavesurferRef.current = wavesurfer;
            
            return () => wavesurfer.destroy();
        }
    }, [waveFile, waveformRef]);

    const handlePlayPause = () => {
        if (!play) {
            original.start()
            for (let i = 0; i < pitches.length; ++i) {
                pitches[i].start();
            }
        }
        else {
            original.stop()
            for (let i = 0; i < pitches.length; ++i) {
                pitches[i].stop();
            }
        }
        setPlay(!play)
        wavesurferRef.current.playPause();
    };

    const handlePitchChange = (index) => {
        const newFocus = []
        for (let i = 0; i < pitches.length; ++i) {
            if (index === i) {
                pitches[i].volume.value = 0;
                newFocus.push(true)
            } else {
                pitches[i].volume.value = -Infinity;
                newFocus.push(false)
            }
        }

        if (index === 5) {
            original.volume.value = 0;
            newFocus.push(true)
        } else {
            original.volume.value = -Infinity;
            newFocus.push(false)
        }

        setFocus(newFocus)
    };

    return (
        <>
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
                    <div className="uploadWave" ref={waveformRef}/> 
                )}
                {!waveFile && (
                    <div className='playerLine'></div>
                )}
            </div>
            
            <div className='shift'>
                <div className={focus[0] ? `shiftBtn` : `aUploadSong`} onClick={() => handlePitchChange(0)}>Full Step Down</div>
                <div className={focus[1] ? `shiftBtn` : `aUploadSong`} onClick={() => handlePitchChange(1)}>Half Step Down</div>
            </div>

            <div style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '4vh'}} 
                className={focus[4] ? `shiftBtn` : `aUploadSong`} 
                onClick={() => handlePitchChange(5)}>
                Original
            </div>

            <div className='shift'>
                <div className={focus[2] ? `shiftBtn` : `aUploadSong`} onClick={() => handlePitchChange(2)}>Half Step Up</div>
                <div className={focus[3] ? `shiftBtn` : `aUploadSong`} onClick={() => handlePitchChange(3)}>Full Step Up</div>
            </div>

        </>
    )
}

export default KeyChangePlayer;