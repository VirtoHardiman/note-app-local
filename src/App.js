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
        <Route path="/note-app-local" element={<NoteList />} />
        <Route path="/note-app-local/archives" element={<ArchiveList />} />
        <Route path="/note-app-local/note/:id" element={<NoteDetail />} />
        <Route path="/note-app-local/new" element={<AddNote />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
