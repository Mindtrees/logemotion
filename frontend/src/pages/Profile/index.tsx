import {
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import Like from "@mui/icons-material/Favorite";
import Post from "@mui/icons-material/StickyNote2Outlined";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useAuthState } from "../../hooks/UseLogin";
import UserCalendar from "./components/userCalendar";
import { useGetUserPosts } from "../../hooks/UsePost";

const Profile = () => {
  const { user, isAuthenticated } = useAuthState();
  const navigate = useNavigate();
  const { posts, isLoading: postsLoading, error } = useGetUserPosts();

  const [editUser, setEditUser] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  useEffect(() => {
    if (user) {
      setEditUser({
        userName: user.displayName || "",
        email: user.email || "",
        password: "",
      });
    }
  }, [user]);

  if (!isAuthenticated || !user) {
    return (
      <Box sx={{ maxWidth: 800, p: 4, mx: "auto", textAlign: "center" }}>
        <Alert severity="info">Please login to view your profile</Alert>
      </Box>
    );
  }

  const handleEditChange = () => {
    setIsEditMode(true);
    setSuccessMessage("");
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setEditUser({
      userName: user.displayName || "",
      email: user.email || "",
      password: "",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setEditUser({ ...editUser, [field]: value });
  };

  const handleSave = async () => {
    if (!editUser.userName.trim()) {
      alert("Please enter a name");
      return;
    }

    setIsLoading(true);

    try {
      await updateProfile(auth.currentUser!, {
        displayName: editUser.userName.trim(),
      });
      setIsEditMode(false);
      setSuccessMessage("Profile updated successfully!");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error: any) {
      alert("Failed to update profile: " + error.message);
    }
    setIsLoading(false);
  };

  return (
    <Box sx={{ px: 4, mx: "auto", py: 4 }}>
      {successMessage && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {successMessage} Redirecting to home...
        </Alert>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 5,
          flexWrap: "wrap",
        }}
      >
        <Box
          sx={{
            maxWidth: 400,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            mt: 1,
          }}
        >
          <Avatar sx={{ width: 120, height: 120, bgcolor: "primary.main" }}>
            {editUser.userName?.charAt(0) || editUser.email?.charAt(0) || "U"}
          </Avatar>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Post sx={{ mr: 1 }} />
            <Typography variant="body2" sx={{ mr: 2 }}>
              {posts.length} Posts
            </Typography>
            <Like sx={{ mr: 1, color: "red" }} />
            <Typography variant="body2">123 Likes</Typography>
          </Box>
          <Box sx={{ width: "100%", maxWidth: 300 }}>
            <TextField
              label="Name"
              fullWidth
              value={editUser?.userName || ""}
              onChange={(e) => handleInputChange("userName", e.target.value)}
              InputProps={{ readOnly: !isEditMode }}
              disabled={!isEditMode}
              sx={{
                mb: 2,
              }}
            />
            <TextField
              label="Email"
              fullWidth
              type="email"
              value={editUser?.email || ""}
              InputProps={{ readOnly: true }}
              disabled
              sx={{
                mb: 2,
              }}
            />
            <TextField
              label="Password"
              fullWidth
              type="password"
              value="******"
              InputProps={{ readOnly: true }}
              disabled
              sx={{
                mb: 2,
              }}
            />
            <Box sx={{ textAlign: "right" }}>
              {isEditMode ? (
                <>
                  <Button
                    variant="outlined"
                    onClick={handleCancel}
                    disabled={isLoading}
                    sx={{ mr: 1 }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleSave}
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save"}
                  </Button>
                </>
              ) : (
                <Button variant="contained" onClick={handleEditChange}>
                  Edit
                </Button>
              )}
            </Box>
          </Box>
        </Box>
        <Box sx={{ maxWidth: 500, width: "100%" }}>
          <UserCalendar />
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
