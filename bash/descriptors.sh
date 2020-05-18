#!/bin/bash

# ./descriptors.sh 2> decsr-error.txt

echo "This is an error" >&2
echo "This is normal output"

exec 6<&1
exec 1> descr-output.txt
echo "This is a test of redirecting all output"
echo "from a shell script to another file."
echo "without having to redirect every line"

exec 0< loop-example.txt
exec 3> descr-output-3.txt
count=1
while read line; do
  echo "Line #$count: $line" >&3
  count=$[ $count + 1 ]
  if [ $count == 3 ]; then
    exec 3>&-
  fi
done

exec 1<&6
lsof -a -p $$ -d 0,1,2,3,6
