import _ from "lodash";
import "./App.css";
import { useCallback, useEffect, useState } from "react";
import MarkdownPreview from "./components/MarkdownPreview";

function App() {
  const [text, setText] = useState("");
  const [headingObjList, setHeadingObjList] = useState([]);

  const debounceHandleChange = useCallback(
    _.debounce((value) => {
      setText(value);
    }, 300),
    []
  );

  const handleTextArea = (e) => {
    debounceHandleChange(e.target.value);
  };

  useEffect(() => {
    const newHeadings = text
      .split("\n")
      .filter((element) => {
        const match = element.match(/^(#{1,6})\s(.+)/);
        return match !== null;
      })
      .map((element) => {
        const match = element.match(/^(#{1,6})\s(.+)/);
        return {
          tag: match[1],
          content: match[2],
        };
      });

    setHeadingObjList(newHeadings);
  }, [text]);

  return (
    <div className="App">
      <textarea onChange={handleTextArea}></textarea>
      <MarkdownPreview headingObjList={headingObjList} />
    </div>
  );
}

export default App;
