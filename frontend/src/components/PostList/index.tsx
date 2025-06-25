import {
  Box,
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import {
  Favorite as FavoriteIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

// api data
const emotionData = {
  emotions_normalized: {
    joy: 0.5057535885022484,
    surprise: 0.07180498997002821,
    sadness: 0.029254281437057602,
    disgust: 0,
    anger: 0,
    fear: 0,
  },
};

// 감정 키워드 및 퍼센트 배열
const emotions = Object.entries(emotionData.emotions_normalized)
  .filter(([_, value]) => value > 0)
  .map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    percent: Math.round(value * 100),
  }))
  .sort((a, b) => b.percent - a.percent);

// 감정 버튼 스타일
const circleStyle = {
  backgroundColor: "#1976d2",
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

const PostList = () => {
  const [liked, setLiked] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const handleClickLike = () => {
    setLiked((prev) => !prev);
  };
  const handleClickExpand = () => {
    setExpanded((prev) => !prev);
  };

  // read more
  const text =
    "Today was such a wonderful day! The sun was shining bright, and I felt full of energy. I spent time with my friends, laughed a lot, and enjoyed delicious food. Everything seemed perfect, and I felt grateful for all the little things that made me smile. Happiness truly is in the small moments.";
  const maxLength = 200;
  const isLongText = text.length > maxLength;
  const displayText =
    !expanded && isLongText ? text.slice(0, maxLength) + "..." : text;

  return (
    <Card
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
        {/* 포스트 제목 및 기타 기능 버튼 */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 0.5,
          }}
        >
          <Typography fontSize="1.3rem" fontWeight="bold" color="text.primary">
            New Beginning
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

        {/* 날짜 */}
        <Typography fontSize="0.9rem" color="text.secondary" mb={2}>
          Jan 15, 2024
        </Typography>

        {/* 내용 */}
        <Typography color="text.secondary" mb={2}>
          {displayText}
          {isLongText && (
            <Box
              onClick={handleClickExpand}
              component="span"
              sx={{
                color: "primary.main",
                cursor: "pointer",
                ml: 0.5,
                fontWeight: "bold",
              }}
            >
              {expanded ? "Read less" : "Read more"}
            </Box>
          )}
        </Typography>

        {/* 감정 분석 */}
        <Typography fontSize="0.9rem" fontWeight="600" mb={1}>
          ⚡️ Emotion Analysis
        </Typography>

        {/* 감정 키워드 및 퍼센트 */}
        <Stack direction="row" spacing={2}>
          {emotions.map(({ name, percent }) => (
            <Box key={name} sx={circleStyle}>
              <span>{name}</span>
              <span>{percent}%</span>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PostList;
