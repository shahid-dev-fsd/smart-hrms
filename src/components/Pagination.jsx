import React from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  limit,
  onLimitChange,
}) => {
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const handleLimitChange = (event) => {
    onLimitChange(parseInt(event.target.value, 10));
  };

  return (
    <div className="flex flex-row justify-end items-center gap-3">
      <div>
        <FormControl sx={{ width: "100px" }}>
          <InputLabel>Page</InputLabel>
          <Select value={limit} label="Page" onChange={handleLimitChange}>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div
        variant="contained"
        color="primary"
        aria-label="outlined primary button group"
        className="flex flex-row gap-3 justify-center items-center"
      >
        <Button
          variant="outlined"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <div>{`Page ${currentPage} of ${totalPages}`}</div>
        <Button
          variant="outlined"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
