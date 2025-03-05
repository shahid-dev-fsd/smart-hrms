import React from "react";
import { FormControl, FormControlLabel, Checkbox } from "@mui/material";

const Multiple = ({ question, mode, handleChange, value }) => {
  return (
    <FormControl className="flex" sx={{ flexDirection: "row" }}>
      {question?.options?.map(({ id, title }) => (
        <FormControlLabel
          key={id}
          control={
            <Checkbox
              checked={value?.includes(id) || false}
              disabled={mode === "view"}
              onChange={(e) => {
                const newValues = e.target.checked
                  ? [...(value || []), id]
                  : value?.filter((value) => value !== id);
                handleChange(newValues);
              }}
            />
          }
          label={title}
        />
      ))}
    </FormControl>
  );
};

export default Multiple;
