fetch("./output/1-matches_per_year.json")
  .then((data) => data.json())
  .then((data) => {
    const dataToPlot = Object.values(data);

    Highcharts.chart("container1", {
      title: {
        text: "IPL Data of Matches played in each year",
        align: "left",
      },

      yAxis: {
        title: {
          text: "Matches in each Season",
        },
      },

      xAxis: {
        accessibility: {
          rangeDescription: "Range: 2008 to 2017",
        },
        title: {
          text: "Season Year",
        },
      },

      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle",
      },

      plotOptions: {
        series: {
          label: {
            connectorAllowed: false,
          },
          pointStart: 2008,
        },
      },

      series: [
        {
          name: "Total Matches Played",
          data: dataToPlot,
        },
      ],

      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                layout: "horizontal",
                align: "center",
                verticalAlign: "bottom",
              },
            },
          },
        ],
      },
    });
  });

fetch("./output/2-matches-won-per-team-per-year.json")
  .then((data) => data.json())
  .then((data) => {
    const seasons = Object.keys(data);

    const obj = {};

    for (let year in data) {
      let teamValues = data[year];
      for (let team in teamValues) {
        if (!obj[team]) {
          obj[team] = {};
        }

        obj[team][year] = teamValues[team];
      }
    }

    delete obj[""];

    const dataToPlot = [];

    for (const key in obj) {
      const newTeam = {};
      let teamData = Object.values(obj[key]);
      newTeam.name = key;
      newTeam.data = teamData;
      dataToPlot.push(newTeam);
    }

    // console.log(obj);

    Highcharts.chart("container2", {
      chart: {
        type: "column",
      },
      title: {
        text: "Match won per team per year",
      },
      xAxis: {
        categories: [
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
        ],
        crosshair: true,
      },
      yAxis: {
        min: 0,
        title: {
          text: "Matches won by each team in each season",
        },
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat:
          '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
        footerFormat: "</table>",
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      series: dataToPlot,
    });
  });

fetch("./output/3-extra-run-conceded-per-team-in-2016.json")
  .then((data) => data.json())
  .then((data) => {
    const valueData = Object.values(data);
    const keyData = Object.keys(data);

    Highcharts.chart("container3", {
      chart: {
        type: "line",
      },
      title: {
        text: "Extra runs conceded by teams in 2016",
      },
      subtitle: {
        text:
          "Source: " +
          '<a href="https://en.wikipedia.org/wiki/List_of_cities_by_average_temperature" ' +
          'target="_blank">Wikipedia.com</a>',
      },
      xAxis: {
        categories: keyData,
      },
      yAxis: {
        title: {
          text: "Extra runs",
        },
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true,
          },
          enableMouseTracking: false,
        },
      },
      series: [
        {
          name: "Teams",
          data: valueData,
        },
      ],
    });
  });

fetch("./output/4-top-economical-bowler-in-2015.json")
  .then((data) => data.json())
  .then((data) => {
    const valueDataString = Object.values(data);
    const keyData = Object.keys(data);
    // console.log(data);

    const valueData = [];

    valueDataString.forEach((element) => {
      valueData.push(parseFloat(element));
    });

    // console.log(valueData);

    Highcharts.chart("container4", {
      chart: {
        type: "line",
      },
      title: {
        text: "Top economical bowlers in 2015",
      },
      subtitle: {
        text:
          "Source: " +
          '<a href="https://en.wikipedia.org/wiki/List_of_cities_by_average_temperature" ' +
          'target="_blank">Wikipedia.com</a>',
      },
      xAxis: {
        categories: keyData,
      },
      yAxis: {
        title: {
          text: "Economy rate",
        },
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true,
          },
          enableMouseTracking: false,
        },
      },
      series: [
        {
          name: "Bowlers",
          data: valueData,
        },
      ],
    });
  });

fetch("./output/5-Number-of-times-team-won-toss-and-match.json")
  .then((data) => data.json())
  .then((data) => {
    const valueData = Object.values(data);
    const keyData = Object.keys(data);

    Highcharts.chart("container5", {
      chart: {
        type: "line",
      },
      title: {
        text: "Number of times each team won toss and match",
      },
      subtitle: {
        text:
          "Source: " +
          '<a href="https://en.wikipedia.org/wiki/List_of_cities_by_average_temperature" ' +
          'target="_blank">Wikipedia.com</a>',
      },
      xAxis: {
        categories: keyData,
      },
      yAxis: {
        title: {
          text: "No of times team won toss as well as match",
        },
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true,
          },
          enableMouseTracking: false,
        },
      },
      series: [
        {
          name: "Teams",
          data: valueData,
        },
      ],
    });
  });

fetch(
  "./output/6-player-who-won-highest-Player-of-the-match-award-each-season.json"
)
  .then((data) => data.json())
  .then((data) => {
    const playersData = [];
    const valuesData = [];

    for (let key in data) {
      for (let k in data[key]) {
        playersData.push(k);
        valuesData.push(data[key][k]);
      }
    }

    Highcharts.chart("container6", {
      chart: {
        type: "line",
      },
      title: {
        text: "Player who won highest number of Player of the award each season from 2008 to 2017",
      },
      subtitle: {
        text:
          "Source: " +
          '<a href="https://en.wikipedia.org/wiki/List_of_cities_by_average_temperature" ' +
          'target="_blank">Wikipedia.com</a>',
      },
      xAxis: {
        categories: playersData,
      },
      yAxis: {
        title: {
          text: "No of times Player of the match award",
        },
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true,
          },
          enableMouseTracking: false,
        },
      },
      series: [
        {
          name: "Players",
          data: valuesData,
        },
      ],
    });
  });

fetch("./output/7-strike-rate-of-each-batsmen-each-season.json")
  .then((data) => data.json())
  .then((data) => {
    let finalObj = {};
    let players = {};
    for (let i = 0; i < data.length; i++) {
      let season = data[i];
      let seasonKey = Object.keys(season)[0];
      let seasonArray = season[seasonKey];
      let playerObj = {};
      for (let i = 0; i < seasonArray.length; i++) {
        let key = Object.keys(seasonArray[i])[0];
        let value = seasonArray[i][key];
        if (!players[key]) {
          players[key] = {};
        }
        playerObj[key] = value;
      }
      finalObj[seasonKey] = playerObj;
    }
    // console.log(finalObj);

    let playerKey = Object.keys(players);
    let seasonKey = Object.keys(finalObj);
    for (let year = 0; year < seasonKey.length; year++) {
      let data = finalObj[seasonKey[year]];
      for (let i = 0; i < playerKey.length; i++) {
        if (!players[playerKey[i]][seasonKey[year]]) {
          if (data[playerKey[i]] == undefined) {
            continue;
          }
          players[playerKey[i]][seasonKey[year]] = parseFloat(
            data[playerKey[i]]
          );
        }
      }
    }
    console.log(players);

    const playerArray = [];
    for (const key in players) {
      const newTeam = {};
      let teamData = Object.values(players[key]);
      newTeam.name = key;
      newTeam.data = teamData;
      playerArray.push(newTeam);
    }

    Highcharts.chart("container7", {
      chart: {
        type: "column",
      },
      title: {
        text: "Strike Rate of each Batsman in each Season",
      },
      xAxis: {
        categories: [
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
        ],
        crosshair: true,
      },
      yAxis: {
        min: 0,
        title: {
          text: "Strike Rate",
        },
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat:
          '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
        footerFormat: "</table>",
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      series: playerArray,
    });
  });

fetch("./output/8-highest-no-times-a-player-dismissed-by-another-player.json")
  .then((data) => data.json())
  .then((data) => {
    // console.log(data);

    const key1 = Object.keys(data);

    let obj = {};

    for (let k in data) {
      obj = data[k];
    }

    const key = Object.keys(obj);

    // console.log(obj);

    // Data retrieved from https://fas.org/issues/nuclear-weapons/status-world-nuclear-forces/
    Highcharts.chart("container8", {
      chart: {
        type: "column",
      },
      title: {
        text: "Player who got out maximum time by another player",
      },
      xAxis: {
        type: "category",
        labels: {
          rotation: -45,
          style: {
            fontSize: "13px",
            fontFamily: "Verdana, sans-serif",
          },
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: "No of times player got out by another player",
        },
      },
      legend: {
        enabled: false,
      },
      // tooltip: {
      //   pointFormat: "Population in 2021: <b>{point.y:.1f} millions</b>",
      // },
      series: [
        {
          name: "No of times player got out by another player",
          colors: ["#9b20d9"],
          colorByPoint: true,
          groupPadding: 0,
          data: [[`${key1[0]} by ${key[0]}`, obj[key[0]]]],
          dataLabels: {
            enabled: true,
            rotation: -90,
            color: "#FFFFFF",
            align: "right",
            format: "{point.y:.1f}", // one decimal
            y: 10, // 10 pixels down from the top
            style: {
              fontSize: "13px",
              fontFamily: "Verdana, sans-serif",
            },
          },
        },
      ],
    });
  });

fetch("./output/9-bowler-with-best-economy-in-super-overs.json")
  .then((data) => data.json())
  .then((data) => {
    // console.log(data);

    const key = Object.keys(data);

    // Data retrieved from https://fas.org/issues/nuclear-weapons/status-world-nuclear-forces/
    Highcharts.chart("container9", {
      chart: {
        type: "column",
      },
      title: {
        text: "Bowler with best economy in super overs",
      },
      xAxis: {
        type: "category",
        labels: {
          rotation: -45,
          style: {
            fontSize: "13px",
            fontFamily: "Verdana, sans-serif",
          },
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: "Best economy in super over",
        },
      },
      legend: {
        enabled: false,
      },
      // tooltip: {
      //   pointFormat: "Population in 2021: <b>{point.y:.1f} millions</b>",
      // },
      series: [
        {
          name: "Bowler with best economy in super over",
          colors: ["#3667c9"],
          colorByPoint: true,
          groupPadding: 0,
          data: [[`${key[0]}`, data[key[0]]]],
          dataLabels: {
            enabled: true,
            rotation: -90,
            color: "#FFFFFF",
            align: "right",
            format: "{point.y:.1f}", // one decimal
            y: 10, // 10 pixels down from the top
            style: {
              fontSize: "13px",
              fontFamily: "Verdana, sans-serif",
            },
          },
        },
      ],
    });
  });
