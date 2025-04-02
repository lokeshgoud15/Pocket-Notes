import React, { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import MessageContainer from "./components/MessageContainer/MessageContainer";
import AddGroupInput from "./components/AddGroupInput/AddGroupInput";
import { useDispatch, useSelector } from "react-redux";
import NotesOpened from "./components/NotesOpened/NotesOpened";

const AppLayout = () => {
  const { addButtonToggle, anyNotesOpened } = useSelector(
    (store) => store.notes
  );

  const dispatch = useDispatch();

  return (
    <div className={`main-page ${addButtonToggle ? "blur-overlay" : ""}`}>
      <div className={`${anyNotesOpened}`}>
        <Sidebar />
      </div>
      {anyNotesOpened ? <NotesOpened /> : <MessageContainer />}

      {addButtonToggle && <AddGroupInput />}
    </div>
  );
};

export default AppLayout;
