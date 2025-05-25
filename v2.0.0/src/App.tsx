import { Routes, Route} from "react-router-dom";
import { appRoutes } from "./routes/Routes";
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "./routes/PrivateRoute";
import Fields from "./pages/dashboard/user/fields";


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
          {/* Fields */}
          <Route path="/fields" element={<PrivateRoute><Fields/></PrivateRoute>}></Route>
          {/* User */}
        </Routes>
        

    </div>
  );
};

export default App;
