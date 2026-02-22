import os
import zipfile

def process_zip_files(raw_data_dir):
    """
    Scans raw_data_dir (which specified in data_merger.py) for zip files.
    Extracts them if the destination folder doesn't exist.
    Deletes the zip file after extraction.
    """
    # Check if the directory exists
    if not os.path.exists(raw_data_dir):
        print(f"Directory {raw_data_dir} not found.")
        return
    # Scan for zip files if the directory exists
    print("--- Scanning for Zip Files ---")
    # Create a list variable of files in the directory
    files = os.listdir(raw_data_dir)
    
    zip_found = False
    # Loop through the files and process zip files
    for file in files:
        if file.endswith('.zip'):
            zip_found = True # Set flag to True if a zip file is found, only exist the loop of searching for zip files when there is no more zip file in the directory
            file_path = os.path.join(raw_data_dir, file)
            folder_name = os.path.splitext(file)[0] # remove .zip extension
            extract_path = os.path.join(raw_data_dir, folder_name)

            # Check if unzipped folder already exists
            if not os.path.exists(extract_path):
                print(f"Extracting {file}...")
                try:
                    with zipfile.ZipFile(file_path, 'r') as zip_ref:
                        zip_ref.extractall(extract_path)
                    print(f"Extracted to {extract_path}")
                except zipfile.BadZipFile:
                    print(f"Error: {file} is a bad zip file.")
                    continue
            else:
                print(f"Folder for {file} already exists. Skipping extraction.")

            # Cleanup: Delete the zip file
            print(f"Removing {file} to clean up...")
            try:
                os.remove(file_path)
            except OSError as e:
                print(f"Error removing {file}: {e}")
                
    if not zip_found:
        print("No zip files found.")
        
    print("--- Zip Processing Complete ---\n")
