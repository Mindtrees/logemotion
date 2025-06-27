import {
  Box,
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useState } from "react";
import {
  Favorite as FavoriteIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useUserPosts } from "../../hooks/UsePost";

const PostList = () => {
  // ✨ Automatically fetch data from Firebase
  const { posts, isLoading, error } = useUserPosts();
  
  const [liked, setLiked] = useState(false);
  const [expandedPosts, setExpandedPosts] = useState<{[key: string]: boolean}>({});

  const handleClickLike = () => {
    setLiked((prev) => !prev);
  };

  const handleClickExpand = (postId: string) => {
    setExpandedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  // Show loading state
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Show error state
  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        Failed to load posts: {error.message}
      </Alert>
    );
  }

  // Show empty state
  if (posts.length === 0) {
    return (
      <Alert severity="info" sx={{ m: 2 }}>
        No posts found. Create your first post!
      </Alert>
    );
  }

  return (
    <Stack spacing={2}>
      {posts.map((post) => {
        const isExpanded = expandedPosts[post.id || ''] || false;
        const maxLength = 200;
        const isLongText = post.content.length > maxLength;
        const displayText = !isExpanded && isLongText 
          ? post.content.slice(0, maxLength) + "..." 
          : post.content;

        // Process emotion data if available
        const emotions = post.emotionAnalysis && Array.isArray(post.emotionAnalysis) 
          ? post.emotionAnalysis.slice(0, 6) // Show 6 emotions
          : [];

        return (
          <Card
            key={post.id}
            variant="outlined"
            sx={{
              backgroundColor: "background.elevated",
              width: "100%",
              p: 1,
              boxShadow: 0,
              transition: "box-shadow 0.3s ease",
              "&:hover": {
                transform: "none",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
              },
            }}
          >
            <CardContent>
              {/* Post Title and Action Buttons */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 0.5,
                }}
              >
                <Typography fontSize="1.3rem" fontWeight="bold" color="text.primary">
                  {post.title}
                </Typography>

                <Box>
                  <IconButton
                    size="small"
                    aria-label="like"
                    onClick={handleClickLike}
                    color={liked ? "error" : "default"}
                  >
                    <FavoriteIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" aria-label="edit" color="primary">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" aria-label="delete" color="inherit">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>

              {/* Date */}
              <Typography fontSize="0.9rem" color="text.secondary" mb={2}>
                {post.createdAt?.toDate().toLocaleDateString() || 'Unknown date'}
              </Typography>

              {/* Content */}
              <Typography color="text.secondary" mb={2}>
                {displayText}
                {isLongText && (
                  <Box
                    onClick={() => handleClickExpand(post.id || '')}
                    component="span"
                    sx={{
                      color: "primary.main",
                      cursor: "pointer",
                      ml: 0.5,
                      fontWeight: "bold",
                    }}
                  >
                    {isExpanded ? "Read less" : "Read more"}
                  </Box>
                )}
              </Typography>

              {/* Emotion Analysis */}
              {emotions.length > 0 && (
                <>
                  <Typography fontSize="0.9rem" fontWeight="600" mb={1}>
                    ⚡️ Emotion Analysis
                  </Typography>

                  <Stack direction="row" spacing={2} flexWrap="wrap">
                    {emotions.map((emotion, index) => (
                      <Box
                        key={index}
                        sx={{
                          backgroundColor: emotion.color || "#1976d2",
                          color: "white",
                          borderRadius: 20,
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.8rem",
                          textAlign: "center",
                          padding: "4px 12px",
                          whiteSpace: "nowrap",
                          gap: 0.5,
                          userSelect: "none",
                        }}
                      >
                        <span>{emotion.name}</span>
                        <span>{Math.round(emotion.value)}%</span>
                      </Box>
                    ))}
                  </Stack>
                </>
              )}
            </CardContent>
          </Card>
        );
      })}
    </Stack>
  );
};

export default PostList;
