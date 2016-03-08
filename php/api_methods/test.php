<?php
/*******************************************************************************
David Sutton
Jun 17 2014

Version: 1.0.0

Developers Toolkit
This toolkit will help the developer write php and EXTJS code for connecting to
the database, perform db queries, and set variables in php & EXTJS. It also dou-
bles as check to see if the Apache, PHP-mod, and MySQL linkages are working. At
the bottom this script will perform a SELECT query agaist the database and out-
put JSON data dump like that needed for EXTJS.

VERSION HISTORY:
1.0.0 - Inital release
*******************************************************************************/ 
require_once( dirname( __FILE__ ).'/../intercon/servercon.php');
require_once( dirname( __FILE__ ).'/../errorcodes.php');

/*Intialize the vars.*/
$dtversion = "1.0.0"; // Please UPDATE THIS ON EVERY RELEASE
$theTableName = $_POST['tableName']; //Change this var for the table you wish to use.
$row = 0;
$HOSTNAME= "localhost"; // Please change this if not on localhost
$dataName= $_POST['dataName'];
	
	// String for quering the database
	$sql = "select column_name from information_schema.columns where table_schema ='labs' AND table_name = '$theTableName'";
	// PDO prepare statement for the database
    $stmt = $conn->prepare($sql);
    // Fire off the request to the db 
	$stmt->execute();
	// Close the connectiont the db
	$conn = null;
	// Get back data then parse it into an php array
	$result = $stmt->fetchAll(PDO::FETCH_COLUMN);
	// Ask how many object are in the array
	$count = $stmt->rowCount();
	// Loop through the data to build vars for the report
	while($row < $count){
	//Use this logic to build the report arrays used in the next section.
	$column_type_array[] = $result[$row];
	$column_name_for_updateSQL[] = ($result[$row]." = '$".$result[$row]."'");
	$column_name_for_setters[] = ("'".$result[$row]."' => $".$result[$row]."\r");
	$json_parser_for_tabel[] = ("&#36;".$result[$row]." = (&#36;decoded->data[&#36;i]->{'".$result[$row]."'})&#59;\r");
	$json_data_formater[] = ('"'.$result[$row].'":"&#39;+'.$result[$row].'Details+&#39;"');
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
	$SELECT_QUERY=("SELECT ".$for_the_extjs." FROM ".$theTableName);
	$UPDATE_QUERY=("UPDATE ".$theTableName." SET ".$for_updateSQL." WHERE ".$result[0]."= '$".$result[0]."'");
	$INSERT_QUERY=("INSERT INTO ".$theTableName." (".$for_the_extjs.") VALUES (".$for_the_vars.")");
	$DELETE_QUERY=("DELETE FROM ".$theTableName." WHERE ".$result[0]."= '$".$result[0]."'");
	$SETTER_STRING= implode("<p>", $column_name_for_setters);
	$JSON_PARSER= implode("<p>", $json_parser_for_tabel);

///* Call the apprpreate SELECT script. Never got this too work with the REST vars being passed. 
//require_once('SELECT.php?tableName=activeIngredient&columnNames=*,&dataName=solu');
	// Just built this line instead to create a html link to make a RESTful link to the data.
	$JSON_LINK= "http://".$HOSTNAME."/labs2/php/api_methods/SELECT.php?tableName=".$theTableName."&columnNames=*&dataName=".$dataName."&select=5";
	//$JSON_LINK= "http://".$HOSTNAME."/labs/php/api_methods/SELECT.php?tableName=".$theTableName."&columnNames=".$for_the_extjs."&dataName=".$dataName;	
	$JSON_DATA= implode(", ", $json_data_formater);
/* close connection */
//mysqli_close($con);

?>
<html>
<head>
<title>Developer Toolkit</title>
<link rel="stylesheet" type="text/css" href="/labs2/php/main.css">
</head>
<body>
<div class="TitleBar">Developer Toolkit <?php print_r($dtversion);?></div><p>
<p></p>
<span class="divideBar">Database Connection Status</span><p>
<div class="labeler">STATUS: <span class="levelText"><?php print_r($errorcodesMSG);?></span></div><br />
<div class="labeler">DATATBASE: <span class="levelText"><?php print_r($DB_NAME); ?></span></div><br />
<div class="labeler">TABLE: <span class="levelText"><?php print_r($theTableName); ?></span></div><br />
<div class="labeler">USER NAME: <span class="levelText"><?php print_r($username); ?></span></div><br />
<div class="labeler">PASSWORD: <span class="levelText"><?php print_r($password); ?></span></div><br />
<p></p>
<span class="divideBar">SQL Main Queries</span><p>
<div class="labeler"><a href="" style="color: rgb(226,226,226)">SELECT: </a><span class="levelText"><?php print_r($SELECT_QUERY);?></span></div><br />
<div class="labeler">INSERT: <span class="levelText"><?php print_r($INSERT_QUERY);?></span></div><br />
<div class="labeler">UPDATE: <span class="levelText"><?php print_r($UPDATE_QUERY);?></span></div><br />
<div class="labeler">DELETE: <span class="levelText"><?php print_r($DELETE_QUERY);?></span></div><br />
<p></p>
<span class="divideBar">PHP Pseudo Code</span><p>
<div class="labeler">VARIABLES: <span class="levelText"><?php print_r($for_the_vars);?></span></div><br />
<div class="labeler">SETTERS: <div class="levelText"><?php print_r($SETTER_STRING);?></div></div><br />
<div class="labeler">PARSER: <div class="levelText"><?php print_r($JSON_PARSER);?></div></div><br />

<p></p>
<span class="divideBar">EXTJS Variables</span><p>
<div class="labeler">VARS: <span class="levelText"><?php print_r($column_name_string);?></span></div><br />
<p></p>
<span class="divideBar">JSON of &quot;<?php print_r($theTableName); ?>&quot;</span><p>
<span class="labeler">JSON: </span> 
<?php //require_once('http://localhost/labs/php/api_methods/SELECT.php?tableName=activeIngredient');?>
<a href="<?php echo($JSON_LINK); ?>"> click to load data</a><br />
<div class="labeler">JSONdata: <div class="levelText"><?php print_r($JSON_DATA);?></div></div><br />


<div class="logoWrapper"><span class="logo">&lt;ds-code&gt; &copy;2014</span></div>
</body>
</html>