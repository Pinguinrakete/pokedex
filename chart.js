function chartOfSkills(){
  if(myChart != null){
    myChart.destroy();
};
const ctx = document.getElementById('pokemonskills');

  myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        data: stats,
        backgroundColor: [
          "#ffdab9",
          "#F1D651",
          "#9ECB91",
          "#96D8DE",
          "#F2C1D1",
          "#C2C1D4",
      ],
        borderWidth: 1,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "Pokemon Stats",
          font: {
            size: 24,
          },
        },
      },
      indexAxis: "y",
      scales: {
        y: {
          skipLabels: true,
          beginAtZero: true,
          ticks: {
            autoSkip: false,
          },
        },
        x: {
          max: 120,
          ticks: {
            stepSize: 20,
            autoSkip: false,
          },
        },
      },
    },
  });
}


async function loadSkills(i){
  let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
  let response = await fetch(url);
  pokemon = await response.json();
  stats = [];

  for (let i = 0; i < pokemon['stats'].length; i++) {
    stats.push(pokemon['stats'][i]['base_stat']);
  }
  chartOfSkills();
}