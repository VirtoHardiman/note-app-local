let notes = [
  {
    id: "note-1",
    title: "Babel",
    body: "Babel merupakan tools open-source yang digunakan untuk mengubah sintaks ECMAScript 2015+ menjadi sintaks yang didukung oleh JavaScript engine versi lama. Babel sering dipakai ketika kita menggunakan sintaks terbaru termasuk sintaks JSX.",
    createdAt: "2022-04-14T04:27:34.572Z",
    archived: false,
    color: "orange",
  },
  {
    id: "note-2",
    title: "Functional Component",
    body: "Functional component merupakan React component yang dibuat menggunakan fungsi JavaScript. Agar fungsi JavaScript dapat disebut component ia harus mengembalikan React element dan dipanggil layaknya React component.",
    createdAt: "2022-04-14T04:27:34.572Z",
    archived: false,
    color: "peachOrange",
  },
  {
    id: "note-3",
    title: "Modularization",
    body: "Dalam konteks pemrograman JavaScript, modularization merupakan teknik dalam memecah atau menggunakan kode dalam berkas JavaScript secara terpisah berdasarkan tanggung jawabnya masing-masing.",
    createdAt: "2022-04-14T04:27:34.572Z",
    archived: false,
    color: "greyGreen",
  },
  {
    id: "note-4",
    title: "Lifecycle",
    body: "Dalam konteks React component, lifecycle merupakan kumpulan method yang menjadi siklus hidup mulai dari component dibuat (constructor), dicetak (render), pasca-cetak (componentDidMount), dan sebagainya. ",
    createdAt: "2022-04-14T04:27:34.572Z",
    archived: false,
    color: "blue",
  },
  {
    id: "note-5",
    title: "ESM",
    body: "ESM (ECMAScript Module) merupakan format modularisasi standar JavaScript.",
    createdAt: "2022-04-14T04:27:34.572Z",
    archived: false,
    color: "purple",
  },
  {
    id: "note-6",
    title: "Module Bundler",
    body: "Dalam konteks pemrograman JavaScript, module bundler merupakan tools yang digunakan untuk menggabungkan seluruh modul JavaScript yang digunakan oleh aplikasi menjadi satu berkas.",
    createdAt: "2022-04-14T04:27:34.572Z",
    archived: false,
    color: "pink",
  },
];

const getAllNotes = () => {
  return notes.map((note) => ({ ...note, createdAt: showFormattedDate(note.createdAt) }));
};

const getNote = (id) => {
  const notes = getAllNotes();
  const foundedNote = notes.find((note) => note.id === id);
  if (!foundedNote) {
    return null;
  }
  return foundedNote;
};

const getActiveNotes = () => {
  const notes = getAllNotes();
  const activeNotes = notes.filter((note) => !note.archived);
  return activeNotes;
};

const getArchivedNotes = () => {
  const notes = getAllNotes();
  const archivedNotes = notes.filter((note) => note.archived);
  return archivedNotes;
};

const addNote = (title, body, color) => {
  notes = [
    ...notes,
    {
      id: `notes-${+new Date()}`,
      title,
      body,
      createdAt: new Date().toISOString(),
      archived: false,
      color,
    },
  ];
};

const deleteNote = (id) => {
  notes = notes.filter((note) => note.id !== id);
};

const archiveNote = (id) => {
  notes = notes.map((note) => {
    if (note.id === id) {
      return { ...note, archived: true };
    }
    return note;
  });
};

const unarchiveNote = (id) => {
  notes = notes.map((note) => {
    if (note.id === id) {
      return { ...note, archived: false };
    }

    return note;
  });
};

const editNote = (id, title, body) => {
  const noteToEdit = notes.find((note) => note.id === id);
  noteToEdit.title = title;
  noteToEdit.body = body;

  notes = notes.map((note) => {
    if (note.id === id) {
      return noteToEdit;
    }
    return note;
  });
};

const editNoteColor = (id, color) => {
  const noteToEdit = notes.find((note) => note.id === id);
  noteToEdit.color = color;

  notes = notes.map((note) => {
    if (note.id === id) {
      return noteToEdit;
    }
    return note;
  });
};

const searchNotes = (keyword, isActive) => {
  const notes = getAllNotes();
  if (isActive) {
    return notes.filter((note) => note.title.toLowerCase().includes(keyword.toLowerCase()) && !note.archived);
  }
  return notes.filter((note) => note.title.toLowerCase().includes(keyword.toLowerCase()) && note.archived);
};

const showFormattedDate = (date) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("en-US", options);
};

export { getAllNotes, getActiveNotes, getArchivedNotes, deleteNote, editNote, getNote, archiveNote, unarchiveNote, addNote, editNoteColor, showFormattedDate, searchNotes };
