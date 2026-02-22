# Data Preprocessing Modules

## Module Overview

| Module | Function |
|--------|----------|
| **zip_processor.py** | Scans for ZIP files, extracts them, and deletes the originals |
| **data_utils.py** | Lists available datasets and loads CSV files into DataFrames |
| **merger.py** | Merges two DataFrames on common columns (Entity, Code, Year) |
| **data_merger.py** | Main orchestrator that runs the workflow |

## Execution Order

1. **zip_processor.py** - Processes any compressed data files first
2. **data_utils.py** - Discovers and loads available datasets
3. **merger.py** - Performs the merge operation on selected datasets
4. **data_merger.py** - Run this as the entry point (`python data_merger.py`)

## Workflow

```
data_merger.py (main)
├── zip_processor.process_zip_files()
├── data_utils.get_available_datasets()
├── data_utils.load_dataset()
└── merger.perform_merge()
```

**Start here:** Run `data_merger.py` to execute the complete pipeline interactively.