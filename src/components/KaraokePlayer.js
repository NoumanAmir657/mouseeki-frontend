import { useState, useRef, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';
import '../styles/Karaoke.css'

const KaraokePlayer = ({waveFile, waveformRef, lyrics, words, pitches, original}) => {
    const [play, setPlay] = useState(false)
    const [volume, setVolume] = useState(1)
    const [rex, setRex] = useState("")
    const wavesurferRef = useRef(null);
    const [focus, setFocus] = useState([false, false, false, false, true])    
    
    useEffect(() => {
        if (waveFile) {
            const wavesurfer = WaveSurfer.create({
            container: waveformRef.current,
            waveColor: '#E0E0E0',
            progressColor: '#FFD88B',
            responsive: true,
            barWidth: 2,
            barRadius: 10,
            barGap: 2,
            height: 30,
            barHeight: 0,
            });

            wavesurfer.load(URL.createObjectURL(waveFile));
            wavesurfer.setVolume(0)

            wavesurfer.on('timeupdate', (currentTime) => {
                let re = ''
                for (let i = 0; i < lyrics.length; i++) {
                    if (currentTime > lyrics[i].startTime && currentTime < lyrics[i].endTime) {
                        for (let k = 0; k < words.length; ++k) {
                            if (words[k].endTime > lyrics[i].endTime) {break}
                            if (words[k].startTime >= lyrics[i].startTime && words[k].endTime <= lyrics[i].endTime) {
                                if (currentTime > words[k].startTime && currentTime < words[k].endTime) {
                                    re += `<span style="color: #F6654B;">` + words[k].text + `</span> ` 
                                }
                                else {
                                    re += `<span>` + words[k].text + `</span> `
                                }
                            }
                        }
                        setRex(re)
                        break;
                    }
                }
            })

            wavesurferRef.current = wavesurfer;
            
            return () => wavesurfer.destroy();
        }
    }, [waveFile, waveformRef]);

    const handleWaveformClick = (event) => {
        wavesurferRef.current.seekTo(event.nativeEvent.offsetX / waveformRef.current.clientWidth)
        for (let i = 0; i < pitches.length; ++i) {
            pitches[i].seek(wavesurferRef.current.getDuration() * (event.nativeEvent.offsetX / waveformRef.current.clientWidth))
        }
        original.seek(wavesurferRef.current.getDuration() * (event.nativeEvent.offsetX / waveformRef.current.clientWidth))
    }

    const handleVolumeChange = (event) => {
        const newVolume = parseFloat(event.target.value);
        setVolume(newVolume);
        wavesurferRef.current.setVolume(newVolume);
    };

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
        <div className='player' style={{backgroundColor: '#F6654B'}}>
            <div className='playPause'> 
                {play && (
                    <img src='play_orange.svg' width='100%' height='100%' alt='pause' onClick={handlePlayPause}></img>
                )}
                {!play && (
                    <img src='pause_orange.svg' width='100%' height='100%' alt='pause' onClick={handlePlayPause}></img>
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
                    className='slider2'
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                />
            </div>
        </div>
        
        <div style={{display: 'flex', marginLeft: '16%'}}>
                <div className={focus[0] ? `focusBtn` : `unFocusBtn`} onClick={() => handlePitchChange(0)}>1 Down</div>
                <div className={focus[1] ? `focusBtn` : `unFocusBtn`} onClick={() => handlePitchChange(1)}>1/2 Down</div>

                <div className={focus[4] ? `focusBtn` : `unFocusBtn`} onClick={() => handlePitchChange(5)}>Original</div>

                <div className={focus[2] ? `focusBtn` : `unFocusBtn`} onClick={() => handlePitchChange(2)}>1/2 Up</div>
                <div className={focus[3] ? `focusBtn` : `unFocusBtn`} onClick={() => handlePitchChange(3)}>1 Up</div>
        </div>

        <div className='lyricsContainer'>
            <div dangerouslySetInnerHTML={{ __html: rex }} />
        </div>
            

        </>
    )
}

export default KaraokePlayer;