import { IconButton } from "@mui/material";
import { BiCommentDetail } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";

const Card = ({ id, title, description, weightage, handleDelete }) => {
  return (
    <div className="w-full h-20 p-3 my-3 flex flex-row gap-3 justify-between items-center border border-neutral-700 rounded-lg">
      <div className="flex flex-row gap-3 justify-center items-center">
        <div>
          <h1>{id}</h1>
          <h1>{title}</h1>
          <h1>{description}</h1>
        </div>
      </div>
      <div className="flex flex-col gap-3 justify-center items-center">
        <h1>
          Weightage {"("}%{")"}
        </h1>
        <h1>
          {weightage} <span>%</span>
        </h1>
      </div>
      <div className="flex flex-row gap-3 justify-center items-center">
        <IconButton
          onClick={() => {
            handleDelete({ id, title, description, weightage });
          }}
        >
          <MdOutlineDelete />
        </IconButton>
      </div>
    </div>
  );
};

export default Card;
