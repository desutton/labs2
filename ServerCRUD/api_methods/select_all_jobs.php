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
 * This code is a API for a EXT4 based app. Used to grab all the data in the mySQL
 * db Jobs' table and encode it as JSON data that EXT can then use.
 *******************************************************************************/

require_once('intercon/servercon.php');
require_once('errorcodes.php');

//$query = "SELECT jobs_id,jobsName,jobsStatus FROM jobs ORDER BY jobsStartDate DESC";
$query = "SELECT jobs_id, jobsName, jobsStatus, jobsStartDate, jobsModifyDate, jobsLastUser, job2customer, jobsTracking, _placeholderGlobal FROM jobs ORDER BY jobsStartDate DESC";

/* check connection */
if ($stmt = mysqli_prepare($con, $query)) {
    /* execute statement */
    mysqli_stmt_execute($stmt);
    /* bind result variables */
    mysqli_stmt_bind_result($stmt, $jobs_ids, $jobsName, $jobsStatus, $jobsStartDate, $jobsModifyDate, $jobsLastUser, $job2customer, $jobsTracking, $_placeholderGlobal);
    /* fetch values */
    while (mysqli_stmt_fetch($stmt)) {

        //Build the JSON formater
        $json_array = array(
            "jobs_id" => $jobs_ids,
            "jobsName" => $jobsName,
            "jobsStatus" => $jobsStatus,
            "jobsStartDate" => $jobsStartDate,
            "jobsModifyDate" => $jobsModifyDate,
            "jobsLastUser" => $jobsLastUser,
            "job2customer" => $job2customer,
            "jobsTracking" => $jobsTracking,
            "_placeholderGlobal" => $_placeholderGlobal);
        $json_arrays[] = $json_array;
    }
    // printout the array of JSON
    echo json_encode(array(
        "success" => mysql_errno() == 0,
        "jobs" => $json_arrays));
    // }

    /* close statement */
    mysqli_stmt_close($stmt);
}

/* close connection */
mysqli_close($con);

?>