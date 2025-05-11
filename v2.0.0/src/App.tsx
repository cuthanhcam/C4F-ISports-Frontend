import { Routes, Route } from "react-router-dom";
import { appRoutes } from "./routes/Routes";
import './App.css';

const App = () => {
  return (
    <div>
      <Routes location={location}>
            {appRoutes.map((route) => (
              <Route 
                key={route.id} 
                path={route.path} 
                element={<route.component />} 
              />
            ))}
        </Routes>
    </div>
  );
};

export default App;
