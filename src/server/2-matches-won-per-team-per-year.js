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
    matchesWonPerTeamPerYear();
  });

function matchesWonPerTeamPerYear() {
  let matchesWonPerTeam_perYear = {};

  matchData.forEach((element) => {
    if (matchesWonPerTeam_perYear[element.season]) {
      let obj = matchesWonPerTeam_perYear[element.season];
      if (obj[element.winner]) {
        obj[element.winner]++;
      } else {
        obj[element.winner] = 1;
      }

      matchesWonPerTeam_perYear[element.season] = obj;
    } else {
      let value = {};
      value[element.winner] = 1;
      matchesWonPerTeam_perYear[element.season] = value;
    }
  });

  //console.log(matchesWonPerTeam_perYear);

  const jsonObj = JSON.stringify(matchesWonPerTeam_perYear);

  fs.writeFileSync(
    "../public/output/2-matches-won-per-team-per-year.json",
    jsonObj,
    "utf8",
    (err) => {
      if (err) {
        console.log("An error occured (: ");
        return;
      } else {
        console.log("Data has been fetched ):");
      }
    }
  );
}
