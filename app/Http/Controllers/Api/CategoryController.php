<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index()
    {
        return Category::paginate(6);
    }

    public function store(Request $request)
    {
        $category = new Category();
        $category->name = $request->category_name;
        $category->save();
    }

    public function update(Request $request,$id)
    {
        $category = Category::find($id);
        $category->name = $request->category_name;
        $category->save();
    }

    public function edit($id)
    {
        $category = Category::find($id);
        return $category;
    }

    public function destroy($id)
    {
        $category = Category::find($id);
        $category->delete();
    }
}

