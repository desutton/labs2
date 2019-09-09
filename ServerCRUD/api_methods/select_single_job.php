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
 * This code is a API for a EXT4 based app. The API will accept values from a REST
 * based URL of two parameters jobs_id and jobsName. It will read from a mysqldb to
 * find the inputs and then construct a JSON formmated return for a EXT4 proxy to
 * pick up.
 * REST URL example: http://localhost/ServerCRUD/?jobs_id=7&jobsName=Be%203%2025
 *******************************************************************************/

require_once('intercon/servercon.php');
require_once('errorcodes.php');

/*Intialize the URL parameter vars. These are the only two parameters that
this part of the api needs.
*/
$jobs_id = NULL;
$jobsName = NULL;

//See if the URL parameters  are not empty or NULL
if (isset($_GET["jobs_id"]) or isset($_GET["jobsName"])) {
    // Put parameters from the URL into local variables
    $jobs_id = $_GET['jobs_id'];
    $jobsName = $_GET['jobsName'];
} else {
    //Need a way to handle when not all the parameters are passed
    echo('<b>400</b> ' . $errorcodes[400]);
}

$query = "SELECT jobs_id,jobsName FROM jobs WHERE jobs_id='" . $jobs_id . "' AND jobsName='" . $jobsName . "'";
/* check connection */
if ($stmt = mysqli_prepare($con, $query)) {
    /* execute statement */
    mysqli_stmt_execute($stmt);
    /* bind result variables */
    mysqli_stmt_bind_result($stmt, $jobs_ids, $jobsNames);
    /* fetch values */
    while (mysqli_stmt_fetch($stmt)) {

        //Build the JSON formater
        $json_array = array(
            "jobs_id" => $jobs_ids,
            "jobsName" => $jobsNames);
        $json_arrays[] = $json_array;
    }

    // printout the array of JSON
    echo json_encode(array(
        "success" => mysql_errno() == 0,
        "jobs" => $json_arrays));


    /* close statement */
    mysqli_stmt_close($stmt);
}

/* close connection */
mysqli_close($con);

?>