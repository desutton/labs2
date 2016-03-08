<?php
/*//Case Function
function theSQLData($jsonData,$tableName){
		switch ($tableName) {
			case "activeIngredient":
				$theReturnSQLDataStatement = ai($jsonData);
				return $theReturnSQLDataStatement;
				break;
			case "vendors":	
				echo("Vendors");
			default:
				echo("there is an error");
		}
	}

function ai($decoded){
	/* Setup for the activeIngredient table *
	//Create the UUID
	//require_once( dirname( __FILE__ ).'/../uuidautogen.php');
	
	//Used for iteration of the array
	$i = 0;

	//Future use of the JSON root of the array - NOT currently used
	$JSONroot = "data";

	//activeIngredient Table
	$ai_id = ($decoded->data[$i]->{'ai_id'});
	$ai_UUID = $theUUID;
	//$ai_UUID = ($decoded->data[$i]->{'ai_UUID'});
	$ai_name = ($decoded->data[$i]->{'ai_name'});
	$ai_description = ($decoded->data[$i]->{'ai_description'});
	$ai_molecularStructure = ($decoded->data[$i]->{'ai_molecularStructure'});
	$ai_weight = ($decoded->data[$i]->{'ai_weight'});
	$ai_refractivity = ($decoded->data[$i]->{'ai_refractivity'});
	$ai_polarity = ($decoded->data[$i]->{'ai_polarity'});
	$ai_pH = ($decoded->data[$i]->{'ai_pH'});
	$ai_uses = ($decoded->data[$i]->{'ai_uses'});
	$ai_pdrURL = ($decoded->data[$i]->{'ai_pdrURL'});

	//The partial sql statement with the data
	$theSQLDataStement=("'".$ai_id."','".$ai_UUID."','".$ai_name."','".$ai_description."','".$ai_molecularStructure."','".$ai_weight."','".$ai_refractivity."','".$ai_polarity."','".$ai_pH."','".$ai_uses."','".$ai_pdrURL."'");
	return $theSQLDataStement;
}*/

/*
function buildSQL($jsonData, $tableName){
	$result = $stmt->fetchAll(PDO::FETCH_COLUMN);
	// Ask how many object are in the array
	$count = $stmt->rowCount();
	// Loop through the data to build vars for the report
	while($row < $count){
	//Use this logic to build the report arrays used in the next section.
	$column_type_array[] = $result[$row];
	$column_name_for_updateSQL[] = ($result[$row]." = '$".$result[$row]."'");
	$json_parser_for_tabel[] = ("&#36;".$result[$row]." = (&#36;decoded->data[&#36;i]->{'".$result[$row]."'})&#59;\r");
	$row ++;
	}
	// Useing the arrays build above this section creates the strings for the reports
	$column_name_string= implode(", ", $column_type_array);
	$for_the_extjs=($column_name_string); //column names seperated by commas
	$column_name_string_vars= implode(", $", $column_type_array);
	$for_the_vars=("$".$column_name_string_vars); //$column_name,$column_name,...$column_name
	$column_name_string_sql= implode("', '", $column_type_array);
	$for_the_sqlvars=("'".$column_name_string_sql."'"); //'column_name','column_name',...'column_name'
	$for_updateSQL = implode(", ", $column_name_for_updateSQL); //column_name = '$column_name',column_name = '$column_name',...column_name = '$column_name' 
	// Builing vars for the diffrent CRUD sql
	$INSERT_QUERY=("INSERT INTO ".$tableName." (".$for_the_extjs.") VALUES (".$for_the_vars.")");

}
*/
/*
function testthis($stmt){
	$result = $stmt->fetchAll(PDO::FETCH_COLUMN);
	// Ask how many object are in the array
	$count = $stmt->rowCount();
	$row = 0;
	$b = array(bob,sue,bill,dan,joe,pat);
	$c = array('Boston','New York','Philly','Hartford','Concord');
	$i = 3;
	while($row <$count){
	${$b[$i]} = $c[$i];
	echo (${$b[$i]});
	$row++;
	return "done";
	}
}*/
?>





<?php
/*******************************************************************************
David Sutton
Jun 21 2014

Version: 1.0.0

UPDATE
This code is an API for a EXT4 based app. Used to grab JSON data from a RESTful 
URL, parse it and then prepare a SQL statement to be executed in mySQL db. 

Version History:
1.0.0 - Inital release
*******************************************************************************/
//Case Function
function theSQLData($jsonData,$tableName){
		switch ($tableName) {
			case "activeIngredient":
				$theReturnSQLDataStatement = ai($jsonData);
				return $theReturnSQLDataStatement;
				break;
			case "vendors":	
				echo("Vendors");
			default:
				echo("there is an error");
		}
	}

function ai($decoded){
	/* Setup for the activeIngredient table */
		
	//Used for iteration of the array
	$i = 0;

	//Future use of the JSON root of the array - NOT currently used
	$JSONroot = "data";

	//activeIngredient Table
	$ai_id = ($decoded->data[$i]->{'ai_id'});
	$ai_UUID = ($decoded->data[$i]->{'ai_UUID'});
	$ai_name = ($decoded->data[$i]->{'ai_name'});
	$ai_description = ($decoded->data[$i]->{'ai_description'});
	$ai_molecularStructure = ($decoded->data[$i]->{'ai_molecularStructure'});
	$ai_weight = ($decoded->data[$i]->{'ai_weight'});
	$ai_refractivity = ($decoded->data[$i]->{'ai_refractivity'});
	$ai_polarity = ($decoded->data[$i]->{'ai_polarity'});
	$ai_pH = ($decoded->data[$i]->{'ai_pH'});
	$ai_uses = ($decoded->data[$i]->{'ai_uses'});
	$ai_pdrURL = ($decoded->data[$i]->{'ai_pdrURL'});

	//The partial sql statement with the data
	$theSQLDataStement=("UPDATE activeIngredient SET ai_UUID = '".$ai_UUID."', ai_name = '".$ai_name."', ai_description = '".$ai_description."', ai_molecularStructure = '".$ai_molecularStructure."', ai_weight = '".$ai_weight."', ai_refractivity = '".$ai_refractivity."', ai_polarity = '".$ai_polarity."', ai_pH = '".$ai_pH."', ai_uses = '".$ai_uses."', ai_pdrURL = '".$ai_pdrURL."' WHERE ai_id = '".$ai_id."'");
	return $theSQLDataStement;
}




/******************************************************************************/
try{
require_once( dirname( __FILE__ ).'/../intercon/servercon.php');
require_once( dirname( __FILE__ ).'/../errorcodes.php');

$theTableName = $_GET['tableName']; // Which table the data belongs
$theDataValues = $_GET['JSONdata']; //The JSON data coming from EXTJS
//DEBUG /**
//$theDataValues = ('{"success":true,"data":[{"ai_id":"327","ai_UUID":"123456-1224-1234-12345678","ai_name":"Aa Happy Compounder"}]}');
//$tempx = "%7B%22success%22%3Atrue%2C%22data%22%3A%5B%7B%22ai_id%22%3A%22327%22%2C%22ai_UUID%22%3A%22123456-1224-1234-12345678%22%2C%22ai_name%22%3A%22Aa%20Happy%20Compounder%22%7D%5D%7D";
/**/
//Decode the JSON from the URL
$decoded = json_decode($theDataValues);

// String for quering the database
$sql_query = theSQLData($decoded,$theTableName);
print_r($sql_query);
// PDO prepare statement for the database
$stmt = $conn->prepare($sql_query);

// Fire off the request to the db
$stmt->execute();

echo (" Affected Rows:".$stmt->rowCount()); // 1
} catch(PDOException $e) {
  echo 'Error: ' . $e->getMessage();
}
$conn = null;

?>                