import {
  Box,
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { EmotionResult, Posts } from "../../models";
import {
  Favorite as FavoriteIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useState } from "react";
import dayjs from "dayjs";
import transformEmotionData from "../../utils/transformEmotionData";

type PostCardProps = {
  post: Posts;
};

const EmotionCircleStyle = {
  //   backgroundColor: "#1976d2",
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
  userSelect: "none", // 드래그 방지.
};

const PostCard = ({ post }: PostCardProps) => {
  //   console.log("post", post);
  const [isPostLiked, setIsPostLiked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClickLike = () => {
    setIsPostLiked((prev) => !prev);
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
            <IconButton
              size="small"
              aria-label="like"
              onClick={() => handleClickLike()}
              color={isPostLiked ? "error" : "default"}
            >
              <FavoriteIcon fontSize="small" />
            </IconButton>
            {/* 수정 */}
            <IconButton size="small" aria-label="edit" color="primary">
              <EditIcon fontSize="small" />
            </IconButton>
            {/* 삭제 */}
            <IconButton size="small" aria-label="delete" color="inherit">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        {/* 날짜 */}
        <Typography fontSize="0.9rem" color="text.secondary" mb={2}>
          {dayjs(post.createdAt.toDate()).format("YYYY. MM. DD. A h:mm") ||
            "Unknown date"}
        </Typography>

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
        <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap" }}>
          {emotions.map((emotion, idx) => (
            <Box
              key={idx}
              sx={{ ...EmotionCircleStyle, backgroundColor: emotion.color }}
            >
              <span>{emotion.name}</span>
              <span>{emotion.value}%</span>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PostCard;
