# This module list vailable datasets and loading a selected dataset from the Raw_Data directory.
import os
import pandas as pd

def get_available_datasets(raw_data_dir):
    """
    This function scans the specified raw_data_dir for subdirectories (which represent datasets) 
    and returns a dictionary mapping selection numbers to dataset metadata (name and file size).
    It excludes hidden files and sorts the dataset names alphabetically.
    Only reads filenames and sizes without loading actual data into memory.
    If the directory does not exist, it returns an empty dictionary.
    """
    if not os.path.exists(raw_data_dir):
        return {}

    # creating a list of folders inside Raw_Data (excluding hidden files)
    folders = [f for f in os.listdir(raw_data_dir)
               if os.path.isdir(os.path.join(raw_data_dir, f)) and not f.startswith('.')]
    folders.sort()
    
    # Create dictionary with dataset metadata (name and file size)
    datasets = {}
    for i, folder in enumerate(folders):
        csv_path = os.path.join(raw_data_dir, folder, f"{folder}.csv")
        size_mb = 0
        
        if os.path.exists(csv_path):
            size_bytes = os.path.getsize(csv_path)
            size_mb = size_bytes / (1024 * 1024)  # Convert to MB
        
        datasets[str(i+1)] = {
            'name': folder,
            'size_mb': round(size_mb, 2)
        }
    
    return datasets


def load_dataset(raw_data_dir, folder_name):
    """
    This function takes the raw_data_dir and a folder_name (which represents a dataset) as input.
    It constructs the expected path to the CSV file (which should be named the same as the folder) 
    and attempts to load it into a pandas DataFrame.
    """
    csv_path = os.path.join(raw_data_dir, folder_name, f"{folder_name}.csv")
    
    if os.path.exists(csv_path):
        return pd.read_csv(csv_path), csv_path
    else:
        print(f"Error: Expected file not found at {csv_path}")
        return None, None
