<?php
/**
 * <dsCode> Inc. (c) 2019. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

/*******************************************************************************
 * David Sutton
 * Jun 21 2014
 *
 * Version: 1.0.1
 *
 * INSERT
 * This code is an API for a EXT4 based app. Used to grab JSON data from a RESTful
 * URL, parse it and then prepare a SQL statement to be executed in mySQL db.
 *
 * Version History:
 * 1.0.0 - Inital release
 * 1.0.1 - Added a url option to start and end at a particular column number
 * 1.5.0 - Revampt to make it work with Webix code better Feb-26-2019
 * 1.5 - re-purposed for Webix lot of logging now.
 *******************************************************************************/
/******************** Notes ***************************************************
 *
 * The URL to use this script should follow these rules
 *
 * "/labs2/php/api_methods/updatez.php?tableName="+ theTableName +"&JSONdata="+ theJSONData +"&theWhere="+ theWhereColumn +"&theUUID="+ theUUID +"&dataName=data&select=1"
 *
 * /******************************************************************************/
//require_once(dirname(__FILE__) . '/../intercon/servercon.php');
require_once(dirname(__FILE__) . '/../errorcodes.php');
//require_once( dirname( __FILE__ ).'/../uuidautogen.php');
require_once(dirname(__FILE__) . '/../resources/mode.php');
require_once(dirname(__FILE__) . '/../resources/appVersion.php');
require_once(dirname(__FILE__) . '/../resources/cookieMonster.php');

//////////////////////// Database Selection ////////////////////////
$DB_NAME = $_GET['db_name']; // Name of the database which you want to connect too
if ($DB_NAME === "labs") {
    require_once(dirname(__FILE__) . '/../intercon/servercon.php'); //use the labs database
} elseif ($DB_NAME === "LABSPRD") {
    require_once(dirname(__FILE__) . '/../intercon/servercon1.php'); //user the LABSPRD database
} else {
    require_once(dirname(__FILE__) . '/../intercon/servercon.php'); //use the labs db as a last resort
}
file_put_contents($filename, "Connected to db: " . $DB_NAME . "\r", FILE_APPEND | LOCK_EX); // Just a little log as to what db your connecting to
////////////////////////////////////////////////////////////////////

$filename = 'log.txt';
$date = new DateTime();
$timestamp = $date->format('Y-m-d H:i:s');
$clientIP = $_SERVER['REMOTE_ADDR'];

// Local Vars
$row = 0;
$i = 0;
$sqlData = "";
$theTableName = $_GET['tableName']; // REST URL needs to send the column name.
$theDataValues = $_GET['JSONdata']; //The JSON data coming from EXTJS
$row = $_GET['startCol']; //The starting column number.  Used for ranged updates for large data updates.
$count = $_GET['stopCol']; // The ending column number. Used for ranged updates for large data updates.
$theWhereClause = $_GET['theWhereColumn']; //The Where clause for the SQL to know what record to update.
$theSelector = $_GET['select']; //Specify how you want to do the update.
$theUUID = $_GET['theUUID'];

if (!isset($_GET['startCol'])) {
    $row = 0;
}
//DEBUG /**
//$theDataValues = ('{"success":true,"data":[{"ai_UUID":"123456-1224-1234-12345678","ai_name":"Aa Happy Compounder"}]}');
//$tempx = %7B%22success%22%3Atrue%2C%22data%22%3A%5B%7B%22ai_UUID%22%3A%22123456-1224-1234-12345678%22%2C%22ai_name%22%3A%22Aa%20Happy%20Compounder%22%7D%5D%7D;
/**/
//$theURIData = "users_UUID=10&users_firstname=David&users_lastname=Sutton&users_name=dsutton&users_employeeId=12&users_pass=init123&users_2group=1&users_2accessLevel=1&users_displayName=Dave%20Sutton";
// Local vars
$filename = 'log.txt';


//Decode the JSON from the URL
$decoded = json_decode($theDataValues, true);
//echo($theDataValues);

//print_r($decoded);
///foreach ($decoded as $key => $theValue){

//	echo "Key=" . $key. " Value=" . $theValue . "<br />";

//}
foreach ($decoded as $key => $theValue) {
    $sqlData = $sqlData . $key . "= '" . $theValue . "', ";
    //echo "Key=" . $key. " Value=" . $theValue . "<br />";

}
$sqlData = substr($sqlData, 0, -2);

/*
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
$sqlData[1] = ($result[1]." = '".$theUUID."'");
*/

//                                                 print_r($sqlData); echo("<b> sql Data </b><br /><br />");

// Format the array for a composed sql string
//$sqlDataFormat = implode(", ", $sqlData);
$sqlDataFormat = $sqlData;

// String for quering the database
$sql_query = ("UPDATE " . $theTableName . " SET " . $sqlDataFormat . " WHERE " . $theWhereClause . " = '" . $theUUID . "'");//  $result[1]." = '".($decoded->data[$i]->{$result[1]})."'");


////////////////////////////////////////////////////////////
///             START LOGGING CODE

if ($sysmode !== "prod") {
    file_put_contents($filename, "**update** " . $timestamp . " | " . $theUserName . "@" . $clientIP . " - " . $sql_query . "\r", FILE_APPEND | LOCK_EX);
}
///              END LOGGING CODE
/// ////////////////////////////////////////////////////////
//                                                  echo($sql_query);
try {
// PDO prepare statement for the database
    $stmt = $conn->prepare($sql_query);

// Fire off the request to the db
    $stmt->execute();
// Logging statement for the transaction
    file_put_contents($filename, $stmt->rowCount() . " UPDATED  " . $timestamp . " | " . $theUserName . "@" . $clientIP . " - " . $sql_query . "\r", FILE_APPEND | LOCK_EX);

} // Out put the error to the file
catch (PDOException $errorMess) {
    file_put_contents($filename, $errorMess->getMessage() . "\r", FILE_APPEND | LOCK_EX);
}

$conn = null;
//echo $sql_query;

?>                