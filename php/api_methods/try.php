<?php
/**
 * <dsCode> Inc. (c) 2016. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

/*******************************************************************************
David Sutton
March 23 2016

Version: 1.0.0

INSERT
This code is an API for a Webix based app. Used to grab data from a mySQL db,
then parse it and then prepare a JSON statement to be uploaded to a Webix Tree.

Version History:
1.0.0 - Initial release
*******************************************************************************/ 
require_once( dirname( __FILE__ ).'/../intercon/servercon.php');
require_once( dirname( __FILE__ ).'/../errorcodes.php');
?>
<html>
<body bgcolor="black" text="#f8f8ff">

</body>
</html>
<?php

$data = array(
	array('invoice_UUID' => 1, 'parent' => null, 'name' => 'lorem ipsum'),
	array('invoice_UUID' => 2, 'parent' => 1, 'name' => 'lorem ipsum1'),
	array('invoice_UUID' => 3, 'parent' => 1, 'name' => 'lorem ipsum2'),
	array('invoice_UUID' => 4, 'parent' => 1/2, 'name' => 'lorem ipsum3'),
	array('invoice_UUID' => 5, 'parent' => 1/2/3, 'name' => 'lorem ipsum4'),
	array('invoice_UUID' => 6, 'parent' => null, 'name' => 'lorem ipsum5'),
);

$itemsByReference = array();

// Build array of item references:
foreach($data as $key => &$item) {
	$itemsByReference[$item['invoice_UUID']] = &$item;
	// Children array:
	$itemsByReference[$item['invoice_UUID']]['data'] = array();
	// Empty data class (so that json_encode adds "empty: {}" )
	$itemsByReference[$item['invoice_UUID']]['empty'] = new StdClass();
}

// Set items as children of the relevant parent item.
foreach($data as $key => &$item)
	if($item['parent'] && isset($itemsByReference[$item['parent']]))
		$itemsByReference [$item['parent']]['data'][] = &$item;

// Remove items that were added to parents elsewhere:
foreach($data as $key => &$item) {
	if($item['parent'] && isset($itemsByReference[$item['parent']]))
		unset($data[$key]);
}

// Encode:
$json = json_encode($data);
echo($json);

?>                