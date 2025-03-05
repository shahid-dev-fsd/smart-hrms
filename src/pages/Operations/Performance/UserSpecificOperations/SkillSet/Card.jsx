import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";

export default function Card({ id, level, name, checked }) {
  return (
    <div className="w-80 flex flex-row justify-between items-center gap-3 px-3 py-3 border border-neutral-700 rounded-lg text-nowrap">
      <FormControl sx={{ width: "100px" }}>
        <InputLabel>Level</InputLabel>
        <Select value={level} label="Level">
          <MenuItem value={0}>0</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
        </Select>
      </FormControl>
      <div className="w-[0.2rem] h-10 rounded-md bg-neutral-700" />
      <h1>{name}</h1>
      <div className="w-[0.2rem] h-10 rounded-md bg-neutral-700" />
      <FormControlLabel control={<Checkbox value={checked} />} />
    </div>
  );
}
