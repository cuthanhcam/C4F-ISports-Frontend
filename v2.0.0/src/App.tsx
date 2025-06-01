import { Routes, Route} from "react-router-dom";
import { appRoutes } from "./routes/Routes";
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "./routes/PrivateRoute";
import DashBoard from "./pages/dashboard/DashBoard";
import Profile from "./pages/dashboard/user/Profile/Profile";
import ViewProfile from "./pages/dashboard/user/Profile/ViewProfile";
import ChangePassword from "./pages/auth/ChangePassword";
import LoyaltyPoints from "./pages/dashboard/user/Profile/LoyaltyPoints";
import MainContent from "./pages/dashboard/admin/MainContent";
import ManagementYard from "./pages/dashboard/admin/ManagementYard";
import SetYard from "./pages/dashboard/admin/SetYard";
import Statistical from "./pages/dashboard/admin/Statistical";
import Setting from "./pages/dashboard/admin/Setting";
import Favorites from "./pages/dashboard/user/Profile/Favorites";
import DashBoardDetail from "./pages/dashboard/user/DashBoardDetail";


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
          <Route path="/dashboard" element={<PrivateRoute><DashBoard/></PrivateRoute>}>
            <Route index element={<MainContent/>}/>
            <Route path="management-yard" element={<ManagementYard/>}/>
            <Route path="set-yard" element={<SetYard/>}/>
            <Route path="statistical" element={<Statistical/>}/>
            <Route path="setting" element={<Setting/>}/>
          </Route>
          <Route path="/dashboard/:fieldId" element={<PrivateRoute><DashBoardDetail /></PrivateRoute>} />
          {/* User */}
          <Route path="/users" element={<PrivateRoute><Profile/></PrivateRoute>}>
            <Route path="profile" element={<ViewProfile/>}/>
            <Route path="change-password" element={<ChangePassword/>}/>
            <Route path="loyalty-points" element={<LoyaltyPoints/>}/>
            <Route path="favorites" element={<Favorites/>}/>
          </Route>
        </Routes>
        

    </div>
  );
};

export default App;
