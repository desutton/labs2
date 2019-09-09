<?php
/**
 * <dsCode> Inc. (c) 2019. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

date_default_timezone_set('UTC');

echo json_encode(array(
    'type' => 'event',
    'name' => 'message',
    'data' => 'Successfully polled at: ' . date('g:i:s a') . ' UTC'
));
