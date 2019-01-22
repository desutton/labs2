<?php include $_SERVER['DOCUMENT_ROOT'] . '/labs2/php/header.php'; ?>
<?php include $_SERVER['DOCUMENT_ROOT'] . '/labs2/app/usettings/_profile.php'; ?>
<?php
/**
 * <dsCode> Inc. (c) 2019. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

if ($sysmode == "dev") {
    ?>
    <script>
        function showHint(str) {
            if (str.length == 0) {
                document.getElementById("txtHint").innerHTML = "";
                return;
            } else {
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function () {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        document.getElementById("txtHint").innerHTML = xmlhttp.responseText;
                    }
                };
                xmlhttp.open("GET", "gethint.php?q=" + str, true);
                xmlhttp.send();
            }
        }
    </script>
    <p>
    <h3>User Profile</h3>
    <form class="w3-container" action="/labs2/app/usettings/_profile.php?theSQLtype=U" accept-charset="UTF-8"
          method="post" target="_self" name="profile">
        <div class="w3-btn-group w3-border w3-show-inline-block">
            <a href="/labs2/app/usettings/_profile.php?theSQLtype=C&users_firstname=bob"
               class=" w3-btn w3-blue fa fa-plus "> Add</a>
            <a href="./index.php" class=" w3-btn w3-blue fa fa-refresh "> Clear</a>
            <a href="/labs2/app/usettings/_profile.php?theSQLtype=D" class=" w3-btn w3-blue fa fa-remove "> Delete</a>
            <button type="submit" class=" w3-btn w3-blue fa fa-pencil "> Modify</button>
        </div>
        <br/>
        <label>First Name</label>
        <input class="w3-input" style="width: 25%" type="text" name="users_firstname"
               value=<?php echo("'" . $theFirstName . "'"); ?>></p>
        <label>Last Name</label>
        <input class="w3-input" style="width: 25%" type="text" name="users_lastname"
               value=<?php echo("'" . $theLastName . "'"); ?>></p>
        <label>Employee ID</label>
        <input class="w3-input" style="width: 25%" name="users_employeeId" type="text"
               value=<?php echo("'" . $theUserEmpId . "'"); ?>></p>
        <label>User Password</label>
        <input class="w3-input" style="width: 25%" type="password" name="users_pass"
               value=<?php echo("'" . $theUserPass . "'"); ?>></p>
        <label>User Group</label>
        <input class="w3-input" style="width: 25%" type="text" name="users_2group"
               value=<?php echo("'" . $theUserGroup . "'"); ?>></p>
        <label>User Access</label>
        <input class="w3-input" style="width: 25%" type="text" name="users_2accessLevel"
               value=<?php echo("'" . $theUserAccess . "'"); ?>></p>
        <label>User Name</label>
        <input class="w3-input" style="width: 25%" type="text" name="users_name"
               value=<?php echo("'" . $theUserID . "'"); ?>></p>
        <label>Display Name</label>
        <input class="w3-input" style="width: 25%" type="text" name="users_displayName"
               value=<?php echo("'" . $theDisplayName . "'"); ?>></p>
    </form>
    </p>
    <?php
    echo('');
} else {
    echo('<script src="profile.js" type="text/javascript"></script>');
}

?>
	</body>
</html>
