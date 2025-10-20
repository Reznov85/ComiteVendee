import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import SingleActualite from "./pages/SingleActu"
import Actualites from "./pages/Actualite"
import ConcoursDetails from "./pages/ConcoursDetail"
import MotPresidente from "./pages/MotPresidente"
import Comite from "./pages/comite"
import Organigramme from "./pages/Organnigramme"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/actualite" element={<Actualites />} />
        <Route path="/actualite/:id" element={<SingleActualite />} />
        <Route path="/motpresidente" element={< MotPresidente />} />
        <Route path="/comite" element={< Comite />} />
        <Route path="/organigramme" element={< Organigramme />} />



        


        <Route path="/concours/:id" element={<ConcoursDetails />} />
    




      </Routes>
    </BrowserRouter>
  )
}

export default App
