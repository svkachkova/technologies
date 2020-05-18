#!/bin/bash

# ./loop.sh 

for var in first "the second" "the third" "I'll do it"; do
  echo "This is: $var"
done

file="loop-example.txt"
IFS=$'\n'
for var in $(cat $file); do
  echo "$var"
done

dir="/mnt/d/pomodoro/public/*"
for file in $dir; do
  if [ -d "$file" ]; then
    echo "$file is a directory"
  elif [ -f "$file" ]; then
    echo "$file is a file"
  fi
done

echo "for 1-10"
for (( i=1; i <= 10; i++ )); do
  echo "$i"
done

echo "while 5-1"
var=5
while [ $var -gt 0 ]; do
  echo $var
  var=$[ $var - 1 ]
done

for (( a = 1; a <= 3; a++ )); do
  echo "Start $a"
  for (( b = 1; b <= 3; b++ )); do
    echo " Inner loop: $b"
  done
done > loop-output.txt
