<?php
/**
 * <dsCode> Inc. (c) 2020. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

include('../uuidautogenRAW.php');
include('phpqrcode/qrlib.php');

// SVG file format support
$svgCode = QRcode::svg($theUUID);

echo $svgCode;
?>
