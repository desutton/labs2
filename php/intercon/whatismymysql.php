<?php
	/*******************************************************************************
David Sutton
May 20 2015

Version: 1.0.0

whatismymysql
This code will display info about version the mySQL server

Version History:
1.0.0 - Inital release
*******************************************************************************/ 

	
	
	
	require_once( dirname( __FILE__ ).'/../intercon/servercon.php');
	$link = mysqli_connect($hostname, $username, $password);
	
	echo('<html>
	<head>
	<title>Developer Toolkit - MySQL Info</title>
		<link rel="stylesheet" type="text/css" href="http://localhost/labs/php/main.css">
	</head>
	<body>
		<div class="TitleBar">Developer Toolkit - mySQL Info</div>
		</p><p>
		<span class="divideBar">Database Version Tool</span>
		<p>
		<div class="labeler">');

	printf("Client library version: %d\n", mysqli_get_client_version());
	
	echo('</div><br />
	<div class="labeler">');
	printf("Server library version: %s\n", mysqli_get_server_info($link));
	
	echo('</div><br />
	<p></p>
		<div class="logoWrapper">
			<span class="logo">&lt;ds-code&gt; &copy;2015</span>
		</div>
	</body>
	</html>');
?>