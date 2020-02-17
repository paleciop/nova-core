const fs = require("fs");
const statistics = {
  "originalContentModel": {},
  "dependent": [{
    "contentModel": {
      "independentProperty": "This property was added by the Context Processor that was defined as an object",
      "test": "1"
    },
    "priority": 100,
    "contextProcessors": [
      "ErrorContextProcessor",
      "FirstContextProcessor"
    ]
  },
    {
      "contentModel": {
        "independentProperty": "This property was added by the Context Processor that was defined as an object",
        "test": "12"
      },
      "priority": 50,
      "contextProcessors": [
        "SecondContextProcessor"
      ]
    },
    {
      "contentModel": {
        "independentProperty": "This property was added by the Context Processor that was defined as an object",
        "test": "123"
      },
      "priority": 10,
      "contextProcessors": [
        "ThirdContextProcessor"
      ]
    },
    {
      "contentModel": {
        "independentProperty": "This property was added by the Context Processor that was defined as an object",
        "test": "123",
        "asyncTest": "312"
      },
      "priority": 0,
      "contextProcessors": [
        "FirstAsyncContextProcessor",
        "SecondAsyncContextProcessor",
        "ThirdAsyncContextProcessor"
      ]
    }
  ],
  "independent": [
    "ObjectContextProcessor",
    "IndependentAsyncContextProcessor"
  ]
};

let string =
  '<html><head><title>Test</title> <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"> <link rel="stylesheet" href="./test.css"/></head><body><div>';
const newColumn = (contents, size) =>
  '<div class="col-' +
  Math.floor(12 / size) +
  ' themed-grid-col">' +
  contents +
  "</div>";
string += '<p class="text-center input">input: '+ JSON.stringify(statistics.originalContentModel, null, " ") +'</p>';
statistics.dependent.forEach((dep, i) => {

  const last = i === statistics.dependent.length - 1;
  string +=
    '<div class="container-fluid level '+ (last? 'last' : '') +' "><p class="text-center priority">priority ' +
    dep.priority +
    "</p>";
  string += '<div class="row mb-' + dep.contextProcessors.length + '">';

  dep.contextProcessors.forEach(cp => {
    string += newColumn(
      '<div class="context-processor text-center ">' + cp + "</div>",
      dep.contextProcessors.length
    );
  });
  string += "</div><p class='text-center priority'>"+ JSON.stringify(dep.contentModel, null, ' ') +"</p></div>";
});

string += "</div></body></html>";
fs.writeFileSync("test.html", string);
console.log(string);
