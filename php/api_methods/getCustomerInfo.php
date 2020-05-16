<?php
/**
 * <dsCode> Inc. (c) 2019. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

/*******************************************************************************
 * David Sutton
 * May 12 2020
 *
 * Version: 0.1.0
 *
 * INSERT
 * This code is an API for a Webix based app. Used to grab data from a mySQL db,
 * then parse it and then prepare a JSON statement to be uploaded to a Browser
 * Session Store.
 *
 * Version History:
 * 0.0.1 - Initial release  - Copied file from SELECTz.php
 * 0.1.0 - Modified file to meet needs for getting customer folder number
 * 0.2.0 - Radical shift - File now grabs all data on customer to store in a JS browser store.
 *******************************************************************************/
require_once(dirname(__FILE__) . '/../intercon/servercon.php');
require_once(dirname(__FILE__) . '/../errorcodes.php');

if (is_null($theTableName)) {
    $theTableName = $_GET['tableName'];  // Name of the db table(s). Multi use commas to separate
}
if (is_null($theUserName)) {
    $theUserName = $_GET['username']; // Name of the user in the system
}
if (is_null($JSONswitch)) {
    $JSONswitch = $_GET['json']; // Name of the db table(s). Multi use commas to separate
}
if (is_null($pickSQL)) {
    $pickSQL = $_GET['select']; // Which SQL statement do you want to use
}
$x = NULL;

// String for quering the database
switch ($pickSQL) {
    case 1:
        $sql_query = "SELECT `users_company` FROM `usersCustomer` WHERE `users_name` = '" . $theUserName . "'";
        $x = 1;
        break;
    case 2:
        $sql_query = "SELECT `users_company`,`users_UUID`,`users_firstname`,`users_lastname`,`users_name`,`users_company`,`users_pass`,`users_2group`,`users_2accessLevel`,`users_displayName`,`users_manager`,`users_managerID`,`users_authorized`,`users_css`,`users_status` FROM `usersCustomer` WHERE `users_name` = '" . $theUserName . "'";
        $x = 1;
        break;
    default:
        $sql_query = "SELECT * FROM `appinfo`";
        $x = 500;
}

////////////////////////////////////////////////////////////
///             START LOGGING CODE

if ($sysmode !== "prod") {
    file_put_contents($filename, "           " . $timestamp . " | " . $theUserName . "@" . $clientIP . " - " . $sql_query . "\r", FILE_APPEND | LOCK_EX); // write to the log file the query and db action
}
///              END LOGGING CODE
/// ////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
///             EXECUTE THE QUERY
try {
    // PDO prepare statement for the database
    $stmt = $conn->prepare($sql_query);

// Fire off the request to the db
    $stmt->execute();

// Get back data then parse it into an php array
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // perform the JSON encode in the EXTJS format
    $JSON_RESULTS = json_encode($results);

    if ($JSONswitch == "true") {

        $catchedJSON = str_replace(array('[', ']'), '', htmlspecialchars($JSON_RESULTS, ENT_NOQUOTES)); //This is what is sent to the UI

    } else {
        $TEXT_RESULTS = new RecursiveIteratorIterator(
            new RecursiveArrayIterator(json_decode($JSON_RESULTS, true)),
            RecursiveIteratorIterator::SELF_FIRST);
        foreach ($TEXT_RESULTS as $key => $val) {
            if (is_array($val)) {
                echo "";  //This is what is sent to the UI
            } else {
                echo "$val";  //This is what is sent to the UI
            }
        }

        //print_r($TEXT_RESULTS); //->users_company;
    }


} // Out put the error to the file
catch (PDOException $errorMess) {
    file_put_contents($filename, $errorMess->getMessage() . "\r", FILE_APPEND | LOCK_EX);
}
?>
<html lang="en-US">
<script>

    let catchedJSON = '<?php echo($catchedJSON) ?>';
    let JSON_PARSE = JSON.parse(catchedJSON);
    sessionStorage.setItem('users_UUID', JSON_PARSE.users_UUID);
    sessionStorage.setItem('users_firstname', JSON_PARSE.users_firstname);
    sessionStorage.setItem('users_lastname', JSON_PARSE.users_lastname);
    sessionStorage.setItem('users_name', JSON_PARSE.users_name);
    sessionStorage.setItem('users_company', JSON_PARSE.users_company);
    sessionStorage.setItem('users_pass', JSON_PARSE.users_pass);
    sessionStorage.setItem('users_2group', JSON_PARSE.users_2group);
    sessionStorage.setItem('users_2accessLevel', JSON_PARSE.users_2accessLevel);
    sessionStorage.setItem('users_displayName', JSON_PARSE.users_displayName);
    sessionStorage.setItem('users_manager', JSON_PARSE.users_manager);
    sessionStorage.setItem('users_managerID', JSON_PARSE.users_managerID);
    sessionStorage.setItem('users_authorized', JSON_PARSE.users_authorized);
    sessionStorage.setItem('users_css', JSON_PARSE.users_css);
    sessionStorage.setItem('users_status', JSON_PARSE.users_status);
    console.log("Loaded session storage with data from " + JSON_PARSE.users_name);
</script>
</html>
