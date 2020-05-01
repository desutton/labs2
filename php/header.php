<?php
/**
 * <dsCode> Inc. (c) 2016. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

/**************************************************************
 *David Sutton
 * Jan 14 2016
 *
 * Code version 1
 * Version: Release 1

 * This is a the main header to be used for every php file.
****************************************************************/

//$theUserName = $_GET['users_name'];
if (!isset($_COOKIE['cial'])) {
    echo "Cookies are not enabled!";
} else {
    $theCookieData = json_decode($_COOKIE['cial']);
    $theUserName = $theCookieData->UserName;
    $theDisplayName = $theCookieData->UserDisplayName;
    $theUserCSS = $theCookieData->UserCSS;
}
include $_SERVER['DOCUMENT_ROOT'] . '/labs2/php/resources/appVersion.php';
include $_SERVER['DOCUMENT_ROOT'] . '/labs2/php/resources/mode.php';
include $_SERVER['DOCUMENT_ROOT'] . '/labs2/php/resources/accessApp.php'

//echo $_SERVER['HTTP_USER_AGENT'] . "\n\n";


?>
<html>
<head>
    <link rel="shortcut icon" href="/labs2/favicon.ico" type="image/x-icon"/>
    <link rel="stylesheet" href="/labs2/webix/codebase/skins/<?php echo($theUserCSS); ?>" type="text/css">
    <link rel="stylesheet" href="/labs2/css/main_new.css" type="text/css">
    <link href="/labs2/css/fontawesome.css" rel="stylesheet">
    <link href="/labs2/css/brands.css" rel="stylesheet">
    <link href="/labs2/css/solid.css" rel="stylesheet">
    <script src="/labs2/webix/codebase/webix.js" type="text/javascript"></script>
    <meta charset="UTF-8">
</head>
<body class="des_DesktopBackground">

<!-- This code is used under license from "http://www.w3schools.com/canvas/canvas_clock.asp" -->
<div class="des_DesktopInfo">
    <canvas id="canvas" width="100" height="100" style="background-color:transparent"></canvas>
    <script src="/labs2/supportjs/clock.js" type="text/javascript"></script>
</div>
<!-- End of code -->

<div class="des_DesktopInfo">
    <br/>Hello: <b><?php echo($theDisplayName); ?></b>
    <br/>You are logged in as: <b><?php echo($theUserName); ?></b>
    <br/>Your access level is: <b><?php echo($USER_ACCESS_NAME); ?></b>
    <br/>The version is: <b><?php echo($theAppVersion); ?></b>
    <br/>The server is in: <b><?php echo($sysmode); ?></b> mode
    <br/>Server name is: <b><?php echo $_SERVER['SERVER_NAME']; ?></b>
    <br/>Your browser type: <b id="desweb"></b>
    <br/>You are using a <b id="hardware">computer</b>
    <br/>Current Script: <b><?php echo $_SERVER['SCRIPT_NAME']; ?></b>
    <br/>Framework version: <b>
        <script type="text/javascript">document.write(webix.version);</script>
    </b>
    <br/>
</div>
<script>document.getElementById("desweb").innerHTML = navigator.appCodeName + " " + navigator.appVersion.slice(79, 106);</script>
<script>document.getElementById("hardware").innerHTML = navigator.platform;</script>
