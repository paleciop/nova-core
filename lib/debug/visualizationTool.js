module.exports = debugObject => {
  const css = `* {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
          font-family: "Open Sans", sans-serif;
          background-color: rgba(250, 250, 250, 0.2);
          display: flex;
          justify-content: center;
          align-content: center;
      }
      .container {
          margin-top: 1rem;
          width: 70%;
          display: flex;
          text-align: center;
          justify-content: center;
          flex-direction: column;
          align-content: center;
      }
      .box {
        padding: 0.5rem 1rem;
        border: 1px solid lightgrey;
        box-shadow: 1px 1px 1px 0 grey;
        color: #4f4f4f;
        border-radius: 5px;
        margin: 0 0.5rem;
        margin-bottom: 0.5rem;
        min-width: 20rem;
      }
      .start {
        display: flex;
        justify-content: center;
      }
      .row {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;

      }

    .beshito {
      background-color: rgba(240, 232, 205, 0.25);
    }
    .amariito {
      background-color: rgba(246, 255, 73, 0.25);
    }
    .verdecito {
      background-color: rgba(205, 236, 207, 0.25);
    }
    .verde {
      background-color: rgba(4, 255, 21, 0.12);
    }
    .azulito {
      background-color: rgba(204, 236, 239, 0.25);
    }
    .moradito {
      background-color: rgba(221, 212, 232, 0.25);
    }
    .rosadito {
      background-color: rgba(500, 212, 232, 0.25);
    }
    .grisito {
      background-color: rgba(64, 77, 59, 0.25);
    }

    hr {
      margin-top: 1rem;
      margin-bottom: 1rem;
      border-top: 2px solid lightgray;
    }

    .priority {
      margin-bottom: 0;
      font-size: 12px;
      color: #a8c1ae;
    }
    .content-model {
      font-size: 14px;
      color: #666666;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .content-model:after, .content-model:before {
      content: "\\2193";
      font-size: 30px;
      color: #666666;
      display: flex;
      justify-content: center;
    }
    
    .content-model:last-child::after {
      content: '';
      margin-bottom: 1rem;
    }
    
    .content-model p {
      display: block;
      width: 70%;
    }
    
    .test {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
    }

    h2 {
      margin: 1rem 0;
    }`;

  const template = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Visualization Tool</title>
        <style>
          {{css}}
        </style>
      </head>
      <body>
        <div class="container">
          {{contents}}
        </div>
      </body>
    </html>`;

  const colors = [
    "beshito",
    "amariito",
    "verdecito",
    "azulito",
    "moradito",
    "rosadito",
    "grisito"
  ];

  const minifyHTML = html =>
    html
      .replace(/>[\r\n ]+</g, "><")
      .replace(/(<.*?>)|\s+/g, (m, $1) => ($1 ? $1 : " "))
      .trim();

  const minifyCSS = css =>
    css
      .replace(/(\/\*.*\*\/)|(\n|\r)+|\t*/g, "")
      .replace(/\s{2,}/g, " ")
      .replace(/(\s)*:(\s)*/g, ":")
      .replace(/(\s)+\./g, " .")
      .replace(/(\s|\n|\r)*\{(\s|\n|\r)*/g, "{")
      .replace(/(\s|\n|\r)*\}(\s|\n|\r)*/g, "}")
      .replace(/;(\s)+/g, ";")
      .replace(/,(\s)+/g, ",")
      .replace(/(\s)+!/g, "!");

  const newColumn = (color, name) => {
    return `<div class="box ${color}"><span class="name">${name}</span></div>`;
  };

  const formatJson = json => JSON.stringify(json, null, 2);
  const heading = (title, initialContentModel) =>
    `<h2>${title}</h2><div class="start"><div class="box verde">Start execution</div></div><div class="content-model"><p class="input">${initialContentModel}</p></div>`;

  const contentModelSection = contentModel =>
    `<div class="content-model"><p>${contentModel}</p></div>`;

  const numberOfIndependentContextProcessors = debugObject.independent.length;
  let contents = heading(
    "Dependent Context Processor Execution",
    formatJson(debugObject.dependentInputContentModel)
  );
  let colorIndex = -1;

  debugObject.dependent.forEach((contextProcessorGroup, i) => {
    const contentModel = formatJson(contextProcessorGroup.contentModel);
    colorIndex = colorIndex === colors.length - 1 ? 0 : ++colorIndex;
    const color = colors[colorIndex];

    contents += `<div class="context-processor-group"><p class="priority">priority ${contextProcessorGroup.priority}</p>`;
    contents += `<div class="row"><div class="test">`;

    contextProcessorGroup.contextProcessors.forEach(contextProcessorName => {
      contents += newColumn(color, contextProcessorName);
    });

    contents += "</div></div>";
    contents += contentModelSection(contentModel);
    contents += "</div>";
  });
  contents += "<hr>";
  contents += heading(
    "Overall Context Processor Execution",
    formatJson(debugObject.originalContentModel)
  );

  contents += `<div class="context-processor-group"><div class="row">`;
  contents += newColumn(colors[1], "Dependent Context Processors");
  debugObject.independent.forEach(contextProcessor => {
    contents += newColumn(colors[3], contextProcessor.name);
  });
  contents += "</div>";
  contents += contentModelSection(formatJson(debugObject.finalContentModel));
  contents += "</div>";

  return minifyHTML(
    template
      .replace("{{contents}}", contents)
      .replace("{{css}}", minifyCSS(css))
  );
};
