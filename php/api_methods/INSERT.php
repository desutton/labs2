<?php
/**
 * <dsCode> Inc. (c) 2019. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

/*******************************************************************************
David Sutton
Jun 21 2014

Version: 1.0.2

INSERT
This code is an API for a EXT4 based app. Used to grab JSON data from a RESTful 
URL, parse it and then prepare a SQL statement to be executed in mySQL db. 

Version History:
1.0.0 - Inital release
1.0.1 - Added a url option to start and end at a particular column number. Added to keep consistent with UPDATE.php
1.0.2 - Fixed an issue with the query not inserting because the column names were not part of the insert query
*******************************************************************************/
/******************************************************************************/
require_once( dirname( __FILE__ ).'/../intercon/servercon.php');
require_once( dirname( __FILE__ ).'/../errorcodes.php');
require_once( dirname( __FILE__ ).'/../uuidautogen.php');

// Local Vars
	$row = 0;
	$i = 0;
$theTableName = $_GET['tableName']; // REST URL needs to send the column name.
$theDataValues = $_GET['JSONdata']; //The JSON data coming from EXTJS
$row = $_GET['startCol']; //The starting column number.  Used for ranged updates for large data updates.
$count = $_GET['stopCol']; // The ending column number. Used for ranged updates for large data updates.

// Testing vars
//$theTableName = "requisitions";
//$theDataValues = "{%22success%22:true,%22data%22:[{%22req_UUID%22:%2282026edb-e2bf-42d2-998d-044253eb168a%22,%20%22req_reqName%22:%22David%20Sutton%22,%20%22req_dept%22:%22IT%22,%20%22req_dateSubmit%22:%2201/29/2019%22,%20%22req_dateNeed%22:%2201/31/2019%22,%20%22req_ordered%22:%22ABC1234%22,%20%22req_vendor%22:%22Acme%20Inc%22,%20%22req_status%22:%221%22}]}";


if (!isset($_GET['startCol'])) {
	$row = 0;
}
	/*/DEBUG /**
	//$theDataValues = ('{"success":true,"data":[{"ai_UUID":"123456-1224-1234-12345678","ai_name":"Aa Happy Compounder"}]}');
	//$tempx = %7B%22success%22%3Atrue%2C%22data%22%3A%5B%7B%22ai_UUID%22%3A%22123456-1224-1234-12345678%22%2C%22ai_name%22%3A%22Aa%20Happy%20Compounder%22%7D%5D%7D;
	/**/
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

// Grab the column names of the database
$result = $stmt->fetchAll(PDO::FETCH_COLUMN);
	
if (!isset($_GET['stopCol'])) {
	// Ask how many column object are in the table/array
	$count = $stmt->rowCount();
}
	/* This next few lines of code are hard to discribe. I'm using a method in PHP to set a variable name to the data I'm parsing. First create an
	array - decoded for the decoded JSON data. Now the data is a collection of objects which may or not be in the correct order. 	So I make a db
	 query to the info shcema table in mySQL to find out what my columns are then put the names into a second array - results. I also get the 
	 number of caolumns and set that to count. I set row to 0 so I start and the begining of the array. Then do a conditional while cause
	for parsing through the two arrays. 
	The column names from the info schema array - results become variables and are set to the corriponding JSON data object in the array - decoded
	The combined data is then put into a new array called sqlData which will later be used as the SQL INSERT statement 
	I don't know if I have it working 100 percent but the echo'd out put looks right. 
	*/
	// Loop through the column names setting JSON data to the correct columns name var
	while($row < $count){
	${$result[$row]} = $decoded->data[$i]->{$result[$row]}; // rowData is set to the data found at an iterated column name, in the decoded JSON array's object
	$sqlData[] = ("'".${$result[$row]}."'");// sqlData is set to a column name "=" data found in the associated JSON object(column data).Building the SQL query
	$resultColumnNamesList[] = $result[$row]; // $results array of column names build a new array with column names of the insert quesy controled by stopCol 
	$row++; // Goto the next column object
	}
	
//Insert a NULL for the id
$sqlData[0] = ('NULL');

// Insert the UUID data
//$sqlData[1] = ("'".$theUUID."'"); // Commented this out in Jan 2016 to put the UUID code in the js files. My hope was to allow for more flexible data structures

// Format the array for a composed sql string
$sqlDataFormat = implode(", ", $sqlData);

//Create a list of column names user for the insert quary
$resultColumnNames = implode(", ", $resultColumnNamesList);
	
// String for quering the database
$sql_query = ("INSERT INTO ".$theTableName." ( ".$resultColumnNames." ) VALUES (".$sqlDataFormat.")");
file_put_contents($filename, $sql_query."\r", FILE_APPEND | LOCK_EX);

// PDO prepare statement for the database
$stmt = $conn->prepare($sql_query);

// Fire off the request to the db
$stmt->execute();
$conn = null;
?>                