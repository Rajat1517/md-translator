import React from "react";

export const renderHeading = (data) => {
  const { tag, content } = data;
  switch (tag) {
    case "#":
      return <h1>{content}</h1>;
    case "##":
      return <h2>{content}</h2>;
    case "###":
      return <h3>{content}</h3>;
    case "####":
      return <h4>{content}</h4>;
    case "#####":
      return <h5>{content}</h5>;
    case "######":
      return <h6>{content}</h6>;
    default:
      return null;
  }
};