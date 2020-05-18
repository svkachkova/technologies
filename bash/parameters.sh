#!/bin/bash

# ./parameters.sh 5 10 15 20 25

echo "It's $0 script."
echo "There were $# parametres passed."

echo "Using the \$* method: $* - string"
echo "Using the \$@ method: $@ - array"

if [ $# -gt 0 ]; then
  total=$[ $1 + $2 ]
  echo "The first parameter is $1."
  echo "The second parameter is $2."
  echo "The sum is $total."
else
  echo "No parametres found."
fi

count=1
for param in "$@"; do
  echo "Parameter #$count = $param"
  count=$[ $count + 1 ]
done

count=1
while [ -n "$1" ]; do
  echo "Parameter #$count = $1"
  count=$[ $count + 1 ]
  shift
done
