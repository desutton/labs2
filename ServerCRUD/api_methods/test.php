<?php
/**
 * <dsCode> Inc. (c) 2019. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

/*******************************************************************************
 * David Sutton
 * Jan 9 2014
 *
 * Protocode version 1
 * Version: Alpha-Test 1
 *
 * This code is a API for a EXT4 based app. Tring to create a way to make the script
 * look at the database and set all the column names for me instead of hard coding
 * them into a SQL query. the script works to a point. I'm able to read the column
 * names (and other info) and even build a var with the proper SQL code. However, I
 * can't get the script to parse out the array returned from the SQL query to be
 * dumped into local vars. Very close to this working.
 *******************************************************************************/
require_once('errorcodes.php');
require_once('api_verb.php');
require_once('intercon/servercon.php');

/*Intialize the vars.*/
$jobs_id = NULL;
$jobsName = NULL;
$column_type_name = NULL;
$column_type_names = array();
$theTableName = $_POST['tableName']; //mysql_real_escape_string($_POST['tableName']); //Change this var for the table you wish to use.

//Build the query to get table info
$query = "SELECT * FROM $theTableName ";

//Connect to the db and query the db
if ($result = mysqli_query($con, $query)) {
    //get the number of columns in the table
    $column_num = mysqli_num_fields($result);

    /* Get field information for all fields */
    while ($columninfo = mysqli_fetch_field($result)) {
        //Parse out the field's column name and build an array of column names
        $column_type_name = ($columninfo->name);
        $column_type_names[] = ($column_type_name);

    }

    for ($x = 0; $x < $column_num; $x++) {
        $column_name_array[] = ($column_type_names[$x]);
    }
    //$column_name_array[]=($column_type_names[$x-1]);

}
$column_name_string = implode(", ", $column_name_array);
$column_varName_string = implode(", $", $column_name_array);
$column_varSetters_string = implode('" => $"', $column_name_array);
$updateQueryConstructor = implode("', colName='$", $column_name_array);
$insertQueryConstructorStep1 = implode(", ", $column_name_array);
$insertQueryConstructorStep2 = implode(", $", $column_name_array);

$column_name_Setter_var = 0;

$query2 = "SELECT $column_name_string FROM $theTableName";
$updateQuery = "UPDATE $theTableName SET colName=$'" . $updateQueryConstructor . "' WHERE id='$id'";
$insertQueryConstructor = "INSERT INTO $theTableName ($insertQueryConstructorStep1) VALUES ($$insertQueryConstructorStep2)";
echo('<b>Copy this for the SELECT SQL statement</b><p>');
echo($query2);
echo('<p><b>Copy this for the UPDATE SQL statement</b><p>');
echo($updateQuery);
echo('<p><b>Copy this for the INSERT SQL statement</b><p>');
echo($insertQueryConstructor);
echo('<p><b>Copy this for the vars</b><p>');
echo("$" . $column_varName_string);
echo('<p><b>Copy this for the setters</b><p>');
echo("'" . $column_varSetters_string);
echo('<p><b>Copy this for the EXT Column Names</b><p>');
echo($column_name_string);
echo('<p><b>Copy this for the PHP select script that maps fields to VARS</b><p>');
echo($column_name_Setter_var);

/* close connection */
mysqli_close($con);

?>