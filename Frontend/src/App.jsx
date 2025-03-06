import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AuthOptions from "./pages/AuthOptions";
import OTP from "./features/OTP";
import Keystroke from "./features/Keystroke";
import Audio from "./features/Audio";
import CaptchaAuth from "./features/CaptchaAuth";
import GestureAuth from "./features/GestureAuth";
import HomePage from "./pages/HomePage";
import AboutUs from "./pages/About";
import ContactCard from "./pages/Contact";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/authoptions" element={<AuthOptions />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactCard />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/keystroke" element={<Keystroke />} />
        <Route path="/captcha" element={<CaptchaAuth />} />
        <Route path="/audio" element={<Audio />} />
        <Route path="/pattern" element={<GestureAuth />} />
      </Routes>
    </Router>
  );
}

export default App;
