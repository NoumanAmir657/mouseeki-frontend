import "../styles/Accompaniment.css";

const GenerateSources = ({song, setVocals, setInstrumental, setDrums, setBass}) => {
    const handleSend = async () => {
        const formData = new FormData();
        formData.append('audioFile', song);

        try {
            // Dynamic import of jszip
            const JSZip = (await import('jszip')).default;
            const response = await fetch('http://127.0.0.1:8000/api/sourceSeparate/', {
                method: 'POST',
                body: formData,
            });
        
            if (response.ok) {
                const blob = await response.blob();
        
                // Use jszip to extract files from the ZIP archive
                const zip = new JSZip();
                const zipFiles = await zip.loadAsync(blob);

                const vocalsFile = zipFiles.file('vocals.wav')
                const vocalsBlob = await vocalsFile.async('blob');
                const vocals = new File([vocalsBlob], 'vocals.wav', { type: 'audio/wav' });

                const insFile = zipFiles.file('others.wav')
                const insBlob = await insFile.async('blob');
                const ins = new File([insBlob], 'others.wav', { type: 'audio/wav' });

                const drumsFile = zipFiles.file('drums.wav')
                const drumsBlob = await drumsFile.async('blob');
                const drums = new File([drumsBlob], 'drums.wav', { type: 'audio/wav' });

                const bassFile = zipFiles.file('bass.wav')
                const bassBlob = await bassFile.async('blob');
                const bass = new File([bassBlob], 'bass.wav', { type: 'audio/wav' });

                setInstrumental(ins)
                setVocals(vocals)
                setDrums(drums)
                setBass(bass)
                
            } else {
                console.error('Error processing audio:', response.statusText);
            }
        } catch (error) {
            console.error('Error uploading audio:', error);
        }
    };

    return (
        <div className='generateSourcesBtn' onClick={handleSend}>Generate Sources</div>
    )
}

export default GenerateSources;