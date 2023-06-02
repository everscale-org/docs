import os
import pandas as pd
from tabulate import tabulate

script_dir = os.path.dirname(os.path.abspath(__file__))
csv_file_path = os.path.join(script_dir, "tvm_opcodes.csv")
md_file_path = os.path.join(script_dir, "tvm_instructions.md")

def csv_to_md(csv_file):
  df = pd.read_csv(csv_file, keep_default_na=False)

  # Escape the "|" character in the DataFrame
  df = df.replace({'\|': '\|'}, regex=True)

  # Add a column with expand/collapse functionality
  df['extra_info'] = '<details><summary>Expand</summary>' + '<span>' + df[
    'extra_col_1'] + '<br/>' + df['extra_col_2'] + '</span>' + '</details>'

  # Hide the extra columns here
  df = df.drop('extra_col_1', axis=1)
  df = df.drop('extra_col_2', axis=1)

  md_table = tabulate(df, headers='keys', tablefmt='pipe')

  with open(md_file_path, 'w') as f:
    f.write(md_table)

csv_to_md(csv_file_path)
