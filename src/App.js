import Home from "./Home";
import Accompaniment from "./Accompaniment"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return(
    <Router>
      <Routes>
        <Route path='/accompaniment' element={<Accompaniment/>}/>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </Router>
  )
}

export default App;
