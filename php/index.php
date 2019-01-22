<!--
  ~ <dsCode> Inc. (c) 2016. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
  -->

<html>
<head>
    <title>Developer Toolkits</title>
    <link rel="stylesheet" type="text/css" href="http://localhost/labs2/css/main.css">
    <?php
    include $_SERVER['DOCUMENT_ROOT'] . '/labs2/php/resources/appVersion.php';
    include $_SERVER['DOCUMENT_ROOT'] . '/labs2/php/resources/mode.php';
    ?>
</head>
<body class="des_text">
<div class="TitleBar">Developer Toolkit (<?php print_r($theAppVersion); ?>) <i><?php print_r($sysmode); ?></i></div>
<p>
<p></p>

<span class="divideBar">Database Reporting Tool</span><p>
<!--<form action="http://localhost/labs2/php/api.php?api=test" method="post"> -->
<form action="./api_methods/test.php" method="post">
<div class="labeler">Select your data</div>
<div class="dropDown">
<select name="tableName">
	<option value="activeIngredient">Active Ingredients</option>
	<option value="accessLevel">Access Level</option>
	<option value="aiSample">Sample Prep</option>
	<option value="appinfo">AppInfo</option>
	<option value="labReportR">Lab Reports </option>
	<option value="stabilityStudyR">Stability Study</option>
	<option value="sterilityReportR">Sterility Study</option>
	<option value="standards">Standards</option>
	<option value="custody">Custody</option>
	<option value="custodyLog">CustodyLog</option>
	<option value="customers">Customers</option>
	<option value="jobs">Jobs</option>
	<option value="method">Methods</option>
	<option value="owner">Owners</option>
	<option value="methodCalculation">Method Calculation</option>
	<option value="methodProperties">Method Properties</option>
	<option value="vendors">Vendors</option>
	<option value="custody">Custody</option>
	<option value="custodyLog">Custody Logs</option>
	<option value="groups">Groups</option>
	<option value="sampleTable">Sample Table</option>
	<option value="users">Users</option>
	<option value="invoice">Invoice</option>


</select>
</div>
<p>
<div class="labeler">Select your report</div>
<span class="dropDown">
<select name="dataName">
	<option value="data">Data</option>
	<option value="ok">OK</option>
	<option value="error">Error</option>
</select>
</span>
<p>
<button class="button" type="submit" value="OK"/>OK</button>
<!--<input type="submit" name="save" value="OK">-->
</form>	
<p></p>
<span class="divideBar">Misc Utilities</span><p>
<div class="labeler"><a href="intercon/whatinfo.php" style="color: rgb(226,226,226)">What's the PHP info</a></div><br />
<div class="labeler"><a href="intercon/whatismymysql.php"style="color: rgb(226,226,226)">What's the mySQL version</a></div><br />
<div class="labeler"><a href="echouuid.php" style="color: rgb(226,226,226)">Create a UUID: </a></div>
<p></p>
<div class="labeler"><a
        href="http://localhost/labs2/php/api_methods/SELECTz.php?tableName=prices&columnNames=prices_id,prices_UUID,prices_testDescription,prices_unitPrice&dataName=data&select=5"
        style="color: rgb(226,226,226)">Prices</a></div>
<br/>
<div class="labeler"><a
        href="http://localhost/labs2/php/api_methods/SELECTz.php?tableName=invoice&columnNames=invoice_UUID,invoice_invoiceNumber,invoice_totalDue,invoice_paid,customers.cust_company%20AS%20value,customers.cust_UUID%20AS%20id&joinTable=customers&joinColumn=invoice_2custUUID&joinValue=customers.cust_id&sortby=customers.cust_company&sort=ASC&dataName=data&select=7"
        style="color: rgb(226,226,226)">Invoiceing</a></div>
<br/>
<div class="labeler"><a href="api_methods/index.php" style="color: rgb(226,226,226)">API Methods</a></div>
<div class="logoWrapper"><span class="logo">&lt;ds-code&gt; &copy;2014</span></div>
</body>
</html>