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
$query = "SELECT ActiveIngredient, ActiveIngredientDescription, ActiveIngredientPreparation, cb_done, CustLotNumber, CustomerName, CustomerOrderDescription, CustomerOrderFormLineNumber, LabJobName, method2job, Method2Mixed, methodAIStatus, methodCondition, methodClass, methodDate, methodDueDate, MethodID, MethodName, methodReportComments, methodStorageCondition, methodTrackingNumber, methodType, methodUserID, singleMethodCustomerComments, singleMethodCustomerStabilityStudyInstructions, singleSampleAmount, TestTypeName, methodLocation, methodAssigned, methodMixName, methodLabReportButton, methodModifyDate, methodQRData, methodCurrentStatus, methodConcentrationStandard, methodDilutionFactor, methodAreaSamplePeak, methodAreaStandardPeak, methodAmountInSample, methodAmountOfSample, methodCalcPotency, methodCalcPotencyPercent, methodTargetPotency, methodCalcPotencyPercentofPotencyTarget, methodTargetPotencyPercent, methodCalcPotencyPercentofPotencyTargetPercent, methodMixSampleConcetration FROM methods ORDER BY methodDate ASC";

/* check connection */
if ($stmt = mysqli_prepare($con, $query)) {
    /* execute statement */
    mysqli_stmt_execute($stmt);
    /* bind result variables */
    mysqli_stmt_bind_result($stmt, $ActiveIngredient, $ActiveIngredientDescription, $ActiveIngredientPreparation, $cb_done, $CustLotNumber, $CustomerName, $CustomerOrderDescription, $CustomerOrderFormLineNumber, $LabJobName, $method2job, $Method2Mixed, $methodAIStatus, $methodCondition, $methodClass, $methodDate, $methodDueDate, $MethodID, $MethodName, $methodReportComments, $methodStorageCondition, $methodTrackingNumber, $methodType, $methodUserID, $singleMethodCustomerComments, $singleMethodCustomerStabilityStudyInstructions, $singleSampleAmount, $TestTypeName, $methodLocation, $methodAssigned, $methodMixName, $methodLabReportButton, $methodModifyDate, $methodQRData, $methodCurrentStatus, $methodConcentrationStandard, $methodDilutionFactor, $methodAreaSamplePeak, $methodAreaStandardPeak, $methodAmountInSample, $methodAmountOfSample, $methodCalcPotency, $methodCalcPotencyPercent, $methodTargetPotency, $methodCalcPotencyPercentofPotencyTarget, $methodTargetPotencyPercent, $methodCalcPotencyPercentofPotencyTargetPercent, $methodMixSampleConcetration);
    /* fetch values */
    while (mysqli_stmt_fetch($stmt)) {

        //Build the JSON formater
        $json_array = array(
            "ActiveIngredient" => $ActiveIngredient,
            "ActiveIngredientDescription" => $ActiveIngredientDescription,
            "ActiveIngredientPreparation" => $ActiveIngredientPreparation,
            "cb_done" => $cb_done,
            "CustLotNumber" => $CustLotNumber,
            "CustomerName" => $CustomerName,
            "CustomerOrderDescription" => $CustomerOrderDescription,
            "CustomerOrderFormLineNumber" => $CustomerOrderFormLineNumber,
            "LabJobName" => $LabJobName,
            "method2job" => $method2job,
            "Method2Mixed" => $Method2Mixed,
            "methodAIStatus" => $methodAIStatus,
            "methodCondition" => $methodCondition,
            "methodClass" => $methodClass,
            "methodDate" => $methodDate,
            "methodDueDate" => $methodDueDate,
            "MethodID" => $MethodID,
            "MethodName" => $MethodName,
            "methodReportComments" => $methodReportComments,
            "methodStorageCondition" => $methodStorageCondition,
            "methodTrackingNumber" => $methodTrackingNumber,
            "methodType" => $methodType,
            "methodUserID" => $methodUserID,
            "singleMethodCustomerComments" => $singleMethodCustomerComments,
            "singleMethodCustomerStabilityStudyInstructions" => $singleMethodCustomerStabilityStudyInstructions,
            "singleSampleAmount" => $singleSampleAmount,
            "TestTypeName" => $TestTypeName,
            "methodLocation" => $methodLocation,
            "methodAssigned" => $methodAssigned,
            "methodMixName" => $methodMixName,
            "methodLabReportButton" => $methodLabReportButton,
            "methodModifyDate" => $methodModifyDate,
            "methodQRData" => $methodQRData,
            "methodCurrentStatus" => $methodCurrentStatus,
            "methodConcentrationStandard" => $methodConcentrationStandard,
            "methodDilutionFactor" => $methodDilutionFactor,
            "methodAreaSamplePeak" => $methodAreaSamplePeak,
            "methodAreaStandardPeak" => $methodAreaStandardPeak,
            "methodAmountInSample" => $methodAmountInSample,
            "methodAmountOfSample" => $methodAmountOfSample,
            "methodCalcPotency" => $methodCalcPotency,
            "methodCalcPotencyPercent" => $methodCalcPotencyPercent,
            "methodTargetPotency" => $methodTargetPotency,
            "methodCalcPotencyPercentofPotencyTarget" => $methodCalcPotencyPercentofPotencyTarget,
            "methodTargetPotencyPercent" => $methodTargetPotencyPercent,
            "methodCalcPotencyPercentofPotencyTargetPercent" => $methodCalcPotencyPercentofPotencyTargetPercent,
            "methodMixSampleConcetration" => $methodMixSampleConcetration);

        $json_arrays[] = $json_array;
    }
    // printout the array of JSON
    echo json_encode(array(
        "success" => mysql_errno() == 0,
        "methods" => $json_arrays));
    // }

    /* close statement */
    mysqli_stmt_close($stmt);
}

/* close connection */
mysqli_close($con);

?>