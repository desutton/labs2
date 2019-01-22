<?php
/**
 * <dsCode> Inc. (c) 2016. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

/**
 * Created by PhpStorm.
 * User: sutton
 * Date: 7/28/16
 * Time: 12:46 PM
 */

$theCurentDate = date("Y/m/d");
$theCopyrightYear = date("Y");

//Footer for the php dev pages
$theHTMLFooter = ('
<br />
<div class="logoWrapper"><span class="logo">&lt;ds-code&gt; &copy;' . $theCopyrightYear . '</span><br /></div>
</body>
</html>
');


?>