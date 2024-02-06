import { Link } from 'react-router-dom';
import '../styles/SideBar.css';
import SideBarItem from './SideBarItem';

const BGFOCUSCOLOR = '#F6654B26'
const FONTFOCUSCOLOR = '#F6654B'
const BGCOLOR = '#FFF'
const FONTCOLOR = '#ACACAC'

const SideBar = ({items, setItems}) => {
    const handleClick = (index) => {
        const newItems = []
        for (let i = 0; i < items.length; ++i) {
            newItems[i] = {...items[i], backgroundColor: BGCOLOR, color: FONTCOLOR, src: items[i].src.replace('_focus', '')}
        }
        newItems[index] = {...newItems[index], backgroundColor: BGFOCUSCOLOR, color: FONTFOCUSCOLOR, src: newItems[index].src.replace('.svg', '_focus.svg')}
        setItems(newItems)
    }

    return (
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
    )
}

export default SideBar;