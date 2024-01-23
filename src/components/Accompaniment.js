import { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
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
            newItems[i] = {...items[i], backgroundColor: BGCOLOR, color: FONTCOLOR, src: items[i].src.replace('_focus', '')}
        }
        newItems[index] = {...newItems[index], backgroundColor: BGFOCUSCOLOR, color: FONTFOCUSCOLOR, src: newItems[index].src.replace('.svg', '_focus.svg')}
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
                <div className='logoOrange'>
                    <Link to='/'>
                        <img src='logo_orange.svg' width='90%' height='90%' alt='logo'></img>
                    </Link>
                </div>
                <div className='items'>
                    {items.map((item, index) => (
                        <SideBarItem key={index} item={item} index={index} handleClick={handleClick}/>
                    ))}
                </div>
            </div>

            <div className='center'>
                <div className='frame1Container'>
                    <img src='frame_1.svg' width='97%' height='100%' alt='frame1'></img>
                </div>

                <div className='aUploadSong'>Upload Song</div>
            </div>
            <div className='activity'></div>
        </div>
        </HelmetProvider>
    )
}

export default Accompaniment