<?php
/**
 * <dsCode> Inc. (c) 2019. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

require_once(dirname(__FILE__) . '/../intercon/servercon.php');
require_once(dirname(__FILE__) . '/../errorcodes.php');
include $_SERVER['DOCUMENT_ROOT'] . '/labs2/php/resources/cookieMonster.php';


$sql_query = "SELECT `users_2accessLevel` FROM `users` WHERE `users_name` = '" . $theUserName . "' ";
//echo($theUserName);

// PDO prepare statement for the database
$stmt = $conn->prepare($sql_query);

// Fire off the request to the db
$stmt->execute();

// Get back data then parse it into an php array
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

// perform the JSON encode in the EXTJS format
$JSON_RESULTS = json_encode($results);
//print_r($JSON_RESULTS); //Send back to JS the results from the db and server
$JSON_RESULTS_DATA = json_decode($JSON_RESULTS);


foreach ($JSON_RESULTS_DATA as $key => $value) {
    $USER_ACCESS_LEVEL = $value->users_2accessLevel;
}

// kill the connection to the database
$conn = null;

?>
