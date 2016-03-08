<?php

/*******************************************************************************
David Sutton
Jan 9 2014 - Jun 17 2014

Version: 1.0.0

This code is a API for a EXT4 based app. This code outlines the verbs used for
the API. EXT should return a verb that the API knows based on this list. Then 
call the script to perform that verb. I'm using numbers for testing.

VERSION HISTORY:
1.0.0 - Inital Release
*******************************************************************************/ 
	$theTableName = $_GET['tableName']; // Name of the db table
	$theColumnSelection = $_GET['columnNames']; // The name(s) of the columns to search
	$theDataName = $_GET['dataName']; //The value to report back to EXT as to the format of the json
	$theSelectColumn = $_GET['selectColumn']; //The column to use in the WHERE cause of the sql
	$theSelectColumnValue = $_GET['selectData']; //The data value to use in the WHERE cause of the sql
	$pickSQL = $_GET['select']; //The value for which SQL SELECT statement to use "1" = LIMIT, "2" = WHERE, no value is regular expression
	$theRowId = $_GET['id'];
	$theDataValues = $_GET['JSONdata']; //The JSON data coming from EXTJS


    // API file listing
    $apicodes = Array(
    	0000 	=> '/labs/php/api_methods/SELECT.php?tableName='.$theTableName.'&columnNames='.$theColumnSelection.'&dataName='.$theDataName.'&select='.$pickSQL,
    	0001	=> '/labs/php/api_methods/SELECT.php?select=0001',
    	1000 	=> '/labs/php/api_methods/SELECT.php?tableName=activeIngredient&columnNames=*&dataName=ai&select=0',
    	1001 	=> '/labs/php/api_methods/SELECT.php?tableName='.$theTableName.'&columnNames='.$theColumnSelection.'&dataName='.$theDataName.'&select='.$pickSQL,
    	1101 	=> '/labs/php/api_methods/SELECT.php?tableName=activeIngredient&columnNames=*&dataName=ai&select=1&selectColumn=ai_id&selectData=34',
    	1102 	=> '/labs/php/api_methods/SELECT.php?tableName=activeIngredient&columnNames=*&dataName=ai&select=2&selectColumn=ai_name&selectData=C',
    	1003 	=> '/labs/php/api_methods/SELECT.php?tableName=activeIngredient&columnNames=*&dataName=ai&select=3',
        'test'	=> '/labs/php/api_methods/test.php',
        999 	=> '(Unused)'
        );

?>