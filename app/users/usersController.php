<?php
/**
 * <dsCode> Inc. (c) 2016. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

/**
 * Created by PhpStorm.
 * User: sutton
 * Date: 8/24/16
 * Time: 3:33 PM
 */
require_once('__php__.php');
$theAction = $_GET['action']; //Control var from the UI URI string
$theUUID = $_GET['uuid']; //UUID from the UI
$theJSONDATA = $_GET['json']; //Data coming from the UI form


switch ($theAction) {
    case "C":
        $theJASON_DATA_INSERT = jsonParserInsert($theJSONDATA);
        $theSQLRAW = "INSERT INTO users, (users_firstname, users_lastname, users_name, users_employeeId, users_pass, users_2group, users_2accessLevel, users_displayName) VALUES('$theJASON_DATA_INSERT')";
        break;
    case "R":
        $theSQLRAW = "SELECT users_UUID, users_firstname, users_lastname, users_name, users_employeeId, users_pass, users_2group, users_2accessLevel, users_displayName FROM users WHERE users_UUID='$theUUID'";
        break;
    case "U":
        $theJASON_DATA_UPDATE = jsonParserUpdate($theJSONDATA);
        $theSQLRAW = "UPDATE users SET $theJASON_DATA_UPDATE WHERE users_UUID='$theUUID'";
        break;
    case "D":
        $theSQLRAW = "DELETE FROM users WHERE users_UUID='$theUUID'";
        break;
    default:
        $theSQLRAW = "SELECT users_UUID, users_firstname, users_lastname, users_name, users_employeeId, users_pass, users_2group, users_2accessLevel, users_displayName FROM users";
}


// Start the session
session_start();
// The SQL Query to get the users info
$_SESSION['sql_query'] = $theSQLRAW;

if (!file_exists('../../php/api_methods/desREAD.php')) {
    printf("<link rel='stylesheet' href='../../css/w3.css' type='text/css'><p><div class='w3-container w3-red w3-round-xxlarge'>" . $errorcodes[404] . ": desREAD.php</div>Application Path is:<div class='w3-text-red'>" . realpath(__FILE__) . "</div></p>");
    die();
} else {
    //send the sql command modeler
    include_once('../../php/api_methods/desREAD.php');
    $theJSONObj = json_decode($JSON_RESULTS, true); //the true statement removes the text 'stdClassObject'

    if (empty($theJSONObj[0])) {
        echo("<link rel='stylesheet' href='../../css/w3.css' type='text/css'><p><div class='w3-container w3-red w3-round-xxlarge'>" . $errorcodes[204] . ": The query result was empty</div>");
    } else {
        print($errorcodes[200]);
        print_r($theJSONObj[0]);

    }
}

// remove all session variables
session_unset();
// destroy the session
session_destroy();


function jsonParserInsert($theJSONDATA)
{
    $theJASON_DATA_INSERT = $theJSONDATA;
    return $theJASON_DATA_INSERT;

}

function jsonParserUpdate($theJSONDATA)
{
    $theJASON_DATA_UPDATE = $theJSONDATA;
    return $theJASON_DATA_UPDATE;
}

?>