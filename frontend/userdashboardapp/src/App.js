import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Tabledisplay from "./components/Tabledisplay";
import EditPage from "./components/EditPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Tabledisplay />} />
        <Route path="/edit/:userId" element={<EditPage />} />
      </Routes>
    </Router>
  );
}

export default App;
