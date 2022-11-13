import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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
        <Route path="/note-app-local" element={<Navigate replace to="/" />} />
        <Route path="/" element={<NoteList />} />
        <Route path="/archives" element={<ArchiveList />} />
        <Route path="/note/:id" element={<NoteDetail />} />
        <Route path="/new" element={<AddNote />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
