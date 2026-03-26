import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

// Register chart components
Chart.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const [stats, setStats] = useState({
    passed: 0,
    failed: 0,
    skipped: 0
  });

  useEffect(() => {
    const fetchData = () => {
      const API_URL = `http://${window.location.hostname}:3001/results`;

      axios.get(API_URL)
        .then(res => {
          console.log("Full Data:", res.data);

          let passed = 0, failed = 0, skipped = 0;

          // Safe traversal of Playwright JSON
          res.data.suites?.forEach(suite => {
            suite.specs?.forEach(spec => {
              spec.tests?.forEach(test => {
                test.results?.forEach(result => {
                  if (result.status === 'passed') passed++;
                  else if (result.status === 'failed') failed++;
                  else if (result.status === 'skipped') skipped++;
                });
              });
            });
          });

          setStats({ passed, failed, skipped });
        })
        .catch(err => {
          console.error("API Error:", err);
        });
    };

    fetchData();

    // Auto refresh every 5 seconds
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  const data = {
    labels: ['Passed', 'Failed', 'Skipped'],
    datasets: [
      {
        data: [stats.passed, stats.failed, stats.skipped],
        backgroundColor: ['#4CAF50', '#F44336', '#FFC107'],
      }
    ]
  };

  return (
    <div style={{ width: '500px', margin: '50px auto', textAlign: 'center' }}>
      <h2>Playwright Test Dashboard</h2>

      <Pie data={data} />

      <div style={{ marginTop: '20px' }}>
        <p><b>Passed:</b> {stats.passed}</p>
        <p><b>Failed:</b> {stats.failed}</p>
        <p><b>Skipped:</b> {stats.skipped}</p>
      </div>
    </div>
  );
}

export default Dashboard;