<?php
/**
 * <dsCode> Inc. (c) 2019. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

/******************************************************************************
 * David Sutton
 * Jun 17 2014 - Jun 18 2014
 *
 * Version: Beta 14
 *
 * This code is a API for a EXT4 based app. This code is called by the different
 * php files using it to make the database connection.
 ******************************************************************************/
// Might want to create a errorcode showing successful db connection
//require_once('../errorcodes.php');
require_once(dirname(__FILE__) . '/../errorcodes.php');
$DB_NAME = "";
$DB_NAME = $_GET['db_name']; // Name of the database.


// Local vars
////////////////////////////////////////////////////////////
///             START LOGGING CODE
/// ////////////////////////////////////////////////////////

$filename = 'log.txt';
$theCookieData = json_decode($_COOKIE['cial']);
$theUserName = $theCookieData->UserName;
$theDisplayName = $theCookieData->UserDisplayName;
$timestamp = date("Y/m/d--H:i:s");
$clientIP = gethostbyaddr($_SERVER["REMOTE_ADDR"]);
////////////////////////////////////////////////////////////
///              END LOGGING CODE
/// ////////////////////////////////////////////////////////

/****************************Old Database Connect*****************************
 * // Create connection
 * $con=mysqli_connect("localhost","fmuser","init123","labs");
 * //$con=mysqli_connect("localhost","fmuser","dbman","fmuser");
 *
 *
 * // Check connection
 * if (mysqli_connect_errno())
 * {
 * $dbConnectionStatus= $errorcodes[401];
 * //DEBUG
 * //echo "<b>".$dbConnectionStatus."</b><br>Failed to connect to MySQL: " . mysqli_connect_error();
 * exit();
 * }
 * else{
 * $dbConnectionStatus= $errorcodes[200];
 *
 * //DEBUG
 * //echo "<b>".$dbConnectionStatus."</b><br>";
 * }
 * //DEBUG
 * //echo "Loaded servercon<br>";
 * //file_put_contents($filename, $errorcodesMSG, FILE_APPEND | LOCK_EX);
 * //exit();
 * /*****************************************************************************/


/* ************************** New PDO Method ******************************* */
$hostname = 'localhost';
$username = 'dbuser';
//$username = 'fmuser';
//$password = 'init123';
$password = 'dbman';
$DB_NAME = "LABSPRD";

try {
    $conn = new PDO('mysql:host=localhost;dbname=' . $DB_NAME . ';charset=utf8mb4', $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $errorcodesMSG = "Database Connection " . $errorcodes[200] . " " . date('Y-m-d H:i:s') . "\r";
} catch (PDOException $errorMessage) {
    $errorcodesMSG = "Database Connection " . $errorcodes[401] . " " . date('Y-m-d H:i:s') . "\r" . $errorMessage->getMessage() . "\r";
    $conn = null;
}
///*DEBUG*///
//echo $errorcodesMSG;
//file_put_contents($filename, $errorcodesMSG, FILE_APPEND | LOCK_EX);
/*****************************************************************************/
?>