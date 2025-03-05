import React from "react";
import CreaatePost from "./CreaatePost";
import Post from "./Post";

export default function DepartmentWall() {
  return (
    <div className="w-full h-full flex flex-col gap-3">
      <CreaatePost />
      <Post />
      <Post />
    </div>
  );
}
