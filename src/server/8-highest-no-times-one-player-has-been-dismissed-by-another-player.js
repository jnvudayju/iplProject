const fs = require("fs");
const csv = require("csvtojson");
const { resolve } = require("path");
const { error } = require("console");
// const async = require("hbs/lib/async");

const highestNoTimesA_PlayerHasbeenDismissedByAnotherPlayer = (
  deliveriesData
) => {
  let obj = {};
  let ansObj = {};
  let maxOut = 0;

  deliveriesData.forEach((element) => {
    if (element.batsman === element.player_dismissed) {
      if (obj[element.batsman]) {
        if (obj[element.batsman][element.bowler]) {
          obj[element.batsman][element.bowler]++;
          maxOut = Math.max(obj[element.batsman][element.bowler], maxOut);
        } else {
          obj[element.batsman][element.bowler] = 1;
          maxOut = Math.max(obj[element.batsman][element.bowler], maxOut);
        }
      } else {
        obj[element.batsman] = {};
        obj[element.batsman][element.bowler] = 1;
        maxOut = Math.max(obj[element.batsman][element.bowler], maxOut);
      }
    }
  });

  for (let key1 in obj) {
    let tempObj = obj[key1];
    let ans = {};

    for (let key2 in tempObj) {
      if (tempObj[key2] === maxOut) {
        ans[key2] = maxOut;
        ansObj[key1] = ans;
      }
    }
  }

//   console.log(ansObj);

  return ansObj;
};

const getFileData = (path) => {
  return new Promise((resolve, reject) => {
    csv()
      .fromFile(path)
      .then((data) => {
        return resolve(data);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

const fetchAllData = async () => {
  const matchDataPath = "../data/matches.csv";
  const deliveriesDataPath = "../data/deliveries.csv";

  try {
    const matchData = await getFileData(matchDataPath);
    const deliveriesData = await getFileData(deliveriesDataPath);
    // console.log(deliveriesData);
    const obj =
      highestNoTimesA_PlayerHasbeenDismissedByAnotherPlayer(deliveriesData);

    const objJSON = JSON.stringify(obj);

    fs.writeFile(
      "../public/output/8-highest-no-times-a-player-dismissed-by-another-player.json",
      objJSON,
      "utf8",
      (err) => {
        if (err) {
          console.log("An error occured ): " + err);
        } else {
          console.log("Data has been fetched (: ");
        }
      }
    );

    // console.log(obj);
  } catch (error) {
    console.log("error :" + error);
  }
};

fetchAllData()
  .then(() => {
    console.log("Ran successfully (: ");
  })
  .catch((error) => {
    console.log("error " + error);
  });
