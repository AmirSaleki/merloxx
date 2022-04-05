import { useState } from "react";

import { Grid } from "@mui/material";
import ContactList from "./ContactsList";
import ContactEdit from "./ContactEdit";

const Contacts = () => {
  const [isEditMode, setIsEditMode] = useState("");
  const editModeHandler = (id) => {
    setIsEditMode(id);
  };
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        width="100%"
        height="100vh"
      >
        <Grid item xs={2} md={4}>
          <ContactList editMode={editModeHandler} />
        </Grid>
        <Grid item xs={2} md={4}>
          <ContactEdit editMode={isEditMode} editDone={editModeHandler} />
        </Grid>
      </Grid>
    </>
  );
};

export default Contacts;
