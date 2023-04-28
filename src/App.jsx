import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Recipes from "./features/Recipes"
import Footer from "./features/Footer"
import About from "./features/About"
import RecipeDetails from "./features/RecipeDetails"
import Auth from "./features/Auth/Auth";
import Nav from "./components/Nav/Nav";
import NotFound from "./components/NotFound/NotFound";
import { AuthContextProvider } from "./features/Auth/Auth.context";
import AddRecipeTwo from './features/AddRecipeTwo'
import EditRecipe from './features/EditRecipe'
import Home from './features/Home'


function App() {

  return (
    <Router>
      <AuthContextProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path='/about' element={<About />} />
          <Route path='/recipe/:id' element={<RecipeDetails />} />
          <Route path='/addrecipe' element={<AddRecipeTwo text='Add New Recipe' />} />
          <Route path='/recipe/:id/edit' element={<EditRecipe />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </AuthContextProvider>
    </Router >
  )
}

export default App
