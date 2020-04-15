<?php
/**
 * <dsCode> Inc. (c) 2020. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

include "qrlib.php";

QRcode::png("42\r
	DES200-1", "temp/myqr.png", "L", 21, 4);
?>