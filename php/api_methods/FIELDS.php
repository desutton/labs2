<?php
/**
 * <dsCode> Inc. (c) 2019. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

/*******************************************************************************
 * David Sutton
 * Jul 21 2016
 *
 * Version: 1.0.0
 *
 * TABLES
 * This code is an API for getting a list of all the fields in a selected table
 *
 * Version History:
 * 1.0.0 - Inital release
 *******************************************************************************/
require_once(dirname(__FILE__) . '/../intercon/servercon.php');
require_once(dirname(__FILE__) . '/../errorcodes.php');

// Local Vars
$row = 0;
$i = 0;
$theTableName = $_POST['tableName']; // REST URL needs to send the column name.
//$theTableName = "users";
//$count = $_GET['stopCol']; // The ending column number. Used for ranged updates for large data updates.
$theReturnPage = $_POST['returnPage'];

// String for quering the database
$sql = "select column_name from information_schema.columns where table_schema ='labs' AND table_name = '$theTableName'";
// PDO prepare statement for the database
$stmt = $conn->prepare($sql);
// Fire off the request to the db
$stmt->execute();

// Grab the column names of the database into an array
$Fresult = $stmt->fetchAll(PDO::FETCH_COLUMN);

// Ask how many column object are in the table/array
$count = $stmt->rowCount();

// Loop through the column names setting JSON data to the correct columns name var
$FoptionTag = ("<select name='fieldName' class='des_dropDown'>");
while ($row < $count) {
    $FrowData = $Fresult[$row]; // rowData is set to the data found at an iterated column name, in the decoded JSON array's object
    $theFieldsRows = $theFieldsRows . $FrowData;
    $FoptionTagData = ($FoptionTagData . "<option value=" . $FrowData . ">" . $FrowData . "</option>");
    $row++; // Goto the next column object
}

/**********************************************************************************/
/*The Var to use in other scripts
*/
$theFIELDS = ($theFieldsRows); //A string of unformatted Fields names
$theFIELDSArray = $Fresult; // An array of Fields Names
$theFIELDSMenu = ($FoptionTag . $FoptionTagData . "</select>"); // Popup menu list
/**********************************************************************************/
//print_r($theFIELDSMenu);

if (ISSET($theTableName)) {
    $theTABLESMenu = "<input type='text' value='" . $theTableName . "'>";
    include $_SERVER['DOCUMENT_ROOT'] . $theReturnPage;
}
?>