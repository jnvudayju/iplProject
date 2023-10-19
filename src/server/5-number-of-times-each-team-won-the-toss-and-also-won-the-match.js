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
    numberOfTimesEachTeamWonTossAndMatch();
  });

function numberOfTimesEachTeamWonTossAndMatch() {
  let obj = {};
  matchData.forEach((element) => {
    if (element.toss_winner === element.winner) {
      if (obj[element.winner]) {
        obj[element.winner]++;
      } else {
        obj[element.winner] = 1;
      }
    }
  });

//   console.log(obj);

  const jsonObj = JSON.stringify(obj);
//   console.log(jsonObj);

  fs.writeFile(
    "../public/output/5-Number-of-times-team-won-toss-and-match.json",
    jsonObj,
    "utf8",
    (err) => {
      if (err) {
        console.log("An error occured ): ");
        return;
      } else {
        console.log("Data has been fetched (: ");
      }
    }
  );
}
