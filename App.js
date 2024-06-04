import Home from "./src/screens/home";
import { useState } from "react";
import AddNote from "./src/screens/addNote";
import EditNote from "./src/screens/editNote";

function CurrentPageWidget({
  currentPage,
  noteList,
  setCurrentPage,
  addNote,
  itemEdited,
  setItemEdited,
  editNote,
  deleteNote,
}) {
  switch (currentPage) {
    case "home":
      return (
        <Home
          noteList={noteList}
          setCurrentPage={setCurrentPage}
          setItemEdited={setItemEdited}
          deleteNote={deleteNote}
        />
      );
    case "add":
      return <AddNote setCurrentPage={setCurrentPage} addNote={addNote} />;
    case "edit":
      return (
        <EditNote
          setCurrentPage={setCurrentPage}
          itemEdited={itemEdited}
          editNote={editNote}
        />
      );

    default:
      return <Home />;
  }
}

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [noteList, setNoteList] = useState([
    {
      id: 1,
      title: "Note pertama",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
  ]);
  const [itemEdited, setItemEdited] = useState({});

  function addNote(title, desc) {
    const id = noteList.length > 0 ? noteList[noteList.length - 1].id + 1 : 1;

    setNoteList([
      ...noteList,
      {
        id,
        title: title,
        desc: desc,
      },
    ]);
  }

  function editNote(id, title, desc) {
    const updatedNote = noteList.map((note) => {
      if (note.id === id) {
        note.title = title;
        note.desc = desc;
      }
      return note;
    });

    setNoteList(updatedNote);
  }
  function deleteNote(id) {
    const updatedNote = noteList.filter((note) => {
      return note.id != id;
    });

    setNoteList(updatedNote);
  }
  return (
    <CurrentPageWidget
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      noteList={noteList}
      addNote={addNote}
      setItemEdited={setItemEdited}
      itemEdited={itemEdited}
      editNote={editNote}
      deleteNote={deleteNote}
    />
  );
}