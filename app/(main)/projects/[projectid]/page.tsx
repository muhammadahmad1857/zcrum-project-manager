import React from "react";

const Project = ({ params }: { params: { projectid: string } }) => {
  const id = params.projectid;
  return <div>{id}</div>;
};

export default Project;
