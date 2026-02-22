import pandas as pd
import os

def perform_merge(df1, df2, name1, name2, merged_data_dir):
    """
    Merges two dataframes on common columns (Entity, Code, Year)
    and saves the result to merged_data_dir.
    """
    
    # Create output directory if it doesn't exist
    if not os.path.exists(merged_data_dir):
        os.makedirs(merged_data_dir)

    print(f"\nMerging {name1} and {name2}...")
    
    # Note: This assumes both CSVs have Entity, Code, Year. 
    # If columns might differ, you might need extra logic to ask user for keys.
    try:
        common_cols = ['Entity', 'Code', 'Year']
        
        # Verify columns exist in both dataframes
        missing_cols1 = [col for col in common_cols if col not in df1.columns]
        missing_cols2 = [col for col in common_cols if col not in df2.columns]
        
        if missing_cols1 or missing_cols2:
             raise KeyError(f"Missing columns for merge.\n{name1} missing: {missing_cols1}\n{name2} missing: {missing_cols2}")

        merged_df = pd.merge(df1, df2, on=common_cols, how='inner')
        
        print("\nMerged Data Info:")
        print(merged_df.info())
        print(merged_df.head())

        output_filename = f"merged_{name1}_and_{name2}.csv"
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
