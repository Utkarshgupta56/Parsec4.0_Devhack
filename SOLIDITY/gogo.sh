#!/bin/bash

# Define the start time
start_time=$(date +%s)

# Define the end time (5 minutes from the start)
end_time=$((start_time + 300))

# Output file
output_file="migrate_results.txt"

# Start capturing output when the following string is found
start_capture="Compiling your contracts..."

# Flag to indicate if capturing has started
capturing=false

# Function to process the results
process_results() {
    ./process_results.sh
}

# Watch for file creation or modification
inotifywait -e create,modify -m "$output_file" |
while read -r event; do
    if [ "$capturing" = false ]; then
        # If capturing has not started, start it
        capturing=true
        process_results &
    fi
done &

while [ $(date +%s) -lt $end_time ]; do
    # Run the truffle migrate command and capture the output
    migration_output=$(truffle migrate 2>&1)

    if [ "$capturing" = true ]; then
        # Append the captured output to the output file
        echo "$migration_output" > "$output_file"
    fi

    # Check if the start_capture string is found in the output
    if [ "$capturing" = false ] && [[ "$migration_output" == *"$start_capture"* ]]; then
        capturing=true
    fi

    # Sleep for 3 seconds
    sleep 3
done

echo "Script finished after 5 minutes. Results are stored in $output_file"
