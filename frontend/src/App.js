import Navbar from "./Components/Navbar";
import Home from "./Screens/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchPage from "./Screens/SearchPage";
import NotFound from "./Screens/NotFound";
import About from "./Screens/About";
import Terms from "./Screens/Terms";
import PrivacyPolicy from "./Screens/PrivacyPolicy";
import Footer from "./Components/Footer";
import Contact from "./Screens/Contact";

function App() {
  return (
    <div className="App bg-blue-gray-50">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/terms-and-conditions" element={<Terms />} />
          <Route exact path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route
            exact
            path="/search/:store/:keyword"
            element={<SearchPage />}
          />
          <Route exact path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
