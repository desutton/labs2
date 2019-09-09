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
 * db Methods' table and encode it as JSON data that EXT can then use.
 *******************************************************************************/
require_once('intercon/servercon.php');
require_once('errorcodes.php');

//$query = "SELECT jobs_id,jobsName,jobsStatus FROM jobs ORDER BY jobsStartDate DESC";
$query = "SELECT APIid, APIingredient, APImobilePhase, APIcolumnId, APIpercent, APIother, APImanufacture, APIexpiration, APIdateOpened, APIstorageLocation, APIpotency, APIretested, APIresults, APImethod, APImolWeight FROM API_Standards ORDER BY APIid ASC";

/* check connection */
if ($stmt = mysqli_prepare($con, $query)) {
    /* execute statement */
    mysqli_stmt_execute($stmt);
    /* bind result variables */
    mysqli_stmt_bind_result($stmt, $id, $ingredient, $mobilePhase, $columnId, $percent, $other, $manufacture, $expiration, $dateOpened, $storageLocation, $potency, $retested, $results, $method, $weight);
    /* fetch values */
    while (mysqli_stmt_fetch($stmt)) {

        //Build the JSON formater
        $json_array = array(
            "APIid" => $id,
            "APIingredient" => $ingredient,
            "APImobilePhase" => $mobilePhase,
            "APIcolumnId" => $columnId,
            "APIpercent" => $percent,
            "APIother" => $other,
            "APImanufacture" => $manufacture,
            "APIexpiration" => $expiration,
            "APIdateOpened" => $dateOpened,
            "APIstorageLocation" => $storageLocation,
            "APIpotency" => $potency,
            "APIretested" => $retested,
            "APIresults" => $results,
            "APImethod" => $method,
            "APImolWeight" => $weight
        );

        $json_arrays[] = $json_array;
    }
    // printout the array of JSON
    echo json_encode(array(
        "success" => mysql_errno() == 0,
        "apis" => $json_arrays));
    // }

    /* close statement */
    mysqli_stmt_close($stmt);
}

/* close connection */
mysqli_close($con);

?>