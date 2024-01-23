import { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import '../styles/Accompaniment.css';
import SideBarItem from './SideBarItem';
import sideBarItems from './sideBarItems';

const BGFOCUSCOLOR = '#F6654B26'
const FONTFOCUSCOLOR = '#F6654B'
const BGCOLOR = '#FFF'
const FONTCOLOR = '#ACACAC'

const Accompaniment = () => {
    const [items, setItems] = useState(sideBarItems)

    const handleClick = (index) => {
        const newItems = []
        for (let i = 0; i < items.length; ++i) {
            newItems[i] = {...items[i], backgroundColor: BGCOLOR, color: FONTCOLOR}
        }
        newItems[index] = {...newItems[index], backgroundColor: BGFOCUSCOLOR, color: FONTFOCUSCOLOR}
        setItems(newItems)
    }

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

            <div className='sidebar'>
                <div className='logo'>
                    <img src='logo_orange.svg' width='100%' height='100%' alt='logo'></img>
                </div>
                <div className='items'>
                    {items.map((item, index) => (
                        <SideBarItem key={index} item={item} index={index} handleClick={handleClick}/>
                    ))}
                    {/* <div className='item' style={{backgroundColor: '#F6654B26'}}>
                        <img src='speaker.svg' width='9%' height='9%' alt='icon'></img>
                        <div className='sidebarText' style={{color: '#F6654B'}}>Accompaniment</div>
                    </div>
                    <div className='item' style={{backgroundColor: '#FFF'}}>
                        <img src='levels.svg' width='9%' height='9%' alt='icon'></img>
                        <div className='sidebarText' style={{color: '#ACACAC'}}>Source Separation</div>
                    </div>
                    <div className='item' style={{backgroundColor: '#FFF'}}>
                        <img src='t_m.svg' width='9%' height='9%' alt='icon'></img>
                        <div className='sidebarText' style={{color: '#ACACAC'}}>Text-to-Music</div>
                    </div>
                    <div className='item' style={{backgroundColor: '#FFF'}}>
                        <img src='mic.svg' width='9%' height='9%' alt='icon'></img>
                        <div className='sidebarText' style={{color: '#ACACAC'}}>Karaoke</div>
                    </div>
                    <div className='item' style={{backgroundColor: '#FFF'}}>
                        <img src='tabs.svg' width='9%' height='9%' alt='icon'></img>
                        <div className='sidebarText' style={{color: '#ACACAC'}}>Guitar Tabs</div>
                    </div>
                    <div className='item' style={{backgroundColor: '#FFF'}}>
                        <img src='music.svg' width='9%' height='9%' alt='icon'></img>
                        <div className='sidebarText' style={{color: '#ACACAC'}}>Key Change</div>
                    </div> */}
                </div>
            </div>
            <div className='center'></div>
            <div className='activity'></div>
        </div>
        </HelmetProvider>
    )
}

export default Accompaniment