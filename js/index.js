// Set generation date
document.getElementById('generation-date').textContent = new Date().toLocaleString();

// --- Chart.js Configurations ---
Chart.defaults.font.family = 'Inter';

// 1. Age and Gender Distribution Chart
const ageGenderCtx = document.getElementById('ageGenderChart').getContext('2d');
new Chart(ageGenderCtx, {
    type: 'bar',
    data: {
        labels: ['0-4', '5-14', '15-54', '>54'],
        datasets: [
            {
                label: 'Male',
                data: [150, 500, 10000, 2000],
                backgroundColor: 'rgba(59, 130, 246, 0.7)',
            },
            {
                label: 'Female',
                data: [180, 600, 11184, 2229],
                backgroundColor: 'rgba(236, 72, 153, 0.7)',
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Number of Patients'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Age Group'
                }
            }
        }
    }
});

// 2. Symptom Prevalence Chart
const symptomPrevalenceCtx = document.getElementById('symptomPrevalenceChart').getContext('2d');
new Chart(symptomPrevalenceCtx, {
    type: 'bar',
    data: {
        labels: ['Cough', 'Fever', 'Weight_Loss', 'Tiredness', 'Hemoptysis', 'Night_Sweat'],
        datasets: [{
            label: 'Prevalence (%)',
            data: [30, 25, 20, 18, 5, 15],
            backgroundColor: 'rgba(239, 68, 68, 0.7)',
        }]
    },
    options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Prevalence (%)'
                }
            }
        }
    }
});

// 3. Comorbidities Chart
const comorbiditiesCtx = document.getElementById('comorbiditiesChart').getContext('2d');
new Chart(comorbiditiesCtx, {
    type: 'pie',
    data: {
        labels: ['HIV Positive', 'DM Positive', 'Unknown/Negative'],
        datasets: [{
            data: [3000, 5000, 21138],
            backgroundColor: ['#F59E0B', '#EF4444', '#D1D5DB']
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom'
            }
        }
    }
});

// 4. Diagnostic Test Distribution
const diagnosticTestCtx = document.getElementById('diagnosticTestChart').getContext('2d');
new Chart(diagnosticTestCtx, {
    type: 'doughnut',
    data: {
        labels: ['GeneXpert', 'Sputum R1', 'Sputum R2', 'CXR'],
        datasets: [{
            data: [10000, 12000, 8000, 25000],
            backgroundColor: ['#10B981', '#3B82F6', '#6366F1', '#F97316'],
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom'
            }
        }
    }
});

// 5. Age-Sex Pyramid Chart
const ageSexPyramidCtx = document.getElementById('ageSexPyramidChart').getContext('2d');
new Chart(ageSexPyramidCtx, {
    type: 'bar',
    data: {
        labels: ['0-14', '15-24', '25-44', '45-64', '65+'],
        datasets: [
            {
                label: 'Male',
                data: [-45, -180, -290, -210, -110], // Negative values for left side
                backgroundColor: 'rgba(59, 130, 246, 0.7)',
                barPercentage: 0.9,
                categoryPercentage: 0.8
            },
            {
                label: 'Female',
                data: [35, 160, 250, 180, 95],
                backgroundColor: 'rgba(236, 72, 153, 0.7)',
                barPercentage: 0.9,
                categoryPercentage: 0.8
            }
        ]
    },
    options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                stacked: true,
                ticks: {
                    callback: (value) => Math.abs(value) // Display absolute values
                },
                title: { display: true, text: 'Number of Patients' }
            },
            y: { stacked: true, title: { display: true, text: 'Age Group' } }
        },
        plugins: { tooltip: { callbacks: { label: (context) => `${context.dataset.label}: ${Math.abs(context.raw)}` } } }
    }
});

// 6. Symptom Combination Heatmap (Placeholder with sample data)
const symptomHeatmapCtx = document.getElementById('symptomHeatmapChart').getContext('2d');
new Chart(symptomHeatmapCtx, {
    type: 'bar',
    data: {
        labels: ['Cough+Fever', 'Cough+Weight Loss', 'Fever+Night Sweats', 'Cough+Hemoptysis', 'All Symptoms'],
        datasets: [{
            label: 'Diagnostic Yield (%)',
            data: [45, 38, 29, 65, 78],
            backgroundColor: [
                'rgba(239, 68, 68, 0.8)',
                'rgba(245, 101, 101, 0.8)',
                'rgba(248, 113, 113, 0.8)',
                'rgba(239, 68, 68, 0.9)',
                'rgba(220, 38, 38, 0.9)'
            ]
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                title: { display: true, text: 'Diagnostic Yield (%)' }
            }
        }
    }
});

// 7. Symptom-Test Correlation Matrix (Placeholder with sample data)
const symptomCorrelationCtx = document.getElementById('symptomCorrelationChart').getContext('2d');
new Chart(symptomCorrelationCtx, {
    type: 'bar',
    data: {
        labels: ['Cough→GeneXpert', 'Fever→CXR', 'Weight Loss→Sputum', 'Night Sweats→CXR', 'Hemoptysis→GeneXpert'],
        datasets: [{
            label: 'Correlation Strength',
            data: [0.85, 0.62, 0.71, 0.58, 0.93],
            backgroundColor: 'rgba(79, 70, 229, 0.7)'
        }]
    },
    options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false }
        },
        scales: {
            x: {
                beginAtZero: true,
                max: 1,
                title: { display: true, text: 'Correlation Coefficient' }
            }
        }
    }
});

// 8. Patient Journey Sankey Diagram
const patientJourneySankeyCtx = document.getElementById('patientJourneySankey').getContext('2d');
new Chart(patientJourneySankeyCtx, {
    type: 'sankey',
    data: {
        datasets: [{
            data: [
                { from: 'Symptoms', to: 'CXR', flow: 1500 },
                { from: 'Symptoms', to: 'GeneXpert', flow: 1000 },
                { from: 'CXR', to: 'TB Diagnosis', flow: 800 },
                { from: 'CXR', to: 'No TB', flow: 700 },
                { from: 'GeneXpert', to: 'TB Diagnosis', flow: 900 },
                { from: 'GeneXpert', to: 'No TB', flow: 100 },
            ],
            colorFrom: '#3B82F6',
            colorTo: '#10B981',
        }]
    },
    options: { responsive: true, maintainAspectRatio: false }
});

// 9. Symptom Prevalence in TB+ Cases (Doughnut Chart)
const symptomTBCtx = document.getElementById('symptomTBChart').getContext('2d');
new Chart(symptomTBCtx, {
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
        maintainAspectRatio: false,
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

// 10. Symptoms vs. TB Diagnosis
const symptomsVsTbCtx = document.getElementById('symptomsVsTbChart').getContext('2d');
new Chart(symptomsVsTbCtx, {
    type: 'bar',
    data: {
        labels: ['Cough', 'Fever', 'Weight Loss'],
        datasets: [
            {
                label: 'TB Positive',
                data: [90, 80, 70],
                backgroundColor: 'rgba(239, 68, 68, 0.7)',
            },
            {
                label: 'TB Negative',
                data: [30, 40, 20],
                backgroundColor: 'rgba(59, 130, 246, 0.7)',
            }
        ]
    },
    options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, title: { display: true, text: 'Percentage (%)' } } } }
});

// 11. HIV/DM Influence on TB Positivity
const comorbidityInfluenceCtx = document.getElementById('comorbidityInfluenceChart').getContext('2d');
new Chart(comorbidityInfluenceCtx, {
    type: 'bar',
    data: {
        labels: ['HIV', 'DM'],
        datasets: [
            {
                label: 'TB Positive Rate (%)',
                data: [45, 30],
                backgroundColor: [
                    'rgba(218, 165, 32, 0.8)',   // Gold color for HIV
                    'rgba(218, 165, 32, 0.8)'    // Gold color for DM
                ]
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top'
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                title: {
                    display: true,
                    text: 'Percentage (%)'
                }
            }
        }
    }
});

// 12. TB Contact History vs. Diagnosis
const contactHistoryCtx = document.getElementById('contactHistoryChart').getContext('2d');
new Chart(contactHistoryCtx, {
    type: 'bar',
    data: {
        labels: ['Contact History', 'No Contact History'],
        datasets: [
            {
                label: 'TB Positive Rate (%)',
                data: [60, 15],
                backgroundColor: [
                    'rgba(134, 187, 159, 0.8)',  // Green color for Contact History
                    'rgba(134, 187, 159, 0.8)'   // Green color for No Contact History
                ]
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top'
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                title: {
                    display: true,
                    text: 'Percentage (%)'
                }
            }
        }
    }
});

// 13. Previous TB History vs. Diagnosis
const prevTbHistoryCtx = document.getElementById('prevTbHistoryChart').getContext('2d');
new Chart(prevTbHistoryCtx, {
    type: 'bar',
    data: {
        labels: ['Previous TB', 'No Previous TB'],
        datasets: [
            {
                label: 'TB Positive Rate (%)',
                data: [75, 25],
                backgroundColor: [
                    'rgba(147, 120, 234, 0.8)',  // Purple color for Previous TB
                    'rgba(147, 120, 234, 0.8)'   // Purple color for No Previous TB
                ]
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top'
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                title: {
                    display: true,
                    text: 'Percentage (%)'
                }
            }
        }
    }
});