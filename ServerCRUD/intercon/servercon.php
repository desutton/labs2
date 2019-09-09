<?php
/**
 * <dsCode> Inc. (c) 2019. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

/*******************************************************************************
 * David Sutton
 * Jan 9 2014
 *
 * Protocode version 1
 * Version: Alpha-Test 1
 *
 * This code is a API for a EXT4 based app. This code is called by the diffrent php
 * files using it to make the database connection.
 *******************************************************************************/
require_once(dirname(__FILE__) . '/../errorcodes.php');
$filename = 'log.txt';


// Create connection				"fmuser"
$con = mysqli_connect("localhost", "dbuser", "dbman", "labs");

// Check connection
if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
    exit();
} else {
    // Might want to create a errorcode showing successful db connection
    //require_once('../errorcodes.php');
    //$dbConnectionStatus= $errorcodes[200];
    //DEBUG
    //echo "<b>db connected</b><br>";
}
//DEBUG  
//echo "Loaded servercon<br>";
/*
$username = 'fmuser';
$password = 'dbman';
try{
  $conn = new PDO('mysql:host=localhost;dbname=fmuser', $username, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $errorcodesMSG= "Database Connection ".$errorcodes[200]." ".date('Y.m.d H:i:s')."\r";
  } catch(PDOException $errorMessage) {
  //echo 'ERROR: ' . $errorMessage->getMessage();
  $errorcodesMSG= "Database Connection ".$errorcodes[400]." ".date('Y.m.d H:i:s')."\r";
}*/
//file_put_contents($filename, $errorcodesMSG, FILE_APPEND | LOCK_EX);
?>