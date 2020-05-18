#!/bin/bash

# ./script.sh

counter=1

IFS=:
for folder in $PATH; do

  if [ $counter -ge 4 ]; then
    break
  fi 

  echo $counter
  echo "$folder:"

  counter=$[ $counter + 1 ]

  for file in $folder/*; do
    if [ -x $file ]; then
      echo " $file"
    fi
  done

done
