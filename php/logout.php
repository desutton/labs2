<?php
	// ----- Cookie Monster Code ----- //	
// Create a cookie to store user name
$theCookieName = "cial";
// delete any exisiting cookies
setcookie($theCookieName, "", time() -3600, "/");
// ----- End of Cookie Monster Code ----- //
?>

<html>
	<head>
		<meta http-equiv="refresh" content="1; url=../index.html">
	</head>
</html>