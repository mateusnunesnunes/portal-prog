import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Editor from "./pages/Editor";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import Exercicios from "./pages/Exercicios";
import { Container } from "./styles/GlobalStyles";
import Perfil from "./pages/Perfil";
import Ranking from "./pages/Ranking";

function App() {
  return (
    <div>
      <Router>
        <Sidebar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/editor/:id" element={<Editor />} />
            <Route path="/login" element={<Login />} />
            <Route path="/exercicios" element={<Exercicios />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/ranking" element={<Ranking />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
}

export default App;
