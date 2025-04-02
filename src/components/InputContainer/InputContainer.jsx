import React, { useEffect, useState } from "react";
import "./InputContainer.css";
import { useDispatch, useSelector } from "react-redux";
import { IoSendSharp } from "react-icons/io5";
import { setNewMessages } from "../../slices/notesSlice";
const InputContainer = () => {
  const { NotesOpened, addButtonToggle } = useSelector((store) => store.notes);

  const [newNotes, setNewNotes] = useState("");
  const [inputGreater, setInputGreater] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (!newNotes.trim()) return;

    const date = new Date();

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const amPm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const time = `${formattedHours}:${formattedMinutes} ${amPm}`;

    const day = date.getDate();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const formattedDate = `${day} ${month} ${year}`;

    const newNote = {
      id: crypto.randomUUID(),
      message: newNotes.trim(),
      time,
      date: formattedDate,
    };

    const groupId = NotesOpened.id;
    dispatch(setNewMessages({ groupId, newNotesInfo: newNote }));

    setNewNotes("");
    setInputGreater(false);
  };

  useEffect(() => {
    if (newNotes.length > 0) {
      setInputGreater(true);
    } else {
      setInputGreater(false);
    }
  }, [newNotes, NotesOpened, inputGreater]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  useEffect(() => {
    const updateInputGreater = () => {
      if (window.innerWidth < 451) {
        setInputGreater(true);
      } else {
        setInputGreater(newNotes.length > 0);
      }
    };
    updateInputGreater();
    window.addEventListener("resize", updateInputGreater);
    return () => window.removeEventListener("resize", updateInputGreater);
  }, [newNotes, inputGreater]);

  return (
    <div
      className={`notes-input-container  ${
        addButtonToggle ? "background-dim" : ""
      }`}
    >
      <input
        value={newNotes}
        onChange={(e) => setNewNotes(e.target.value)}
        onKeyDown={handleKeyDown}
        className="input-area"
        type="text"
        placeholder="Here's the sample text for sample work"
        name=""
        id=""
      />

      <IoSendSharp
        onClick={handleSubmit}
        style={{ color: inputGreater ? "#001f8b" : "" }}
        className="send-btn"
      />
    </div>
  );
};

export default InputContainer;
