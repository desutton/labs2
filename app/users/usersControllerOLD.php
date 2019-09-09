<?php
/**
 * <dsCode> Inc. (c) 2016. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

/**
 * Created by PhpStorm.
 * User: sutton
 * Date: 8/24/16
 * Time: 3:33 PM
 */
require_once('__php__.php');

class TableRows extends RecursiveIteratorIterator
{
    function __construct($it)
    {
        parent::__construct($it, self::LEAVES_ONLY);
    }

    function current()
    {
        return "<td>" . parent::current() . "</td>";
    }

    function beginChildren()
    {
        echo "<tr>";
    }

    function endChildren()
    {
        echo "<td><a href='' class='fa fa-pencil'></a></td><td><a href='' class='fa fa-trash'></a></td></td>" . "\n";
    }
}

// The SQL Query to get the users info
$sql_query = "SELECT users_UUID, users_firstname, users_lastname, users_name, users_employeeId, users_pass, users_2group, users_2accessLevel, users_displayName FROM users";

// PDO prepare statement for the database
$stmt = $conn->prepare($sql_query);

// Fire off the request to the db
$stmt->execute();

// Get back data then parse it into an php variables
//$results = $stmt->fetch(PDO::FETCH_ASSOC);

$results = $stmt->setFetchMode(PDO::FETCH_ASSOC);
foreach (new TableRows(new RecursiveArrayIterator($stmt->fetchAll())) as $key => $value) {
    printf($value);
}

?>