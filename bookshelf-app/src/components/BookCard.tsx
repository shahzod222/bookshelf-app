import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  CardActions,
  Grid,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useCreateBookMutation } from "../redux/apiSlice";
import { IBook } from "../types";
import { RootState } from "../redux/store";

const BookCard = ({
  book,
  searchData,
}: {
  book: IBook;
  searchData: () => void;
}) => {
  const [createBook] = useCreateBookMutation();
  const key = useSelector((state: RootState) => state.user.key);
  const secret = useSelector((state: RootState) => state.user.secret);

  const handleSave = () => {
    createBook({
      body: {
        isbn: book.isbn,
      },
      headers: { key: key, secret: secret },
    }).then(() => searchData());
  };

  return (
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
        image={book.cover}
        alt={book.title}
      />
      <CardContent sx={{ flex: "1 0 auto" }}>
        <Typography component="div" variant="subtitle1">
          {book.title}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" component="div">
          {book.author}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" component="div">
          {book.published}
        </Typography>
      </CardContent>
      <Box sx={{ mt: "auto" }}>
        <CardActions>
          <Grid container>
            <Grid item>
              <Button size="small" onClick={handleSave}>
                Save
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Box>
    </Card>
  );
};

export default BookCard;
