import { Routes, Route } from "react-router-dom";
import { Home, ContactForm } from "./pages";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pb-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<ContactForm />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
