
// from tb-screening-dashboard.html
// Diagnostic Method Performance Chart
const diagnosticCtx = document.getElementById('diagnosticChart').getContext('2d');
new Chart(diagnosticCtx, {
    type: 'radar',
    data: {
        labels: ['Sensitivity', 'Specificity', 'PPV', 'NPV', 'Speed'],
        datasets: [{
            label: 'GeneXpert',
            data: [95, 98, 89, 99, 95],
            backgroundColor: 'rgba(102, 126, 234, 0.2)',
            borderColor: 'rgba(102, 126, 234, 1)',
            borderWidth: 2
        }, {
            label: 'Sputum Microscopy',
            data: [68, 97, 82, 94, 80],
            backgroundColor: 'rgba(118, 75, 162, 0.2)',
            borderColor: 'rgba(118, 75, 162, 1)',
            borderWidth: 2
        }, {
            label: 'Chest X-Ray',
            data: [87, 89, 71, 96, 90],
            backgroundColor: 'rgba(237, 137, 54, 0.2)',
            borderColor: 'rgba(237, 137, 54, 1)',
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            r: {
                beginAtZero: true,
                max: 100
            }
        }
    }
});

// Age-Gender Distribution
const ageGenderCtx = document.getElementById('ageGenderChart').getContext('2d');
new Chart(ageGenderCtx, {
    type: 'bar',
    data: {
        labels: ['0-14', '15-24', '25-34', '35-44', '45-54', '55-64', '65+'],
        datasets: [{
            label: 'Male',
            data: [120, 450, 680, 890, 750, 520, 340],
            backgroundColor: 'rgba(102, 126, 234, 0.8)'
        }, {
            label: 'Female',
            data: [110, 380, 520, 650, 580, 420, 290],
            backgroundColor: 'rgba(118, 75, 162, 0.8)'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Number of TB Cases'
                }
            }
        }
    }
});

// Symptom Prevalence
const symptomCtx = document.getElementById('symptomChart').getContext('2d');
new Chart(symptomCtx, {
    type: 'doughnut',
    data: {
        labels: ['Cough', 'Fever', 'Weight Loss', 'Night Sweats', 'Fatigue', 'Hemoptysis'],
        datasets: [{
            data: [85, 72, 68, 61, 58, 23],
            backgroundColor: [
                'rgba(102, 126, 234, 0.8)',
                'rgba(118, 75, 162, 0.8)',
                'rgba(237, 137, 54, 0.8)',
                'rgba(72, 187, 120, 0.8)',
                'rgba(245, 101, 101, 0.8)',
                'rgba(159, 122, 234, 0.8)'
            ]
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'right'
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return context.label + ': ' + context.parsed + '%';
                    }
                }
            }
        }
    }
});

// Risk Factor Analysis
const riskFactorCtx = document.getElementById('riskFactorChart').getContext('2d');
new Chart(riskFactorCtx, {
    type: 'horizontalBar',
    data: {
        labels: ['HIV Positive', 'Previous TB', 'TB Contact', 'Diabetes', 'Smoking', 'Malnutrition'],
        datasets: [{
            label: 'Odds Ratio',
            data: [8.2, 6.5, 4.3, 3.1, 2.8, 2.2],
            backgroundColor: [
                'rgba(245, 101, 101, 0.8)',
                'rgba(237, 137, 54, 0.8)',
                'rgba(237, 137, 54, 0.8)',
                'rgba(252, 211, 77, 0.8)',
                'rgba(252, 211, 77, 0.8)',
                'rgba(72, 187, 120, 0.8)'
            ]
        }]
    },
    options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            x: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Odds Ratio (95% CI)'
                }
            }
        }
    }
});

// Monthly Trends
const trendsCtx = document.getElementById('trendsChart').getContext('2d');
new Chart(trendsCtx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        datasets: [{
            label: 'Patients Screened',
            data: [2800, 3100, 3300, 3500, 3400, 3600, 3800, 3700, 3800],
            borderColor: 'rgba(102, 126, 234, 1)',
            backgroundColor: 'rgba(102, 126, 234, 0.1)',
            yAxisID: 'y',
            tension: 0.4
        }, {
            label: 'Positivity Rate (%)',
            data: [17.2, 18.1, 18.5, 19.2, 18.8, 18.3, 18.6, 18.9, 18.5],
            borderColor: 'rgba(245, 101, 101, 1)',
            backgroundColor: 'rgba(245, 101, 101, 0.1)',
            yAxisID: 'y1',
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        scales: {
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                title: {
                    display: true,
                    text: 'Patients Screened'
                }
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                title: {
                    display: true,
                    text: 'Positivity Rate (%)'
                },
                grid: {
                    drawOnChartArea: false,
                },
            },
        }
    }
});
