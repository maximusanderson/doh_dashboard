
// from mockup1.html
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

// 6. Symptoms vs. TB Diagnosis
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

// 7. HIV/DM Influence on TB Positivity
const comorbidityInfluenceCtx = document.getElementById('comorbidityInfluenceChart').getContext('2d');
new Chart(comorbidityInfluenceCtx, {
    type: 'bar',
    data: {
        labels: ['HIV', 'DM'],
        datasets: [
            {
                label: 'TB Positive Rate (%)',
                data: [45, 30],
                backgroundColor: 'rgba(234, 179, 8, 0.7)',
            }
        ]
    },
    options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, max: 100, title: { display: true, text: 'Percentage (%)' } } } }
});

// 8. TB Contact History vs. Diagnosis
const contactHistoryCtx = document.getElementById('contactHistoryChart').getContext('2d');
new Chart(contactHistoryCtx, {
    type: 'bar',
    data: {
        labels: ['Contact History', 'No Contact History'],
        datasets: [
            {
                label: 'TB Positive Rate (%)',
                data: [60, 15],
                backgroundColor: 'rgba(16, 185, 129, 0.7)',
            }
        ]
    },
    options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, max: 100, title: { display: true, text: 'Percentage (%)' } } } }
});

// 8.5. Previous TB History vs. Diagnosis
const prevTbHistoryCtx = document.getElementById('prevTbHistoryChart').getContext('2d');
new Chart(prevTbHistoryCtx, {
    type: 'bar',
    data: {
        labels: ['Previous TB', 'No Previous TB'],
        datasets: [
            {
                label: 'TB Positive Rate (%)',
                data: [75, 25],
                backgroundColor: 'rgba(139, 92, 246, 0.7)',
            }
        ]
    },
    options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, max: 100, title: { display: true, text: 'Percentage (%)' } } } }
});

// 9. Sensitivity and Specificity Chart
const sensitivitySpecificityCtx = document.getElementById('sensitivitySpecificityChart').getContext('2d');
new Chart(sensitivitySpecificityCtx, {
    type: 'bar',
    data: {
        labels: ['GeneXpert', 'Sputum R1', 'CXR'],
        datasets: [
            {
                label: 'Sensitivity',
                data: [95, 75, 85],
                backgroundColor: 'rgba(20, 83, 45, 0.7)',
            },
            {
                label: 'Specificity',
                data: [98, 92, 70],
                backgroundColor: 'rgba(5, 150, 105, 0.7)',
            }
        ]
    },
    options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, max: 100, title: { display: true, text: 'Percentage (%)' } } } }
});

// 10. Predictive Values Chart
const predictiveValuesCtx = document.getElementById('predictiveValuesChart').getContext('2d');
new Chart(predictiveValuesCtx, {
    type: 'bar',
    data: {
        labels: ['GeneXpert', 'Sputum R1', 'CXR'],
        datasets: [
            {
                label: 'Positive Predictive Value (PPV)',
                data: [97, 90, 75],
                backgroundColor: 'rgba(219, 39, 119, 0.7)',
            },
            {
                label: 'Negative Predictive Value (NPV)',
                data: [96, 80, 82],
                backgroundColor: 'rgba(147, 51, 234, 0.7)',
            }
        ]
    },
    options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, max: 100, title: { display: true, text: 'Percentage (%)' } } } }
});

// 11. Concordance Chart
const concordanceCtx = document.getElementById('concordanceChart').getContext('2d');
new Chart(concordanceCtx, {
    type: 'radar',
    data: {
        labels: ['GeneXpert vs Sputum R1', 'Sputum R1 vs Sputum R2', 'CXR vs GeneXpert', 'Sputum R1 vs CXR'],
        datasets: [{
            label: 'Concordance Rate (Kappa)',
            data: [0.85, 0.92, 0.65, 0.70],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
        }]
    },
    options: { responsive: true, maintainAspectRatio: false, scales: { r: { suggestedMin: 0, suggestedMax: 1 } } }
});

// 12. Model Performance Comparison
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

// 13. Feature Importance
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

// 14. TB Prevalence by Age Group and Sex
const prevalenceByDemographicsCtx = document.getElementById('prevalenceByDemographicsChart').getContext('2d');
new Chart(prevalenceByDemographicsCtx, {
    type: 'bar',
    data: {
        labels: ['0-4', '5-14', '15-54', '>54'],
        datasets: [
            {
                label: 'Male TB Rate (%)',
                data: [5, 10, 25, 30],
                backgroundColor: 'rgba(59, 130, 246, 0.7)',
            },
            {
                label: 'Female TB Rate (%)',
                data: [4, 8, 22, 28],
                backgroundColor: 'rgba(236, 72, 153, 0.7)',
            }
        ]
    },
    options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, max: 100, title: { display: true, text: 'TB Positive Rate (%)' } } } }
});

// 15. High-Risk Subgroups Analysis
const highRiskSubgroupsCtx = document.getElementById('highRiskSubgroupsChart').getContext('2d');
new Chart(highRiskSubgroupsCtx, {
    type: 'bar',
    data: {
        labels: ['HIV+ & Abnormal CXR', 'DM+ & Cough', 'Contact History & Age > 54'],
        datasets: [{
            label: 'TB Positive Rate (%)',
            data: [70, 55, 65],
            backgroundColor: ['#F59E0B', '#EF4444', '#8B5CF6'],
        }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, max: 100, title: { display: true, text: 'TB Positive Rate (%)' } } } }
});
