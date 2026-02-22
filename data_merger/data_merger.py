import os
import shutil

from zip_processor import process_zip_files
from data_utils import get_available_datasets, load_dataset
from merger import perform_merge

# Configuration
RAW_DATA_DIR = 'Raw_Data'
MERGED_DATA_DIR = 'Merged_Data'

def main():
    # 1. Processing zip files first
    process_zip_files(RAW_DATA_DIR)
    
    while True:
        # 2. List datasets (without loading data into memory)
        datasets = get_available_datasets(RAW_DATA_DIR)
        
        if not datasets:
            print(f"No datasets found in {RAW_DATA_DIR}.")
            break

        print("Available Datasets:")
        for num, metadata in datasets.items():
            print(f"{num}: {metadata['name']} ({metadata['size_mb']} MB)")
        print("Q: Quit")

        # 3. User Selection
        print("\nEnter two numbers separated by a space to merge (e.g., '1 3') or 'Q' to quit:")
        choice = input("> ").strip().upper()

        if choice == 'Q':
            print("Exiting.")
            break

        selections = choice.split()
        
        if len(selections) != 2:
            print("Please select exactly two datasets to merge.")
            continue

        id1, id2 = selections[0], selections[1]

        if id1 not in datasets or id2 not in datasets:
            print("Invalid selection numbers. Please try again.")
            continue

        name1 = datasets[id1]['name']
        name2 = datasets[id2]['name']

        print(f"\n--- Loading {name1} and {name2} ---")
        
        # Load Dataframes from modules
        df1, path1 = load_dataset(RAW_DATA_DIR, name1)
        df2, path2 = load_dataset(RAW_DATA_DIR, name2)

        if df1 is None or df2 is None:
            continue

        # Preview Heads
        print(f"\nHEAD OF {name1}:")
        print(df1.head())
        print(f"\nHEAD OF {name2}:")
        print(df2.head())
        
        # 4. Confirmation
        confirm = input("\nProceed with merge? (Y/N): ").strip().upper()
        
        if confirm == 'Y':
            # Perform Merge using module
            success = perform_merge(df1, df2, name1, name2, MERGED_DATA_DIR)
            
            if success:
                input("\nPress Enter to return to menu...")
                print("\n" * 2) 
            else:
                input("\nPress Enter to return to menu...")
        else:
            print("Action cancelled. Returning to list.\n")

if __name__ == "__main__":
    main()
