<?php
/*******************************************************************************
David Sutton
Jun 21 2014

Version: 1.0.0

DELETE
This code is an API for a EXT4 based app. Used to grab data from a mySQL db, 
then parse it and then prepare a JSON statement to be uploaded to a EXTJS Store. 

Version History:
1.0.0 - Inital release
*******************************************************************************/ 
require_once( dirname( __FILE__ ).'/../intercon/servercon.php');
require_once( dirname( __FILE__ ).'/../errorcodes.php');

$theTableName = $_GET['tableName']; 
$theColumnSelection = $_GET['columnNames'];
$theRowId = $_GET['id'];

// String for quering the database
$sql_query = "DELETE FROM ".$theTableName." WHERE ".$theColumnSelection." = '".$theRowId."'";
echo($sql_query);
// PDO prepare statement for the database
$stmt = $conn->prepare($sql_query);

// Fire off the request to the db
$stmt->execute();


?>                