import { Alert, Box, CircularProgress, Stack, Typography } from "@mui/material";
import PostCard from "../PostCard";
import { Posts } from "../../models";

interface PostListProps {
  posts: Posts[];
  isLoading: boolean;
  error: Error | null;
  currentUserId?: string;
}

const PostList = ({
  posts,
  isLoading,
  error,
  currentUserId,
}: PostListProps) => {
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

      {posts?.length === 0 ? (
        <Typography>No posts found. Create your first post.</Typography>
      ) : (
        <Stack spacing={2}>
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              currentUserId={currentUserId || ""}
            />
          ))}
        </Stack>
      )}
    </>
  );
};

export default PostList;
