import React, { useEffect, useRef, useState } from "react";
import "./NotesOpened.css";
import { useDispatch, useSelector } from "react-redux";
import InputContainer from "../InputContainer/InputContainer";
import { FaArrowLeft } from "react-icons/fa";
import { setAnyNotesOpened } from "../../slices/notesSlice";

const NotesOpened = () => {
  const lastMessageRef = useRef(null);

  const { anyNotesOpened, NotesOpened, groups, addButtonToggle } = useSelector(
    (store) => store.notes
  );

  const group =
    groups &&
    NotesOpened &&
    groups.find((group) => group.id === NotesOpened.id);

  const dispatch = useDispatch();

  const name = NotesOpened?.groupName;
  let icon =
    name?.split(" ").length > 1
      ? name?.split(" ")[0][0].toUpperCase() +
        name?.split(" ")[1][0].toUpperCase()
      : name && name[0].toUpperCase();

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [group]);

  const handleCloseChat = () => {
    dispatch(setAnyNotesOpened(false));
  };

  return (
    <div
      className={`notes-container  ${addButtonToggle ? "background-dim" : ""}`}
    >
      <div className={`notes-head  ${addButtonToggle ? "background-dim" : ""}`}>
        <button onClick={handleCloseChat} className="close-chat-btn">
          <FaArrowLeft />
        </button>
        <p
          className="icon"
          style={{ backgroundColor: `#${NotesOpened?.color}` }}
        >
          {icon}
        </p>
        <h1 className="group-name">
          {" "}
          {anyNotesOpened && NotesOpened?.groupName}
        </h1>
      </div>
      <div className="notes-messages">
        {group &&
          group?.AllNotes.filter((note) => note.message?.trim()).map(
            (eachNotes, index) => (
              <div
                className={`each-note  ${
                  addButtonToggle ? "background-blur" : ""
                }`}
                key={index}
                ref={
                  index ===
                  group.AllNotes.filter((note) => note.message?.trim()).length -
                    1
                    ? lastMessageRef
                    : null
                }
              >
                {eachNotes.message}
                <div className="date-time">
                  <p>{eachNotes.date}</p>• <p>{eachNotes.time}</p>
                </div>
              </div>
            )
          )}
      </div>
      <InputContainer />
    </div>
  );
};

export default NotesOpened;
