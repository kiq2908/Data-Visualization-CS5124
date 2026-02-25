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
        print("\nEnter numbers separated by a space to merge (e.g., '1 3 4') or 'Q' to quit:")
        choice = input("> ").strip().upper()

        if choice == 'Q':
            print("Exiting.")
            break

        selections = choice.split()
        
        if len(selections) < 2:
            print("Please select at least two datasets to merge.")
            continue

        invalid_selection = False
        for sel in selections:
            if sel not in datasets:
                print(f"Invalid selection number: {sel}. Please try again.")
                invalid_selection = True
                break
        
        if invalid_selection:
            continue

        names = [datasets[sel]['name'] for sel in selections]
        dfs = []

        print(f"\n--- Loading {', '.join(names)} ---")
        
        # Load Dataframes from modules
        for name in names:
            df, path = load_dataset(RAW_DATA_DIR, name)
            if df is not None:
                dfs.append(df)
            else:
                print(f"Failed to load {name}.")
                break

        if len(dfs) != len(names):
            continue

        # Preview Heads
        for i, name in enumerate(names):
            print(f"\nHEAD OF {name}:")
            print(dfs[i].head())
        
        # 4. Confirmation
        confirm = input("\nProceed with merge? (Y/N): ").strip().upper()
        
        if confirm == 'Y':
            # Perform Merge using module
            success = perform_merge(dfs, names, MERGED_DATA_DIR)
            
            if success:
                input("\nPress Enter to return to menu...")
                print("\n" * 2) 
            else:
                input("\nPress Enter to return to menu...")
        else:
            print("Action cancelled. Returning to list.\n")

if __name__ == "__main__":
    main()
