import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Tabledisplay from "./components/Tabledisplay";
import UserDetails from "./components/UserDetails";
import NewUserForm from "./components/NewUserForm";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Tabledisplay />} />
          <Route path="/details/:id" element={<UserDetails></UserDetails>} />
          <Route path="/create-user" element={<NewUserForm></NewUserForm>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
