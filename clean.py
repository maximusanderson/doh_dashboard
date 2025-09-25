#!/usr/bin/env python3
"""
Clean Script for TB Clinical Data Analysis
Removes all generated analysis files and outputs
"""

import os
import glob

def delete_file(filename):
    """Safely delete a file if it exists"""
    try:
        if os.path.exists(filename):
            os.remove(filename)
            print(f"✅ Deleted: {filename}")
            return True
        else:
            print(f"⚠️  Not found: {filename}")
            return False
    except Exception as e:
        print(f"❌ Error deleting {filename}: {e}")
        return False

def main():
    """Clean all generated files"""
    print("TB Clinical Data Analysis - File Cleaner")
    print("=" * 50)
    print("This will delete all generated analysis files.")

    # Ask for confirmation
    confirm = input("Are you sure you want to delete all generated files? (y/N): ").strip().lower()

    if confirm not in ['y', 'yes']:
        print("Operation cancelled.")
        return

    print("\nCleaning up generated files...")

    # List of files to delete
    files_to_delete = [
        # Main analysis outputs
        'analysis_results.json',

        # CSV exports
        'mockup_data.csv',
        'demographics.csv',
        'symptoms_analysis.csv',
        'test_performance.csv',

        # Any other potential CSV files from analysis
        'comorbidities.csv',
        'risk_factors.csv',
        'epidemiology.csv',
        'patient_journey.csv',
        'predictive_metrics.csv',
        'risk_stratification.csv'
    ]

    deleted_count = 0

    # Delete specific files
    for file in files_to_delete:
        if delete_file(file):
            deleted_count += 1

    # Delete any other analysis-related files that might exist
    print("\nLooking for other analysis files...")

    # Find and delete any other CSV files that might be analysis outputs
    csv_files = glob.glob("*_analysis.csv")
    csv_files.extend(glob.glob("tb_*.csv"))
    csv_files.extend(glob.glob("*_results.csv"))

    for csv_file in csv_files:
        if csv_file not in files_to_delete:  # Avoid double-counting
            if delete_file(csv_file):
                deleted_count += 1

    # Find and delete any JSON files that might be analysis outputs
    json_files = glob.glob("*_results.json")
    json_files.extend(glob.glob("tb_*.json"))

    for json_file in json_files:
        if json_file not in files_to_delete:  # Avoid double-counting
            if delete_file(json_file):
                deleted_count += 1

    # Clean up any Python cache files while we're at it
    print("\nCleaning Python cache files...")
    cache_patterns = [
        "__pycache__",
        "*.pyc",
        "*.pyo",
        ".DS_Store"
    ]

    for pattern in cache_patterns:
        cache_files = glob.glob(pattern)
        for cache_file in cache_files:
            if os.path.isfile(cache_file):
                if delete_file(cache_file):
                    deleted_count += 1
            elif os.path.isdir(cache_file):
                try:
                    import shutil
                    shutil.rmtree(cache_file)
                    print(f"✅ Deleted directory: {cache_file}")
                    deleted_count += 1
                except Exception as e:
                    print(f"❌ Error deleting directory {cache_file}: {e}")

    print("\n" + "=" * 50)
    print(f"Cleanup complete! Deleted {deleted_count} files/directories.")
    print("\nRemaining files in directory:")

    # Show what's left
    remaining_files = []
    for file in os.listdir('.'):
        if os.path.isfile(file):
            remaining_files.append(file)

    remaining_files.sort()
    for file in remaining_files:
        print(f"  📄 {file}")

    print(f"\nTotal remaining files: {len(remaining_files)}")

    # Show instructions
    print("\n" + "=" * 50)
    print("To regenerate analysis files, run:")
    print("  python analyze_tb_data.py")
    print("\nTo view dashboard, run:")
    print("  python -m http.server 3000")
    print("  Then open: http://localhost:3000/index.html")

if __name__ == "__main__":
    main()