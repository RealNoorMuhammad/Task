import { airports } from "./data";
const App = () => {
  let start = "ISB";
  let end = "GRC";
  const dictionary = {};
  dictionary[start] = { cost: 0, path: start };
  airports
    .filter((part) => {
      return part.start === start || part.end === start;
    })
    .forEach((el, i) => {
      if (dictionary[el.end] === void 0) {
        dictionary[el.end] = { cost: el.cost, path: [start, el.end] };
      } else if (dictionary[el.end].cost > el.cost) {
        dictionary[el.end] = { cost: el.cost, path: [start, el.end] };
      }
    });

  while (dictionary[end] === void 0) {
    for (let key in dictionary) {
      if (dictionary.hasOwnProperty(key)) {
        let closed = dictionary[key];
        airports
          .filter((part) => {
            return (
              part.start === key ||
              part.end === key ||
              part.start === key ||
              part.end === key
            );
          })
          .forEach((el, i) => {
            var c = el.cost + closed.cost;
            //console.log(el.end)
            if (dictionary[el.end] === void 0) {
              dictionary[el.end] = { cost: c, path: [closed.path, el.end] };
            } else if (dictionary[el.end].cost > c) {
              dictionary[el.end] = { cost: c, path: [closed.path, el.end] };
            }
            if (dictionary[el.start] === void 0) {
              dictionary[el.start] = { cost: c, path: [closed.path, el.end] };
            } else if (dictionary[el.start].cost > c) {
              dictionary[el.start] = { cost: c, path: [closed.path, el.end] };
            }
          });
      }
    }
  }
  console.log(dictionary[end]);
  return (
    <div>
      <h2>Cost : {dictionary[end].cost}</h2>
      <h1> Path :{dictionary[end].path[0]}</h1>
    </div>
  );
};

export default App;
