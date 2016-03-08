<?php
/*******************************************************************************
David Sutton
Jul 18 2014

Version: 1.0.0

UPDATE
To get the db ready for testing I need to add uuid's to all the rows of data.
This script asks which table you want to insert new uuids for.

Version History:
1.0.0 - Inital release
*******************************************************************************/
/******************************************************************************/
require_once( dirname( __FILE__ ).'/../intercon/servercon.php');
require_once( dirname( __FILE__ ).'/../errorcodes.php');

// Local Vars
	$row = 0;
	$i = 0;
$theTableName = $_GET['tableName']; // REST URL needs to send the column name.
$theTablePrefix = $_GET['tablePrefix']; //The JSON data coming from EXTJS


$theNameOfUUID = $theTablePrefix."_UUID";
$theNameOfID = $theTablePrefix."_id";


$sql_query = "SELECT ".$theNameOfID." FROM ".$theTableName;
// PDO prepare statement for the database
$stmt = $conn->prepare($sql_query);

// Fire off the request to the db
$stmt->execute();

// Get back data then parse it into an php array
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
// Ask how many object are in the array
$count = $stmt->rowCount();

foreach($results as $row){
	require( dirname( __FILE__ ).'/../uuidautogen.php');
// String for quering the database
	$sql_query = ("UPDATE ".$theTableName." SET ".$theNameOfUUID." = '".$theUUID."' WHERE ".$theNameOfID." = '".$row[$theNameOfID]."'");
	//echo($sql_query);

	// PDO prepare statement for the database
	$stmt = $conn->prepare($sql_query);
	
	// Fire off the request to the db
	$stmt->execute();


}
$conn = null;
?>                