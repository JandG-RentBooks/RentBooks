<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /**
     * @param  LengthAwarePaginator  $collection
     *
     * @return array
     */
    protected function getPaginationForJson(LengthAwarePaginator $collection): array
    {
        return [
            'total'        => $collection->total(),
            'last_page'    => $collection->lastPage(),
            'current_page' => $collection->currentPage(),
            'per_page'     => $collection->perPage(),
            'links'        => $collection->linkCollection(),
        ];
    }
}
