import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Divider,
  Avatar,
  Tooltip,
  Modal,
  Button,
  Menu,
  MenuItem,
  TextField,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useMessage } from "../../components/Header";
import { ServerImage } from "../../components/Images";
import useModal from "../../hooks/useModal";
import DeleteOrganization from "./DeleteOrganization";
import { setCookie } from "../../utilities/cookies";
import edit from "../../assets/SidebarIcons/tabler_edit.png";
import delet from "../../assets/SidebarIcons/Vector.png";
import { useMediaQuery, useTheme } from '@mui/material';
import dotsIcon from "../../assets/SidebarIcons/proicons_more.png"

const EditIcon = () => <img src={edit} alt="edit" />;
const DeleteIcon = () => <img src={delet} alt="delete" />;
const Dot = () => <img src={dotsIcon} alt="..." />;

const ListOrganization = () => {
  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState([]);
  const [deleteOrg, setDeleteOrg] = useState(null);
  const [editOrg, setEditOrg] = useState(null); // State for editing organization
  const { showError, showSuccess } = useMessage();
  const { modalState, openModal, closeModal } = useModal();
  const [editModalState, setEditModalState] = useState(false); // Separate state for the edit modal
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const openMenu = (event, org) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrg(org);
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditOrg((prev) => ({ ...prev, logo: file }));
    }
  };
  
  const closeMenu = () => {
    setAnchorEl(null);
    setSelectedOrg(null);
  };

  // Handle Delete Organization
  async function handleDelete(org) {
    try {
      const response = await axios.delete(`/hr/organization/${org._id}`);
      const data = response.data;
      if (data.success) {
        setOrganizations((prevOrganizations) =>
          prevOrganizations.filter((o) => o._id !== org._id)
        );
        showSuccess("Organization deleted successfully");
        closeModal();
        setDeleteOrg(null);
      } else {
        showError("Failed to delete the organization");
      }
    } catch (error) {
      console.error("Error deleting organization", error);
      showError("Error deleting organization");
    }
  }

  function openDeleteBox(org) {
    openModal();
    setDeleteOrg(org);
  }

  // Handle Organization Selection
  async function handleSelect(org) {
    if (org.status) {
      try {
        const response = await axios.post(`/hr/organization/select`, {
          organizationId: org._id,
        });
        const data = response.data;
        if (data.success) {
          setCookie("orgToken", data.data);
          localStorage.setItem("org", JSON.stringify(org));
          setTimeout(() => {
            // navigate("/");
            window.location.href="/";
          }, 1000);
        }
      } catch (error) {
        console.error("Error selecting organization", error);
        showError("Error selecting organization");
      }
    }
  }

  // Fetch Organizations
  const getOrganizations = async () => {
    try {
      const response = await axios.get(`/hr/organization`);
      const data = response.data;
      console.log(data)
      if (data.success) {
        setOrganizations(data.data);
      }
    } catch (error) {
      console.error("Error fetching organizations", error);
    }
  };

  // Handle Edit Organization
  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditOrg((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEditSubmit = async () => {
    try {
      const response = await axios.put(`/hr/organization/${editOrg._id}`, editOrg);
      const data = response.data;

      if (data.success) {
        setOrganizations((prev) =>
          prev.map((org) =>
            org._id === editOrg._id ? { ...org, ...editOrg } : org
          )
        );
        showSuccess("Organization updated successfully");
        closeEditModal(); // Close the edit modal
      } else {
        showError("Failed to update the organization");
      }
    } catch (error) {
      console.error("Error updating organization", error);
      showError("Error updating organization");
    }
  };

  const openEditModal = () => {
    setEditModalState(true); // Open the edit modal
  };

  const closeEditModal = () => {
    setEditModalState(false); // Close the edit modal
  };

  useEffect(() => {
    getOrganizations();
  }, []);

 const editClick=(org)=>{
  navigate(`/EditOrganization/${org._id}`)
  }

  return (
    <Box
      sx={{
        backgroundColor: "background.main",
        paddingX: { xs: 3, sm: 5 },
        paddingY: 10,
        width: "100vw",
        minHeight: "100vh",
      }}
    >
      <Box sx={{ paddingRight: { xs: 0, sm: 25 } }}>
        <Typography variant="h4">Organization List</Typography>
        <Typography sx={{ marginTop: ".7rem", color: "text.three", fontSize:isMobile?"13px":"" }}>
          HR organization refers to the style of coordination, communication and management, a team or an employee uses throughout his/her contract with the organization.
        </Typography>
        <Typography sx={{ marginTop: 5, color: "text.three" }}>
          Total Organizations
        </Typography>
        <Typography
          variant="h4"
          sx={{ marginTop: ".2rem", marginBottom: 5, color: "text.three" }}
        >
          {organizations.length}
        </Typography>
      </Box>

      <Box sx={{ overflowX: "hidden" }}>
        <Grid container sx={{ p: 1, minWidth: 525 }}>
          <Grid item xs={4} sm={8}>
            Organization
          </Grid>
          <Grid item xs={2}>
            Status
          </Grid>
          <Grid item xs={2}>
            Action
          </Grid>
        </Grid>
        <Divider sx={{ minWidth: 525, marginBottom: "30px" }} />
        <Box>
          {organizations.map((org) => (
            <Grid key={org._id} container sx={{ p: 1, minWidth: 565 }}>
              <Grid item xs={4} sm={8}>
                <div className="flex flex-row gap-2">
                  <Avatar sx={{ width: 30, height: 30, fontSize: 10 }}>
                    <ServerImage src={org?.logo ?? ""} width="30" height="30" />
                  </Avatar>
                  <div
                    className="px-3 py-1 mr-2 truncate rounded-lg hover:text-sky-600 active:text-blue-600"
                    onClick={() => handleSelect(org)}
                  >
                    {org.name}
                  </div>
                </div>
              </Grid>
              <Grid item xs={2} sm={2} marginLeft={isMobile?-3:-1}>
                <div
                  className="px-3 py-1 w-fit"
                  style={{
                    backgroundColor: org.status ? "#42B82433" : "#B8242433",
                    color: org.status ? "#32FC00" : " #FF0000",
                    borderRadius: "5px",
                  }}
                >
                  {org.status ? "Active" : "In-Active"}
                </div>
              </Grid>
              <Grid item xs={-3} sm={2}>
                <Tooltip>
                <div className="flex justify-between items-center" style={{ borderRadius: "20px" }}>
                    <Button
                      onClick={(e) => openMenu(e, org)}
                      sx={{ color: "text.primary" }}
                    >
                     <span className={`text-3xl ${isMobile ? "mt-[-15px] ml-[-10px]" : "mt-[-20px]"}`} >...</span>

                    </Button>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={closeMenu}
                    >
                      <MenuItem
                        onClick={() => editClick(selectedOrg)}
                        
                      
                        sx={{ gap: "8px" }}
                      >
                        <EditIcon  /> Edit
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          openDeleteBox(selectedOrg); // Open the delete modal
                          closeMenu();
                        }}
                        sx={{ gap: "8px" }}
                      >
                        <DeleteIcon /> Delete
                      </MenuItem>
                    </Menu>
                  </div>
                </Tooltip>
              </Grid>
            </Grid>
          ))}
        </Box>
      </Box>

      {/* Delete Modal */}
      <Modal
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        open={modalState} // Use the delete modal state
        onClose={closeModal}
      >
        <DeleteOrganization
          onClose={closeModal}
          onDelete={handleDelete}
          org={deleteOrg}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        open={editModalState && editOrg !== null} // Check if the edit modal should be open
        onClose={closeEditModal} // Close the edit modal
      >
        <Box sx={{ backgroundColor: "background.view", padding: 4, borderRadius: 2 }}>
          
          <form>
           

           <div className="w-[13%] pb-3 flex items-center">
              <p className="text-[20px] whitespace-nowrap">
                Organization Name
              </p>
            </div>
            <TextField
              name="name"
              size="small"
              value={editOrg?.name || ""}
              variant="outlined"
              onChange={handleEditChange}
              placeholder="Enter Name"
              fullWidth
            />



            <div className="w-[13%] pb-3 flex items-center">
              <p className="text-[20px] whitespace-nowrap">
                Organization Email
              </p>
            </div>
            <TextField
              name="email"
              size="small"
              value={editOrg?.email || ""}
              variant="outlined"
             
              onChange={handleEditChange}
              placeholder="Enter Email"
              fullWidth
            />
          
          <div className="w-[13%] pb-3 flex items-center">
              <p className="text-[20px] whitespace-nowrap">
                Organization Website url
              </p>
            </div>
            <TextField
              name="Website"
              size="small"
              value={editOrg?.website || ""}
              variant="outlined"
             
              onChange={handleEditChange}
              placeholder="Enter Email"
              fullWidth
            />

<input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files[0];
    if (file) {
      setEditOrg((prev) => ({
        ...prev,
        logo: file, // Store the file object for upload
      }));
    }
  }}
/>

            <FormControlLabel
              control={
                <Switch
                  checked={editOrg?.status || false}
                  onChange={handleEditChange}
                  name="status"
                />
              }
              label="Active"
            />
            
            <Button
              onClick={handleEditSubmit}
              variant="contained"
              sx={{ marginTop: 2 }}
            >
              Save Changes
            </Button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default ListOrganization;
