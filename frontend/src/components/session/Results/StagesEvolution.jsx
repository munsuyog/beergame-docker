const StagesEvolution = ({ data }) => {
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Stages Evolution',
        },
      },
    };
  
    const chartData = {
      labels: data.stages_evolution.weeks,
      datasets: Object.entries(data.stages_evolution.stages).map(([stage, stageData], index) => ({
        label: stage,
        data: stageData.stock,
        borderColor: `hsl(${index * 60}, 70%, 50%)`,
        backgroundColor: `hsla(${index * 60}, 70%, 50%, 0.5)`,
      })),
    };
  
    return (
      <div>
        <Line options={options} data={chartData} />
      </div>
    );
  };