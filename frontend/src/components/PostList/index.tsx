import { Alert, Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useGetUserPosts } from "../../hooks/UsePost";
import PostCard from "../PostCard";

const PostList = () => {
  const { posts, isLoading, error } = useGetUserPosts();
  // console.log("posts", posts);

  return (
    <>
      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", m: 3 }}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Alert variant="filled" severity="error" sx={{ m: 2 }}>
          Fail to load posts: {error.message}
        </Alert>
      )}

      {posts.length === 0 ? (
        <Typography>No posts found. Create your first post.</Typography>
      ) : (
        <Stack spacing={2}>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </Stack>
      )}
    </>
  );
};

export default PostList;
