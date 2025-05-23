import { Routes, Route} from "react-router-dom";
import { appRoutes } from "./routes/Routes";
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {appRoutes.map((route) => (
          <Route 
            key={route.id} 
            path={route.path} 
            element={<route.component/>} 
          />
        ))}
        </Routes>
    </div>
  );
};

export default App;
