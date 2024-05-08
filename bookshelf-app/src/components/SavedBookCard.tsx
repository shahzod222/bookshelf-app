import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  CardActions,
  Grid,
  Modal,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ISavedBook } from "../types";
import { useState } from "react";
import { useDeleteBookMutation, useEditBookMutation } from "../redux/apiSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const SavedBookCard = ({
  data,
  handleAllBooks,
}: {
  data: ISavedBook;
  handleAllBooks: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const [bookStatus, setBookStatus] = useState("New");
  const [editBook] = useEditBookMutation();
  const [deleteBook] = useDeleteBookMutation();
  const handleChange = (event: SelectChangeEvent) => {
    setBookStatus(event.target.value);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const key = useSelector((state: RootState) => state.user.key);
  const secret = useSelector((state: RootState) => state.user.secret);

  const handleEdit = () => {
    handleClose();
    editBook({
      body: {
        status: getStatusNum(bookStatus),
      },
      headers: { key: key, secret: secret },
      book: {
        id: data.book.id,
      },
    }).then(() => handleAllBooks());
  };

  const handleDelete = () => {
    handleClose();
    deleteBook({
      headers: { key: key, secret: secret },
      book: {
        id: data.book.id,
      },
    }).then(() => handleAllBooks());
  };

  return (
    <>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "200px",
          margin: "1em",
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: 200, height: 300 }}
          image={data.book.cover}
          alt={data.book.title}
        />
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="subtitle1">
            {data.book.title}
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            component="div"
          >
            {data.book.author}
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            component="div"
          >
            {data.book.published}
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            component="div"
          >
            {data.book.pages} pages
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            component="div"
          >
            Status: {getStatus(data.status)}
          </Typography>
        </CardContent>
        <Box sx={{ mt: "auto" }}>
          <CardActions>
            <Grid container>
              <Grid item>
                <Button size="small" onClick={handleOpen}>
                  Edit
                </Button>
              </Grid>
              <Grid item>
                <Button size="small" onClick={handleDelete}>
                  Remove
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Box>
      </Card>

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit status to:
            </Typography>
            <FormControl fullWidth sx={{ margin: "1em 0" }}>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={bookStatus}
                label="Status"
                onChange={handleChange}
              >
                <MenuItem value={"New"}>New</MenuItem>
                <MenuItem value={"Reading"}>Reading</MenuItem>
                <MenuItem value={"Finished"}>Finished</MenuItem>
              </Select>
            </FormControl>
            <Button size="large" onClick={handleEdit}>
              Save
            </Button>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default SavedBookCard;

const getStatus = (num: number) => {
  switch (num) {
    case 0:
      return "New";
    case 1:
      return "Reading";
    case 2:
      return "Finished";
    default:
      return "New";
  }
};

const getStatusNum = (str: string) => {
  switch (str) {
    case "New":
      return 0;
    case "Reading":
      return 1;
    case "Finished":
      return 2;
    default:
      return "New";
  }
};
