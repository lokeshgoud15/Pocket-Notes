import React, { useEffect, useRef, useState } from "react";
import "./AddGroupInput.css";
import { useDispatch, useSelector } from "react-redux";
import { setAddButtonToggle, setGroups } from "../../slices/notesSlice";

const AddGroupInput = () => {
  const groups = useSelector((store) => store.notes.groups);
  let colors = ["b38bfa", "ff7972", "43e6fc", "f18576", "0047ff", "6691ff"];
  const { addButtonToggle } = useSelector((store) => store.notes);
  const [inputValue, setInputValue] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const dispatch = useDispatch();
  const [newGroup, setNewGroup] = useState({
    id: "",
    color: "",
    groupName: "",
    AllNotes: [],
  });
  const modalRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue || !selectedColor) {
      alert("Please provide a group name and select a color.");
      return;
    }
    const updatedGroup = {
      ...newGroup,
      color: selectedColor,
      id: crypto.randomUUID(),
      groupName: inputValue,
    };
    setNewGroup(updatedGroup);
    
    const isGroupExists = groups.filter(
      (each) =>
        each.groupName.toLowerCase() === updatedGroup.groupName.toLowerCase()
    );
    if (isGroupExists.length > 0 && isGroupExists[0].groupName) {
      alert("Group name already exists. Please choose a different name.");
      return;
    }
    if (updatedGroup.groupName.length < 2) {
      alert("Group name should be at least 2 characters long.");
      return;
    }

    dispatch(setGroups(updatedGroup));

    setNewGroup({
      id: "",
      color: "",
      groupName: "",
      AllNotes: [],
    });
    setInputValue("");
    setSelectedColor("");
    dispatch(setAddButtonToggle(false));
  };
  const handleCross = () => {
    dispatch(setAddButtonToggle(false));
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        dispatch(setAddButtonToggle(false));
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dispatch]);

  return (
    <div
      ref={modalRef}
      className={`add-groups ${addButtonToggle ? "modal-box" : ""}`}
      style={{ zIndex: addButtonToggle ? "backlight" : "" }}
    >
      <button onClick={handleCross} className="cross-btn">
        x
      </button>
      <div>
        <h1>Create New group</h1>
      </div>
      <form onSubmit={handleSubmit} className="form" action="">
        <div className="group-name-input">
          <h1>Group Name</h1>

          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            placeholder="Enter group name"
          />
        </div>
        <div className="select-colors">
          <h1>Choose colour</h1>
          <div className="all-colors">
            {colors.map((each) => (
              <button
                type="button"
                onClick={() => setSelectedColor(each)}
                key={each}
                className="each-color"
                style={{
                  backgroundColor: `#${each}`,
                  border: selectedColor === each ? "2px solid #000" : "none",
                }}
              ></button>
            ))}
          </div>
        </div>
        <div className="button-div">
          <button type="submit" className="create-button">
            {" "}
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddGroupInput;
