#!/bin/bash

# ./background.sh &

# не завершит работу при закрытии терминала
# nohup ./background.sh &

count=1 
while [ $count -le 10 ]; do
  sleep 1
  count=$[ $count + 1 ]
done
