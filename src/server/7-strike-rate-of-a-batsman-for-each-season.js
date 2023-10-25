const fs = require("fs");
const csv = require("csvtojson");

const getSeasonsWithId = (matchData) => {
  return matchData.reduce((acc, d) => {
    if (!acc[d.season]) {
      acc[d.season] = [];
    }
      acc[d.season].push(d.id);

    
    return acc;
  }, {});
};

/**
 *
 * @param {*} seasonsWithId
 * @param {*} deliveriesData
 * @returns Returns the runs scored and balls faced by each batsman in each season
 * {
 *    "season": {
 *          "batsman": {
 *              "runs": number,
 *              "balls": number
 *           }
 *      }
 * }
 */
function runScoredAndBallFacedByEachBatsmanInEachSeason(
  seasonsWithId,
  deliveriesData
) {
  const obj = {};

  Object.keys(seasonsWithId).forEach((season) => {
    seasonsWithId[season].forEach((matchId) => {
      if (!obj[season]) {
        obj[season] = {};
      }

      deliveriesData.forEach((delivery) => {
        if (matchId === delivery.match_id) {
          if (obj[season][delivery.batsman]) {
            obj[season][delivery.batsman].runs += delivery.batsman_runs - "0";

            if (delivery.wide_runs === "0") {
              obj[season][delivery.batsman].balls++;
            }
          } else {
            obj[season][delivery.batsman] = {
              runs: delivery.batsman_runs - "0",
              balls: delivery.wide_runs === "0" ? 1 : 0,
            };
          }
        }
      });
    });
  });

  return obj;
}

/**
 *
 * @param {*} objEachSeasonRunAndBallFacedByEachBatsman
 * @returns Returns strike rate of each batsman in each season
 * [ "season": [{ "batsman": "strike_rate" }] ] strike_rate is number
 */
function strikeRateByEachBatsmanInEachSeason(
  objEachSeasonRunAndBallFacedByEachBatsman
) {
  return Object.keys(objEachSeasonRunAndBallFacedByEachBatsman).map(
    (season) => {
      const _obj = {};

      _obj[season] = Object.keys(
        objEachSeasonRunAndBallFacedByEachBatsman[season]
      ).map((batsmanName) => {
        const _o = {};
        _o[batsmanName] = parseFloat(
          (objEachSeasonRunAndBallFacedByEachBatsman[season][batsmanName].runs /
            objEachSeasonRunAndBallFacedByEachBatsman[season][batsmanName]
              .balls) *
            100
        ).toFixed(2);

        return _o;
      });

      return _obj;
    }
  );
}

const calculateStrikeRate = (matchData, deliveriesData) => {
  const seasonsWithId = getSeasonsWithId(matchData);
  // console.log(seasonsWithId);

  const objEachSeasonRunAndBallFacedByEachBatsman =
    runScoredAndBallFacedByEachBatsmanInEachSeason(
      seasonsWithId,
      deliveriesData
    );

  return strikeRateByEachBatsmanInEachSeason(
    objEachSeasonRunAndBallFacedByEachBatsman
  );
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
  const csvMatchDataPath = "../data/matches.csv";
  const csvDeliveriesDataPath = "../data/deliveries.csv";

  try {
    const matchData = await getFileData(csvMatchDataPath);
    const deliveriesData = await getFileData(csvDeliveriesDataPath);
    const strikeRate = calculateStrikeRate(matchData, deliveriesData);
    const jsonObj = JSON.stringify(strikeRate, null, 4);
    // fs.writeFile(
    //   "../public/output/7-strike-rate-of-each-batsmen-each-season.json",
    //   jsonObj,
    //   "utf8",
    //   (err) => {
    //     if (err) {
    //       console.log("An error has occurred ): ");
    //     } else {
    //       console.log("Data has been fetched (: ");
    //     }
    //   }
    // );
  }catch (error) {
    console.log("Error: ", error);
  }
};

fetchAllData()
  .then(() => {
    console.log("Ran successfully");
  })
  .catch((error) => {
    console.log("Run failed");
  });
