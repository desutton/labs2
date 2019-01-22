<?php
/**
 * <dsCode> Inc. (c) 2016. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

require_once('__php__.php');
$theSQLtype = $_GET['theSQLtype'];

function theDBQuerier($sql_query, $conn, $sql_default, $theCase)
{

    try {
        if ($theCase != "R") {
            //echo $sql_query;  //Delete this once finished
            // PDO prepare statement for the database
            $stmt = $conn->prepare($sql_query);

            // Fire off the request to the db
            $stmt->execute();

            // PDO prepare statement for the database
            $stmt1 = $conn->prepare($sql_default);

            // Fire off the request to the db
            $stmt1->execute();

            // Get back data then parse it into an php variables
            $results = $stmt1->fetch(PDO::FETCH_ASSOC);
        } else {
            // PDO prepare statement for the database
            $stmt = $conn->prepare($sql_query);

            // Fire off the request to the db
            $stmt->execute();

            // Get back data then parse it into an php variables
            $results = $stmt->fetch(PDO::FETCH_ASSOC);
        }

    } catch (PDOException $e) {
        echo $e->getMessage();
    }

    // perform the JSON encode in the JS format
    $JSON_RESULTS = json_encode($results);

    //Return the data back
    return $results;
}

$theFirstName = $_POST['users_firstname'];
$theLastName = $_POST['users_lastname'];
$theUserEmpId = $_POST['users_employeeId'];
$theUserPass = $_POST['users_pass'];
$theUserGroup = $_POST['users_2group'];
$theUserAccess = $_POST['users_2accessLevel'];
$theCurrentUUID = $_POST['users_UUID'];
$theDisplayName = $_POST['users_displayName'];
$theUserID = $_POST['users_name'];
$sql_default = "SELECT users_UUID, users_firstname, users_lastname, users_name, users_employeeId, users_pass, users_2group, users_2accessLevel, users_displayName FROM users WHERE users_name = '" . $theUserName . "'";

switch ($theSQLtype) {
    case "C":
        //echo"c"; //Delete this once finished
        $theCase = "C";
        $sql_query = "INSERT INTO users VALUES ('','" . $theUUID . "','" . $_GET['users_firstname'] . "','" . $_GET['users_lastname'] . "','" . $_GET['users_name'] . "','" . $_GET['users_employeeId'] . "','" . $_GET['users_pass'] . "','" . $_GET['users_2group'] . "','" . $_GET['users_2accessLevel'] . "','" . $_GET['users_displayName'] . "')";
        $results = theDBQuerier($sql_query, $conn, $sql_default, $theCase);
        print_r('<meta http-equiv="refresh" content="1;URL=./index.php" /><a href="./index.php">Record Created</a>');
        break;
    case "R":
        //echo "r"; //Delete this once finished
        $theCase = "R";
        $sql_query = "SELECT users_UUID, users_firstname, users_lastname, users_name, users_employeeId, users_pass, users_2group, users_2accessLevel, users_displayName FROM users WHERE users_name = '" . $theUserName . "'";
        $results = theDBQuerier($sql_query, $conn, $sql_default, $theCase);
        break;
    case "U":
        //echo "u"; //Delete this once finished
        $theCase = "U";
        $sql_query = ("UPDATE users SET users_firstname='" . $theFirstName . "', users_lastname='" . $theLastName . "', users_name='" . $theUserID . "', users_employeeId='" . $theUserEmpId . "', users_pass='" . $theUserPass . "', users_2group='" . $theUserGroup . "', users_2accessLevel='" . $theUserAccess . "', users_displayName='" . $theDisplayName . "' WHERE users_name ='" . $theUserName . "'");
        $results = theDBQuerier($sql_query, $conn, $sql_default, $theCase);
        print_r('<meta http-equiv="refresh" content="1;URL=./index.php" /><a href="./index.php">Record Updated</a>');
        break;
    case "D":
        //echo "d"; //Delete this once finished
        $theCase = "D";
        $sql_query = "DELETE FROM users WHERE users_name = '" . $theUserName . "'";
        $results = theDBQuerier($sql_query, $conn, $sql_default, $theCase);
        print_r('<meta http-equiv="refresh" content="1;URL=./index.php" /><a href="./index.php">Record Deleted</a>');
        break;
    default:
        //echo "s"; //Delete this once finished
        $sql_query = "SELECT users_UUID, users_firstname, users_lastname, users_name, users_employeeId, users_pass, users_2group, users_2accessLevel, users_displayName FROM users WHERE users_name = '" . $theUserName . "'";
        $results = theDBQuerier($sql_query, $conn, $sql_default, $theCase);
}

// This is for the non JS format HTML/PHP pages
if ($sysmode == "dev") {
    $theFirstName = htmlentities($results['users_firstname']);
    $theLastName = htmlentities($results['users_lastname']);
    $theUserEmpId = htmlentities($results['users_employeeId']);
    $theUserPass = htmlentities($results['users_pass']);
    $theUserGroup = htmlentities($results['users_2group']);
    $theUserAccess = htmlentities($results['users_2accessLevel']);
    $theCurrentUUID = htmlentities($results['users_UUID']);
    $theDisplayName = htmlentities($results['users_displayName']);
    $theUserID = htmlentities($results['users_name']);
} else {
    echo($JSON_RESULTS); //Send back to JS the results from the db and server
}
// Please remember to close the database connection
$stmt = NULL;
$conn = NULL;
?>

