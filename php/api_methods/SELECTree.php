<?php
/**
 * <dsCode> Inc. (c) 2020. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

$servername = "localhost";
$username = "dbuser";
$password = "dbman";
$dbname = "labs";

$conn = mysqli_connect($servername, $username, $password, $dbname) or die("Connection failed: " . mysqli_connect_error());
/* check connection */
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}

$sql_query = "SELECT * FROM `customerRecords` ";
$results = mysqli_query($conn, $sql_query) or die("database error:" . mysqli_error($conn));
//iterate on results row and create new index array of data
while ($row = mysqli_fetch_assoc($results)) {
    $data[] = $row;
}
$itemsByReference = array();

// Build array of item references:
foreach ($data as $key => &$item) {
    $itemsByReference[$item['custRec_id']] = &$item;
    // Children array:
    //$itemsByReference[$item['id']]['children'] = array();
    // Empty data class (so that json_encode adds "data: {}" )
    //$itemsByReference[$item['id']]['dataz'] = new StdClass();
}

// Set items as children of the relevant parent item.
foreach ($data as $key => &$item)
    if ($item['custRec_id'] && isset($itemsByReference[$item['custRec_parentId']]))
        $itemsByReference [$item['custRec_parentId']]['data'][] = &$item;

// Remove items that were added to parents elsewhere:
foreach ($data as $key => &$item) {
    if ($item['custRec_parentId'] && isset($itemsByReference[$item['custRec_parentId']]))
        unset($data[$key]);
}

// Encode:
//echo "[".json_encode($data)."]";
echo json_encode(array_values($data));