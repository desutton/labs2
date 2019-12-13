<?php
/**
 * <dsCode> Inc. (c) 2019. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */


include $_SERVER['DOCUMENT_ROOT'] . '/labs2/php/resources/cookieMonster.php';


// Grab the accessLevel
$sql_query1 = "SELECT `users_2accessLevel` FROM `users` WHERE `users_name` = '" . $theUserName . "' ";
$JSON_RESULTS_DATA1 = dataQuery($sql_query1);

foreach ($JSON_RESULTS_DATA1 as $key => $value) {
    $USER_ACCESS_LEVEL = $value->users_2accessLevel;
}

/// Grab the name of the group
$sql_query2 = "SELECT `groups_name` FROM `groups` WHERE `groups2accessLevel` = '" . $USER_ACCESS_LEVEL . "' ";
$JSON_RESULTS_DATA2 = dataQuery($sql_query2);
foreach ($JSON_RESULTS_DATA2 as $key => $value) {
    $USER_ACCESS_NAME = $value->groups_name;
}


// Common Function to query database for access level info
function dataQuery($sql_query)
{
    include(dirname(__FILE__) . '/../intercon/servercon.php');
    include(dirname(__FILE__) . '/../errorcodes.php');
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
    return $JSON_RESULTS_DATA;
// kill the connection to the database
$conn = null;
}

?>
