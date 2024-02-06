import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import sideBarItems from './components/sideBarItems';
import Home from "./components/Home";
import Accompaniment from "./components/Accompaniment";
import SourceSeparator from "./components/SourceSeparator";

const App = () => {
  const [items, setItems] = useState(sideBarItems)
  
  useEffect(() => {
    let saved = localStorage.getItem('items')
    if (saved) {
      setItems(JSON.parse(saved))
    }
    else {
      setItems(sideBarItems)
    }
  }, [items])
  
  return(
    <Router>
      <Routes>
        <Route path='/accompaniment' element={<Accompaniment items={items} setItems={setItems}/>}/>
        <Route path='/sourceSeparation' element={<SourceSeparator items={items} setItems={setItems}/>}/>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </Router>
  )
}

export default App;
