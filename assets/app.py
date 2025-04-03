import os

# Specify the folder path
folder_path = "assets/items"

# List all files in the folder
for filename in os.listdir(folder_path):
    # Create full path to the file
    file_path = os.path.join(folder_path, filename)

    # Check if it's a file (not a directory)
    if os.path.isfile(file_path):
        # Create the new filename with lowercase letters
        new_filename = filename.lower()

        # Create the full path for the new filename
        new_file_path = os.path.join(folder_path, new_filename)

        # Rename the file
        os.rename(file_path, new_file_path)

        print(f"Renamed: {filename} -> {new_filename}")
