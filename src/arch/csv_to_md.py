import csv
import sys

def read_csv_file(filename):
    with open(filename, 'r') as csvfile:
        reader = csv.DictReader(csvfile)
        data = [row for row in reader]
    return data

def write_md_file(data, filename):
    headers = ['name', 'alias', 'opcode', 'category', 'fift_asm', 'stack', 'gas', 'tlb', 'desc']
    with open(filename, 'w') as mdfile:
        mdfile.write("| {} |\n".format(" | ".join(headers)))
        mdfile.write("| {} |\n".format(" | ".join(["---"] * len(headers))))
        
        for row in data:
            mdfile.write("| {} |\n".format(" | ".join([str(row[field]) for field in headers])))

def main():
    if len(sys.argv) != 3:
        print("Usage: python csv_to_md.py <input_csv_file> <output_md_file>")
        return
    
    input_csv_file = sys.argv[1]
    output_md_file = sys.argv[2]
    
    csv_data = read_csv_file(input_csv_file)
    write_md_file(csv_data, output_md_file)

if __name__ == "__main__":
    main()