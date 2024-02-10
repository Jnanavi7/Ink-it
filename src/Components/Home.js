import React from "react";
import Notes from "./Notes";
import Alert from "./Alert";

const Home = () => {
  return (
    <>
      <Alert message="This is a alert message" />
      <Notes />
    </>
  );
};

export default Home;
