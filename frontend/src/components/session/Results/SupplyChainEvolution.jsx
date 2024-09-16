const SupplyChainEvolution = ({ data }) => {
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Supply Chain Evolution',
        },
      },
    };
  
    const chartData = {
      labels: data.supply_chain_evolution.weeks,
      datasets: [
        {
          label: 'Cost',
          data: data.supply_chain_evolution.cost.Total_Supply_Chain,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Fill Rate',
          data: data.supply_chain_evolution.fill_rate.Total_Supply_Chain,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
          label: 'Average Stock',
          data: data.supply_chain_evolution.average_stock.Total_Supply_Chain,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
      ],
    };
  
    return (
      <div>
        <Bar options={options} data={chartData} />
      </div>
    );
  };