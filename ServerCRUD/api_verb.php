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
 * This code is a API for a EXT4 based app. This code outlines the verbs used for
 * the API. EXT should return a verb that the API knows based on this list. Then
 * call the script to perform that verb. I'm using numbers for testing.
 *******************************************************************************/
// API file listing
$apicodes = Array(
    read => 'api_methods/select_all_methods.php',
    101 => 'api_methods/select_all_jobs.php',
    102 => 'api_methods/select_single_job.php',
    103 => 'api_methods/select_all_methods.php',
    104 => 'api_methods/select_all_job-methods-tracking.php',
    204 => 'api_methods/add_single_job.php',
    update => 'api_methods/add_single_method.php',
    APISread => 'api_methods/select_all_apis.php',
    Solread => 'api_methods/select_all_solubility.php',
    Solcreate => 'api_methods/add_solubility.php',
    Solupdate => 'api_methods/edit_solubility.php',
    Soldelete => 'api_methods/delete_solubility.php',
    998 => 'api_methods/test.php',
    999 => '(Unused)'
);

?>