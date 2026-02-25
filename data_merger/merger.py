import pandas as pd
import os
from functools import reduce

def perform_merge(dfs, names, merged_data_dir):
    """
    Merges multiple dataframes on common columns (Entity, Code, Year)
    and saves the result to merged_data_dir.
    """
    
    # Create output directory if it doesn't exist
    if not os.path.exists(merged_data_dir):
        os.makedirs(merged_data_dir)

    print(f"\nMerging {', '.join(names)}...")
    
    # Note: This assumes both CSVs have Entity, Code, Year. 
    # If columns might differ, you might need extra logic to ask user for keys.
    try:
        common_cols = ['Entity', 'Code', 'Year']
        
        # Verify columns exist in all dataframes
        for i, df in enumerate(dfs):
            missing_cols = [col for col in common_cols if col not in df.columns]
            if missing_cols:
                 raise KeyError(f"Missing columns for merge.\n{names[i]} missing: {missing_cols}")

        merged_df = reduce(lambda left, right: pd.merge(left, right, on=common_cols, how='inner'), dfs)
        
        print("\nMerged Data Info:")
        print(merged_df.info())
        print(merged_df.head())

        output_filename = f"merged_{'_and_'.join(names)}.csv"
        if len(output_filename) > 200:
            output_filename = "merged_multiple_datasets.csv"
            
        output_path = os.path.join(merged_data_dir, output_filename)
        
        merged_df.to_csv(output_path, index=False)
        print(f"\nSUCCESS: Data saved to {output_path}")
        return True
        
    except KeyError as e:
        print(f"\nMERGE FAILED: {e}")
        return False
    except Exception as e:
        print(f"\nAn error occurred during merge: {e}")
        return False
