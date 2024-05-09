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
import { RootState } from "../redux/store";
import { ISavedBook } from "../types";
import { useDeleteBookMutation } from "../redux/apiSlice";

const SavedBookCard = ({
  data,
  searchData,
}: {
  data: ISavedBook;
  searchData: () => void;
}) => {
  const [deleteBook] = useDeleteBookMutation();
  const key = useSelector((state: RootState) => state.user.key);
  const secret = useSelector((state: RootState) => state.user.secret);

  const handleDelete = () => {
    deleteBook({
      headers: { key: key, secret: secret },
      book: {
        id: data.book.id,
      },
    }).then(() => searchData());
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
        </CardContent>
        <Box sx={{ mt: "auto" }}>
          <CardActions>
            <Grid container>
              <Grid item>
                <Button size="small" onClick={handleDelete}>
                  Remove
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Box>
      </Card>
    </>
  );
};

export default SavedBookCard;
