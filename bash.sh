#!/bin/bash
input="~/Desktop/test_split_large_file/shared_0_10.txt"
while IFS= read -r line
do
  echo "$line"
done < "$input"