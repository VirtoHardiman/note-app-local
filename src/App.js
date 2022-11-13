import { BrowserRouter, Routes, Route } from "react-router-dom";

import NoteDetail from "./pages/NoteDetail";
import NoteList from "./pages/NoteList";
import AddNote from "./pages/AddNote";
import NotFound from "./pages/NotFound";

import "./styles/App.css";
import Navbar from "./components/Navbar";
import ArchiveList from "./pages/ArchiveList";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route index path="/" element={<NoteList />} />
        <Route path="/archives" element={<ArchiveList />} />
        <Route path="/note/:id" element={<NoteDetail />} />
        <Route path="/new" element={<AddNote />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
