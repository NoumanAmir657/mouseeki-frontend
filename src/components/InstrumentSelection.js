import "../styles/Accompaniment.css";

const InstrumentSelection = ({instruments, setInstruments}) => {
    const changeBackground = (index) => {
        const newIns = [...instruments]
        if (index === 0) {
            if (newIns[index] === false) {
                newIns[index] = newIns[3] || newIns[4] ? false : true
            }
            else {
                newIns[index] = false
            }
        }
        else if (index === 1) {
            newIns[index] = !newIns[index]
        }
        else if (index === 2) {
            newIns[index] = !newIns[index]
        }
        else if (index === 3) {
            if (newIns[index] === false) {
                newIns[index] = newIns[0] || newIns[4] ? false : true
            }
            else {
                newIns[index] = false
            }
        }
        else if (index === 4) {
            if (newIns[index] === false) {
                newIns[index] = newIns[0] || newIns[3] ? false : true
            }
            else {
                newIns[index] = false
            }
        }

        setInstruments(newIns)
    }

    return (
        <div className='instrumentSelection'>
            <div className='selectText'>
                Select<br></br>Instruments
            </div>
            <div className='instruments'>
                <div className='instrument' style={{backgroundColor: instruments[0] ? '#FFD88B' : "#FFF"}} onClick={() => changeBackground(0)}>
                    <img className='instrumentIcon' src='drums.svg' width='60%' height='60%' alt='icon'></img>
                    <br></br>
                    Drums
                </div>
                <div className='instrument' style={{backgroundColor: instruments[1] ? '#FFD88B' : "#FFF"}} onClick={() => changeBackground(1)}>
                    <img className='instrumentIcon' src='piano.svg' width='60%' height='60%' alt='icon'></img>
                    <br></br>
                    Piano
                </div>
                <div className='instrument' style={{backgroundColor: instruments[2] ? '#FFD88B' : "#FFF"}} onClick={() => changeBackground(2)}>
                    <img className='instrumentIcon' src='guitar.svg' width='60%' height='60%' alt='icon'></img>
                    <br></br>
                    Guitar
                </div>
                <div className='instrument' style={{backgroundColor: instruments[3] ? '#FFD88B' : "#FFF"}} onClick={() => changeBackground(3)}>
                    <img className='instrumentIcon' src='halftime.svg' width='60%' height='60%' alt='icon'></img>
                    <br></br>
                    Half
                </div>
                <div className='instrument' style={{backgroundColor: instruments[4] ? '#FFD88B' : "#FFF"}} onClick={() => changeBackground(4)}>
                    <img className='instrumentIcon' src='doubletime.svg' width='60%' height='60%' alt='icon'></img>
                    <br></br>
                    Double
                </div>
            </div>
        </div>
    )
}

export default InstrumentSelection