#!/bin/bash

# ./variables.sh

var1=$(( 5 + 5 ))
var2=$(( $var1 * 2))
echo $var1
echo $var2

if pwd; then
  echo "It works"
fi

user=sveta
if grep $user /etc/passwd; then
  echo "The user $user Exists"
else
  echo "The user $user doesn't exist"
fi

str1=text
str2="another text"
if [ $str1 \> "$str2" ]; then
  echo "$str1 is greater than $str2"
else
  echo "$str1 is less than $str2"
fi

homedir=$HOME
if [ -d $homedir ]; then
  echo "The $homedir directory exists"
  cd $homedir
  ls
else
  echo "The $homedir directory doesn't exist"
fi
