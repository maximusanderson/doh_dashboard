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