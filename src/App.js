import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./route/PrivateRoute";
import api from "./utils/api"

function App() {
  const [user, setUser] = useState(null);
  
  const getUser = async () =>{
    try{
      const storedToken = sessionStorage.getItem("token");
      if(storedToken){
        const response = await api.get("/user/verify");
        console.log("🚀 ~ getUser ~ response:", response)
      }    
    }catch(error){

    }
  }

  useEffect(() => {
    getUser()
  },[])

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute user = {user}>
              <TodoPage />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
