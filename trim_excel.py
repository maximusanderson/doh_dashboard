#!/usr/bin/env python3
import pandas as pd
import sys

def trim_excel_file(input_file, output_file=None):
    """
    Keep only the first 10 rows of an Excel file.

    Args:
        input_file (str): Path to input Excel file
        output_file (str): Path to output Excel file (optional)
    """
    if output_file is None:
        output_file = input_file.replace('.xlsx', '_trimmed.xlsx')

    # Read the Excel file
    df = pd.read_excel(input_file)

    # Keep only first 10 rows
    df_trimmed = df.head(10)

    # Save to new file
    df_trimmed.to_excel(output_file, index=False)

    print(f"Trimmed {input_file} to {len(df_trimmed)} rows")
    print(f"Saved as: {output_file}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python trim_excel.py <input_file.xlsx> [output_file.xlsx]")
        sys.exit(1)

    input_file = sys.argv[1]
    output_file = sys.argv[2] if len(sys.argv) > 2 else None

    trim_excel_file(input_file, output_file)