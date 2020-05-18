#!/bin/bash

# ./read.sh

read -p "Enter your name: " name
echo "Hello $name, welcome to my programm."

read -s -p "Enter your password: " pass
echo "Is your password realy $pass?"

count=1
cat loop-example.txt | while read line; do
  echo "Line $count: $line"
  count=$[ $count + 1 ]
done
