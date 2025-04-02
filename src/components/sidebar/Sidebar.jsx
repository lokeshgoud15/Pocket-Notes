import { useEffect, useState } from "react";
import AllNoteGroups from "../AllNoteGroups/AllNoteGroups";
import "./Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { setAddButtonToggle } from "../../slices/notesSlice";

const Sidebar = ({}) => {
  const { anyNotesOpened, addButtonToggle } = useSelector(
    (store) => store.notes
  );
  const [sidebarClose, setSidebarClose] = useState(false);

  const dispatch = useDispatch();
  const handleToggle = () => {
    dispatch(setAddButtonToggle(!addButtonToggle));
  };

  useEffect(() => {
    if (anyNotesOpened && screen.width < 450) {
      setSidebarClose(true);
    } else {
      setSidebarClose(false);
    }
  }, [anyNotesOpened, screen.width]);
  useEffect(() => {
    const handleResize = () => {
      if (anyNotesOpened && screen.width < 450) {
        setSidebarClose(true);
      } else {
        setSidebarClose(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [anyNotesOpened]);
  return (
    <div
      className={`sidebar ${addButtonToggle ? "background-dim" : ""}
    ${sidebarClose ? "sidebar-close" : ""}
    ${sidebarClose ? "" : "sidebar-height"}`}
    >
      <div>
        <div className="pocket-head">
          <h1>Pocket Notes</h1>
        </div>
        <div>
          <AllNoteGroups />
        </div>
        <div>
          <button onClick={handleToggle} className="add-new-notes">
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
