<?php
/**
 * <dsCode> Inc. (c) 2016. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

include $_SERVER['DOCUMENT_ROOT'] . '/labs2/php/header.php'; ?>
    List Invoice Page!
    <script src="invoiceList.js" type="text/javascript"></script>
</body>
</html>

<?php
require_once("../config.php");
$res = mysql_connect($mysql_server, $mysql_user, $mysql_pass);
mysql_select_db($mysql_db);

require("../../codebase/tree_connector.php");
$tree = new TreeConnector($res);
//
$tree->render_table("tasks", "taskId", "taskName", "", "parentId");
?>