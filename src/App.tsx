import { Routes, Route } from "react-router";
import Home from "./Pages/Home.tsx";
import Contact from "./Pages/Contact.tsx";
import Services from "./Pages/Services.tsx";
import SignUp from "./Pages/SignUp.tsx";
import Register from "./Pages/Register.tsx";
import FloatingMenu from "./Components/Layout/FloatingMenu.tsx";
const App = () => {
  return (
    <div className='overflow-hidden'>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/services" element={<Services/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
      <FloatingMenu/>
    </div>
  )
}

export default App
