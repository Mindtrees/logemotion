import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useEmotionAnalysis } from "../../hooks/refactoredUseEmotionAnalysis";

const WriteExample = () => {
  const { analyze, emotions, isLoading, error, reset } = useEmotionAnalysis();
  const [inputText, setInputText] = useState("");

  const handleClickAnalyzeText = () => {
    if (inputText.trim()) {
      analyze(inputText);
    }
  };

  console.log("emotions", emotions);
  return (
    <Box m={10}>
      <Box>
        <Typography fontWeight={700}>WriteExample</Typography>
        <TextField
          multiline
          fullWidth
          placeholder="This is example to analyze data"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <Button
          variant="outlined"
          onClick={handleClickAnalyzeText}
          sx={{ mt: 1 }}
        >
          {isLoading ? "Analyzing" : "Analyze Emotion"}
        </Button>
      </Box>

      <Stack direction="row" spacing={1} mt={2}>
        {emotions.map(({ name, value, color }) => (
          <Box key={name} sx={{ backgroundColor: color }}>
            {name}: {value}%
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default WriteExample;
