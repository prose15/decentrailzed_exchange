import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import HomePage from "./components/HomePage";
import TranscationHistory from "./components/TranscationHistory";
import Main from "./components/Main";

function App() {
  return (
    <div>
    <BrowserRouter>
     <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/login"element={<Auth/>}/>
        <Route path="/homepage" element={<HomePage/>}/>
        <Route path="/transcation-history" element={<TranscationHistory/>}/>
      </Routes>
    </BrowserRouter>

  </div>
  );
}

export default App;
