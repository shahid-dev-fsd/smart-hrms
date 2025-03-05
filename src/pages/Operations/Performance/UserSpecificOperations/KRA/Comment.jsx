import { Avatar, IconButton } from "@mui/material";
import { MdOutlineDelete } from "react-icons/md";

const Comment = ({
  commentID,
  kraID,
  username,
  comment,
  profile,
  time,
  handleDelete,
}) => {
  return (
    <div className="w-full p-3 flex flex-row gap-3 justify-between items-center border border-neutral-700 rounded-lg">
      <div className="flex flex-col gap-3">
        <div className="flex flex-row gap-3 justify-center items-center">
          <div>
            <Avatar />
          </div>
          <div>
            <h1>{username}</h1>
            <h1>{time}</h1>
          </div>
        </div>
        <div>
          <h1>{comment}</h1>
        </div>
      </div>
      <div>
        <IconButton onClick={handleDelete}>
          <MdOutlineDelete />
        </IconButton>
      </div>
    </div>
  );
};

export default Comment;
