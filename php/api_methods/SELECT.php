<?php
/*******************************************************************************
David Sutton
Jun 21 2014

Version: 1.0.0

INSERT
This code is an API for a EXT4 based app. Used to grab data from a mySQL db, 
then parse it and then prepare a JSON statement to be uploaded to a EXTJS Store. 

Version History:
1.0.0 - Inital release
*******************************************************************************/ 
require_once( dirname( __FILE__ ).'/../intercon/servercon.php');
require_once( dirname( __FILE__ ).'/../errorcodes.php');

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

$pickSQL = $_GET['select']; //The value for which SQL SELECT statement to use "1" = LIMIT, "2" = WHERE, no value is regular expression
$x = NULL;
$rowLimits = 50;
//$rowLimits = $_GET['limit'];

$theTreeColumnName = $_GET['treeColumn'];

// String for quering the database
switch ($pickSQL) {
	case 1:
		$sql_query = "SELECT ".$theColumnSelection." FROM ".$theTableName." WHERE ".$theSelectColumn." = '".$theSelectColumnValue."'";
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

	case 1000: //Method case
		$sql_query = "SELECT activeIngredient.ai_name, 
	activeIngredient.ai_description,
	jobs.jobs_name,
	jobs.jobs_dueDate, 
	jobs.jobs_modifyDate, 
	jobs.jobs_createDate, 
	jobs.jobs_assignment, 
	jobs.jobs_2accessLevel, 
	jobs.jobs_2group, 
	jobs.jobs_2userLog, 
	methodCalculation.methodC_areaSamplePeak, 
	methodCalculation.methodC_areaStandardPeak, 
	methodCalculation.methodC_amountInSample, 
	methodCalculation.methodC_amountOfSample, 
	methodCalculation.methodC_calcPotency, 
	methodCalculation.methodC_calcPotencyPercent, 
	methodCalculation.methodC_targetPotency, 
	methodCalculation.methodC_calcPotencyPercentOfPotencyTarget, 
	methodCalculation.methodC_targetPotencyPercent, 
	methodCalculation.methodC_calcPotencyPercentOfPotencyTargetPercent, 
	methodCalculation.methodC_mixSampleConcetration, 
	methodCalculation.methodC_concentrationStandard, 
	methodCalculation.methodC_dilutionFactor, 
	customers.cust_company, 
	customers.cust_customerNumber
FROM method INNER JOIN activeIngredient ON method.method_2activeIngredient = activeIngredient.ai_UUID
	 INNER JOIN jobs ON method.method_2jobs = jobs.jobs_UUID
	 INNER JOIN methodProperties ON method.method_2methodProperties = methodProperties.methodP_UUID
	 INNER JOIN methodCalculation ON method.method_2Calculation = methodCalculation.methodC_UUID
	 INNER JOIN customers ON method.method_2customer = customers.cust_UUID";
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

// Get back data then parse it into an php array
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

// perform the JSON encode in the EXTJS format
$JSON_RESULTS = json_encode(array("success" => $errorcodes[$x], $theDataName => $results));
echo($JSON_RESULTS); //Send back to JS the results from the db and server 
?>                