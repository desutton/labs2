<?php
/**
 * <dsCode> Inc. (c) 2019. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

/*******************************************************************************
 * David Sutton
 * Jan 9 2014 - March 26 2014
 *
 * Protocode version 1
 * Version: Alpha-Test 1
 *
 * This code is a API for a EXT4 based app. Used to grab all the data in the mySQL
 * db Methods' table and encode it as JSON data that EXT can then use.
 *******************************************************************************/
require_once(dirname(__FILE__) . '/../intercon/servercon.php');
require_once(dirname(__FILE__) . '/../errorcodes.php');

//$myJSONdata = file_get_contents("http://localhost/ServerCRUD/JSONdata.json", true);
$myJSONdata = $_GET['JSONdata'];

//Decode the JSON
$decoded = json_decode($myJSONdata);
//Future use of iteration
$i = 0;
$JSONroot = "api"; //not used

/*Capture the data from the form*/
$id = mysql_real_escape_string($decoded->api[$i]->{'APIid'});
$ingredient = mysql_real_escape_string($decoded->api[$i]->{'APIingredient'});
$mobilePhase = mysql_real_escape_string($decoded->api[$i]->{'APImobilePhase'});
$columnId = mysql_real_escape_string($decoded->api[$i]->{'APIcolumnId'});
$percent = mysql_real_escape_string($decoded->api[$i]->{'APIpercent'});
$other = mysql_real_escape_string($decoded->api[$i]->{'APIother'});
$manufacture = mysql_real_escape_string($decoded->api[$i]->{'APImanufacture'});
$expiration = mysql_real_escape_string($decoded->api[$i]->{'APIexpiration'});
$dateOpened = mysql_real_escape_string($decoded->api[$i]->{'APIdateOpened'});
$storageLocation = mysql_real_escape_string($decoded->api[$i]->{'APIstorageLocation'});
$potency = mysql_real_escape_string($decoded->api[$i]->{'APIpotency'});
$retested = mysql_real_escape_string($decoded->api[$i]->{'APIretested'});
$results = mysql_real_escape_string($decoded->api[$i]->{'APIresults'});
$method = mysql_real_escape_string($decoded->api[$i]->{'APImethod'});
$weight = mysql_real_escape_string($decoded->api[$i]->{'APImolWeight'});


/* Build insert query */

$insertQuery = "UPDATE API_Standards SET APIingredient='$ingredient', APImobilePhase='$mobilePhase', APIcolumnId='$columnId', APIpercent='$percent', APIother='$other', APImanufacture='$manufacture', APIexpiration='$expiration', APIdateOpened='$dateOpened', APIstorageLocation='$storageLocation', APIpotency='$potency', APIretested='$retested', APIresults='$results', APImethod='$method', APImolWeight='$weight' WHERE APIid='$id'";
/*Insert into the DataBase */
mysqli_query($con, $insertQuery);


/* close connection */
mysqli_close($con);
?>