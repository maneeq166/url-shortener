import { Route, Routes } from "react-router";
import Background from "./components/Background";


function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Background/>}/>
    </Routes>
    </>
  );
}

export default App;
