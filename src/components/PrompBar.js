import { useState } from "react";

const PromptBar = ({setSong}) => {
    const [prompt, setPrompt] = useState("")

    const handleSubmit = async () => {
        try {
            const JSZip = (await import('jszip')).default;
            const response = await fetch(`http://127.0.0.1:8000/api/textToMusic/?prompt=${prompt}`, {
                method: 'GET',
            });
            
            if (response.ok) {
                const blob = await response.blob();
          
                // Use jszip to extract files from the ZIP archive
                const zip = new JSZip();
                const zipFiles = await zip.loadAsync(blob);

                const musicFile = zipFiles.file('music.wav');
                const musicBlob = await musicFile.async('blob');
                const music = new File([musicBlob], 'music.wav', { type: 'audio/wav' });

                setSong(music)
            }
        }
        catch (error) {
            console.error('Error uploading audio:', error);
        }
    }

    return(
        <>
            <div className="promptBarDiv">
                <input 
                className="promptBar" 
                placeholder="Enter prompt here" 
                type="text"
                onChange={(event) => setPrompt(event.target.value)}/>
            </div>

            <div className='generateMusicBtn' onClick={handleSubmit}>Generate Music</div>
        </>
    )
}

export default PromptBar;