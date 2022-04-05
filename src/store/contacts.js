import { createSlice } from "@reduxjs/toolkit";

const contactsSlice = createSlice({
  name: "contactsData",
  initialState: {
    contactsData: [
      {
        id: "A1",
        firstName: "Amir",
        lastName: "Saleki",
        phone: "01776552350",
        email: "amir.saleki8@gmail.com",
        address: "Marburgerstr Gießen",
        avatar: "https://avatars.githubusercontent.com/u/86324807?v=4",
      },
    ],
  },
  reducers: {
    addNewContact(state, action) {
      state.contactsData.push(action.payload);
    },
    editContact(state, action) {
      const index = state.contactsData.findIndex(
        (contact) => contact.id === action.payload.id
      );
      state.contactsData[index] = action.payload;
    },
    deleteContact(state, action) {
      const index = state.contactsData.findIndex(
        (contact) => contact.id === action.payload.id
      );
      state.contactsData.splice(index, 1);
    },
  },
});

export const contactsActions = contactsSlice.actions;
export default contactsSlice;
