import '../styles/Accompaniment.css';

const SideBarItem = ({item, index, handleClick}) => {
    return (
        <div className='item' style={{backgroundColor: item.backgroundColor}} onClick={() => handleClick(index)}>
            <img src={item.src} width='9%' height='9%' alt='icon'></img>
            <div className='sidebarText' style={{color: item.color}}>
                {item.text}
            </div>
        </div>
    )
}

export default SideBarItem;