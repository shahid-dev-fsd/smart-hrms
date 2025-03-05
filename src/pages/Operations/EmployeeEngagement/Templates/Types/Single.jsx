import React from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const Single = ({
  mode = "add",
  question = {},
  value = "",
  handleChange = () => {},
}) => {
  return (
    <FormControl>
      <RadioGroup
        className="flex"
        sx={{ flexDirection: "row" }}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      >
        {question?.options?.map(({ id, title }) => (
          <FormControlLabel
            key={id}
            value={id}
            control={<Radio disabled={mode === "view"} />}
            label={title}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default Single;
