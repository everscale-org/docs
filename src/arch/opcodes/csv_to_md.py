import pandas as pd
from tabulate import tabulate

def csv_to_md(csv_file):
    # Read the CSV data
    data = pd.read_csv(csv_file)
    
    # Convert the data to a markdown table
    markdown_table = tabulate(data, headers='keys', tablefmt='pipe')

    # Write the markdown table to a file
    with open('tvm_opcodes.md', 'w') as f:
        f.write(markdown_table)

# Use the function
csv_to_md('tvm_opcodes.csv')