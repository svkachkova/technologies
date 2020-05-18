#!/bin/bash

# ./function.sh

function foo {
  read -p "Enter a value: " value
  echo "Adding value"
  return $[ $value + 10 ]
}

foo

echo "The new value is $?"

function bar {
  read -p "Enter new value: " value
  echo $[ $value + 10 ]
}

result=$( bar )
echo "The new value is $result"

function addnum {
  if [ $# -eq 0 ] || [ $# -gt 2 ]; then
    echo -1
  elif [ $# -eq 1 ]; then
    echo $[ $1 + $1 ]
  else
    echo $[ $1 + $2 ]
  fi
}

value=$(addnum 10 15)
echo "Adding 10 and 15: $value"

value=$(addnum 10)
echo "Adding one number: $value"

value=$(addnum)
echo "Adding no numbers: $value"

value=$(addnum 10 15 20)
echo "Adding three numbers: $value"

function baz {
  local args
  args=("$@")
  echo "The new array value is: ${args[*]}"
}

array=(1 2 3 4 5)
echo "The original array is ${array[*]}"
baz ${array[*]}

function factorial {
  if [ $1 -eq 1 ]; then
    echo 1
  else
    local temp=$[ $1 - 1 ]
    local result=$(factorial $temp)
    echo $[ $result * $1 ]
  fi
}

read -p "Enter value: " value
result=$(factorial $value)
echo "The factorial of $value is: $result"
