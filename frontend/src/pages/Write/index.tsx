import React, { useState } from "react";
import { Container, Grid, Box, Snackbar, Alert, Stack } from "@mui/material";
import WritePostHeading from "./components/WritePostHeading";
import WritePost from "./components/WritePost";
import PostAnalysis from "./components/PostAnalysis";
import AnalysisTips from "./components/AnalysisTips";
import { EmotionAnalysisResult } from "../../models/write";
import { colors } from "../../styles/colors";
import { EmotionAnalysisResponse } from "../../models/post";
import { sampleEmotions } from "./components/SampleEmotions";

const Write: React.FC = () => {
  const [emotions, setEmotions] = useState<EmotionAnalysisResult[]>([]);
  const [showAnalysis, setShowAnalysis] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "warning" | "info";
  }>({
    open: false,
    message: "",
    severity: "info",
  });

  const todaysTip =
    "Joy and hope emotions are showing high levels! How about writing a gratitude journal to maintain this positive energy?";

  const transformEmotionData = (
    apiResponse: EmotionAnalysisResponse
  ): EmotionAnalysisResult[] => {
    return Object.entries(apiResponse.emotions_normalized)
      .map(([emotion, normalizedScore]) => ({
        label: emotion,
        percentage: Math.round(normalizedScore * 100),
        color:
          colors.semantic.emotions[
            emotion as keyof typeof colors.semantic.emotions
          ] || "#5C6BC0",
      }))
      .sort((a, b) => b.percentage - a.percentage);
  };

  const handleAnalyzeEmotions = async (title: string, content: string) => {
    try {
      console.log("Analyzing emotions for:", { title, content });

      const transformedEmotions = transformEmotionData(sampleEmotions);

      setEmotions(transformedEmotions);
      setShowAnalysis(true);

      showSnackbar("Emotion analysis completed successfully!", "success");
    } catch (error) {
      console.error("Error analyzing emotions:", error);
      showSnackbar("Failed to analyze emotions. Please try again.", "error");
    }
  };

  const handleSave = async (title: string, content: string) => {
    try {
      console.log("Saving post:", { title, content });

      showSnackbar("Post saved successfully!", "success");
    } catch (error) {
      console.error("Error saving post:", error);
      showSnackbar("Failed to save post. Please try again.", "error");
    }
  };

  const showSnackbar = (
    message: string,
    severity: typeof snackbar.severity
  ) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <WritePostHeading />

      <Grid container spacing={4} sx={{ alignItems: "stretch" }}>
        <Grid item xs={12} lg={8}>
          <WritePost
            onAnalyzeEmotions={handleAnalyzeEmotions}
            onSave={handleSave}
          />
        </Grid>

        <Grid
          item
          xs={12}
          lg={4}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Box
            sx={{
              position: "sticky",
              top: 24,
              height: "fit-content",
              display: "flex",
              flexDirection: "column",
              flex: 1,
            }}
          >
            <Stack spacing={3} sx={{ height: "100%" }}>
              <PostAnalysis emotions={emotions} isVisible={showAnalysis} />

              <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <AnalysisTips tip={todaysTip} isVisible={showAnalysis} />
              </Box>
            </Stack>
          </Box>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Write;
