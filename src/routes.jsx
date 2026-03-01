import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Filme from "./pages/Filme/Filme";
import Header from "./components/Header/Header";
import Erro from "./pages/Erro/Erro";
import Favoritos from "./pages/Favoritos/Favoritos";
import Footer from "./components/Footer/Footer";

function RoutesApp() {
  return (
    <BrowserRouter>
      {/* layout container to keep footer at bottom */}
      <div className="layout">
        <Header />
        <div className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/filme/:id" element={<Filme />} />
            <Route path="/favoritos" element={<Favoritos />} />

            <Route path="*" element={<Erro />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
export default RoutesApp;
