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
 * This code is a API for a EXT4 based app. Most of this code is a hack. I'm tring
 * diffrent things to find something that works.
 *******************************************************************************/
require_once('intercon/servercon.php');
require_once('errorcodes.php');

//See if the JSON from the client is not empty or NULL
if (isset($HTTP_RAW_POST_DATA)) {
    // Initalize the incoming data to be javascript type text
    header('Content-Type: text/javascript');
    // Dump the incoming data to a var
    $JSONdata = json_decode($HTTP_RAW_POST_DATA);

} else if (isset($_POST['extAction'])) { // form post data
    $isForm = true;
    $isUpload = $_POST['extUpload'] == 'true';
    $JSONdata = new BogusAction();
    $JSONdata->action = $_POST['extAction'];
    $JSONdata->method = $_POST['extMethod'];
    $JSONdata->tid = isset($_POST['extTID']) ? $_POST['extTID'] : null; // not set for upload
    $JSONdata->data = array($_POST, $_FILES);
} else {
    die('Invalid request.');
}


// Put parameters from the URL into local variables
$jobs_id = $_GET['jobs_id'];
$jobsName = $_GET['jobsName'];
}else{
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