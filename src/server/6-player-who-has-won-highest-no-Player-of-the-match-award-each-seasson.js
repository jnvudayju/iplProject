const fs = require("fs");
//requiring fs module

const csvMatchDataPath = "../data/matches.csv";
const csv1 = require("csvtojson");
let matchData = "";
//converting csv data into JavaScript Object Notation
csv1()
  .fromFile(csvMatchDataPath)
  .then((jsonObj) => {
    matchData = jsonObj;
    // console.log("hello");
    highestPlayerOfTheMatchAwardEachSeason();
  });

function highestPlayerOfTheMatchAwardEachSeason() {
  let obj = {};

  matchData.forEach((element) => {
    if (obj[element.season]) {
      let keyObj = obj[element.season];
      if (keyObj[element.player_of_match]) {
        keyObj[element.player_of_match]++;
      } else {
        keyObj[element.player_of_match] = 1;
      }
    } else {
      obj[element.season] = (element) => {
        let key = element.player_of_match;
        value = 1;
        return { key: value };
      };
    }
  });

  //   console.log(obj);

  let seasonArr = [
    "2008",
    "2009",
    "2010",
    "2011",
    "2012",
    "2013",
    "2014",
    "2015",
    "2016",
    "2017",
  ];
  let newData = {};

  seasonArr.forEach((element) => {
    for (let key in obj) {
      if (key === element) {
        let arr = [];
        let tempObj = obj[key];

        for (let k in tempObj) {
          arr.push([k, tempObj[k]]);
        }

        arr.sort((a, b) => {
          return a[1] - b[1];
        });

        // console.log(arr);

        let max = arr[arr.length - 1][1];
        let singleObj = {};

        arr.forEach((element) => {
          if (element[1] === max) {
            singleObj[element[0]] = element[1];
          }
        });

        newData[element] = singleObj;
      }
    }
  });

  //   console.log(newData);

  const jsonObj = JSON.stringify(newData);

  fs.writeFile(
    "../public/output/6-player-who-won-highest-Player-of-the-match-award-each-season.json",
    jsonObj,
    "utf8",
    (err) => {
      if (err) {
        console.log("An error occured ): ");
      } else {
        console.log("Data has been fetched (: ");
      }
    }
  );
}
