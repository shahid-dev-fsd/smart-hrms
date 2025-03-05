import React, { useState } from "react";
import {
  Avatar,
  Grid,
  IconButton,
  Modal,
  Box,
  TextField,
  Button,
} from "@mui/material";
import { TiPlus } from "react-icons/ti";
import { MdEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";

export default function OrganizationQuickLinks() {
  const [open, setOpen] = useState(false);
  const [linkName, setLinkName] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [quickLinks, setQuickLinks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [errors, setErrors] = useState({ linkName: "", linkUrl: "" });

  const handleOpen = () => {
    setEditIndex(null);
    setOpen(true);
    setErrors({ linkName: "", linkUrl: "" });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setLinkName(quickLinks[index].name);
    setLinkUrl(quickLinks[index].url);
    setOpen(true);
    setErrors({ linkName: "", linkUrl: "" });
  };

  const handleClose = () => {
    setOpen(false);
    setLinkName("");
    setLinkUrl("");
    setErrors({ linkName: "", linkUrl: "" });
  };

  const handleSave = () => {
    let valid = true;
    const newErrors = { linkName: "", linkUrl: "" };

    if (!linkName && !linkUrl) {
      newErrors.linkName = "Link Name is required";
      newErrors.linkUrl = "Link URL is required";
      valid = false;
    } else {
      if (!linkName) {
        newErrors.linkName = "Link Name is required";
        valid = false;
      }
      if (!linkUrl) {
        newErrors.linkUrl = "Link URL is required";
        valid = false;
      }
    }

    setErrors(newErrors);

    if (valid) {
      if (editIndex !== null) {
        const updatedLinks = [...quickLinks];
        updatedLinks[editIndex] = { name: linkName, url: linkUrl };
        setQuickLinks(updatedLinks);
      } else {
        const newLink = { name: linkName, url: linkUrl };
        setQuickLinks((prevLinks) => [...prevLinks, newLink]);
      }
      handleClose();
    }
  };

  const handleDelete = (index) => {
    const updatedLinks = quickLinks.filter((_, i) => i !== index);
    setQuickLinks(updatedLinks);
  };

  return (
    <Grid
      sx={{ backgroundColor: "background.default", flexDirection: "column" }}
      className="min-w-64 h-fit flex flex-col gap-3 justify-center items-center rounded-lg p-5 border border-gray-800"
    >
      <div className="w-full flex flex-row gap-3 justify-between items-center">
        <div>
          <h1>Quick Links</h1>
        </div>
        <div>
          <IconButton onClick={handleOpen}>
            <TiPlus />
          </IconButton>
        </div>
      </div>
      <div className="w-full flex flex-col gap-3">
        {quickLinks.length === 0 ? (
          <h1>No quick links</h1>
        ) : (
          quickLinks.map((link, index) => (
            <div
              key={index}
              className="flex flex-row gap-3 justify-between items-center"
            >
              <div>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.name}
                </a>
              </div>
              <div className="flex flex-row gap-1">
                <IconButton onClick={() => handleEdit(index)}>
                  <MdEdit />
                </IconButton>
                <IconButton onClick={() => handleDelete(index)}>
                  <MdDeleteOutline />
                </IconButton>
              </div>
            </div>
          ))
        )}
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            p: 4,
            width: 400,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
          }}
          className="flex flex-col gap-3"
        >
          <h2>
            {editIndex !== null ? "Edit Quick Link" : "Add New Quick Link"}
          </h2>
          <TextField
            label="Link Name"
            variant="outlined"
            fullWidth
            value={linkName}
            onChange={(e) => setLinkName(e.target.value)}
            error={!!errors.linkName}
            helperText={errors.linkName}
          />
          <TextField
            label="Link URL"
            variant="outlined"
            fullWidth
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            error={!!errors.linkUrl}
            helperText={errors.linkUrl}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button onClick={handleClose} variant="outlined" color="error">
              Cancel
            </Button>
            <Button onClick={handleSave} variant="contained" color="primary">
              Save
            </Button>
          </div>
        </Box>
      </Modal>
    </Grid>
  );
}
