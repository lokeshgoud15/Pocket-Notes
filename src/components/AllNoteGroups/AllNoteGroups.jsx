import React, { useEffect, useState } from "react";
import "./AllNoteGroups.css";
import { useDispatch, useSelector } from "react-redux";
import { setAnyNotesOpened, setNotesOpened } from "../../slices/notesSlice";

const AllNoteGroups = () => {
  const { groups, anyNotesOpened, NotesOpened } = useSelector(
    (store) => store.notes
  );
  const [selectedGroup, setSelectedGroup] = useState("");
  const dispatch = useDispatch();

  const handleNotesOpen = (id) => {
    setSelectedGroup(id);
    dispatch(setAnyNotesOpened());
    dispatch(setNotesOpened(id));
  };
  useEffect(() => {
    if (anyNotesOpened && NotesOpened) {
      setSelectedGroup(NotesOpened.id);
    } else {
      setSelectedGroup("");
      dispatch(setAnyNotesOpened());
      dispatch(setNotesOpened(null));
    }
  }, [anyNotesOpened, NotesOpened]);

  return (
    <div className="container">
      <div className="all-groups">
        {groups &&
          groups?.map((each, index) => {
            const name = each.groupName;

            let icon =
              name?.split(" ").length > 1
                ? name?.split(" ")[0][0].toUpperCase() +
                  name?.split(" ")[1][0].toUpperCase()
                : name && name[0].toUpperCase();

            return (
              <div
                onClick={() => handleNotesOpen(each.id)}
                key={index}
                className={`each-group ${
                  selectedGroup === each.id ? "selected" : ""
                }`}
              >
                <div
                  style={{ backgroundColor: `#${each.color}` }}
                  className="icon"
                >
                  {icon}
                </div>

                <div className="notes-name">{each.groupName}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AllNoteGroups;
