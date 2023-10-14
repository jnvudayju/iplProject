const fs = require("fs");
//requiring fs module

const csvFilePath = "../data/matches.csv";
const csv = require("csvtojson");
let matchData = "hellow world";
//converting csv data into JavaScript Object Notation
csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    matchData = jsonObj;
    matchesPerYear();
  });

function matchesPerYear() {
  let matchesPerYear = {};

  matchData.forEach((element) => {
    if (matchesPerYear[element.season]) {
      matchesPerYear[element.season]++;
    } else {
      matchesPerYear[element.season] = 1;
    }
  });

  // console.log(obj);

  const jsonObj = JSON.stringify(matchesPerYear);

  fs.writeFile(
    "../public/output/1-matches_per_year.json",
    jsonObj,
    "utf8",
    (err) => {
      if (err) {
        console.log("An error occured");
        return;
      } else {
        console.log("JSON file has been saved kindly check the public folder");
      }
    }
  );
}
