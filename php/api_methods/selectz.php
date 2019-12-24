<?php
/**
 * <dsCode> Inc. (c) 2016. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

/*******************************************************************************
* David Sutton
* Jun 21 2014
 *
* Version: 1.0.0
 *
 * SELECT
 * This code is an API for a EXT4 based app. Used to grab data from a mySQL db,
* then parse it and then prepare a JSON statement to be uploaded to a EXTJS Store.
 *
* Version History:
* 1.0.0 - Initial release
 * 1.5 - re-purposed for Webix lot of logging now.
 *******************************************************************************/

//include 'http://localhost/labs2php/intercon/servercon.php?db_name=labs'; // script to get the database connections
require_once( dirname( __FILE__ ).'/../errorcodes.php');
require_once(dirname(__FILE__) . '/../resources/mode.php');
require_once(dirname(__FILE__) . '/../resources/appVersion.php');
require_once(dirname(__FILE__) . '/../resources/cookieMonster.php');

//////////////////////// Database Selection ////////////////////////
$DB_NAME = $_GET['db_name']; // Name of the database which you want to connect too
if ($DB_NAME === "labs") {
    require_once(dirname(__FILE__) . '/../intercon/servercon.php'); //use the labs database
} elseif ($DB_NAME === "LABSPRD") {
    require_once(dirname(__FILE__) . '/../intercon/servercon1.php'); //user the LABSPRD database
} else {
    require_once(dirname(__FILE__) . '/../intercon/servercon.php'); //use the labs db as a last resort
}
file_put_contents($filename, "                     Connected to db: " . $DB_NAME . "\r", FILE_APPEND | LOCK_EX); // Just a little log as to what db your connecting to
////////////////////////////////////////////////////////////////////

$filename = 'log.txt'; // log file for every transaction
$date = new DateTime();
$timestamp = $date->format('Y-m-d H:i:s');
$clientIP = $_SERVER['REMOTE_ADDR']; // grab the browsers ip just to freak-out the user


$theTableName = $_GET['tableName']; // Name of the db table(s). Multi use commas to seperate
$theColumnSelection = $_GET['columnNames']; // The name(s) of the columns to search. Multi use commas to seperate
$theDataName = $_GET['dataName']; //The value to report back to EXT as to the format of the json
$theSelectColumn = $_GET['selectColumn']; //The column to use in the WHERE cause of the sql
$theSelectColumnValue = $_GET['selectData']; //The data value to use in the WHERE cause of the sql
$theJoinTable = $_GET['joinTable']; //The table name that you want to do a join quary on
$theJoinColumn = $_GET['joinColumn']; //The column name that you want to do a join quary on
$theJoinColumnValue = $_GET['joinValue']; //The value you want to do a join quary on
$theOrderColumn = $_GET['sortby']; //The column name you want to sort by
$theOrderSort = $_GET['sort']; //How do you want to sort ASC or DESC?
$theOperator = $_GET['operator'];
$theUserID = $_GET['usenid']; //Collect the user id for logging

$pickSQL = $_GET['select']; //The value for which SQL SELECT statement to use "1" = LIMIT, "2" = WHERE, no value is regular expression
$x = NULL;
//$rowLimits = 50;
$rowLimits = $_GET['limit'];

if ($theOperator == NULL) {
	$theOperator = "=";
}


$theTreeColumnName = $_GET['treeColumn'];

// String for querying the database
switch ($pickSQL) {
	case 1:
		$sql_query = "SELECT " . $theColumnSelection . " FROM " . $theTableName . " WHERE " . $theSelectColumn . $theOperator . "'" . $theSelectColumnValue . "'";
		$x = 1;
		break;
	case 2:
		$sql_query = "SELECT ".$theColumnSelection." FROM ".$theTableName." WHERE ".$theSelectColumn." LIKE '".$theSelectColumnValue."%'";
		$x = 1;
		break;	
	case 3:
		$sql_query = "SELECT ".$theColumnSelection." FROM ".$theTableName." LIMIT ".$rowLimits;
		$x = 1;
		break;
	case 4: //Used to build the DataTree
		$sql_query = "SELECT ".$theColumnSelection." AS 'value' FROM ".$theTableName." INNER JOIN ".$theJoinTable." ON ".$theJoinColumn." = ".$theJoinColumnValue." ORDER BY ".$theOrderColumn." ".$theOrderSort." LIMIT ".$rowLimits;
		$x = 1;
		break;
	case 5:
		$sql_query = "SELECT ".$theColumnSelection." FROM ".$theTableName;
		$x = 1;
		break;
	case 6:
		$sql_query = "SELECT ".$theColumnSelection." FROM ".$theTableName." ORDER BY cust_company ASC";
		$x = 1;
		break;
	case 7: //Used to build the DataTree
        $theColumnSelection = "customers.cust_company,invoice.invoice_paid,invoice.invoice_invoiceDate,invoice.invoice_invoiceNumber,invoice.invoice_UUID";
        $theTableName = "invoice";
        $theJoinTable = "customers";
        $theJoinColumn = "invoice.invoice_2custUUID";
        $theJoinColumnValue = "customers.cust_id";
        $theJoinColumnValue1 = "customers.cust_company";
        $theJoinColumnValue2 = "invoice.invoice_paid";
        $theJoinColumnValue3 = "invoice.invoice_invoiceDate";
        //$sql_query = "SELECT ".$theColumnSelection." FROM ".$theTableName." JOIN ".$theJoinTable." ON ".$theJoinColumn." = ".$theJoinColumnValue." ORDER BY ".$theOrderColumn." ".$theOrderSort." LIMIT ".$rowLimits;
        $sql_query = "SELECT " . $theColumnSelection . " FROM " . $theTableName . " JOIN " . $theJoinTable . " ON " . $theJoinColumn . " = " . $theJoinColumnValue . " ORDER BY " . $theJoinColumnValue1 . " ASC, " . $theJoinColumnValue2 . " ASC, " . $theJoinColumnValue3 . " ASC ";
        $x = 1;
        break;
    case 8:
        $sql_query = "SELECT " . $theColumnSelection . " FROM " . $theTableName . " INNER JOIN " . $theJoinTable . " ON " . $theJoinColumn . " = " . $theJoinColumnValue . " WHERE " . $theSelectColumn . $theOperator . "'" . $theSelectColumnValue . "'" . " ORDER BY " . $theOrderColumn . " " . $theOrderSort . " LIMIT " . $rowLimits;
        $x = 1;
        break;

    case 1000: //Method case
        //$sql_query = "SELECT activeIngredient.ai_name, activeIngredient.ai_description, jobs.jobs_name,	jobs.jobs_dueDate, jobs.jobs_modifyDate, jobs.jobs_createDate, jobs.jobs_assignment, jobs.jobs_2accessLevel, jobs.jobs_2group, jobs.jobs_2userLog, methodCalculation.methodC_areaSamplePeak, methodCalculation.methodC_areaStandardPeak, methodCalculation.methodC_amountInSample, methodCalculation.methodC_amountOfSample, methodCalculation.methodC_calcPotency, methodCalculation.methodC_calcPotencyPercent, methodCalculation.methodC_targetPotency, methodCalculation.methodC_calcPotencyPercentOfPotencyTarget, methodCalculation.methodC_targetPotencyPercent, methodCalculation.methodC_calcPotencyPercentOfPotencyTargetPercent, methodCalculation.methodC_mixSampleConcetration, methodCalculation.methodC_concentrationStandard, methodCalculation.methodC_dilutionFactor, customers.cust_company, customers.cust_customerNumber FROM method INNER JOIN activeIngredient ON method.method_2activeIngredient = activeIngredient.ai_UUID INNER JOIN jobs ON method.method_2jobs = jobs.jobs_UUID INNER JOIN methodProperties ON method.method_2methodProperties = methodProperties.methodP_UUID INNER JOIN methodCalculation ON method.method_2Calculation = methodCalculation.methodC_UUID INNER JOIN customers ON method.method_2customer = customers.cust_UUID";
        $x = 1;
        break;
	
	default:
        $sql_query = "SELECT * FROM `appinfo`";
		$x = 500;
}
////////////////////////////////////////////////////////////
///             START LOGGING CODE

if ($sysmode !== "prod") {
    file_put_contents($filename, "           " . $timestamp . " | " . $theUserName . "@" . $clientIP . " - " . $sql_query . "\r", FILE_APPEND | LOCK_EX); // write to the log file the query and db action
}
///              END LOGGING CODE
/// ////////////////////////////////////////////////////////

try {
    // PDO prepare statement for the database
    $stmt = $conn->prepare($sql_query);

// Fire off the request to the db
    $stmt->execute();

// Get back data then parse it into an php array
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

// perform the JSON encode in the EXTJS format
    $JSON_RESULTS = json_encode($results);
    echo($JSON_RESULTS); //Send back to JS the results from the db and server
//    file_put_contents($filename, $JSON_RESULTS . "\r", FILE_APPEND | LOCK_EX);
}
// Out put the error to the file
catch (PDOException $errorMess){
    file_put_contents($filename, $errorMess->getMessage(). "\r", FILE_APPEND | LOCK_EX);
}

// kill the connection to the database
$conn = null;

?>                