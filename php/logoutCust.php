<?php
/**
 * <dsCode> Inc. (c) 2019. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

// ----- Cookie Monster Code ----- //
// Create a cookie to store user name
$theCookieName = "cial";
// delete any exisiting cookies
setcookie($theCookieName, "", time() - 3600, "/");
// ----- End of Cookie Monster Code ----- //
?>

<html>
<head>
    <meta http-equiv="refresh" content="1; url=../default.html">
</head>
</html>