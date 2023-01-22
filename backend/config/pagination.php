<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Accepted page length
    |--------------------------------------------------------------------------
    */

    'page_lengths'           => explode(',', env('PAGE_LENGTHS', '5,20,50,100')),
    'default_page_length'    => env('DEFAULT_LENGTH', 20),

];
