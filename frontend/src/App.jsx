import { Route, Routes } from "react-router";
import Background from "./pages/Background";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthHeader from "./components/Header";


function App() {
  return (
    <>
    <AuthHeader/>
    <Routes>
      <Route path="/" element={<Background/>}/>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>} />
    </Routes>
    </>
  );
}

export default App;
