<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Author;
use App\Models\Book;
use App\Models\Category;
use App\Models\Label;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $this->accessEmployee();

        $query = Book::query();
        $query = $query->leftJoin('languages', 'books.language_id', '=', 'languages.id');
        $query = $query->leftJoin('cover_types', 'books.cover_type_id', '=', 'cover_types.id');
        $query = $query->with('authors');

        $query = $query->select(
            'books.*',
            'languages.id as language_id',
            'languages.name as language_name',
            'cover_types.name as cover_type_name',
            'cover_types.id as cover_type_id',
        );

        if ($request->input('search')) {
            $query->where('title', 'LIKE', '%' . escape_like($request->input('search')) . '%');
        }

        if ($request->get('status') == 'archived') {
            $query->onlyTrashed();
        }

        $books = $query->paginate($this->getPageLength($request));

        $result = [
            'items' => [],
            'pagination' => $this->getPaginationForJson($books),
        ];

        foreach ($books as $book) {
            $result['items'][] = [
                'id' => $book->id,
                'title' => $book->title,
                'description' => $book->description,
                'published' => $book->published,
                'number_of_page' => $book->number_of_page,
                'isbn_code' => $book->isbn_code,
                'in_stock' => $book->in_stock,
                'available' => $book->available,
                'is_new' => $book->is_new,
                'language_id' => $book->language_id,
                'language_name' => $book->language_name,
                'cover_type_id' => $book->cover_type_id,
                'cover_type_name' => $book->cover_type_name,
                'created_at' => Carbon::create($book->created_at)->toDateString(),
                'updated_at' => Carbon::create($book->updated_at)->toDateString(),
                'can_delete' => false, //Nem törölhető, ha szerepel
                'authors' => $this->getRelatedAuthors($book),
                'categories' => $this->getRelatedCategories($book),
                'labels' => $this->getRelatedLabels($book),
            ];
        }

        return response()->json($result, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return JsonResponse
     */
    public function create()
    {
        $this->accessEmployee();

        $result = [
            'categories' => $this->getPotentialCategories(),
            'labels' => Label::all(),
            'authors' => Author::all(),
        ];

        return response()->json($result, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $this->accessEmployee();

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required',
            'published' => 'required|number',
            'number_of_page' => 'required',
            'isbn_code ' => 'required|string',
            'in_stock ' => 'required|number',
            'available ' => 'required|number',
            'language_id' => 'nullable|exists:languages,id',
            'cover_type_id' => 'nullable|exists:cover_types,id',
        ]);

        if ($validator->fails()) {
            $response = [
                'success' => false,
                'errors' => $validator->errors(),
            ];
            return response()->json($response);
        }

        Book::create($request->all());

        return response()->json(['success'], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param Book $book
     * @return JsonResponse
     */
    public function show(Request $request, Book $book)
    {
        $this->accessEmployee();

        $response = [
            'item' => Book::where('id', $book->id)->with('coverType')->with('language')->get(),
            'authors' => $this->getRelatedAuthors($book),
            'categories' => $this->getRelatedCategories($book),
            'labels' => $this->getRelatedLabels($book),
        ];

        return response()->json($response);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Book $book
     * @return JsonResponse
     */
    public function edit(Request $request, Book $book)
    {
        $this->accessEmployee();

        $response = [
            'item' => Book::where('id', $book->id)->with('coverType')->with('language')->get(),
            'authors' => $this->getRelatedAuthors($book),
            'categories' => $this->getRelatedCategories($book),
            'labels' => $this->getRelatedLabels($book),
        ];

        return response()->json($response);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Book $book
     * @return JsonResponse
     */
    public function update(Request $request, Book $book)
    {
        $this->accessEmployee();

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required',
            'published' => 'required|number',
            'number_of_page' => 'required',
            'isbn_code ' => 'required|string',
            'in_stock ' => 'required|number',
            'available ' => 'required|number',
            'language_id' => 'nullable|exists:languages,id',
            'cover_type_id' => 'nullable|exists:cover_types,id',
        ]);

        if ($validator->fails()) {
            $response = [
                'success' => false,
                'errors' => $validator->errors(),
            ];
            return response()->json($response);
        }

        $book->fill($request->all())->save();

        return response()->json(['success']);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Book $book
     * @return JsonResponse
     */
    public function destroy(Book $book)
    {
        $this->accessEmployee();

        //Soft delete

    }


    public function getRelatedAuthors($book)
    {
        return $book->authors()->get();
    }

    public function getRelatedCategories($book)
    {
        return $book->categories()->get();
    }

    public function getRelatedLabels($book)
    {
        return $book->labels()->get();
    }

    public function getPotentialCategories(): array
    {
        $query = Category::query();
        $categories = $query->whereNull('parent_id')->get();

        $result = [
            'items' => [],
        ];

        foreach ($categories as $category) {
            $result['items'][] = [
                'id' => $category->id,
                'name' => $category->name,
                'children' => Category::where('parent_id', $category->id)->get()
            ];
        }

        return $result;
    }

}
