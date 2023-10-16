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

    getMatchId2016();
  });

const csvDeliveriesDataPath = "../data/deliveries.csv";
const csv2 = require("csvtojson");
let deliveriesData = "";
//converting csv data into JavaScript Object Notation
csv2()
  .fromFile(csvDeliveriesDataPath)
  .then((jsonObj) => {
    deliveriesData = jsonObj;
    extraRunsConcededPerTeamIn2016();
  });

let matchId2016 = [];
function getMatchId2016() {
  matchData.forEach((element) => {
    if (element.season == "2016") {
      matchId2016.push(element.id);
    }
  });

  //console.log(matchId2016);
}

function extraRunsConcededPerTeamIn2016() {
  let extra_run_conceded_per_team_in_2016 = {};

  matchId2016.forEach((id) => {
    deliveriesData.forEach((element) => {
      if (element.match_id === id) {
        if (extra_run_conceded_per_team_in_2016[element.bowling_team]) {
          let extraRun =
            extra_run_conceded_per_team_in_2016[element.bowling_team];
          extra_run_conceded_per_team_in_2016[element.bowling_team] =
            extraRun + (element.extra_runs - "0");
        } else {
          extra_run_conceded_per_team_in_2016[element.bowling_team] =
            element.extra_runs - "0";
        }
      }
    });
  });

  const objData = JSON.stringify(extra_run_conceded_per_team_in_2016);

  console.log(extra_run_conceded_per_team_in_2016);
  fs.writeFile(
    "../public/output/3-extra-run-conceded-per-team-in-2016.json",
    objData,
    "utf8",
    (err) => {
      if (err) {
        console.log("An error occurred (: ");
      } else {
        console.log("Data has been fetched ): ");
      }
    }
  );
}
