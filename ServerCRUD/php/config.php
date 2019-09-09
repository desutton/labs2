<?php
/**
 * <dsCode> Inc. (c) 2019. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

$API = array(
    'TestAction' => array(
        'methods' => array(
            'doEcho' => array(
                'len' => 1
            ),
            'multiply' => array(
                'len' => 1
            ),
            'getTree' => array(
                'len' => 1
            ),
            'getGrid' => array(
                'len' => 1
            ),
            'showDetails' => array(
                'params' => array(
                    'firstName',
                    'lastName',
                    'age'
                )
            )
        )
    ),

    'Profile' => array(
        'methods' => array(
            'getBasicInfo' => array(
                'len' => 2
            ),
            'getPhoneInfo' => array(
                'len' => 1
            ),
            'getLocationInfo' => array(
                'len' => 1
            ),
            'updateBasicInfo' => array(
                'len' => 0,
                'formHandler' => true
            )
        )
    )
);