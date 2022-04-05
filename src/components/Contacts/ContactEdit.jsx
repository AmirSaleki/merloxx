import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { contactsActions } from "../../store/contacts";
import { useForm } from "react-hook-form";

import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const ContactEdit = (props) => {
  const { register, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();
  const [currentContact, setCurrentContact] = useState({});
  const allContacts = useSelector((state) => state.contacts.contactsData);

  useEffect(() => {
    if (props.editMode) {
      //check if the edit mode is on
      let updateContact = allContacts.filter(
        (item) => item.id === props.editMode
      );
      setCurrentContact(updateContact[0]);
    }
    // fill up the current contact data
    setValue("firstName", currentContact.firstName);
    setValue("lastName", currentContact.lastName);
    setValue("phone", currentContact.phone);
    setValue("email", currentContact.email);
    setValue("address", currentContact.address);
    setValue("avatar", currentContact.avatar);
  }, [props, currentContact, allContacts, setValue]);

  const submitHandler = (data) => {
    if (!props.editMode) {
      // to add a new Contact
      dispatch(
        contactsActions.addNewContact({
          id: Math.floor(Math.random() * 10000).toString(),
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          address: data.address,
          avatar: data.avatar,
        })
      );
    } else {
      // to edit the current Contact
      dispatch(
        contactsActions.editContact({
          id: currentContact.id,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          address: data.address,
          avatar: data.avatar,
        })
      );
      props.editDone(false);
      setCurrentContact({});
    }
  };
  return (
    <>
      <Container maxWidth="md">
        <h1>{props.editMode ? "Edit Contact" : "Add New Contact"}</h1>
        <form onSubmit={handleSubmit((data) => submitHandler(data))}>
          <TextField
            {...register("firstName", {
              required: true,
              pattern: /^[A-Za-z]+$/i,
            })}
            placeholder="First Name"
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <TextField
            {...register("lastName", {
              required: true,
              pattern: /^[A-Za-z]+$/i,
            })}
            placeholder="Last Name"
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <TextField
            {...register("phone", { required: true })}
            placeholder="Phone Number"
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <TextField
            {...register("email", {
              required: true,
              pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            })}
            placeholder="Email"
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <TextField
            {...register("address")}
            placeholder="Address"
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <TextField
            {...register("avatar")}
            placeholder="Avatar Link"
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <Button type="submit" variant="contained">
            Save Contact
          </Button>
        </form>
      </Container>
    </>
  );
};

export default ContactEdit;
