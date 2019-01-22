<?php
/**
 * <dsCode> Inc. (c) 2019. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

/******************************************************************************
David Sutton
Jun 17 2014 - Jun 18 2014

Version: Beta 9

This code is a API for a EXT4 based app. This code is called by the different 
php files using it to make the database connection.
******************************************************************************/ 
  // Might want to create a errorcode showing successful db connection
  	//require_once('../errorcodes.php');
  	require_once( dirname( __FILE__ ).'/../errorcodes.php');
  	
// Local vars
$filename = 'log.txt';

/****************************Old Database Connect*****************************
// Create connection
	$con=mysqli_connect("localhost","fmuser","init123","labs");
	//$con=mysqli_connect("localhost","fmuser","dbman","fmuser");


// Check connection
	if (mysqli_connect_errno())
  {
	  $dbConnectionStatus= $errorcodes[401];
	  //DEBUG
	  //echo "<b>".$dbConnectionStatus."</b><br>Failed to connect to MySQL: " . mysqli_connect_error();
	  exit();
  }
  else{
  	$dbConnectionStatus= $errorcodes[200];
  	
  //DEBUG
	  //echo "<b>".$dbConnectionStatus."</b><br>";
  }
//DEBUG  
//echo "Loaded servercon<br>";
//file_put_contents($filename, $errorcodesMSG, FILE_APPEND | LOCK_EX);
//exit();
/*****************************************************************************/


/* ************************** New PDO Method ******************************* */
$hostname = 'localhost';
$username = 'dbuser';
//$username = 'fmuser';
//$password = 'init123';
$password = 'dbman';
$DB_NAME =	"labs";

try{
    $conn = new PDO('mysql:host=localhost;dbname=labs;charset=utf8mb4', $username, $password);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$errorcodesMSG= "Database Connection ".$errorcodes[200]." ".date('Y-m-d H:i:s')."\r";
	} catch(PDOException $errorMessage) {
    $errorcodesMSG= "Database Connection ".$errorcodes[401]." ".date('Y-m-d H:i:s')."\r".$errorMessage->getMessage()."\r";
}
///*DEBUG*///
//echo $errorcodesMSG;
//file_put_contents($filename, $errorcodesMSG, FILE_APPEND | LOCK_EX);
/*****************************************************************************/
?>