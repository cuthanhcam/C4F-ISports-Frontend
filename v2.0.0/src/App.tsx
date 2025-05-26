import { Routes, Route} from "react-router-dom";
import { appRoutes } from "./routes/Routes";
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "./routes/PrivateRoute";
import Fields from "./pages/dashboard/user/fields";
import Profile from "./pages/dashboard/user/Profile/Profile";
import ViewProfile from "./pages/dashboard/user/Profile/ViewProfile";


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
          <Route path="/users" element={<PrivateRoute><Profile/></PrivateRoute>}>
            <Route path="profile" element={<ViewProfile/>}/>
          </Route>


        </Routes>
        

    </div>
  );
};

export default App;
