<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\Book;
use App\Models\CoverType;
use App\Models\Label;
use App\Models\Language;
use App\Models\Publisher;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function getLastRented(Request $request): JsonResponse
    {
        $query = Book::query();
        $query = $query->leftJoin('languages', 'books.language_id', '=', 'languages.id');
        $query = $query->leftJoin('cover_types', 'books.cover_type_id', '=', 'cover_types.id');
        $query = $query->leftJoin('publishers', 'books.publisher_id', '=', 'publishers.id');
        $query = $query->leftJoin('files', 'books.file_id', '=', 'files.id');
        $query = $query->with('authors');

        $query = $query->select(
            'books.*',
            'languages.id as language_id',
            'languages.name as language_name',
            'cover_types.name as cover_type_name',
            'cover_types.id as cover_type_id',
            'publishers.name as publisher',
            'publishers.id as publisher_id',
            'files.id as file_id',
            'files.name as file_name',
            'files.path as file_path',

        )->where('is_new', 1);
        $query = $query->get();

        return response()->json($query, 200);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function getTestimonials(Request $request): JsonResponse
    {
        $result = [];

        return response()->json($result, 200);
    }
}
