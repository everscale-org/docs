import os
import pandas as pd
from tabulate import tabulate

script_dir = os.path.dirname(os.path.abspath(__file__))
csv_file_path = os.path.join(script_dir, "tvm_opcodes.csv")
md_file_path = os.path.join(script_dir, "tvm_instructions.csv")

def csv_to_md(csv_file):
    # Read the CSV data
    data = pd.read_csv(csv_file, keep_default_na=False)
    
    # Convert the data to a markdown table
    markdown_table = tabulate(data, headers='keys', tablefmt='pipe')

    # Write the markdown table to a file
    with open(md_file_path, 'w') as f:
        f.write(markdown_table)

# Use the function
csv_to_md(csv_file_path)
