
// from mockup3.html
mermaid.initialize({ startOnLoad: true });

// Set generation date
document.getElementById('generation-date').textContent = new Date().toLocaleString();

// --- Mock Data ---
const patientData = [
    { id: 'NROR0005', age: 41, gender: 'Female', diagnosis: 'No_TB', cxr: 'Normal', genexpert: 'Not_Done' },
    { id: 'NROR0006', age: 43, gender: 'Female', diagnosis: 'No_TB', cxr: 'Normal', genexpert: 'Not_Done' },
    { id: 'NROR0007', age: 42, gender: 'Male', diagnosis: 'No_TB', cxr: 'Normal', genexpert: 'Not_Done' },
    { id: 'NROR0008', age: 25, gender: 'Male', diagnosis: 'TB', cxr: 'Abnormal', genexpert: 'MTB_Detected' },
    { id: 'NROR0009', age: 55, gender: 'Female', diagnosis: 'No_TB', cxr: 'Normal', genexpert: 'Not_Done' },
];

// --- Populate Table ---
const tableBody = document.getElementById('patient-table-body');
patientData.forEach(patient => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${patient.id}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${patient.age}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${patient.gender}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${patient.diagnosis}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${patient.cxr}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${patient.genexpert}</td>
    `;
    tableBody.appendChild(row);
});

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
    options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, title: { display: true, text: 'Number of Patients' } }, x: { title: { display: true, text: 'Age Group' } } } }
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
    options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { title: { display: true, text: 'Prevalence (%)' } } } }
});

// 3. Comorbidities Chart
const comorbiditiesCtx = document.getElementById('comorbiditiesChart').getContext('2d');
new Chart(comorbiditiesCtx, {
    type: 'pie',
    data: {
        labels: ['HIV Positive', 'DM Positive', 'Unknown/Negative'],
        datasets: [{ data: [3000, 5000, 21138], backgroundColor: ['#F59E0B', '#EF4444', '#D1D5DB'] }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
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
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
});

// 5. Diagnosis Outcomes Chart
const diagnosisOutcomesCtx = document.getElementById('diagnosisOutcomesChart').getContext('2d');
new Chart(diagnosisOutcomesCtx, {
    type: 'pie',
    data: {
        labels: ['No_TB', 'TB', 'Clinically Diagnosed' ],
        datasets: [{ data: [25000, 4000, 138], backgroundColor: ['#10B981', '#EF4444', '#F59E0B'] }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
});

// 6. Age-Sex Pyramid Chart
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

// 7. Symptom Combination Heatmap (Placeholder)
const symptomHeatmapCtx = document.getElementById('symptomHeatmapChart').getContext('2d');

// 8. Symptom-Test Correlation Matrix (Placeholder)
const symptomCorrelationCtx = document.getElementById('symptomCorrelationChart').getContext('2d');

// 9. Patient Journey Sankey Diagram
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

// 10. ROC Curve Chart
const rocCurveCtx = document.getElementById('rocCurveChart').getContext('2d');
new Chart(rocCurveCtx, {
    type: 'line',
    data: {
        labels: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        datasets: [
            {
                label: 'GeneXpert (AUC = 0.94)',
                data: [0, 0.6, 0.8, 0.85, 0.88, 0.9, 0.92, 0.93, 0.94, 0.98, 1],
                borderColor: '#10B981',
                fill: false
            },
            {
                label: 'CXR (AUC = 0.85)',
                data: [0, 0.4, 0.6, 0.7, 0.75, 0.8, 0.82, 0.84, 0.86, 0.9, 1],
                borderColor: '#F59E0B',
                fill: false
            },
            {
                label: 'Sputum (AUC = 0.75)',
                data: [0, 0.3, 0.5, 0.6, 0.65, 0.7, 0.72, 0.74, 0.76, 0.8, 1],
                borderColor: '#3B82F6',
                fill: false
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: { title: { display: true, text: '1 - Specificity (False Positive Rate)' } },
            y: { title: { display: true, text: 'Sensitivity (True Positive Rate)' } }
        }
    }
});

// 11. Performance Metrics Chart
const performanceMetricsCtx = document.getElementById('performanceMetricsChart').getContext('2d');
new Chart(performanceMetricsCtx, {
    type: 'bar',
    data: {
        labels: ['Sensitivity', 'Specificity', 'PPV', 'NPV'],
        datasets: [
            { label: 'GeneXpert', data: [95, 98, 97, 96], backgroundColor: '#10B981' },
            { label: 'CXR', data: [85, 70, 75, 82], backgroundColor: '#F59E0B' },
            { label: 'Sputum', data: [75, 92, 90, 80], backgroundColor: '#3B82F6' },
        ]
    },
    options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, max: 100, title: { display: true, text: 'Percentage (%)' } } } }
});

// 12. Concordance Heatmap (Placeholder)
const concordanceHeatmapCtx = document.getElementById('concordanceHeatmapChart').getContext('2d');

// 13. Model Performance Comparison
const modelComparisonCtx = document.getElementById('modelComparisonChart').getContext('2d');
new Chart(modelComparisonCtx, {
    type: 'bar',
    data: {
        labels: ['Logistic Regression', 'Decision Tree', 'Random Forest', 'XGBoost'],
        datasets: [
            {
                label: 'AUC Score',
                data: [0.88, 0.85, 0.92, 0.94],
                backgroundColor: 'rgba(37, 99, 235, 0.7)',
            }
        ]
    },
    options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, max: 1, title: { display: true, text: 'Area Under Curve (AUC)' } } } }
});

// 14. Feature Importance
const featureImportanceCtx = document.getElementById('featureImportanceChart').getContext('2d');
new Chart(featureImportanceCtx, {
    type: 'bar',
    data: {
        labels: ['GeneXpertMTB', 'CXR_results', 'Cough', 'TB_Contact_History', 'Age', 'HIV', 'DM'],
        datasets: [{
            label: 'Importance',
            data: [0.45, 0.20, 0.12, 0.10, 0.08, 0.03, 0.02],
            backgroundColor: 'rgba(79, 70, 229, 0.7)',
        }]
    },
    options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { title: { display: true, text: 'Predictor Importance Score' } } } }
});

// 15. Cluster Analysis Chart
const clusterAnalysisCtx = document.getElementById('clusterAnalysisChart').getContext('2d');
new Chart(clusterAnalysisCtx, {
    type: 'scatter',
    data: {
        datasets: [
            { label: 'Cluster 1', data: [{x: 1, y: 2}, {x: 1.5, y: 1.8}], backgroundColor: 'rgba(255, 99, 132, 0.7)' },
            { label: 'Cluster 2', data: [{x: 5, y: 8}, {x: 5.5, y: 7.8}], backgroundColor: 'rgba(54, 162, 235, 0.7)' }
        ]
    },
    options: { responsive: true, maintainAspectRatio: false }
});

// 16. Forest Plot Chart (Placeholder)
const forestPlotCtx = document.getElementById('forestPlotChart').getContext('2d');

// 17. Subgroup Outcomes Chart
const subgroupOutcomesCtx = document.getElementById('subgroupOutcomesChart').getContext('2d');
new Chart(subgroupOutcomesCtx, {
    type: 'bar',
    data: {
        labels: ['HIV+', 'DM+', 'Contact+'],
        datasets: [
            { label: 'Cured', data: [60, 70, 75], backgroundColor: 'rgba(75, 192, 192, 0.7)' },
            { label: 'Not Cured', data: [40, 30, 25], backgroundColor: 'rgba(255, 99, 132, 0.7)' }
        ]
    },
    options: { responsive: true, maintainAspectRatio: false, scales: { x: { stacked: true }, y: { stacked: true } } }
});
