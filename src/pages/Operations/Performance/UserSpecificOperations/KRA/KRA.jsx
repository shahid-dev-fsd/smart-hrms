import React, { useState } from "react";
import {
  Avatar,
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  Menu,
  MenuItem,
  Radio,
  RadioGroup,
  TextareaAutosize,
} from "@mui/material";
import { HiDotsHorizontal } from "react-icons/hi";
import { CiExport } from "react-icons/ci";
import { VscHistory } from "react-icons/vsc";
import CustomModal from "../../../../../components/CustomModal";
import CustomEmptyModal from "../../../../../components/CustomEmptyModal";

import Card from "./Card";
import Comment from "./Comment";

export default function KRA() {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const isMenuopen = Boolean(menuAnchor);

  const [addKRAModal, setAddKRAModal] = useState(false);
  const fields = [
    {
      type: "text",
      name: "title",
      label: "Title",
      defaultValue: "",
    },
    {
      type: "textarea",
      name: "description",
      label: "Description",
      defaultValue: "",
    },
    {
      type: "number",
      name: "weightage",
      label: "Weightage",
      limit: 999,
      defaultValue: 0,
    },
  ];

  const [exportKRAModal, setExportKRAModal] = useState(false);
  const [appraisalKRAModal, setAppraisalKRAModal] = useState(false);

  const [commentFormData, setCommentFormData] = useState({ comment: "" });
  const [commentModal, setCommentModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteCommentModal, setDeleteCommentModal] = useState(false);

  const [selectedKRA, setSelectedKRA] = useState(null);
  const [selectedComment, setSelectedComment] = useState(null);

  const [exportFormData, setExportFormData] = useState({ format: "xls" });

  const kraData = Array.from({ length: 500 }, (_, index) => ({
    id: index + 1,
    title: "Hello World",
    description: "Hello World",
    weightage: index + 1,
  }));

  const kraComment = [
    {
      id: 1,
      commentID: 1,
      username: "Hello World",
      comment: "Hello World",
      profile: "Hello World",
      time: "Today 12:38 PM",
    },
    {
      id: 2,
      commentID: 2,
      username: "Hello World",
      comment: "Hello World",
      profile: "Hello World",
      time: "Today 12:38 PM",
    },
    {
      id: 3,
      commentID: 3,
      username: "Hello World",
      comment: "Hello World",
      profile: "Hello World",
      time: "Today 12:38 PM",
    },
    {
      id: 4,
      commentID: 4,
      username: "Hello World",
      comment: "Hello World",
      profile: "Hello World",
      time: "Today 12:38 PM",
    },
  ];

  return (
    <div className="w-full h-full flex flex-col gap-3 justify-center items-center">
      <div className="w-full flex flex-row gap-3 justify-end items-center">
        <div>
          <Button
            variant="contained"
            onClick={() => {
              setAddKRAModal(true);
            }}
          >
            Tag KRA
          </Button>
        </div>
        <div>
          <IconButton
            id="basic-button"
            aria-controls={isMenuopen ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={isMenuopen ? "true" : undefined}
            onClick={(event) => {
              setMenuAnchor(event.currentTarget);
            }}
          >
            <HiDotsHorizontal className="text-2xl" />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={menuAnchor}
            open={isMenuopen}
            onClose={() => {
              setMenuAnchor(null);
            }}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() => {
                setExportKRAModal(true);
              }}
            >
              <div className="flex flex-row gap-3 justify-between items-center">
                <CiExport className="text-2xl" />
                <h1>Export</h1>
              </div>
            </MenuItem>
            <MenuItem
              onClick={() => {
                setAppraisalKRAModal(true);
              }}
            >
              <div className="flex flex-row gap-3 justify-between items-center">
                <VscHistory className="text-2xl" />
                <h1>Appraisal KRA</h1>
              </div>
            </MenuItem>
          </Menu>
        </div>
      </div>
      <div
        style={{ height: "calc(100dvh - 420px)" }}
        className="w-full overflow-scroll"
      >
        {kraData.map(({ id, title, description, weightage }, index) => {
          return (
            <Card
              key={parseInt(index)}
              id={id}
              title={title}
              description={description}
              weightage={weightage}
              handleComment={(id) => {
                setSelectedKRA({ id, title, description, weightage });
                setCommentModal(true);
              }}
              handleDelete={(id) => {
                setSelectedKRA({ id, title, description, weightage });
                setDeleteModal(true);
              }}
            />
          );
        })}
      </div>

      <CustomModal
        fields={fields}
        open={addKRAModal}
        onClose={() => {
          setAddKRAModal(false);
        }}
        onSubmit={(formData, setFormData) => {
          console.log("Add KRA Data :- ", formData);
          setFormData({});
        }}
      />

      <CustomEmptyModal
        open={commentModal}
        onClose={() => {
          setSelectedKRA({});
          setCommentModal(false);
        }}
        isScrollable={true}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(commentFormData);
            console.log(selectedKRA);
            setSelectedKRA({});
            setCommentFormData({});
            setCommentModal(false);
          }}
        >
          <div className="w-full flex flex-col gap-6 justify-center items-center">
            <div className="w-full text-xl">
              <h1>Comment</h1>
            </div>
            <div className="w-full flex flex-col gap-3">
              {kraComment.map(
                (
                  { commentID, kraID, comment, username, profile, time },
                  index
                ) => {
                  return (
                    <Comment
                      key={parseInt(index)}
                      commentID={commentID}
                      comment={comment}
                      kraID={kraID}
                      username={username}
                      profile={profile}
                      time={time}
                      handleDelete={() => {
                        setSelectedComment({
                          commentID,
                          kraID,
                          username,
                          profile,
                          time,
                        });
                        setDeleteCommentModal(true);
                      }}
                    />
                  );
                }
              )}
            </div>
            <div className="w-full">
              <div className="flex flex-row gap-3 items-center">
                <div>
                  <Avatar />
                </div>
                <div className="w-full">
                  <TextareaAutosize
                    className="w-full bg-transparent rounded-[0.3rem] border border-gray-400 border-opacity-50 mb-2 px-3 py-4"
                    placeholder={"Write An Comment"}
                    value={commentFormData.comment}
                    onChange={(event) => {
                      setCommentFormData({ comment: event.target.value });
                    }}
                  />
                </div>
              </div>
              <div className="w-full flex flex-row gap-3 justify-end items-center">
                <Button
                  variant="outlined"
                  onClick={() => {
                    setSelectedKRA({});
                    setCommentFormData({});
                    setCommentModal(false);
                  }}
                >
                  Cancle
                </Button>
                <Button variant="contained" type="submit">
                  Post
                </Button>
              </div>
            </div>
          </div>
        </form>
      </CustomEmptyModal>

      <CustomEmptyModal
        open={deleteModal}
        onClose={() => {
          setSelectedKRA({});
          setDeleteModal(false);
        }}
        isSmall={true}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(selectedKRA);
            setDeleteModal(false);
          }}
        >
          <div className="w-full flex flex-col gap-6 p-4 justify-center items-center">
            <div className="flex flex-col gap-3 justify-center items-center">
              <h1>Delete KRA</h1>
              <h1>
                Are you sure, you want to delete this {selectedKRA?.title} ?
              </h1>
            </div>
            <div className="w-full flex flex-row gap-6 justify-center items-center">
              <Button type="submit" variant="contained">
                Confirm
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  setSelectedKRA({});
                  setDeleteModal(false);
                }}
              >
                Cancle
              </Button>
            </div>
          </div>
        </form>
      </CustomEmptyModal>

      <CustomEmptyModal
        open={deleteCommentModal}
        onClose={() => {
          setSelectedComment({});
          setDeleteCommentModal(false);
        }}
        isSmall={true}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(selectedComment);
            setDeleteCommentModal(false);
          }}
        >
          <div className="w-full flex flex-col gap-6 p-4 justify-center items-center">
            <div className="flex flex-col gap-3 justify-center items-center">
              <h1>Delete Comment</h1>
              <h1>This action will permanently delete this comment.</h1>
            </div>
            <div className="w-full flex flex-row gap-6 justify-center items-center">
              <Button type="submit" variant="contained">
                Confirm
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  setSelectedComment({});
                  setDeleteCommentModal(false);
                }}
              >
                Cancle
              </Button>
            </div>
          </div>
        </form>
      </CustomEmptyModal>

      <CustomEmptyModal
        open={exportKRAModal}
        onClose={() => {
          setExportKRAModal(false);
        }}
        isSmall={true}
      >
        <div className="w-full flex flex-col gap-6 p-4 justify-center items-center">
          <div className="flex flex-col gap-3 justify-center items-center">
            <h1>Export As</h1>
            <h1>Choose the file format to export</h1>
            <div>
              <FormControl>
                <RadioGroup
                  defaultValue={exportFormData.format}
                  onChange={(event) => {
                    setExportFormData({
                      ...exportFormData,
                      format: event.target.value,
                    });
                  }}
                  className="flex gap-3"
                  sx={{ flexDirection: "row" }}
                >
                  <FormControlLabel
                    value="xls"
                    control={<Radio />}
                    label="XLS"
                  />
                  <FormControlLabel
                    value="xlsx"
                    control={<Radio />}
                    label="XLSX"
                  />
                  <FormControlLabel
                    value="csv"
                    control={<Radio />}
                    label="CSV"
                  />
                  <FormControlLabel
                    value="tsv"
                    control={<Radio />}
                    label="TSV"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          <div className="w-full flex flex-row gap-6 justify-center items-center">
            <Button
              onClick={() => {
                console.log(exportFormData);
                setExportKRAModal(false);
              }}
              variant="contained"
            >
              Export
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setExportKRAModal(false);
              }}
            >
              Cancle
            </Button>
          </div>
        </div>
      </CustomEmptyModal>

      <CustomEmptyModal
        open={appraisalKRAModal}
        onClose={() => {
          setAppraisalKRAModal(false);
        }}
      >
        <div className="w-full flex flex-col gap-6 justify-center items-center">
          <div className="w-full">
            <h1>Appraisal KRA View</h1>
          </div>
          <div className="w-full flex justify-center items-center">
            <h1>No History found</h1>
          </div>
          <div className="w-full flex flex-row gap-6 justify-center items-center">
            <Button
              variant="outlined"
              onClick={() => {
                setAppraisalKRAModal(false);
              }}
            >
              Close
            </Button>
          </div>
        </div>
      </CustomEmptyModal>
    </div>
  );
}
