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
include $_SERVER['DOCUMENT_ROOT'] . '/labs2/php/resources/appVersion.php';
include $_SERVER['DOCUMENT_ROOT'] . '/labs2/php/resources/mode.php';

//echo $_SERVER['HTTP_USER_AGENT'] . "\n\n";


?>
<html>
<head>
    <link rel="stylesheet" href="/labs2/webix/codebase/skins/flat.min.css" type="text/css">
    -->
    <!--<link rel="stylesheet" href="/labs2/webix/codebase/webix.css" type="text/css">-->
    <!--<link rel="stylesheet" href="/labs2/webix/codebase/skins/clouds.css" type="text/css">-->
    <link rel="stylesheet" href="/labs2/css/font-awesome.css" type="text/css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
          integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
    <link rel="stylesheet" href="/labs2/css/w3.css" type="text/css">
    <script src="/labs2/webix/codebase/webix.js" type="text/javascript"></script>
    <!--<script src="/labs2/webix/codebase/skins/skin.js" type="text/javascript"></script>
    <!--<script src="../../supportjs/dscode.js" type="text/javascript"></script>-->
    <link rel="stylesheet" href="/labs2/css/main.css" type="text/css">
    <meta charset="UTF-8">
</head>
<body class="des_DesktopBackground">

<!-- copied the code from "http://www.w3schools.com/canvas/canvas_clock.asp" -->
<div class="des_DesktopInfo">
    <canvas id="canvas" width="100" height="100" style="background-color:transparent"></canvas>
    <script src="/labs2/supportjs/clock.js" type="text/javascript"></script>
</div>
<div class="des_DesktopInfo">
    <br/>Hello: <b><?php echo($theDisplayName); ?></b>
    <br/>You are logged in as: <b><?php echo($theUserName); ?></b>
    <br/>The version is: <b><?php echo($theAppVersion); ?></b>
    <br/>The server is in: <b><?php echo($sysmode); ?></b> mode
    <br/>Server name is: <b><?php echo $_SERVER['SERVER_NAME']; ?></b>
    <br/>Your browser type: <b id="desweb"></b>
    <br/>You are using a <b id="hardware">computer</b>
    <br/>Current Script: <b><?php echo $_SERVER['SCRIPT_NAME']; ?></b>
    <br/>
</div>
<script>document.getElementById("desweb").innerHTML = navigator.appCodeName + " " + navigator.appVersion.slice(79, 106);</script>
<script>document.getElementById("hardware").innerHTML = navigator.platform;</script>
