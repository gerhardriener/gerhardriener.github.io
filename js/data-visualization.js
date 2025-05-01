/**
 * Economic Data Visualization
 * Responsive chart for economic research data
 */

// Initialize visualizations when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Only initialize if the container exists
  if (document.getElementById('economic-viz')) {
    initCharitableGivingChart();
    initIncomeInequalityChart();
  }
});

// Function to ensure visualizations are responsive across devices
function handleResponsiveCharts() {
  // This will help responsive resizing
  const resizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
      const chartId = entry.target.id;
      if (window.charts && window.charts[chartId]) {
        window.charts[chartId].resize();
      }
    }
  });
  
  // Observe chart containers
  document.querySelectorAll('.chart-container').forEach(container => {
    resizeObserver.observe(container);
  });
}

// Store chart instances for responsive updates
window.charts = {};

// Charitable Giving Trends Visualization
function initCharitableGivingChart() {
  const ctx = document.getElementById('charitable-giving-chart').getContext('2d');
  
  // Data for charitable giving trends over years
  const data = {
    labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
    datasets: [
      {
        label: 'Charitable Giving (% of Income)',
        data: [2.1, 2.0, 2.3, 2.2, 2.5, 3.1, 2.8, 2.6, 2.7, 2.9],
        backgroundColor: 'rgba(13, 59, 102, 0.6)',
        borderColor: 'rgba(13, 59, 102, 0.8)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(13, 59, 102, 1)',
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.3
      },
      {
        label: 'Donor Retention Rate (%)',
        data: [45, 46, 47, 45, 44, 50, 48, 46, 47, 49],
        backgroundColor: 'rgba(212, 178, 84, 0.6)',
        borderColor: 'rgba(212, 178, 84, 0.8)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(212, 178, 84, 1)',
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.3
      }
    ]
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#0D3B66',
        bodyColor: '#333F48',
        borderColor: '#E2E8F0',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          // Format tooltip labels with % sign
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y + '%';
            }
            return label;
          }
        }
      },
      legend: {
        position: 'top',
        labels: {
          font: {
            family: "'Source Sans Pro', sans-serif",
            size: 13
          },
          padding: 15,
          usePointStyle: true,
          boxWidth: 8
        }
      },
      title: {
        display: true,
        text: 'Charitable Giving Trends (2015-2024)',
        font: {
          family: "'Merriweather', serif",
          size: 16,
          weight: 'bold'
        },
        padding: {
          top: 10,
          bottom: 20
        },
        color: '#0D3B66'
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            family: "'Source Sans Pro', sans-serif"
          }
        }
      },
      y: {
        suggestedMin: 0,
        suggestedMax: 60,
        ticks: {
          callback: function(value) {
            return value + '%';
          },
          font: {
            family: "'Source Sans Pro', sans-serif"
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      }
    },
    // Responsive settings for mobile
    interaction: {
      mode: 'index',
      intersect: false
    },
    animations: {
      tension: {
        duration: 1000,
        easing: 'linear'
      }
    }
  };
  
  // Create and store the chart instance
  window.charts['charitable-giving-chart'] = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options
  });
}

// Income Inequality Visualization
function initIncomeInequalityChart() {
  const ctx = document.getElementById('income-inequality-chart').getContext('2d');
  
  // Data for income inequality research
  const data = {
    labels: ['Bottom 20%', 'Lower Middle 20%', 'Middle 20%', 'Upper Middle 20%', 'Top 20%'],
    datasets: [
      {
        label: '1990',
        data: [4.1, 9.2, 14.8, 23.1, 48.8],
        backgroundColor: 'rgba(13, 59, 102, 0.6)',
        borderColor: 'rgba(13, 59, 102, 0.8)',
        borderWidth: 1
      },
      {
        label: '2024',
        data: [3.5, 8.1, 14.2, 22.3, 51.9],
        backgroundColor: 'rgba(125, 46, 70, 0.6)',
        borderColor: 'rgba(125, 46, 70, 0.8)',
        borderWidth: 1
      }
    ]
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#0D3B66',
        bodyColor: '#333F48',
        borderColor: '#E2E8F0',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y + '% of total income';
            }
            return label;
          }
        }
      },
      legend: {
        position: 'top',
        labels: {
          font: {
            family: "'Source Sans Pro', sans-serif",
            size: 13
          },
          padding: 15
        }
      },
      title: {
        display: true,
        text: 'Income Distribution by Quintile',
        font: {
          family: "'Merriweather', serif",
          size: 16,
          weight: 'bold'
        },
        padding: {
          top: 10,
          bottom: 20
        },
        color: '#0D3B66'
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            family: "'Source Sans Pro', sans-serif"
          }
        }
      },
      y: {
        suggestedMin: 0,
        suggestedMax: 60,
        ticks: {
          callback: function(value) {
            return value + '%';
          },
          font: {
            family: "'Source Sans Pro', sans-serif"
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      }
    },
    // Responsive behavior
    interaction: {
      mode: 'index',
      intersect: false
    }
  };
  
  // Create and store the chart instance
  window.charts['income-inequality-chart'] = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: options
  });
}

// Handle resize events to make visualizations responsive
window.addEventListener('resize', function() {
  if (window.charts) {
    for (const chartId in window.charts) {
      if (window.charts.hasOwnProperty(chartId)) {
        window.charts[chartId].resize();
      }
    }
  }
});

// Lazy loading implementation for data visualization
document.addEventListener('DOMContentLoaded', function() {
  const vizElements = document.querySelectorAll('.data-viz');
  
  if ('IntersectionObserver' in window) {
    const vizObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Load chart data when visible
          const vizId = entry.target.getAttribute('data-viz-id');
          if (vizId && typeof window[vizId] === 'function') {
            window[vizId]();
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    vizElements.forEach(viz => {
      vizObserver.observe(viz);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    vizElements.forEach(viz => {
      const vizId = viz.getAttribute('data-viz-id');
      if (vizId && typeof window[vizId] === 'function') {
        window[vizId]();
      }
    });
  }
});