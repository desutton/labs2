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
}
include $_SERVER['DOCUMENT_ROOT'] . '/php/resources/appVersion.php';
include $_SERVER['DOCUMENT_ROOT'] . '/php/resources/mode.php';


?>
<html>
<head>
    <link rel="stylesheet" href="/labs2/webix/codebase/webix.css" type="text/css">
    <link rel="stylesheet" href="/labs2/css/font-awesome.css" type="text/css">
    <link rel="stylesheet" href="/labs2/css/w3.css" type="text/css">
    <script src="/labs2/webix/codebase/webix.js" type="text/javascript"></script>
    <!--<script src="/webix/codebase/skins/skin.js" type="text/javascript"></script>
    <!--<script src="../../supportjs/dscode.js" type="text/javascript"></script>-->
    <link rel="stylesheet" href="/labs2/css/main.css" type="text/css">
    <meta charset="UTF-8">
</head>
<body class="des_DesktopBackground">
<div class="des_DesktopInfo">
    Hello: <b><?php echo($theDisplayName); ?></b>
    <br />You are logged in as: <b><?php echo($theUserName); ?></b>
    <br \>The version is: <b><?php echo($theAppVersion); ?></b>
    <br \>Server name is: <b><?php echo $_SERVER['SERVER_NAME']; ?></b>
    <br \>Your browser type: <b id="desweb"></b>
    <br \>Current Script: <b><?php echo $_SERVER['SCRIPT_NAME']; ?></b>
    <br \>
    <!-- copied the code from "http://www.w3schools.com/canvas/canvas_clock.asp" -->
    <canvas id="canvas" width="100" height="100"
            style="background-color:transparent">
    </canvas>
    <script src="/labs2/supportjs/clock.js" type="text/javascript"></script>
    <script>document.getElementById("desweb").innerHTML = navigator.appCodeName +" "+ navigator.appVersion.slice(79, 100);</script>

</div>