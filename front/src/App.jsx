import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import ProtectedRoute from "./components/ProtectedRoute"
import Home from "./pages/Home"
import SingleActualite from "./pages/SingleActu"
import Actualites from "./pages/Actualite"
import ConcoursDetails from "./pages/ConcoursDetail"
import MotPresidente from "./pages/MotPresidente"
import Comite from "./pages/comite"
import Organigramme from "./pages/Organnigramme"
import Clubs from "./pages/Clubs"
import SingleClub from "./pages/SingleClub"
import ActualiteForm from "./pages/ActualiteForm"
import Login from "./pages/Login"
import ClubForm from "./pages/clubForm"
import ClubEditForm from "./pages/ClubEditForm"
import CalendrierConcours from "./pages/CalendrierConcours"
import AdminConcoursForm from "./pages/ConcoursForm"
import AdminCreateChampionnat from "./pages/AdminCreateChampionnat"
import Championnats from "./pages/championnats"
import ChampionnatDetails from "./pages/ChampionnatsSingle"
import AdminAddJournee from "./pages/AdminCreateJournee"
import AdminAddRencontre from "./pages/AdminCreateRencontre"
import JourneeDetails from "./pages/JourneeSingle"
import Classement from "./pages/Classement"
import RechercheClubsLive from "./pages/RechercheClubsLive"


function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* 🌐 Routes publiques - Accessibles à tous */}
          <Route path="/" element={<Home/>} />
          <Route path="/actualite" element={<Actualites />} />
          <Route path="/actualite/:id" element={<SingleActualite />} />
          <Route path="/motpresidente" element={<MotPresidente />} />
          <Route path="/comite" element={< Comite />} />
          <Route path="/organigramme" element={< Organigramme />} />
          <Route path="/clubs" element={< Clubs />} />
          <Route path="/clubs/:id" element={< SingleClub />} />
          <Route path="/login" element={< Login />} />
          <Route path="/concours" element={<CalendrierConcours />} />
          <Route path="/concours/:id" element={<ConcoursDetails />} />
          <Route path="/championnats" element={<Championnats />} />
          <Route path="/championnat/:id" element={<ChampionnatDetails />} />
          <Route path="/journee/:id" element={<JourneeDetails />} />
          <Route path="/championnat/:id/classement" element={<Classement />} />
          <Route path="/rechercheClubs" element={<RechercheClubsLive />} />




          
          {/* 🔒 Routes protégées - Nécessitent une authentification admin */}
                  <Route path="/championnats/new" element={<ProtectedRoute requireAdmin={true}><AdminCreateChampionnat /></ProtectedRoute>} />
          <Route path="/admin/championnat/:id/add-journee" element={<ProtectedRoute requireAdmin={true}><AdminAddJournee /></ProtectedRoute>} /> 
          <Route path="/admin/journee/:id/add-rencontre" element={<AdminAddRencontre />} />

          <Route 
            path="/actualite/new" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <ActualiteForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/clubs/new" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <ClubForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/clubs/edit/:id" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <ClubEditForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/concours/new" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminConcoursForm />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
