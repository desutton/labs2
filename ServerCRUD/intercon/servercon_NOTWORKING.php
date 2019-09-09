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
// Might want to create a errorcode showing successful db connection
//require_once('http://compounderlab.com/ServerCRUD/errorcodes.php');
require_once(dirname(__FILE__) . '/../errorcodes.php');

//Localvars script
$filename = 'log.txt';
$username = 'fmuser';
$password = 'dbman';
$dsn = 'mysql:host=localhost;dbname=fmuser';
$options = array(
    PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
);
$errorcodesMSG = "";
// Create connection
//$con=mysqli_connect("localhost","compouo0_cial","il0ve^sc@ke","compouo0_labnotebook");
//$con=mysqli_connect("localhost","compouo0_cial","il0ve^sc@ke","compouo0_labnotebook");
$con = mysqli_connect("localhost", "fmuser", "dbman", "fmuser");

//$con=mysqli_connect("localhost","fmuser","dbman","fmuser");


// Check connection
if (mysqli_connect_errno()) {
    //echo "Failed to connect to MySQL: " . mysqli_connect_error();
    $errorcodesMSG1 = "Database Connection (Old Method)  " . mysqli_connect_error() . " - " . $errorcodes[400] . " " . date('Y.m.d H:i:s') . "\r";
    exit();
} else {
    //DEBUG
    $errorcodesMSG1 = "Database Connection (Old Method)  " . $errorcodes[200] . " " . date('Y.m.d H:i:s') . "\r";
    //file_put_contents($filename, $errorcodesMSG1, FILE_APPEND | LOCK_EX);
}
/*
try{
	$conn = new PDO($dsn, $username, $password, $options); 
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	} catch(PDOException $errorMessage) {
    //echo 'ERROR: ' . $errorMessage->getMessage();
    $errorcodesMSG= "Database Connection (New Method) ".$errorcodes[400]." ".date('Y.m.d H:i:s').$errorMessage->getMessage()."\r";
}
*/
//file_put_contents($filename, $errorcodesMSG, FILE_APPEND | LOCK_EX);
?>