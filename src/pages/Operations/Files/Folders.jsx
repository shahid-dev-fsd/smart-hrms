import React, { useState } from "react";
import { IconButton, Button, TextField, Modal, Grid } from "@mui/material";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { IoArrowBackCircleOutline } from "react-icons/io5";

export default function Folders() {
  const [isSearch, setIsSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPath, setCurrentPath] = useState([]);
  const [addFolderModal, setAddFolderModal] = useState(false);
  const [editFolderModal, setEditFolderModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [editFolderName, setEditFolderName] = useState("");
  const [folderToEdit, setFolderToEdit] = useState(null);

  const [folders, setFolders] = useState([
    {
      name: "Folder 1",
      children: [
        {
          name: "Subfolder 1-1",
          children: [],
        },
        {
          name: "Subfolder 1-2",
          children: [
            {
              name: "Subfolder 1-2-1",
              children: [],
            },
          ],
        },
      ],
    },
    {
      name: "Folder 2",
      children: [],
    },
    {
      name: "Folder 3",
      children: [
        {
          name: "Subfolder 3-1",
          children: [],
        },
      ],
    },
  ]);

  const navigateToFolder = (folderName) => {
    setCurrentPath([...currentPath, folderName]);
  };

  const navigateBack = () => {
    setCurrentPath(currentPath.slice(0, -1));
  };

  const getCurrentFolder = () => {
    let currentFolder = folders;
    for (const folderName of currentPath) {
      currentFolder = currentFolder.find((f) => f.name === folderName).children;
    }
    return currentFolder;
  };

  const handleAddFolder = () => {
    if (!newFolderName.trim()) return;

    let currentFolder = folders;
    for (const folderName of currentPath) {
      currentFolder = currentFolder.find((f) => f.name === folderName).children;
    }
    currentFolder.push({ name: newFolderName, children: [] });
    setFolders([...folders]);
    setNewFolderName("");
    setAddFolderModal(false);
  };

  const handleEditFolder = () => {
    if (!editFolderName.trim() || !folderToEdit) return;

    const updateFolderName = (foldersList) => {
      for (const folder of foldersList) {
        if (folder === folderToEdit) {
          folder.name = editFolderName;
          break;
        }
        if (folder.children) updateFolderName(folder.children);
      }
    };

    updateFolderName(folders);
    setFolders([...folders]);
    setEditFolderModal(false);
    setEditFolderName("");
    setFolderToEdit(null);
  };

  const handleDeleteFolder = (folderToDelete) => {
    const deleteFolder = (foldersList) => {
      for (let i = 0; i < foldersList.length; i++) {
        if (foldersList[i] === folderToDelete) {
          foldersList.splice(i, 1);
          break;
        }
        if (foldersList[i].children) deleteFolder(foldersList[i].children);
      }
    };

    deleteFolder(folders);
    setFolders([...folders]);
  };

  const openEditModal = (folder) => {
    setFolderToEdit(folder);
    setEditFolderName(folder.name);
    setEditFolderModal(true);
  };

  const currentFolder = getCurrentFolder();

  const filteredFolders = currentFolder.filter((folder) =>
    folder.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const FolderCard = ({ folder }) => {
    return (
      <div
        className="w-72 h-16 flex flex-row justify-between items-center p-3 border border-gray-800 rounded-lg cursor-pointer"
        onClick={() => navigateToFolder(folder.name)}
      >
        <h1>{folder.name}</h1>
        <div className="flex flex-row gap-1">
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              openEditModal(folder);
            }}
          >
            <MdOutlineModeEdit />
          </IconButton>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteFolder(folder);
            }}
          >
            <MdDeleteOutline />
          </IconButton>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full min-h-60 flex flex-col gap-3 items-center">
      <div className="w-full h-full flex flex-row gap-3 justify-between items-center">
        <div className="flex flex-row gap-3 items-center text-nowrap">
          {currentPath.length > 0 && (
            <IconButton variant="outlined" onClick={navigateBack}>
              <IoArrowBackCircleOutline />
            </IconButton>
          )}
          <h2 className="text-lg font-semibold">
            {currentPath.length > 0 ? currentPath.join(" / ") : ""}
          </h2>
        </div>
        {isSearch ? (
          <div className="w-full flex flex-row gap-3 items-center">
            <TextField
              sx={{ width: "100%" }}
              label="Search"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <IconButton
              onClick={() => {
                setIsSearch(false);
                setSearchQuery("");
              }}
            >
              <RxCross2 />
            </IconButton>
          </div>
        ) : (
          <div className="flex flex-row gap-3 items-center">
            <Button variant="contained" onClick={() => setAddFolderModal(true)}>
              Add Folder
            </Button>
            <IconButton
              onClick={() => {
                setIsSearch(true);
              }}
            >
              <IoIosSearch />
            </IconButton>
          </div>
        )}
      </div>

      {filteredFolders.length > 0 ? (
        <div className="w-full h-full grid gap-3 grid-cols-5 justify-center items-center">
          {filteredFolders.map((folder, index) => (
            <FolderCard key={index} folder={folder} />
          ))}
        </div>
      ) : (
        <div className="w-full flex flex-col p-3 gap-3 justify-center items-center">
          <h2>No Folder Found</h2>
          <Button variant="contained" onClick={() => setAddFolderModal(true)}>
            Add Folder
          </Button>
        </div>
      )}

      <Modal
        open={addFolderModal}
        onClose={() => setAddFolderModal(false)}
        aria-labelledby="add-folder-modal"
        aria-describedby="add-folder-modal-description"
      >
        <Grid
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "background.default",
            flexDirection: "column",
          }}
          className="w-1/2 p-4 flex flex-col gap-4 rounded-lg border border-gray-800"
        >
          <div>
            <h1 className="text-lg font-semibold">Add Folder</h1>
          </div>
          <TextField
            label="Folder Name"
            variant="outlined"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            fullWidth
          />
          <div className="w-full flex flex-row justify-between items-center">
            <Button type="submit" variant="contained" onClick={handleAddFolder}>
              Add
            </Button>
            <Button onClick={() => setAddFolderModal(false)} variant="outlined">
              Cancel
            </Button>
          </div>
        </Grid>
      </Modal>

      <Modal
        open={editFolderModal}
        onClose={() => setEditFolderModal(false)}
        aria-labelledby="edit-folder-modal"
        aria-describedby="edit-folder-modal-description"
      >
        <Grid
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "background.default",
            flexDirection: "column",
          }}
          className="w-1/2 p-4 flex flex-col gap-4 rounded-lg border border-gray-800"
        >
          <div>
            <h1 className="text-lg font-semibold">Edit Folder</h1>
          </div>
          <TextField
            label="Folder Name"
            variant="outlined"
            value={editFolderName}
            onChange={(e) => setEditFolderName(e.target.value)}
            fullWidth
          />
          <div className="w-full flex flex-row justify-between items-center">
            <Button
              type="submit"
              variant="contained"
              onClick={handleEditFolder}
            >
              Save
            </Button>
            <Button
              onClick={() => setEditFolderModal(false)}
              variant="outlined"
            >
              Cancel
            </Button>
          </div>
        </Grid>
      </Modal>
    </div>
  );
}
