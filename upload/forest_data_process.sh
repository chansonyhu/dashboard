#!/bin/bash

WORK_PATH="/home/"$USER"/dashboard/upload/DataDeal"
EXCEL_PATH="$WORK_PATH/data/excel"
cd $EXCEL_PATH
file=$1
if [ "$1" != "" ]; then
if [ "${file##*.}"x = "xlsx"x ]||[ "${file##*.}"x = "xls"x ];then
    mv $EXCEL_PATH/$file $EXCEL_PATH/../
fi
if [ "${file##*.}"x = "zip"x ];then
    cd $EXCEL_PATH
    unzip $file
    mv $EXCEL_PATH/$file /tmp/
    dir=$(echo $1 | cut -d . -f1)
    mv $EXCEL_PATH/$dir/*xls $EXCEL_PATH/../
    rm -R $EXCEL_PATH/$dir 
fi
if [ "${file##*.}"x = "rar"x ];then
    cd $EXCEL_PATH
    unar $file
    mv $EXCEL_PATH/$file /tmp/
    dir=$(echo $1 | cut -d . -f1)
    mv $EXCEL_PATH/$dir/*xls $EXCEL_PATH/../
    rm -R $EXCEL_PATH/$dir 
fi
fi # if [ "$1" != "" ]; then
cd $WORK_PATH
for script in `ls *.py`
do
    python3.6 $script
done
rm -R $EXCEL_PATH/*

cp $WORK_PATH/data/*json $WORK_PATH/../../src/assets/static/data/
