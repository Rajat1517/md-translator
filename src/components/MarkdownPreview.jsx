import React, { useEffect } from "react";
import { renderHeading } from "../utils/renderHeading";

function MarkdownPreview({ headingObjList }) {
  useEffect(() => {
    console.log(headingObjList);
  }, [headingObjList]);
  return (
    <div>
      <h4>Preview:</h4>
      {headingObjList?.map((item, index) => (
        <div className="markdown-preview" key={index}>
          {renderHeading(item)}
        </div>
      ))}
    </div>
  );
}

export default MarkdownPreview;
