#!/bin/sh

env=$1
project=$(cat ../package.json | awk -F '[:]' '/name/{print$2}' | sed 's/[\"|,]//g')

echo 'build...!'
echo 'make log dir'
mkdir -p /data/$project/logs

echo 'build config.json file'

declare __CUR_DIR__=`pwd`
echo "cur path: "${__CUR_DIR__}
declare __FILE_FARTHER_DIR__=`dirname $0`
cd ${__FILE_FARTHER_DIR__}
declare __FILE_DIR__=`pwd`
echo "cur path: "${__FILE_DIR__}

if [ ! -n "$1" ] ;then
    echo "you have not input a param!"
    env="default"
else
    echo "the word you input is $1"
fi

declare __ENV__=$env
declare __CONFIG_DIR__="../config"

echo "env:${__ENV__}"
echo "build config...!"
cat "${__CONFIG_DIR__}/config_${__ENV__}.js" > "${__CONFIG_DIR__}/config.js"

cd ${__CUR_DIR__}
echo "cur path: "`pwd`
