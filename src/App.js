import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import sideBarItems from './components/sideBarItems';
import Home from "./components/Home";
import Accompaniment from "./components/Accompaniment";
import SourceSeparator from "./components/SourceSeparator";
import Karaoke from "./components/Karaoke";
import TextToMusic from "./components/TextToMusic";
// import KeyChange from "./components/KeyChange";

const BGFOCUSCOLOR = '#F6654B26'
const FONTFOCUSCOLOR = '#F6654B'
const BGCOLOR = '#FFF'
const FONTCOLOR = '#ACACAC'

const App = () => {
  let url = window.location.href.split('/')
  let link = '/' + url[url.length - 1]

  const newItems = []
  for (let i = 0; i < sideBarItems.length; ++i) {
      newItems[i] = {...sideBarItems[i], backgroundColor: BGCOLOR, color: FONTCOLOR, src: sideBarItems[i].src.replace('_focus', '')}
      if (newItems[i].link === link){
        newItems[i] = {...newItems[i], backgroundColor: BGFOCUSCOLOR, color: FONTFOCUSCOLOR, src: newItems[i].src.replace('.svg', '_focus.svg')}
      }
  }

  const [items, setItems] = useState(newItems)
  
  return(
    <Router>
      <Routes>
        <Route path='/accompaniment' element={<Accompaniment items={items} setItems={setItems}/>}/>
        <Route path='/sourceSeparation' element={<SourceSeparator items={items} setItems={setItems}/>}/>
        <Route path='/karaoke' element={<Karaoke items={items} setItems={setItems}/>}/>
        {/* <Route path='/keyChange' element={<KeyChange items={items} setItems={setItems}/>}/> */}
        <Route path='/textToMusic' element={<TextToMusic items={items} setItems={setItems}/>}/>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </Router>
  )
}

export default App;
