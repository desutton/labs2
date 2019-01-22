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
//$theTableName = $_GET['tableName']; // REST URL needs to send the column name.
$theDBName = "labs";
$count = $_GET['stopCol']; // The ending column number. Used for ranged updates for large data updates.
$row = 0;


//$theURIData = "users_UUID=10&users_firstname=David&users_lastname=Sutton&users_name=dsutton&users_employeeId=12&users_pass=init123&users_2group=1&users_2accessLevel=1&users_displayName=Dave%20Sutton";
// Local vars
$filename = 'log.txt';

if (empty($theTABLESMenu)) {
// String for quering the database
    $sql = "SHOW TABLES FROM $theDBName";
// PDO prepare statement for the database
    $stmt = $conn->prepare($sql);
// Fire off the request to the db
    $stmt->execute();

// Grab the column names of the database into an array
    $result = $stmt->fetchAll(PDO::FETCH_COLUMN);

// Ask how many column object are in the table/array
    $count = $stmt->rowCount();

// Loop through the column names setting JSON data to the correct columns name var
    $optionTag = ("<select class='des_dropDown' name='tableName'" . ">"); //The opening tag for the popup menu
    while ($row < $count) {
        $rowData = $result[$row]; // rowData is set to the data found at an iterated column name, in the decoded JSON array's object
        $theTablesRows = $theTablesRows . $rowData;
        $optionTagData = ($optionTagData . "<option value=" . $rowData . ">" . $rowData . "</option>"); //Build the popmenu
        $row++; // Goto the next column object
    }
//}else{
    $theTABLESMenu = "<input type='text' value='" . $theTableName . "'>";
}
/**********************************************************************************/
/*The Var to use in other scripts
*/
$theTABLES = ($theTablesRows); //A string of unformatted Table names
$theTABLESArray = $result; // An array of Table Names
$theTABLESMenu = ($optionTag . $optionTagData . "</select>"); // Popup menu list
/**********************************************************************************/
//echo $theTABLESMenu;
?>