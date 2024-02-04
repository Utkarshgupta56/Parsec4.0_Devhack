#!/bin/bash

# Define the start time
start_time=$(date +%s)

# Define the end time (5 minutes from the start)
end_time=$((start_time + 300))

# Output file
output_file="results.txt"

# Start capturing output when the following string is found
start_capture="Summary"

while [ $(date +%s) -lt $end_time ]; do
    # Run the truffle migrate command and capture the output
    migration_output=$(truffle migrate 2>&1)

    # Check if the start_capture string is found in the output
    if [[ "$migration_output" == *"$start_capture"* ]]; then
        # Extract the summary part from the output
        summary_output=$(echo "$migration_output" | sed -n '/^Summary/,$p')
        
        # Append the summary output to the output file
        # This will overwrite the previous content with the latest summary
        echo "$summary_output" > "$output_file"
    fi

    # Sleep for a short period before the next iteration to limit resource usage
    sleep 3
done

echo "Script finished after 5 minutes. Latest summary results are stored in $output_file"
