import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
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
  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", m: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert variant="filled" severity="error" sx={{ m: 2 }}>
        Fail to load posts: {error.message}
      </Alert>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Card
          variant="outlined"
          sx={{
            backgroundColor: "background.elevated",
            width: "100%",
            p: 1,
            boxShadow: 0,
            transition: "box-shadow 0.3s ease",
          }}
        >
          <CardContent sx={{ textAlign: "center", py: 6 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No posts yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Let's get started with your first post!
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Stack spacing={2}>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          currentUserId={currentUserId || ""}
        />
      ))}
    </Stack>
  );
};

export default PostList;

// {posts?.length === 0 ? (
//       <Typography>No posts found. Create your first post.</Typography>
//     ) : (
//       <Stack spacing={2}>
//         {posts.map((post) => (
//           <PostCard
//             key={post.id}
//             post={post}
//             currentUserId={currentUserId || ""}
//           />
//         ))}
//       </Stack>
//     )}
