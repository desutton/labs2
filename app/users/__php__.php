<?php
/**
 * <dsCode> Inc. (c) 2016. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

/**
 * Created by PhpStorm.
 * User: sutton
 * Date: 8/24/16
 * Time: 2:36 PM
 */

//Set the root path to the public_html or www folder
$SITE_ROOT = ($_SERVER['DOCUMENT_ROOT']);

//Set the paths to the these resources need by almost every php file.
$UUIDPath = $SITE_ROOT . "/php/uuidautogen.php";
$ServerCon = $SITE_ROOT . "/php/intercon/servercon.php";
$ErrorCodes = $SITE_ROOT . '/php/errorcodes.php';
$APPVersion = $SITE_ROOT . '/labs2/php/resources/appVersion.php';
$SYSMode = $SITE_ROOT . '/labs2/php/resources/mode.php';
$PHP_HEADERS = $SITE_ROOT . '/php/header.php';


//Not sure if these should be here.
require_once($UUIDPath);
require_once($ServerCon);
require_once($ErrorCodes);
include($APPVersion);
include($SYSMode);
include($PHP_HEADERS);

//$theUserName = $_GET['users_name'];
if (!isset($_COOKIE['cial'])) {
    echo "Cookies are not enabled!";
} else {
    $theCookieData = json_decode($_COOKIE['cial']);
    $theUserName = $theCookieData->UserName;
    $theDisplayName = $theCookieData->UserDisplayName;
}
?>