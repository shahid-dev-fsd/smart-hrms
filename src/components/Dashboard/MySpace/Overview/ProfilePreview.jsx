import React, { useEffect, useState } from "react";
import { Button, Typography, IconButton, Box } from "@mui/material";
import { useUser } from "../../../../hooks/Authorize";
import camera from "../../../../assets/Interductionimages/cameraaicon2.png";

export default function ProfilePreview() {
  const platformUser = useUser();
  const [image, setImage] = useState(platformUser?.image || "");

  // Function to get the initials or "?"
  const getInitials = () => {
    if (platformUser?.firstName && platformUser?.lastName) {
      return `${platformUser.firstName
        .charAt(0)
        .toUpperCase()}${platformUser.lastName.charAt(0).toUpperCase()}`;
    }
    return "?";
  };

  // Function to handle image selection and upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const [time, setTime] = useState("00 : 00 : 00");

  useEffect(() => {
    setInterval(() => {
      const dateObject = new Date();

      const hour = dateObject.getHours();
      const minute = dateObject.getMinutes();
      const tempSecond = dateObject.getSeconds();
      const second = tempSecond < 10 ? "0" + tempSecond : tempSecond;

      const currentTime = hour + " : " + minute + " : " + second;

      setTime(currentTime);
    }, 1000);
  }, []);

  return (
    <div className="w-full flex gap-3 p-3 flex-col justify-center items-center">
      {/* Profile Picture Section */}
      <div className="flex flex-col justify-center items-center">
        <Box
          sx={{
            position: "relative",
            width: image ? "130px" : "130px",
            height: image ? "130px" : "130px",
            borderRadius: image ? "10px" : "50%",
            overflow: "hidden",
            border: image ? "" : "2px solid #3B84D9",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: image ? "transparent" : "background.view",
            backgroundImage: image ? `url(${image})` : "none", // Show image as background if available
            backgroundSize: "cover", // Ensure image covers the area
            backgroundPosition: "center", // Center the background image
            transition: "all 0.3s ease", // Smooth transition for hover effect
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.6)", // Darkens the background on hover
            },
            "&:hover::after": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "inherit", // Inherit background properties from the box
              filter: "blur(5px)", // Apply blur only to the background
              zIndex: 1,
            },
            "&:hover .camera-icon": {
              opacity: 1,
            },
          }}
        >
          {/* Initials Fallback */}
          {!image && (
            <Typography
              variant="subtitle1"
              fontWeight={600}
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontSize: 80,
              }}
            >
              {getInitials()}
            </Typography>
          )}

          {/* Camera Icon */}
          <IconButton
            className="camera-icon"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)", // Center the icon
              backgroundColor: "transparent",
              boxShadow: "none",
              opacity: 0, // Hidden by default
              transition: "opacity 0.3s ease", // Smooth transition for icon appearance
              zIndex: 2, // Ensure the icon is above the blurred background
            }}
            size="small"
            component="label"
          >
            <img
              src={camera}
              alt="Camera"
              style={{
                width: "30px",
                height: "30px",
              }}
            />
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageUpload}
            />
          </IconButton>
        </Box>

        {/* User Info */}
        <Typography variant="h6" sx={{ mt: 2 }}>
          {platformUser?.firstName + " " + platformUser?.lastName || "N/A"}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          CEO
        </Typography>
      </div>

      {/* Clock-in/Clock-out Status */}
      <div className="flex flex-col justify-center items-center">
        <Typography variant="body2" color="error">
          Not yet Clocked-in
        </Typography>
        <Typography variant="h6">{time}</Typography>
      </div>

      {/* Clock-in/Clock-out Buttons */}
      <div className="flex gap-3 flex-row justify-center items-center">
        <Button sx={{ px: "1.6rem", py: "0.2rem" }} variant="contained">
          Clock-in
        </Button>
        <Button
          sx={{ px: "1.6rem", py: "0.2rem" }}
          variant="contained"
          disabled
        >
          Clock-out
        </Button>
      </div>
    </div>
  );
}
