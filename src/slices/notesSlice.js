import { createSlice } from "@reduxjs/toolkit";

const storedGroupsLC = localStorage.getItem("groupsLC");
const notesSlice = createSlice({
  name: "notes",
  initialState: {
    groups: storedGroupsLC ? JSON.parse(storedGroupsLC) : [],
    addButtonToggle: false,
    messageClicked: false,
    anyNotesOpened: false,
    NotesOpened: null,
  },
  reducers: {
    setGroups(state, action) {
      const duplicate = state.groups.find(
        (group) =>
          group.groupName.toLowerCase() ===
          action.payload.groupName.toLowerCase()
      );
      if (!duplicate) {
        state.groups = [action.payload, ...state.groups];
        localStorage.setItem("groupsLC", JSON.stringify(state.groups));
      }
    },

    setAddButtonToggle(state, action) {
      state.addButtonToggle = action.payload;
    },
    setMessageClicked(state, action) {
      state.addButtonToggle = action.payload;
    },
    setAnyNotesOpened(state, action) {
      state.anyNotesOpened = action.payload;
    },

    setNotesOpened(state, action) {
      const selectedGroup = state.groups.find(
        (eachGroup) => eachGroup.id === action.payload
      );

      if (state.NotesOpened?.id === selectedGroup?.id) {
        state.NotesOpened = null;
        state.anyNotesOpened = false;
      } else {
        state.NotesOpened = selectedGroup;

        state.anyNotesOpened = true;
      }
    },

    setNewMessages(state, action) {
      const { groupId, newNotesInfo } = action.payload;

      const group = state.groups.find((eachGroup) => eachGroup.id === groupId);
      if (group) {
        if (!group.AllNotes) {
          group.AllNotes = [];
        }
        group.AllNotes.push(newNotesInfo);
        localStorage.setItem("groupsLC", JSON.stringify(state.groups));
      }
    },
  },
});

export const {
  setGroups,
  setNotesOpened,
  setAnyNotesOpened,
  setMessageClicked,
  setAddButtonToggle,
  setNewMessages,
} = notesSlice.actions;

export default notesSlice.reducer;
