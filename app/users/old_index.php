<?php include $_SERVER['DOCUMENT_ROOT'] . '/labs2/php/header.php'; ?>
<?php //include $_SERVER['DOCUMENT_ROOT'] . '/labs2/app/users/usersController.php'; ?>
<?php
/**
 * <dsCode> Inc. (c) 2016. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

/**
 * Created by PhpStorm.
 * User: sutton
 * Date: 8/24/16
 * Time: 2:37 PM
 */
if ($sysmode == "dev") {
    ?>
    <div class="w3-theme-l5 w3-card w3-threequarter">
        <p>
        <table class="w3-table w3-striped w3-bordered w3-border w3-hoverable">
            <thead>
            <tr class="w3-blue">
                <th>UUID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>User ID</th>
                <th>Employee ID</th>
                <th>Password</th>
                <th>Group</th>
                <th>Access Level</th>
                <th>Display Name</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
            </thead>
            <?php include './usersController.php'; ?>
        </table>
        </p>
    </div>

    <?php
    echo('');
} else {
    echo('<script src="users.js" type="text/javascript"></script>');
}

?>
</body>
</html>
