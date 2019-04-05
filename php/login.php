<?php
/**
 * <dsCode> Inc. (c) 2019. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

/*******************************************************************************
David Sutton
July 2015

Protocode version 1
Version: Alpha-Test 1

This code is for the login panel that authenticates user info
*******************************************************************************/ 

require_once( dirname( __FILE__ ).'/intercon/servercon.php');
require_once( dirname( __FILE__ ).'/errorcodes.php');

$theDataName = "data";
$theFormUserName = $_GET['users_name'];
$theFormUserPass = $_GET['users_pass'];

if(!isset($theFormUserName)){
	echo("BLogin Fail");
}else{
// ----- Cookie Monster Code ----- //	
// Create a cookie to store user name
$theCookieName = "cial";
// delete any exisiting cookies
setcookie($theCookieName, "", time() -3600, "/");
// set the new cookie
setcookie($theCookieName, $theFormUserName, time() + 28800, "/"); //cookie is good for 8hrs to the "/" whole site
// ----- End of Cookie Monster Code ----- //

// This section queries the database for the entered user name and password.
// If the user name is not found returns to the UI Bad User Id
// If the user name is right but the password is wrong returns to the UI Bad Password
// If both user name and password are right returns to the UI Success
//    $sql_query = "SELECT uname, passname,fname FROM users WHERE uname = '".$theFormUserName."'";

    $sql_query = "SELECT users_name, users_pass,users_displayName FROM users WHERE users_name = '" . $theFormUserName . "'";

// PDO prepare statement for the database
$stmt = $conn->prepare($sql_query);

// Fire off the request to the db
$stmt->execute();


// Get back data then parse it into an php variables
$result = $stmt->fetch(PDO::FETCH_OBJ);
if($result != "0"){
//	$theUserName = $result->uname;
//	$theUserPass = $result->passname;
//	$theUserDisplayName = $result->fname;
    $theUserName = $result->users_name;
    $theUserPass = $result->users_pass;
    $theUserDisplayName = $result->users_displayName;
    //$theUserCookieData = array('UserName'=>$theUserName,'UserDisplayName'=>$theUserDisplayName); //added to try some js out
    $theUserCookieData = array('UserName' => $theUserName, 'UserDisplayName' => $theUserDisplayName );
    setcookie($theCookieName, json_encode($theUserCookieData), time() + 28800, "/"); //cookie is good for 8hrs to the "/" whole site
}else{
	die("Bad User Id");

}




//echo("here ".$theUserPass." is the password - ");

if ($theUserPass == $theFormUserPass){
	echo("Success");
}
else{
	echo("Bad Password");
}
}

?>