<?php
/**
 * <dsCode> Inc. (c) 2016. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

/**
 * Created by PhpStorm.
 * User: sutton
 * Date: 7/21/16
 * Time: 2:36 PM
 */
include $_SERVER['DOCUMENT_ROOT'] . '/labs2/php/resources/appVersion.php';
include $_SERVER['DOCUMENT_ROOT'] . '/labs2/php/resources/mode.php';
include $_SERVER['DOCUMENT_ROOT'] . '/labs2/php/api_methods/TABLES.php';
include $_SERVER['DOCUMENT_ROOT'] . '/labs2/php/api_methods/htmlFooter.php';
$theReturnPath = ('/labs2/php/api_methods/index.php');

?>
    <html>
    <head>
        <title>Developer Toolkit (API Methods)</title>
        <link rel="stylesheet" type="text/css" href="/labs2/css/main.css">
        <link rel="stylesheet" type="text/css" href="/labs2/css/w3.css">

    </head>
<body class="des_text">
    <div class="TitleBar">Developer Toolkit -API Methods (<?php print_r($theAppVersion); ?>)
        <i><?php print_r($sysmode); ?></i></div>
    <p></p>

<body>
<div class="labeler">Create</div>
<div class="labeler">Read</div>
<div class="labeler">Update</div>

<br/>
<form action="/labs2/php/api_methods/FIELDS.php" method="post" class="w3-container">
    <?php
    if (empty($theTableName)) {
        print_r($theTABLESMenu);
        echo('<input type="hidden" name="returnPage" value=' . $theReturnPath . '>');
        echo('<input class="des_button" type="submit" value="Save">');

    } else {
        print_r("Table: " . $theTableName);
    }
    ?>

</form>
<br/>
<form action="/labs2/php/api_methods/FIELDS.php" method="post" class="w3-container">
    <?php
    if (!empty($theTableName)) {
        print_r($theFIELDSMenu);
        echo('<input type="hidden" name="tableName" value=' . $theTableName . '>');
        echo('<input class="des_button" type="submit" value="Save">');
    } else {
        print_r($theFIELDSArray);
    }

    ?>
</form>
<br/>
<!--<input type="text" name="message" rows="10" cols="80">Paste or type URI Here -->

<div class="labeler">Delete</div>
<p></p>
<div class="labeler"><a href="../index.php" style="color: rgb(226,226,226)">Developer Home</a></div>
<?php print_r($theHTMLFooter); ?>