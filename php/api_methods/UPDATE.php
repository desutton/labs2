<?php
/**
 * <dsCode> Inc. (c) 2019. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

/*******************************************************************************
David Sutton
Jun 21 2014

Version: 1.0.1

INSERT
This code is an API for a EXT4 based app. Used to grab JSON data from a RESTful 
URL, parse it and then prepare a SQL statement to be executed in mySQL db. 

Version History:
1.0.0 - Inital release
1.0.1 - Added a url option to start and end at a particular column number
*******************************************************************************/
/******************************************************************************/
require_once( dirname( __FILE__ ).'/../intercon/servercon.php');
require_once( dirname( __FILE__ ).'/../errorcodes.php');
//require_once( dirname( __FILE__ ).'/../uuidautogen.php');

// Local Vars
	$row = 0;
	$i = 0;
$theTableName = $_GET['tableName']; // REST URL needs to send the column name.
$theDataValues = $_GET['JSONdata']; //The JSON data coming from EXTJS
$row = $_GET['startCol']; //The starting column number.  Used for ranged updates for large data updates.
$count = $_GET['stopCol']; // The ending column number. Used for ranged updates for large data updates.


if (!isset($_GET['startCol'])) {
	$row = 0;
}
	//DEBUG /**
	//$theDataValues = ('{"success":true,"data":[{"ai_UUID":"123456-1224-1234-12345678","ai_name":"Aa Happy Compounder"}]}');
	//$tempx = %7B%22success%22%3Atrue%2C%22data%22%3A%5B%7B%22ai_UUID%22%3A%22123456-1224-1234-12345678%22%2C%22ai_name%22%3A%22Aa%20Happy%20Compounder%22%7D%5D%7D;
	/**/
$theURIData = "users_UUID=10&users_firstname=David&users_lastname=Sutton&users_name=dsutton&users_employeeId=12&users_pass=init123&users_2group=1&users_2accessLevel=1&users_displayName=Dave%20Sutton";
	// Local vars
	$filename = 'log.txt';


//Decode the JSON from the URL
$decoded = json_decode($theDataValues);
	
// String for quering the database
$sql = "select column_name from information_schema.columns where table_schema ='labs' AND table_name = '$theTableName'";
// PDO prepare statement for the database
$stmt = $conn->prepare($sql);
// Fire off the request to the db 
$stmt->execute();

// Grab the column names of the database into an array
$result = $stmt->fetchAll(PDO::FETCH_COLUMN);
	
if (!isset($_GET['stopCol'])) {
	// Ask how many column object are in the table/array
	$count = $stmt->rowCount();
}
	// Loop through the column names setting JSON data to the correct columns name var
	while($row < $count){
	$rowData = $decoded->data[$i]->{$result[$row]}; // rowData is set to the data found at an iterated column name, in the decoded JSON array's object
	$sqlData[] = ($result[$row]."= '".$rowData."'"); // sqlData is set to a column name "=" data found in the associated JSON object(column data).Building the SQL query
	$row++; // Goto the next column object
	}
	
// Insert the UUID data
//$sqlData[1] = ($result[1]." = '".$theUUID."'");

// Format the array for a composed sql string
$sqlDataFormat = implode(", ", $sqlData);
	
// String for quering the database
$sql_query = ("UPDATE ".$theTableName." SET ".$sqlDataFormat." WHERE ".$result[1]." = '".($decoded->data[$i]->{$result[1]})."'");
file_put_contents($filename, $sql_query."\r", FILE_APPEND | LOCK_EX);
//echo($sql_query);
// PDO prepare statement for the database
$stmt = $conn->prepare($sql_query);

// Fire off the request to the db
$stmt->execute();
$conn = null;
//echo $sql_query;
?>                