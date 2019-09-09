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
$JSONroot = "solu"; //not used

/*Capture the data from the form*/
$id = $decoded->solu[$i]->{'id'};
$ingredient = $decoded->solu[$i]->{'ingredient'};
$formulateAs = $decoded->solu[$i]->{'formulateAs'};
$verySoluble = $decoded->solu[$i]->{'verySoluble'};
$freelySoluble = $decoded->solu[$i]->{'freelySoluble'};
$soluble = $decoded->solu[$i]->{'soluble'};
$sparinglySoluble = $decoded->solu[$i]->{'sparinglySoluble'};
$slightlySoluble = $decoded->solu[$i]->{'slightlySoluble'};
$verySlightlySoluble = $decoded->solu[$i]->{'verySlightlySoluble'};
$insoluble = $decoded->solu[$i]->{'insoluble'};
//$insoluble = $decoded->{'insoluble'};


/* Build insert query */
$insertQuery = "UPDATE  Solubility SET ingredient='$ingredient', formulateAs='$formulateAs', verySoluble='$verySoluble', freelySoluble='$freelySoluble', soluble='$soluble', sparinglySoluble='$sparinglySoluble', slightlySoluble='$slightlySoluble', verySlightlySoluble='$verySlightlySoluble', insoluble='$insoluble' WHERE id='$id'";

/*Insert into the DataBase */
mysqli_query($con, $insertQuery);

/* close connection */
mysqli_close($con);
//echo("-".$id."Ok");
?>