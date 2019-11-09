<?php
/**
 * <dsCode> Inc. (c) 2019. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

/*******************************************************************************
* David Sutton
* Jun 21 2014
 *
* Version: 1.0.0
 *
* DELETE
* This code is an API for a EXT4 based app. Used to grab data from a mySQL db,
* then parse it and then prepare a JSON statement to be uploaded to a EXTJS Store.
 *
* Version History:
* 1.0.0 - Inital release
 * 1.5 - re-purposed for Webix lot of logging now.
*******************************************************************************/
//require_once( dirname( __FILE__ ).'/../intercon/servercon.php');
require_once( dirname( __FILE__ ). '/../errorcodes.php');

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

$theTableName = $_GET['tableName']; 
$theColumnSelection = $_GET['columnNames'];
$theRowId = $_GET['id'];

// String for quering the database
$sql_query = "DELETE FROM ".$theTableName." WHERE ".$theColumnSelection." = '".$theRowId."'";
////////////////////////////////////////////////////////////
///             START LOGGING CODE

if ($sysmode ==!"prod"){
    file_put_contents($filename, "**DELETE** ".$timestamp." | ".$theUserName."@".$clientIP." - " .$sql_query."\r", FILE_APPEND | LOCK_EX);
}
///              END LOGGING CODE
/// ////////////////////////////////////////////////////////
echo($sql_query);
// PDO prepare statement for the database
$stmt = $conn->prepare($sql_query);

// Fire off the request to the db
$stmt->execute();


?>                