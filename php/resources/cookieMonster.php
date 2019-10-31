<?php
/**
 * <dsCode> Inc. (c) 2019. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */


//$theUserName = $_GET['users_name'];
if (!isset($_COOKIE['cial'])) {
    echo "Cookies are not enabled!";
} else {
    $theCookieData = json_decode($_COOKIE['cial']);
    $theUserName = $theCookieData->UserName;
    $theDisplayName = $theCookieData->UserDisplayName;
}
//echo($theUserName);
?>