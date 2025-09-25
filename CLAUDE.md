# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a static HTML mockup project showcasing TB (Tuberculosis) clinical data dashboards. The project contains multiple dashboard variations demonstrating different approaches to visualizing medical screening data and analytics.

## File Structure
- `mockup1.html` - Basic TB Clinical Data Dashboard with standard analytics
- `mockup3.html` - Advanced TB Analytics Dashboard with enhanced features like risk calculators and decision trees
- `tb-screening-dashboard.html` - TB Screening Analytics Dashboard focused on diagnostic performance
- `index.html` - Currently empty main entry point
- `css/style.css` - Combined styles for all dashboards
- `js/` - JavaScript files for each dashboard variant
  - `mockup1.js` - Chart configurations for mockup1.html
  - `mockup3.js` - Enhanced chart configurations for mockup3.html
  - `tb-screening-dashboard.js` - Screening analytics charts
  - `script.js` - Shared utilities

## Architecture
- Pure HTML/CSS/JavaScript frontend with no build process
- Uses CDN-loaded external libraries:
  - TailwindCSS for styling
  - Chart.js for data visualization
  - Mermaid.js for flowcharts/diagrams
  - Chart.js plugins for specialized charts (Sankey, date adapters)
- Mock data is hardcoded in JavaScript files
- Responsive design with CSS Grid and Flexbox

## Dashboard Variations
1. **Basic Dashboard** (`mockup1.html`): Demographics, symptoms, comorbidities, diagnosis outcomes
2. **Advanced Dashboard** (`mockup3.html`): Includes risk stratification, symptom pattern recognition, ROC curves, predictive modeling
3. **Screening Dashboard** (`tb-screening-dashboard.html`): Focus on diagnostic test performance, screening cascade, risk matrices

## Common Development Tasks
- **View dashboards**: Open HTML files directly in browser (no server required)
- **Edit charts**: Modify chart configurations in corresponding JS files
- **Update styles**: Edit `css/style.css` which contains combined styles from all dashboards
- **Add new visualizations**: Follow existing Chart.js patterns in JS files

## Key Features
- Interactive charts with hover effects
- Risk score calculators with form inputs
- Patient data tables with mock records
- Diagnostic test performance comparisons
- Medical screening workflow visualizations
- Responsive design for mobile/desktop viewing