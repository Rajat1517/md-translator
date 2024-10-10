import React from "react";

function POC() {
  const debounce = (fn, time) => {
    let timer = null;
    return (...args) => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        timer = null;
        return fn(...args);
      }, time);
    };
  };

  const tokenise = (md) => {
    const _tokeniser = /(#|(\r\n)|(\*\*)|[^*#]+)/g;
    let res = [];
    let match;
    while ((match = _tokeniser.exec(md)) !== null) {
      res.push(match[0]);
    }
    console.log(res);
    _parser(res);
  };

  function _parser(tokens) {
    const ast = [];
    let currentTokenIndex = 0;

    function nextToken() {
      return tokens[currentTokenIndex++];
    }

    while (currentTokenIndex < tokens.length) {
      let token = nextToken();

      if (token === "#") {
        let headerContent = "";
        while (
          tokens[currentTokenIndex] !== undefined &&
          tokens[currentTokenIndex] !== "**"
        ) {
          headerContent += nextToken();
        }
        ast.push({
          type: "header",
          content: headerContent.trim(),
        });
      } else if (token === "**") {
        let boldContent = "";
        while (
          tokens[currentTokenIndex] !== undefined &&
          tokens[currentTokenIndex] !== "**"
        ) {
          boldContent += nextToken();
        }
        nextToken();
        ast.push({
          type: "bold",
          content: boldContent.trim(),
        });
      } else {
        ast.push({
          type: "text",
          content: token.trim(),
        });
      }
    }

    _writeHTML(ast);
  }

  function _writeHTML(ast) {
    let html = "";

    ast.forEach((line) => {
      if (line.type === "header") {
        html += `<h1>${line.content}</h1>`;
      } else if (line.type === "bold") {
        html += `<strong>${line.content}</strong>`;
      } else {
        html += `<p>${line.content}</p>`;
      }
    });
    let output = document.getElementById("output");
    output.innerHTML = html;
  }

  const debouncedTokenise = debounce(tokenise, 1000);

  return (
    <div className="App">
      <textarea
        rows={30}
        cols={100}
        onChange={(e) => {
          debouncedTokenise(e.target.value);
        }}
      />
      <div id="output"></div>
    </div>
  );
}

export default POC;
