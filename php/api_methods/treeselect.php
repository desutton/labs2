<?php
/**
 * <dsCode> Inc. (c) 2016. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

/*******************************************************************************
David Sutton
March 23 2016

Version: 1.0.0

INSERT
This code is an API for a Webix based app. Used to grab data from a mySQL db,
then parse it and then prepare a JSON statement to be uploaded to a Webix Tree.

Version History:
1.0.0 - Initial release
*******************************************************************************/
?>
<html>
<body bgcolor="black" text="#f8f8ff">

</body>
</html>
<?php

require_once( dirname( __FILE__ ).'/../intercon/servercon.php');
require_once( dirname( __FILE__ ).'/../errorcodes.php');
require_once (dirname( __FILE__ ).'/explodeTree.php');

$theColumnSelection = "customers.cust_company,'/',invoice.invoice_paid,'/',invoice.invoice_invoiceDate,'/',invoice.invoice_invoiceNumber,'/',invoice.invoice_UUID";
$theTableName = "invoice";
$theJoinTable = "customers";
$theJoinColumn = "invoice.invoice_2custUUID";
$theJoinColumnValue = "customers.cust_id";
$theJoinColumnValue1 = "customers.cust_company";
$theJoinColumnValue2 = "invoice.invoice_paid";
$theJoinColumnValue3 = "invoice.invoice_invoiceDate";


//$theTableName = $_GET['tableName']; // Name of the db table(s). Multi use commas to seperate
//$theColumnSelection = $_GET['columnNames']; // The name(s) of the columns to search. Multi use commas to seperate
$theDataName = $_GET['dataName']; //The value to report back to EXT as to the format of the json
$theSelectColumn = $_GET['selectColumn']; //The column to use in the WHERE cause of the sql
$theSelectColumnValue = $_GET['selectData']; //The data value to use in the WHERE cause of the sql
//$theJoinTable = $_GET['joinTable']; //The table name that you want to do a join quary on
//$theJoinColumn = $_GET['joinColumn']; //The column name that you want to do a join quary on
//$theJoinColumnValue = $_GET['joinValue']; //The value you want to do a join quary on
$theOrderColumn = $_GET['sortby']; //The column name you want to sort by
$theOrderSort = $_GET['sort']; //How do you want to sort ASC or DESC?

$pickSQL = $_GET['select']; //The value for which SQL SELECT statement to use "1" = LIMIT, "2" = WHERE, no value is regular expression
$x = NULL;
$rowLimits = 50;
//$rowLimits = $_GET['limit'];

$theTreeColumnName = $_GET['treeColumn'];

// String for quering the database
switch ($pickSQL) {

	case 1:
		//$sql_query = "SELECT ".$theColumnSelection." FROM ".$theTableName." JOIN ".$theJoinTable." ON ".$theJoinColumn." = ".$theJoinColumnValue." ORDER BY ".$theJoinColumnValue." ".$theOrderSort." LIMIT ".$rowLimits;
		$sql_query = "SELECT CONCAT(".$theColumnSelection.") as 'data' FROM ".$theTableName." JOIN ".$theJoinTable." ON ".$theJoinColumn." = ".$theJoinColumnValue." ORDER BY ".$theJoinColumnValue1." ASC, ".$theJoinColumnValue2." ASC, ".$theJoinColumnValue3." ASC ";
		$x = 1;
		break;

	default:
		$sql_query = "SELECT * FROM appinfo";
		$x = 500;

}

// PDO prepare statement for the database
$stmt = $conn->prepare($sql_query);

// Fire off the request to the db
$stmt->execute();
echo("I made it here");
// Get back data then parse it into an php array
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
print_r($results);
//new
	$key_files = array_combine(array_values($files), array_values($files));
	//print_r($key_files);

//new
//$tree = explodeTree($key_files, "/");

$tree = explodeTree($results, "/");
//print_r($tree);

// perform the JSON encode format
////$JSON_RESULTS = json_encode($results);
//$JSON_RESULTS = json_encode($tree);
////echo($JSON_RESULTS); //Send back to JS the results from the db and server


/************************** http://stackoverflow.com/questions/4196157/create-array-tree-from-array-list
 *
 */

?>