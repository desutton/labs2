<?php 
	//$theUserName = $_GET['users_name'];
	if(!isset($_COOKIE['cial'])) {
    echo "Cookies are not enabled!";
} else {
    $theUserName = $_COOKIE['cial'];
}
	
?>
<html>
	<header>
		<title>
		LABS v.01
		</title>
		<link rel="stylesheet" href="http://localhost/webix/codebase/skins/clouds.css" type="text/css">
		<!--<link rel="stylesheet" href="/webix/codebase/webix.css" type="text/css">-->
		<link rel="stylesheet" href="../../css/font-awesome.css" type="text/css">
		<link rel="stylesheet" href="../../css/main.css" type="text/css">
		<script src="http://localhost/webix/codebase/webix.js" type="text/javascript"></script> 
		<!--<script src="../supportjs/dscode.js" type="text/javascript"></script>-->
	</header>
	<body>
		Hello: <?php echo($theUserName); ?>
		Today
	</body>
</html>