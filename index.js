const sampleData = [
  {
    name: "Any Name",
    age: 29,
    place: "Some Really Looooooooooooooooooong text",
    tick: Date.now()
  },
  {
    name: "Chronic Bachelor",
    age: 9874,
    place: "Average"
  },
  {
    name: `Don't have any other props`
  },
  {
    name: "Third Person",
    age: 4,
    place: "tiny"
  }
];
const columns = Array.from(
  new Set(sampleData.reduce((acl, curr) => acl.concat(Object.keys(curr)), []))
);

const transpose = columns.reduce(
  (acl, curr) =>
    Object.assign({}, acl, { [curr]: sampleData.map(i => i[curr]) }),
  {}
);

const padConfig = columns.reduce((acl, curr) => {
  return Object.assign({}, acl, {
    [curr]: Math.max(
      curr.length,
      ...sampleData.map(i => (i[curr] ? String(i[curr]).length : 0))
    )
  });
}, {});

const printHeader = columns => {
  const t = columns.map(i => i.padEnd(padConfig[i]));
  const lines = t.map(col => "═".repeat(col.length));
  console.log(`╔${lines.join("╦")}╗`);
  console.log(`║${t.join("║")}║`);
  console.log(`╠${lines.join("╬")}╣`);
};
const printFooter = columns => {
  const t = columns.map(i => i.padEnd(padConfig[i]));
  const lines = t.map(col => "═".repeat(col.length));
  console.log(`╚${lines.join("╩")}╝`);
};
const printBody = (columns, items) => {
  const test = items.map(
    item =>
      "║" +
      columns
        .map(col => String(item[col] || "-").padEnd(padConfig[col]))
        .join("║")
  );
  console.log(test.join("║\n") + "║");
};

let t = 1;

printHeader(columns);
printBody(columns, sampleData);
printFooter(columns);
