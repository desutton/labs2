<?php
/**
 * <dsCode> Inc. (c) 2016. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

/*******************************************************************************
 * David Sutton
 * Aug 25 2016
 *
 * Version: 1.0.0
 *
 * INSERT
 * This code is an API for a EXT4 based app. Used to grab data from a mySQL db,
 * then parse it and then prepare a JSON statement to be uploaded to a EXTJS Store.
 *
 * Version History:
 * 1.0.0 - Initial release
 *******************************************************************************/
require_once(dirname(__FILE__) . '/../intercon/servercon.php');
require_once(dirname(__FILE__) . '/../errorcodes.php');

$rowLimits = 50;
//$rowLimits = $_GET['limit'];

// Start tha capture session started by the controller
session_start();
// String for quering the database
$sql_query = $_SESSION['sql_query'];

// PDO prepare statement for the database
$stmt = $conn->prepare($sql_query);

// Fire off the request to the db
$stmt->execute();

// Get back data then parse it into an php array
$results = array($stmt->fetchAll(PDO::FETCH_ASSOC));

// perform the JSON encode in the EXTJS format
$JSON_RESULTS = json_encode($results);
//echo($JSON_RESULTS); //Send back to JS the results from the db and server

// kill the connection to the database
$conn = null;


/*********************** Stuff to think about **********************************
 * This is a way to get data directly from the JSON to PHP Array              */

//$theJSONObj = json_decode($JSON_RESULTS, true);
// You can parse through the nested arrays to get to the data
//$theArray = $theJSONObj[0][0];
//$theUUID = $theArray['users_UUID'];
//$theY = ($theUUID);
// OR you can just call it directly
//$theX = ($theJSONObj[0][0]['users_UUID']);
// Just grab it from the db result array
//$theZ = $results[0][0]['user_UUID']; // in thoery this should work
/*******************************************************************************
 * ****************************************************************************/

?>                