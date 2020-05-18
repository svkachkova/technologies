#!/bin/bash

# ./signal3.sh

trap "echo ' Trapped Ctrl-C'" SIGINT

count=1
while [ $count -le 5 ]; do
  echo "Loop #$count"
  sleep 1
  count=$[ $count + 1 ]
done

trap "echo ' I modified the trap!'" SIGINT

count=1
while [ $count -le 5 ]; do
  echo "Second Loop #$count"
  sleep 1
  count=$[ $count + 1 ]
done

trap -- SIGINT
echo "I just removed the trap"

count=1
while [ $count -le 5 ]; do
  echo "Third Loop #$count"
  sleep 1
  count=$[ $count + 1 ]
done
