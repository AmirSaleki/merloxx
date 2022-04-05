import { useSelector, useDispatch } from "react-redux";
import { contactsActions } from "../../store/contacts";

import classes from "./ContactList.module.css";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Button from "@mui/material/Button";

const ContactsList = (props) => {
  const getData = useSelector((state) => state.contacts.contactsData);

  const dispatch = useDispatch();
  const editContactHandler = (e) => {
    props.editMode(e.target.id);
  };
  const deleteContactHandler = (e) => {
    dispatch(contactsActions.deleteContact(e.target.id));
  };

  return (
    <>
      <div className={classes.container}>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "65ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <List sx={{ width: "100%" }}>
            {getData.map((item) => (
              <span key={item.id} id={item.id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      alt={`profile ${item.id}`}
                      src={item.avatar}
                      sx={{ width: 80, height: 80, mx: 1 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={` ${item.firstName}  ${item.lastName}`}
                    secondary={item.email}
                  />
                  <Button id={item.id} onClick={editContactHandler}>
                    Edit
                  </Button>
                  <Button
                    color="error"
                    id={item.id}
                    onClick={deleteContactHandler}
                  >
                    Delete
                  </Button>
                </ListItem>
              </span>
            ))}
          </List>
        </Box>
      </div>
    </>
  );
};

export default ContactsList;
