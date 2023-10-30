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
    getMatchId2015();
  });

const csvDeliveriesDataPath = "../data/deliveries.csv";
const csv2 = require("csvtojson");
let deliveriesData = "";
//converting csv data into JavaScript Object Notation
csv2()
  .fromFile(csvDeliveriesDataPath)
  .then((jsonObj) => {
    deliveriesData = jsonObj;
    runConcedeByEachbowler();
    overBowledByEachBowler();
    economyRateOfEachBowler();
  });

let matchId2015 = [];
let runEachBowler = {};
let overEachBowler = {};
let economyOfEachBowler = {};
let economyResult = [];

function getMatchId2015() {
  matchData.forEach((element) => {
    if (element.season === "2015") {
      matchId2015.push(element.id);
    }
  });

  // console.log(matchId2015);
}

function runConcedeByEachbowler() {
  matchId2015.forEach((element1) => {
    deliveriesData.forEach((element2) => {
      if (element1 === element2.match_id) {
        if (runEachBowler[element2.bowler]) {
          let run = runEachBowler[element2.bowler];
          runEachBowler[element2.bowler] = run + (element2.total_runs - "0");
        } else {
          runEachBowler[element2.bowler] = element2.total_runs - "0";
        }
      }
    });
  });

  // console.log(runEachBowler);
}

function overBowledByEachBowler() {
  matchId2015.forEach((element1) => {
    deliveriesData.forEach((element2) => {
      if (element1 === element2.match_id) {
        if (overEachBowler[element2.bowler]) {
          overEachBowler[element2.bowler]++;
        } else {
          overEachBowler[element2.bowler] = 1;
        }
      }
    });
  });

  for (let key in overEachBowler) {
    overEachBowler[key] = overEachBowler[key] / 6;
  }

  // console.log(overEachBowler);
}

function economyRateOfEachBowler() {
  let obj = {};
  for (let key in runEachBowler) {
    economyOfEachBowler[key] = parseFloat(
      runEachBowler[key] / overEachBowler[key]
    ).toFixed(2);
    economyResult.push([key, economyOfEachBowler[key]]);
  }

  economyResult.sort((a, b) => {
    return a[1] - b[1];
  });

  for (let index = 0; index < 10; index++) {
    obj[economyResult[index][0]] = economyResult[index][1];
  }

  // console.log(obj);
  // console.log(obj);
  const jsonObj = JSON.stringify(obj);
  // console.log(jsonObj)

  fs.writeFile(
    "../public/output/4-top-economical-bowler-in-2015.json",
    jsonObj,
    "utf8",
    (err) => {
      if (err) {
        console.log("An erro occured ): ");
      } else {
        console.log("Data has been fetched (: ");
      }
    }
  );
}
