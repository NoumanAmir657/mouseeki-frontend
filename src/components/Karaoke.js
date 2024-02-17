import { useState, useRef, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { WebVTTParser } from 'webvtt-parser';
import SideBar from './SideBar';
import KaraokePlayer from './KaraokePlayer';
import Player from './Player';

const Karaoke = ({items, setItems}) => {
    const [song, setSong] = useState(null)
    const [instrumental, setInstrumental] = useState(null)
    const [words, setWords] = useState(null)
    const [lyrics, setLyrics] = useState(null)
    const songRef = useRef(null)
    const instrumentalRef = useRef(null)

    const handleSend = async (event) => {
        const formData = new FormData();
        formData.append('audioFile', event.target.files[0]);
        setSong(event.target.files[0])

        try {
            // Dynamic import of jszip
            const JSZip = (await import('jszip')).default;
            const response = await fetch('http://127.0.0.1:8000/api/karaokeInstrumental/', {
                method: 'POST',
                body: formData,
            });
        
            if (response.ok) {
                const blob = await response.blob();
        
                const zip = new JSZip();
                const zipFiles = await zip.loadAsync(blob);

                const insFile = zipFiles.file('no_vocals.wav')
                const insBlob = await insFile.async('blob');
                const ins = new File([insBlob], 'no_vocals.wav', { type: 'audio/wav' });

                const lyricsFile = zipFiles.file('lyrics.vtt')
                const vttText = await lyricsFile.async('text')

                const wordsFile = zipFiles.file('lyrics_words.vtt')
                const wordsText = await wordsFile.async('text')

                const parseVTT = (text) => {
                    const parser = new WebVTTParser();
                    const tree = parser.parse(text, 'metadata');
                    return tree.cues.map(x => {
                        const startTime = x.startTime
                        const endTime = x.endTime
                        const text = x.text
                        return {startTime, endTime, text}
                    })
                }
                
                setLyrics(parseVTT(vttText));
                setWords(parseVTT(wordsText))
                setInstrumental(ins)
                
            } else {
                console.error('Error processing audio:', response.statusText);
            }
        } catch (error) {
            console.error('Error uploading audio:', error);
        }
    };

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
                <input id='fileLoader' ref={songRef} type='file' onChange={handleSend}/>
                <div className='aUploadSong' onClick={() => document.getElementById('fileLoader').click()}>Upload Song</div>

                {instrumental && lyrics && words && (
                    <>
                        <Player waveFile={song} waveformRef={songRef}/>
                        <KaraokePlayer waveFile={instrumental} waveformRef={instrumentalRef} lyrics={lyrics} words={words}/>
                    </>
                )}
            </div>
            <div className='activity'></div>
        </div>
        </HelmetProvider>
    )
}

export default Karaoke;