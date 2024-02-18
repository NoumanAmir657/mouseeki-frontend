import { WebVTTParser } from 'webvtt-parser';
import '../styles/Karaoke.css';

const GenerateKaraoke = ({song, setInstrumental, setLyrics, setWords}) => {
    const handleSend = async () => {
        const formData = new FormData();
        formData.append('audioFile', song);

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
        <div className='generateKaraokeBtn' onClick={handleSend}>Generate Karaoke</div>
    )
}

export default GenerateKaraoke;