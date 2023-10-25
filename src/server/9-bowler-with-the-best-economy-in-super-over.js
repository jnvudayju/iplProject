const fs = require("fs");
const csv = require("csvtojson");
const async = require("hbs/lib/async");
const { resolve } = require("path");

const bowlerWithBestEconomyInSuperOver = (deliveriesData) => {
  let objRuns = {};
  let objOvers = {};
  let objEconomy = {};
  let minEconomy = Number.MAX_VALUE;
  let ans = {};

  deliveriesData.forEach((element) => {
    if (element.is_super_over === "1") {
      if (objRuns[element.bowler]) {
        objRuns[element.bowler] =
          objRuns[element.bowler] + (element.total_runs - "0");
        objOvers[element.bowler]++;
      } else {
        objRuns[element.bowler] = element.total_runs - "0";
        objOvers[element.bowler] = 1;
      }
    }
  });

  for (let key in objOvers) {
    objOvers[key] = parseFloat(objOvers[key] / 6).toFixed(2);
  }

  for (let key in objRuns) {
    objEconomy[key] = parseFloat(objRuns[key] / objOvers[key]).toFixed(2);
    minEconomy = Math.min(minEconomy, objEconomy[key]);
  }

  //   console.log(objEconomy);
  //   console.log(minEconomy);

  for (let key in objEconomy) {
    if (objEconomy[key] == minEconomy) {
      ans[key] = minEconomy;
    }
  }

  //   return ans;

  //   console.log(ans);

  return ans;
  //   console.log(objOvers);
};

const getFileData = (path) => {
  return new Promise((resolve, reject) => {
    csv()
      .fromFile(path)
      .then((data) => {
        return resolve(data);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

const fetchAllData = async () => {
  const deliveriesDataPath = "../data/deliveries.csv";
  const deliveriesData = await getFileData(deliveriesDataPath);

  const obj = bowlerWithBestEconomyInSuperOver(deliveriesData);
//   console.log(obj);

  const objJSON = JSON.stringify(obj);

  fs.writeFile(
    "../public/output/9-bowler-with-best-economy-in-super-overs.json",
    objJSON,
    "utf8",
    (err) => {
      if (err) {
        console.log("An error has occured ): ");
      } else {
        console.log("Data has been fetched (: ");
      }
    }
  );
};

fetchAllData()
  .then(() => {
    console.log("Ran successfully (: ");
  })
  .catch((err) => {
    console.log("error ): " + err);
  });
