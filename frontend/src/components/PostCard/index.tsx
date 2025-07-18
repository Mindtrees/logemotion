import {
  Box,
  Card,
  CardContent,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { EmotionResult, Posts } from "../../models";
import {
  Favorite as FavoriteIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CalendarToday,
} from "@mui/icons-material";
import { useState } from "react";
import dayjs from "dayjs";
import transformEmotionData from "../../utils/transformEmotionData";
import { useNavigate } from "react-router-dom";
import { useDeletePost } from "../../hooks/UsePost";
import { useAuthState } from "../../hooks/UseLogin";

interface PostCardProps {
  post: Posts;
  currentUserId: string;
}

const EmotionCircleStyle = {
  color: "white",
  borderRadius: 20,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.8rem",
  textAlign: "center",
  padding: "0 8px",
  whiteSpace: "nowrap",
  gap: 0.5,
  userSelect: "none",
};

const PostCard = ({ post, currentUserId }: PostCardProps) => {
  //   console.log("post", post);
  const navigate = useNavigate();
  const { deletePost } = useDeletePost();
  // const [isPostLiked, setIsPostLiked] = useState(false);
  const [likedPosts, setLikedPosts] = useState<{ [key: string]: boolean }>(
    () => {
      const stored = localStorage.getItem("likedPosts");
      return stored ? JSON.parse(stored) : {};
    }
  );
  const [isExpanded, setIsExpanded] = useState(false);
  const isMyPost = post.userId === currentUserId;
  const isPostLiked = likedPosts[post.id || ""] || false;
  const { user } = useAuthState();

  // const handleClickLike = () => {
  //   setIsPostLiked((prev) => !prev);
  // };
  const handleClickLike = (postId: string) => {
    setLikedPosts((prev) => {
      const updated = {
        ...prev,
        [postId]: !prev[postId],
      };
      localStorage.setItem("likedPosts", JSON.stringify(updated));
      return updated;
    });
  };

  const handleClickEdit = () => {
    navigate("/write", {
      state: {
        editMode: true,
        postData: {
          id: post.id,
          title: post.title,
          content: post.content,
          emotionAnalysis: post.emotionAnalysis,
        },
      },
    });
  };

  const handleClickDelete = (postId?: string) => {
    if (!postId) return;
    deletePost(postId);
  };

  const handleClickExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const maxLength = 200;
  const isLongText = post.content.length > maxLength;
  const displayText =
    !isExpanded && isLongText
      ? post.content.slice(0, maxLength) + "..."
      : post.content;
  const emotions: EmotionResult[] = Array.isArray(post.emotionAnalysis) //EmotionResult[] ?
    ? post.emotionAnalysis // !null || !undefined ?
    : post.emotionAnalysis
    ? transformEmotionData(post.emotionAnalysis)
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 0.5,
          }}
        >
          {/* 포스트 제목 */}
          <Typography fontSize="1.3rem" fontWeight="bold" color="text.primary">
            {post.title}
          </Typography>

          <Box>
            {/* 좋아요 */}
            <Tooltip title={user ? "" : "Please login"} placement="top" arrow>
              <span>
                <IconButton
                  size="small"
                  aria-label="like"
                  //  onClick={() => handleClickLike()}
                  onClick={() => handleClickLike(post.id || "")}
                  color={isPostLiked ? "error" : "default"}
                  disabled={!user}
                >
                  <FavoriteIcon fontSize="small" />
                </IconButton>
              </span>
            </Tooltip>

            {isMyPost && (
              <>
                {/* 수정 */}
                <IconButton
                  size="small"
                  aria-label="edit"
                  color="primary"
                  onClick={handleClickEdit}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                {/* 삭제 */}
                <IconButton
                  size="small"
                  aria-label="delete"
                  color="inherit"
                  onClick={() => handleClickDelete(post.id)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </>
            )}
          </Box>
        </Box>

        {/* 날짜 */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            mb: 1,
          }}
        >
          <CalendarToday sx={{ fontSize: "0.9rem", color: "text.secondary" }} />
          <Typography fontSize="0.9rem" color="text.secondary">
            {dayjs(post.createdAt.toDate()).format("YYYY. MM. DD. A h:mm") ||
              "Unknown date"}
          </Typography>
        </Box>

        {/* 내용 */}
        <Typography color="text.secondary" mb={2}>
          {displayText}
          {isLongText && (
            <Box
              onClick={() => handleClickExpand()}
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

        {/* 감정 분석 */}
        <Typography fontSize="0.9rem" fontWeight="600" mb={1}>
          ⚡️ Emotion Analysis
        </Typography>

        {/* 분석 결과 */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          {emotions.map((emotion, idx) => (
            <Box
              key={idx}
              sx={{ ...EmotionCircleStyle, backgroundColor: emotion.color }}
            >
              <span>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {emotion.name}
                </Typography>
              </span>
              <span>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {emotion.value}%
                </Typography>
              </span>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default PostCard;
