import { useState, useEffect, useRef } from 'react';
import '../styles/SourceSeparator.css';
import WaveSurfer from 'wavesurfer.js';

const Sources = ({allRef, vocalsRef, instrumentalRef, drumsRef, bassRef, song, vocals, instrumental, drums, bass}) => {
    const wavesurferRefVocals = useRef(null)
    const wavesurferRefInstrumental = useRef(null)
    const wavesurferRefSong = useRef(null)
    const wavesurferRefDrums = useRef(null)
    const wavesurferRefBass = useRef(null)
    const [vocalsVol, setVocalsVol] = useState(0.5)
    const [instrumentalVol, setInstrumentalVol] = useState(0.5)
    const [drumsVol, setDrumsVol] = useState(0.5)
    const [bassVol, setBassVol] = useState(0.5)
    const [play, setPlay] = useState(false)

    useEffect(() => {
        if (song) {
          // Initialize WaveSurfer
          const wavesurfer = WaveSurfer.create({
            container: allRef.current,
            waveColor: '#E0E0E0',
            progressColor: '#FFD88B',
            responsive: true,
            barWidth: 2,
            barRadius: 10,
            barGap: 2,
            height: 30,
            barHeight: 0,
          });
    
          wavesurfer.load(URL.createObjectURL(song));
          wavesurfer.setVolume(0)
          
          wavesurferRefSong.current = wavesurfer;

          // Clean up on component unmount
          return () => wavesurfer.destroy();
        }
    }, [song]);

    useEffect(() => {
        if (vocals) {
          // Initialize WaveSurfer
          const wavesurfer = WaveSurfer.create({
            container: vocalsRef.current,
            waveColor: '#E0E0E0',
            progressColor: '#FFD88B',
            responsive: true,
            barWidth: 2,
            barRadius: 10,
            barGap: 2,
            height: 30,
            barHeight: 0,
          });
    
          wavesurfer.load(URL.createObjectURL(vocals));
          wavesurfer.setVolume(vocalsVol)

          wavesurferRefVocals.current = wavesurfer;
    
          // Clean up on component unmount
          return () => wavesurfer.destroy();
        }
    }, [vocals]);

    useEffect(() => {
        if (instrumental) {
          // Initialize WaveSurfer
          const wavesurfer = WaveSurfer.create({
            container: instrumentalRef.current,
            waveColor: '#E0E0E0',
            progressColor: '#FFD88B',
            responsive: true,
            barWidth: 2,
            barRadius: 10,
            barGap: 2,
            height: 30,
            barHeight: 0,
          });
    
          wavesurfer.load(URL.createObjectURL(instrumental));
          wavesurfer.setVolume(instrumentalVol)

          wavesurferRefInstrumental.current = wavesurfer;
    
          // Clean up on component unmount
          return () => wavesurfer.destroy();
        }
    }, [instrumental]);

    useEffect(() => {
        if (drums) {
          // Initialize WaveSurfer
          const wavesurfer = WaveSurfer.create({
            container: drumsRef.current,
            waveColor: '#E0E0E0',
            progressColor: '#FFD88B',
            responsive: true,
            barWidth: 2,
            barRadius: 10,
            barGap: 2,
            height: 30,
            barHeight: 0,
          });
    
          wavesurfer.load(URL.createObjectURL(drums));
          wavesurfer.setVolume(drumsVol)

          wavesurferRefDrums.current = wavesurfer;
    
          // Clean up on component unmount
          return () => wavesurfer.destroy();
        }
    }, [drums]);

    useEffect(() => {
        if (bass) {
          // Initialize WaveSurfer
          const wavesurfer = WaveSurfer.create({
            container: bassRef.current,
            waveColor: '#E0E0E0',
            progressColor: '#FFD88B',
            responsive: true,
            barWidth: 2,
            barRadius: 10,
            barGap: 2,
            height: 30,
            barHeight: 0,
          });
    
          wavesurfer.load(URL.createObjectURL(bass));
          wavesurfer.setVolume(bassVol)

          wavesurferRefBass.current = wavesurfer;
    
          // Clean up on component unmount
          return () => wavesurfer.destroy();
        }
    }, [bass]);

    const handlePlayPause = (event) => {
        if (wavesurferRefVocals.current && wavesurferRefInstrumental.current && wavesurferRefSong.current && wavesurferRefDrums.current && wavesurferRefBass.current) {
            setPlay(!play)
            wavesurferRefVocals.current.playPause();
            wavesurferRefInstrumental.current.playPause();
            wavesurferRefDrums.current.playPause();
            wavesurferRefBass.current.playPause();
            wavesurferRefSong.current.playPause();
        }
    };

    const handleAllClick = (event) => {
        wavesurferRefSong.current.seekTo(event.nativeEvent.offsetX / allRef.current.clientWidth)
        wavesurferRefVocals.current.seekTo(event.nativeEvent.offsetX / allRef.current.clientWidth)
        wavesurferRefInstrumental.current.seekTo(event.nativeEvent.offsetX / allRef.current.clientWidth)
        wavesurferRefDrums.current.seekTo(event.nativeEvent.offsetX / allRef.current.clientWidth)
        wavesurferRefBass.current.seekTo(event.nativeEvent.offsetX / allRef.current.clientWidth)
    }

    const handleVocalsVol = (event) => {
        const newVolume = parseFloat(event.target.value);
        setVocalsVol(newVolume);
        wavesurferRefVocals.current.setVolume(newVolume);
    };

    const handleInstrumentalVol = (event) => {
        const newVolume = parseFloat(event.target.value);
        setInstrumentalVol(newVolume);
        wavesurferRefInstrumental.current.setVolume(newVolume);
    };

    const handleDrumsVol = (event) => {
        const newVolume = parseFloat(event.target.value);
        setDrumsVol(newVolume);
        wavesurferRefDrums.current.setVolume(newVolume);
    };

    const handleBassVol = (event) => {
        const newVolume = parseFloat(event.target.value);
        setBassVol(newVolume);
        wavesurferRefBass.current.setVolume(newVolume);
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
                
                <div className="uploadWave" ref={allRef} onClick={(event) => handleAllClick(event)}/> 
                
                <div style={{display: 'none'}}>
                    <div ref={vocalsRef}/>
                </div>
                <div style={{display: 'none'}}>
                    <div ref={instrumentalRef}/>
                </div>
                <div style={{display: 'none'}}>
                    <div ref={drumsRef}/>
                </div>
                <div style={{display: 'none'}}>
                    <div ref={bassRef}/>
                </div>
            </div>

            <div className='volumeContainer'>
                <div className='control'>
                    <img src='control.svg' width='100%' height='100%' alt='logo'></img>
                </div>

                <div className='volumes'>
                    <div className='volume'>
                        <div style={{width: '10%'}}>Vocals</div>
                        <div className='controlsVolume'>
                            <input
                                className='slider2'
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={vocalsVol}
                                onChange={handleVocalsVol}
                            />  
                        </div>
                    </div>
                    <div className='volume'>
                        <div style={{width: '10%'}}>Bass</div>
                        <div className='controlsVolume'>
                            <input
                                className='slider2'
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={bassVol}
                                onChange={handleBassVol}
                            />  
                        </div>
                    </div>
                    <div className='volume'>
                        <div style={{width: '10%'}}>Drums</div>
                        <div className='controlsVolume'>
                            <input
                                className='slider2'
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={drumsVol}
                                onChange={handleDrumsVol}
                            />  
                        </div>
                    </div>
                    <div className='volume'>
                        <div style={{width: '10%'}}>Other</div>
                        <div className='controlsVolume'>
                            <input
                                className='slider2'
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={instrumentalVol}
                                onChange={handleInstrumentalVol}
                            />  
                        </div>
                    </div>
                </div>
            </div>
    </>
    )
}

export default Sources;