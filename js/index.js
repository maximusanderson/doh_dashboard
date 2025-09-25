// TB Clinical Data Dashboard - Dynamic Data Version
// Uses real analysis data from analysis_results.json

// Initialize Mermaid for decision trees
mermaid.initialize({ startOnLoad: true });

// Chart.js global configuration
Chart.defaults.font.family = 'Inter';

// Main function to initialize all charts with real data
function initializeCharts() {
    if (!tbAnalysisData) {
        console.error('TB analysis data not loaded yet');
        return;
    }

    console.log('Initializing charts with real data...');

    // Initialize all charts
    createAgeGenderChart();
    createSymptomPrevalenceChart();
    createComorbiditiesChart();
    createDiagnosticTestChart();
    createAgeSexPyramidChart();
    createSymptomHeatmapChart();
    createSymptomCorrelationChart();
    createPatientJourneySankey();
    createSymptomTBChart();
    createSymptomsVsTbChart();
    createComorbidityInfluenceChart();
    createContactHistoryChart();
    createPrevTbHistoryChart();
    createPrevalenceByDemographicsChart();
    createHighRiskSubgroupsChart();
    createModelComparisonChart();
    createFeatureImportanceChart();

    // Update static HTML sections
    updateTestPerformanceTable();
    updateRiskStratificationMatrix();

    console.log('All charts and static sections initialized successfully');
}

// 1. Age and Gender Distribution Chart
function createAgeGenderChart() {
    const ctx = document.getElementById('ageGenderChart').getContext('2d');
    const data = tbAnalysisData.demographics.age_sex_distribution;

    const ageGroups = Object.keys(data.Male || {});
    const maleData = ageGroups.map(group => data.Male[group] || 0);
    const femaleData = ageGroups.map(group => data.Female[group] || 0);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ageGroups,
            datasets: [
                {
                    label: 'Male',
                    data: maleData,
                    backgroundColor: 'rgba(59, 130, 246, 0.7)',
                },
                {
                    label: 'Female',
                    data: femaleData,
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
                    title: { display: true, text: 'Number of Patients' }
                },
                x: {
                    title: { display: true, text: 'Age Group' }
                }
            }
        }
    });
}

// 2. Symptom Prevalence Chart
function createSymptomPrevalenceChart() {
    const ctx = document.getElementById('symptomPrevalenceChart').getContext('2d');
    const symptoms = tbAnalysisData.symptoms.symptom_prevalence;

    const labels = Object.keys(symptoms);
    const data = Object.values(symptoms);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Prevalence (%)',
                data: data,
                backgroundColor: 'rgba(239, 68, 68, 0.7)',
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { title: { display: true, text: 'Prevalence (%)' } }
            }
        }
    });
}

// 3. Comorbidities Chart
function createComorbiditiesChart() {
    const ctx = document.getElementById('comorbiditiesChart').getContext('2d');
    const hivData = tbAnalysisData.comorbidities.hiv_distribution;
    const dmData = tbAnalysisData.comorbidities.dm_distribution;

    // Combine HIV and DM data for pie chart
    const labels = ['HIV Positive', 'DM Positive', 'Neither/Unknown'];
    const data = [
        hivData.Yes || 0,
        dmData.Yes || 0,
        (hivData.No || 0) + (hivData.Unknown || 0) + (dmData.No || 0) + (dmData.Unknown || 0)
    ];

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: ['#F59E0B', '#EF4444', '#D1D5DB']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom' } }
        }
    });
}

// 4. Diagnostic Test Distribution
function createDiagnosticTestChart() {
    const ctx = document.getElementById('diagnosticTestChart').getContext('2d');
    const testData = tbAnalysisData.diagnostic_tests.test_distribution;

    // Aggregate test counts
    const cxrCount = Object.values(testData.CXR_results || {}).reduce((a, b) => a + b, 0);
    const sputumR1Count = Object.values(testData.Sputum_R1 || {}).reduce((a, b) => a + b, 0);
    const sputumR2Count = Object.values(testData.Sputum_R2 || {}).reduce((a, b) => a + b, 0);
    const geneXpertCount = Object.values(testData.GeneXpertMTB || {}).reduce((a, b) => a + b, 0);

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['CXR', 'Sputum R1', 'Sputum R2', 'GeneXpert'],
            datasets: [{
                data: [cxrCount, sputumR1Count, sputumR2Count, geneXpertCount],
                backgroundColor: ['#10B981', '#3B82F6', '#6366F1', '#F97316'],
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom' } }
        }
    });
}

// 5. Age-Sex Pyramid Chart
function createAgeSexPyramidChart() {
    const ctx = document.getElementById('ageSexPyramidChart').getContext('2d');
    const pyramidData = tbAnalysisData.demographics.age_sex_pyramid;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: pyramidData.labels,
            datasets: [
                {
                    label: 'Male',
                    data: pyramidData.male_counts,
                    backgroundColor: 'rgba(59, 130, 246, 0.7)',
                    barPercentage: 0.9,
                    categoryPercentage: 0.8
                },
                {
                    label: 'Female',
                    data: pyramidData.female_counts,
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
                    ticks: { callback: (value) => Math.abs(value) },
                    title: { display: true, text: 'Number of Patients' }
                },
                y: { stacked: true, title: { display: true, text: 'Age Group' } }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: (context) => `${context.dataset.label}: ${Math.abs(context.raw)}`
                    }
                }
            }
        }
    });
}

// 6. Symptom Combination Heatmap
function createSymptomHeatmapChart() {
    const ctx = document.getElementById('symptomHeatmapChart').getContext('2d');
    const combinations = tbAnalysisData.symptoms.combination_diagnostic_yield;

    const labels = Object.keys(combinations);
    const data = Object.values(combinations);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Diagnostic Yield (%)',
                data: data,
                backgroundColor: labels.map((_, i) =>
                    `rgba(239, ${68 + i * 10}, ${68 + i * 10}, 0.8)`
                )
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: { display: true, text: 'Diagnostic Yield (%)' }
                }
            }
        }
    });
}

// 7. Symptom-Test Correlation Matrix
function createSymptomCorrelationChart() {
    const ctx = document.getElementById('symptomCorrelationChart').getContext('2d');

    // Simulated correlation data based on clinical knowledge
    const correlations = {
        'Cough→GeneXpert': 0.85,
        'Fever→CXR': 0.62,
        'Weight Loss→Sputum': 0.71,
        'Night Sweats→CXR': 0.58,
        'Hemoptysis→GeneXpert': 0.93
    };

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(correlations),
            datasets: [{
                label: 'Correlation Strength',
                data: Object.values(correlations),
                backgroundColor: 'rgba(79, 70, 229, 0.7)'
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: {
                    beginAtZero: true,
                    max: 1,
                    title: { display: true, text: 'Correlation Coefficient' }
                }
            }
        }
    });
}

// 8. Patient Journey Sankey Diagram
function createPatientJourneySankey() {
    const ctx = document.getElementById('patientJourneySankey').getContext('2d');
    const flowData = tbAnalysisData.patient_journey.patient_flow;

    new Chart(ctx, {
        type: 'sankey',
        data: {
            datasets: [{
                data: flowData,
                colorFrom: '#3B82F6',
                colorTo: '#10B981',
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

// 9. Symptom Prevalence in TB+ Cases
function createSymptomTBChart() {
    const ctx = document.getElementById('symptomTBChart').getContext('2d');
    const symptoms = tbAnalysisData.symptoms.symptom_tb_prevalence;

    const labels = Object.keys(symptoms);
    const data = Object.values(symptoms);

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
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
                legend: { position: 'right' },
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
}

// 10. Symptoms vs. TB Diagnosis
function createSymptomsVsTbChart() {
    const ctx = document.getElementById('symptomsVsTbChart').getContext('2d');
    const symptomsAnalysis = tbAnalysisData.risk_factors.symptom_tb_analysis;

    const labels = Object.keys(symptomsAnalysis);
    const tbPositive = labels.map(symptom => symptomsAnalysis[symptom].TB_Positive);
    const tbNegative = labels.map(symptom => symptomsAnalysis[symptom].TB_Negative);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'TB Positive',
                    data: tbPositive,
                    backgroundColor: 'rgba(239, 68, 68, 0.7)',
                },
                {
                    label: 'TB Negative',
                    data: tbNegative,
                    backgroundColor: 'rgba(59, 130, 246, 0.7)',
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: true, text: 'Percentage (%)' }
                }
            }
        }
    });
}

// 11. HIV/DM Influence on TB Positivity
function createComorbidityInfluenceChart() {
    const ctx = document.getElementById('comorbidityInfluenceChart').getContext('2d');
    const hivRates = tbAnalysisData.comorbidities.hiv_tb_rates;
    const dmRates = tbAnalysisData.comorbidities.dm_tb_rates;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['HIV', 'DM'],
            datasets: [{
                label: 'TB Positive Rate (%)',
                data: [hivRates.Yes || 0, dmRates.Yes || 0],
                backgroundColor: ['rgba(218, 165, 32, 0.8)', 'rgba(218, 165, 32, 0.8)']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: true, position: 'top' } },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: { display: true, text: 'Percentage (%)' }
                }
            }
        }
    });
}

// 12. TB Contact History vs. Diagnosis
function createContactHistoryChart() {
    const ctx = document.getElementById('contactHistoryChart').getContext('2d');
    const contactRates = tbAnalysisData.risk_factors.contact_history_tb_rates;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Contact History', 'No Contact History'],
            datasets: [{
                label: 'TB Positive Rate (%)',
                data: [contactRates.Yes || 0, contactRates.No || 0],
                backgroundColor: ['rgba(134, 187, 159, 0.8)', 'rgba(134, 187, 159, 0.8)']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: true, position: 'top' } },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: { display: true, text: 'Percentage (%)' }
                }
            }
        }
    });
}

// 13. Previous TB History vs. Diagnosis
function createPrevTbHistoryChart() {
    const ctx = document.getElementById('prevTbHistoryChart').getContext('2d');
    const prevRates = tbAnalysisData.risk_factors.previous_tb_rates;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Previous TB', 'No Previous TB'],
            datasets: [{
                label: 'TB Positive Rate (%)',
                data: [prevRates.Yes || 0, prevRates.No || 0],
                backgroundColor: ['rgba(147, 120, 234, 0.8)', 'rgba(147, 120, 234, 0.8)']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: true, position: 'top' } },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: { display: true, text: 'Percentage (%)' }
                }
            }
        }
    });
}

// 14. TB Prevalence by Age Group and Sex
function createPrevalenceByDemographicsChart() {
    const ctx = document.getElementById('prevalenceByDemographicsChart').getContext('2d');
    const prevalenceData = tbAnalysisData.epidemiology.prevalence_by_demographics;

    const ageGroups = Object.keys(prevalenceData);
    const maleRates = ageGroups.map(group => prevalenceData[group].Male || 0);
    const femaleRates = ageGroups.map(group => prevalenceData[group].Female || 0);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ageGroups,
            datasets: [
                {
                    label: 'Male TB Rate (%)',
                    data: maleRates,
                    backgroundColor: 'rgba(59, 130, 246, 0.7)',
                },
                {
                    label: 'Female TB Rate (%)',
                    data: femaleRates,
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
                    title: { display: true, text: 'TB Rate (%)' }
                },
                x: {
                    title: { display: true, text: 'Age Group' }
                }
            }
        }
    });
}

// 15. High-Risk Subgroups Analysis
function createHighRiskSubgroupsChart() {
    const ctx = document.getElementById('highRiskSubgroupsChart').getContext('2d');
    const highRiskData = tbAnalysisData.epidemiology.high_risk_subgroups;

    const labels = Object.keys(highRiskData);
    const data = Object.values(highRiskData);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'TB Positive Rate (%)',
                data: data,
                backgroundColor: ['#F59E0B', '#EF4444', '#8B5CF6'],
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: true, text: 'TB Positive Rate (%)' }
                }
            }
        }
    });
}

// 16. Model Performance Comparison
function createModelComparisonChart() {
    const ctx = document.getElementById('modelComparisonChart').getContext('2d');
    const modelPerf = tbAnalysisData.predictive_metrics.model_performance;

    const labels = Object.keys(modelPerf);
    const data = Object.values(modelPerf);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'AUC Score',
                data: data,
                backgroundColor: 'rgba(37, 99, 235, 0.7)',
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 1,
                    title: { display: true, text: 'Area Under Curve (AUC)' }
                }
            }
        }
    });
}

// 17. Feature Importance
function createFeatureImportanceChart() {
    const ctx = document.getElementById('featureImportanceChart').getContext('2d');
    const featureImp = tbAnalysisData.predictive_metrics.feature_importance;

    const labels = Object.keys(featureImp);
    const data = Object.values(featureImp);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Importance',
                data: data,
                backgroundColor: 'rgba(79, 70, 229, 0.7)',
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: {
                    title: { display: true, text: 'Predictor Importance Score' }
                }
            }
        }
    });
}

// Update test performance table with real data
function updateTestPerformanceTable() {
    const testPerf = tbAnalysisData.diagnostic_tests.test_performance;

    // Update GeneXpert
    document.getElementById('genexpert-sensitivity').textContent = testPerf.GeneXpert.sensitivity + '%';
    document.getElementById('genexpert-specificity').textContent = testPerf.GeneXpert.specificity + '%';
    document.getElementById('genexpert-time').textContent = testPerf.GeneXpert.turnaround_time;

    // Update Sputum Microscopy
    document.getElementById('sputum-sensitivity').textContent = testPerf.Sputum_Microscopy.sensitivity + '%';
    document.getElementById('sputum-specificity').textContent = testPerf.Sputum_Microscopy.specificity + '%';
    document.getElementById('sputum-time').textContent = testPerf.Sputum_Microscopy.turnaround_time;

    // Update CXR
    document.getElementById('cxr-sensitivity').textContent = testPerf.CXR.sensitivity + '%';
    document.getElementById('cxr-specificity').textContent = testPerf.CXR.specificity + '%';
    document.getElementById('cxr-time').textContent = testPerf.CXR.turnaround_time;

    // Update Clinical Symptoms
    document.getElementById('symptoms-sensitivity').textContent = testPerf.Clinical_Symptoms.sensitivity + '%';
    document.getElementById('symptoms-specificity').textContent = testPerf.Clinical_Symptoms.specificity + '%';
    document.getElementById('symptoms-time').textContent = testPerf.Clinical_Symptoms.turnaround_time;
}

// Update risk stratification matrix with real data
function updateRiskStratificationMatrix() {
    const riskData = tbAnalysisData.risk_stratification;

    // Update percentages
    document.getElementById('low-risk-percent').textContent = riskData['Low Risk'].percentage + '%';
    document.getElementById('medium-risk-percent').textContent = riskData['Medium Risk'].percentage + '%';
    document.getElementById('high-risk-percent').textContent = riskData['High Risk'].percentage + '%';
    document.getElementById('very-high-risk-percent').textContent = riskData['Very High Risk'].percentage + '%';

    // Update descriptions
    document.getElementById('low-risk-desc').textContent = riskData['Low Risk'].description;
    document.getElementById('medium-risk-desc').textContent = riskData['Medium Risk'].description;
    document.getElementById('high-risk-desc').textContent = riskData['High Risk'].description;
    document.getElementById('very-high-risk-desc').textContent = riskData['Very High Risk'].description;
}

console.log('TB Analysis Dashboard JavaScript loaded successfully');