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
 * This code is a API for a EXT4 based app. This code is a test for the Methods
 * table to perform an update to the mySQL db. EXT should send this script raw JSON
 * data and the script should parse out the data into local vars. Then build a SQL
 * query and submit to the db. If succesful then the script will return to EXT a new
 * JSON data load to update the broswer's data store.
 *
 * This does not work
 *******************************************************************************/
require_once('intercon/servercon.php');
require_once('errorcodes.php');

$filename = 'log.txt';

//See if the URL parameters  are not empty or NULL
//if (isset($_POST)) {
// Initalize the JSON data to be javascript type text
//header('application/json; charset=UTF-8');
// Decode the JSON data to an array
//$HTTP_RAW_POST_DATA = $_POST;
//$RAW_HTTP_POST2 = $_POST['MethodID'];
header('Content-Type: text/javascript');
//$JSONdata = printf($RAW_HTTP_POST);
$JSONdata = json_decode($HTTP_RAW_POST_DATA);
$JSONdata->data = array($_POST, $_FILES);
// Separate JSON arrary into local variables
$ActiveIngredient = $JSONdata->ActiveIngredient;
/**/
$ActiveIngredientDescription = $JSONdata->ActiveIngredientDescription;
$ActiveIngredientPreparation = $JSONdata->ActiveIngredientPreparation;
$cb_done = $JSONdata->cb_done;
$CustLotNumber = $JSONdata->CustLotNumber;
$CustomerName = $JSONdata->CustomerName;
$CustomerOrderDescription = $JSONdata->CustomerOrderDescription;
$CustomerOrderFormLineNumber = $JSONdata->CustomerOrderFormLineNumber;
$LabJobName = $JSONdata->LabJobName;
$method2job = $JSONdata->method2job;
$Method2Mixed = $JSONdata->Method2Mixed;
$methodAIStatus = $JSONdata->methodAIStatus;
$methodCondition = $JSONdata->methodCondition;
$methodClass = $JSONdata->methodClass;
$methodDate = $JSONdata->methodDate;
$methodDueDate = $JSONdata->methodDueDate;
$MethodID = $JSONdata->MethodID;
$MethodName = $JSONdata->MethodName;
$methodReportComments = $JSONdata->methodReportComments;
$methodStorageCondition = $JSONdata->methodStorageCondition;
$methodTrackingNumber = $JSONdata->methodTrackingNumber;
$methodType = $JSONdata->methodType;
$methodUserID = $JSONdata->methodUserID;
$singleMethodCustomerComments = $JSONdata->singleMethodCustomerComments;
$singleMethodCustomerStabilityStudyInstructions = $JSONdata->singleMethodCustomerStabilityStudyInstructions;
$singleSampleAmount = $JSONdata->singleSampleAmount;
$TestTypeName = $JSONdata->TestTypeName;
$methodLocation = $JSONdata->methodLocation;
$methodAssigned = $JSONdata->methodAssigned;
$methodMixName = $JSONdata->methodMixName;
$methodLabReportButton = $JSONdata->methodLabReportButton;
$methodModifyDate = $JSONdata->methodModifyDate;
$methodQRData = $JSONdata->methodQRData;
$methodCurrentStatus = $JSONdata->methodCurrentStatus;
$methodConcentrationStandard = $JSONdata->methodConcentrationStandard;
$methodDilutionFactor = $JSONdata->methodDilutionFactor;
$methodAreaSamplePeak = $JSONdata->methodAreaSamplePeak;
$methodAreaStandardPeak = $JSONdata->methodAreaStandardPeak;
$methodAmountInSample = $JSONdata->methodAmountInSample;
$methodAmountOfSample = $JSONdata->methodAmountOfSample;
$methodCalcPotency = $JSONdata->methodCalcPotency;
$methodCalcPotencyPercent = $JSONdata->methodCalcPotencyPercent;
$methodTargetPotency = $JSONdata->methodTargetPotency;
$methodCalcPotencyPercentofPotencyTarget = $JSONdata->methodCalcPotencyPercentofPotencyTarget;
$methodTargetPotencyPercent = $JSONdata->methodTargetPotencyPercent;
$methodCalcPotencyPercentofPotencyTargetPercent = $JSONdata->methodCalcPotencyPercentofPotencyTargetPercent;
$methodMixSampleConcetration = $JSONdata->methodMixSampleConcetration;
/**/
file_put_contents($filename, printf($HTTP_RAW_POST_DATA), FILE_APPEND | LOCK_EX);

/*        		
        		$errorcodesMSG= "JSON Status ".$errorcodes[200]." ".date('Y.m.d H:m:s')."MethodID is ".$JSONdata."\r";
}else{
	//Need a way to handle when not all the parameters are passed
	$errorcodesMSG= "JSON Status ".$errorcodes[400]." ".date('Y.m.d H:m:s')."\r";
}

file_put_contents($filename, $errorcodesMSG, FILE_APPEND | LOCK_EX); */

/*
try {
  $stmt = $conn->prepare('UPDATE methods SET ActiveIngredient = :ActiveIngredient, ActiveIngredientDescription = :ActiveIngredientDescription, ActiveIngredientPreparation = :ActiveIngredientPreparation, cb_done = :cb_done,CustLotNumber = :CustLotNumber,CustomerName = :CustomerName,CustomerOrderDescription = :CustomerOrderDescription,CustomerOrderFormLineNumber = :CustomerOrderFormLineNumber,LabJobName = :LabJobName,method2job = :method2job,Method2Mixed = :Method2Mixed,methodAIStatus = :methodAIStatus,methodCondition = :methodCondition,methodClass = :methodClass,methodDate = :methodDate,methodDueDate = :methodDueDate,MethodID = :MethodID,MethodName = :MethodName,methodReportComments = :methodReportComments,methodStorageCondition = :methodStorageCondition,methodTrackingNumber = :methodTrackingNumber,methodType = :methodType,methodUserID = :methodUserID,singleMethodCustomerComments = :singleMethodCustomerComments,singleMethodCustomerStabilityStudyInstructions = :singleMethodCustomerStabilityStudyInstructions,singleSampleAmount = :singleSampleAmount,TestTypeName = :TestTypeName,methodLocation = :methodLocation,methodAssigned = :methodAssigned,methodMixName = :methodMixName,methodLabReportButton = :methodLabReportButton,methodModifyDate = :methodModifyDate,methodQRData = :methodQRData,methodCurrentStatus = :methodCurrentStatus,methodConcentrationStandard = :methodConcentrationStandard,methodDilutionFactor = :methodDilutionFactor,methodAreaSamplePeak = :methodAreaSamplePeak,methodAreaStandardPeak = :methodAreaStandardPeak,methodAmountInSample = :methodAmountInSample,methodAmountOfSample = :methodAmountOfSample,methodCalcPotency = :methodCalcPotency,methodCalcPotencyPercent = :methodCalcPotencyPercent,methodTargetPotency = :methodTargetPotency,methodCalcPotencyPercentofPotencyTarget = :methodCalcPotencyPercentofPotencyTarget,methodTargetPotencyPercent = :methodTargetPotencyPercent,methodCalcPotencyPercentofPotencyTargetPercent = :methodCalcPotencyPercentofPotencyTargetPercent,methodMixSampleConcetration = :methodMixSampleConcetration WHERE MethodID = :MethodID');
  
  $stmt->execute(array(
    ':ActiveIngredient'   => $ActiveIngredient,
':ActiveIngredientDescription'   => $ActiveIngredientDescription,
':ActiveIngredientPreparation'   => $ActiveIngredientPreparation, 
':cb_done'   => $cb_done, 
':CustLotNumber'   => $CustLotNumber, 
':CustomerName'   => $CustomerName, 
':CustomerOrderDescription'   => $CustomerOrderDescription, 
':CustomerOrderFormLineNumber'   => $CustomerOrderFormLineNumber, 
':LabJobName'   => $LabJobName, 
':method2job'   => $method2job, 
':Method2Mixed'   => $Method2Mixed, 
':methodAIStatus'   => $methodAIStatus, 
':methodCondition'   => $methodCondition, 
':methodClass'   => $methodClass, 
':methodDate'   => $methodDate, 
':methodDueDate'   => $methodDueDate, 
':MethodID'   => $MethodID, 
':MethodName'   => $MethodName, 
':methodReportComments'   => $methodReportComments, 
':methodStorageCondition'   => $methodStorageCondition, 
':methodTrackingNumber'   => $methodTrackingNumber, 
':methodType'   => $methodType, 
':methodUserID'   => $methodUserID, 
':singleMethodCustomerComments'   => $singleMethodCustomerComments, 
':singleMethodCustomerStabilityStudyInstructions'   => $singleMethodCustomerStabilityStudyInstructions, 
':singleSampleAmount'   => $singleSampleAmount, 
':TestTypeName'   => $TestTypeName, 
':methodLocation'   => $methodLocation, 
':methodAssigned'   => $methodAssigned, 
':methodMixName'   => $methodMixName, 
':methodLabReportButton'   => $methodLabReportButton, 
':methodModifyDate'   => $methodModifyDate, 
':methodQRData'   => $methodQRData, 
':methodCurrentStatus'   => $methodCurrentStatus, 
':methodConcentrationStandard'   => $methodConcentrationStandard, 
':methodDilutionFactor'   => $methodDilutionFactor, 
':methodAreaSamplePeak'   => $methodAreaSamplePeak, 
':methodAreaStandardPeak'   => $methodAreaStandardPeak, 
':methodAmountInSample'   => $methodAmountInSample, 
':methodAmountOfSample'   => $methodAmountOfSample, 
':methodCalcPotency'   => $methodCalcPotency, 
':methodCalcPotencyPercent'   => $methodCalcPotencyPercent, 
':methodTargetPotency'   => $methodTargetPotency, 
':methodCalcPotencyPercentofPotencyTarget'   => $methodCalcPotencyPercentofPotencyTarget, 
':methodTargetPotencyPercent'   => $methodTargetPotencyPercent, 
':methodCalcPotencyPercentofPotencyTargetPercent'   => $methodCalcPotencyPercentofPotencyTargetPercent, 
':methodMixSampleConcetration'   => $methodMixSampleConcetration
  ));
   
  echo $stmt->rowCount(); // 1
} catch(PDOException $e) {
  echo 'Error: ' . $e->getMessage();
}
*/
//require('api_methods/select_all_methods.php');

?>