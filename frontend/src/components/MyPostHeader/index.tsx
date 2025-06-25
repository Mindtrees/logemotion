import { Box, Typography } from "@mui/material";
import Button from "../common/Button";
import { EditNote as EditNoteIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const MyPostHeader = () => {
  const navigate = useNavigate();
  const handleClickWritePage = () => {
    navigate("/write");
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 3,
      }}
    >
      <Typography sx={{ fontSize: "2rem", fontWeight: "800" }}>
        My Posts
      </Typography>
      <Button
        onClick={handleClickWritePage}
        sx={{
          fontSize: "0.9rem",
          px: 2.5,
          py: 1,
          borderRadius: 1,
        }}
        startIcon={<EditNoteIcon />}
      >
        Write New Post
      </Button>
    </Box>
  );
};

export default MyPostHeader;
