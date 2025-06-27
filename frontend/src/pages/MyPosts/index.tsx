import { Box, Container } from "@mui/material";

import PostList from "../../components/PostList/index";
import MyPostHeader from "../../components/MyPostHeader";
import SearchBar from "../../components/SearchBar";

const MyPosts = () => {
  return (
    <Box
      sx={{
        backgroundColor: "background.section",
        minHeight: "100vh",
        width: "100vw",
        paddingBottom: "100px",
      }}
    >
      <Container
        maxWidth={false}
        sx={{ maxWidth: "940px", backgroundColor: "background.section", pt: 2 }}
      >
        <MyPostHeader />
        <SearchBar />
        <PostList />
      </Container>
    </Box>
  );
};

export default MyPosts;
