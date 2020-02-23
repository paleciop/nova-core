module.exports = debugObject => {
  const css = `.context-processor {
            padding: 10px 2px 10px 2px;
            border: 1px solid lightgrey;
            box-shadow: 1px 1px 1px 0 grey;
            color: #4f4f4f;
            border-radius: 5px;
          }
          .col-center {
            float: none;
            margin: auto;
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
          .center {
            margin: auto;
          }
          .themed-grid-col {
            padding-left: 2px;
            padding-right: 2px;
          }
          .level {
            margin-bottom: -5px
          }
          .container-fluid.level:after {
            content: '\\2193';
            display: inline-block;
            width: 100%;
            text-align: center;
            font-size: 30px;
          }
          .container-fluid.level.last:after {
            content: '';
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
            margin-bottom: 0;
            margin-top: 12px;
            font-size: 14px;
            color: #666666;
          }
          .input {
            margin-bottom: 0;
            font-size: 14px;
            color: #666666;
          }
          .contents {
            margin: 20px 40px;
          }
          .body {
            background-color: rgba(240, 167, 220, 0.11);
          }
          .test:after {
            content: '\\2193';
            display: inline-block;
            width: 100%;
            text-align: center;
            font-size: 30px;
          }
          .name {
            font-family: "Open Sans", sans-serif;
            font-size: 15px;
            color: #3e3e3e;
          }`;
  const template = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Test</title>
        <link rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
          crossorigin="anonymous">
        <style>
          {{css}}
        </style>
      </head>
      <body>
        <div class="contents">
          {{contents}}
        </div>
      </body>
    </html>`;

  const colors = [
    'beshito',
    'amariito',
    'verdecito',
    'azulito',
    'moradito',
    'rosadito',
    'grisito'
  ];

  const minifyHTML = html =>
    html
      .replace(/>[\r\n ]+</g, '><')
      .replace(/(<.*?>)|\s+/g, (m, $1) => ($1 ? $1 : ' '))
      .trim();

  const minifyCSS = css =>
    css
      .replace(/(\/\*.*\*\/)|(\n|\r)+|\t*/g, '')
      .replace(/\s{2,}/g, ' ')
      .replace(/(\s)*:(\s)*/g, ':')
      .replace(/(\s)+\./g, ' .')
      .replace(/(\s|\n|\r)*\{(\s|\n|\r)*/g, '{')
      .replace(/(\s|\n|\r)*\}(\s|\n|\r)*/g, '}')
      .replace(/;(\s)+/g, ';')
      .replace(/,(\s)+/g, ',')
      .replace(/(\s)+!/g, '!');

  const newColumn = (color, name, size) => {
    let classes = '';
    switch (size) {
      case 1:
        classes = '-lg-6 col-center col-md-12';
        break;
      case 2:
        classes = '-lg-6 col-md-12';
        break;
      case 3:
        classes = '-lg-4 col-sm-12';
      default:
        break;
    }
    return `<div class="col${classes} themed-grid-col"><div class="context-processor text-center ${color}"><span class="name">${name}</span></div></div>`;
  };

  const formatJson = json => {
    let str = '';
    Object.keys(json).forEach(key => {
      str += `<strong>${key}: </strong> ${json[key]}<br> `;
    });
    return str || '{}';
  };

  const heading = (title, initialContentModel) =>
    `<h2 class="text-center">${title}</h2><div class="row"><div class="col-3 col-center"><div class="context-processor text-center verde"><span><strong>Start execution</strong></span></div></div></div><div class="container-fluid level"></div><div class="row test"><div class="col-6 col-center"><p class="text-center input">${initialContentModel}</p></div></div>`;

  const contentModelSection = contentModel =>
    `<div class="row"><div class="col-6 col-center"> <p class='text-center content-model'>${contentModel}</p></div></div></div>`;

  const numberOfIndependentContextProcessors = debugObject.independent.length;
  let contents = heading(
    'Dependent Context Processor Execution',
    formatJson(debugObject.dependentInputContentModel)
  );
  let colorIndex = -1;

  debugObject.dependent.forEach((contextProcessorGroup, i) => {
    const contentModel = formatJson(contextProcessorGroup.contentModel);
    const last = i === debugObject.dependent.length - 1 ? 'last' : '';
    colorIndex = colorIndex === colors.length - 1 ? 0 : ++colorIndex;
    const color = colors[colorIndex];
    const rowSize = contextProcessorGroup.contextProcessors.length;
    let rowClasses = '';
    switch (rowSize) {
      case 1:
      case 2:
        rowClasses = 'center w-50 ';
        break;
      case 3:
      case 4:
        rowClasses = 'center w-75';
        break;
      default:
        break;
    }
    contents += `<div class="container-fluid level ${last}"><p class="text-center priority">priority ${contextProcessorGroup.priority}</p>`;
    contents += `<div class="row ${rowClasses}">`;

    contextProcessorGroup.contextProcessors.forEach(contextProcessorName => {
      contents += newColumn(color, contextProcessorName, rowSize);
    });

    contents += '</div>';
    contents += contentModelSection(contentModel);
  });
  contents += '<hr>';
  contents += heading(
    'Overall Context Processor Execution',
    formatJson(debugObject.originalContentModel)
  );

  contents += `<div class="container-fluid level last"><div class="row test">`;
  contents += newColumn(
    colors[1],
    'Dependent Context Processors',
    numberOfIndependentContextProcessors + 1
  );
  debugObject.independent.forEach(contextProcessor => {
    contents += newColumn(
      colors[3],
      contextProcessor.name,
      numberOfIndependentContextProcessors + 1
    );
  });
  contents += '</div>';
  contents += contentModelSection(formatJson(debugObject.finalContentModel));

  return minifyHTML(
    template
      .replace('{{contents}}', contents)
      .replace('{{css}}', minifyCSS(css))
  );
};
