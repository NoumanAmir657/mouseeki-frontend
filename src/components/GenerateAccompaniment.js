import "../styles/Accompaniment.css";

const GenerateAccompaniment = ({instruments, melody, setAccompaniment}) => {
    const handleSend = async () => {
        const selectedIns = []

        if (instruments[0]) {
            selectedIns.push('drums')
        }
        if (instruments[1]) {
            selectedIns.push('piano')
        }
        if (instruments[2]) {
            selectedIns.push('guitar')
        }
        if (instruments[3]) {
            selectedIns.push('half-time')
        }
        if (instruments[4]) {
            selectedIns.push('double-time')
        }

        if (selectedIns.length > 0) {
            const formData = new FormData();
            formData.append('instruments', JSON.stringify(selectedIns));
            formData.append('audioFile', melody);

            try {
                const JSZip = (await import('jszip')).default;
                const response = await fetch('http://127.0.0.1:8000/api/accompanimentGenerate/', {
                  method: 'POST',
                  body: formData,
                });
          
                if (response.ok) {
                  const blob = await response.blob();
          
                  // Use jszip to extract files from the ZIP archive
                  const zip = new JSZip();
                  const zipFiles = await zip.loadAsync(blob);

                  const accomFile = zipFiles.file('accompaniment.wav');
                  const accomBlob = await accomFile.async('blob');
                  const accom = new File([accomBlob], 'accompaniment.wav', { type: 'audio/wav' });

                  setAccompaniment(accom)
                  console.log(accom)
                } else {
                  console.error('Error processing audio:', response.statusText);
                }
            } catch (error) {
                console.error('Error uploading audio:', error);
            }
        }          
    };

    return (
        <div className='generateAccomBtn' onClick={handleSend}>Generate Accompaniment</div>
    )
}

export default GenerateAccompaniment;