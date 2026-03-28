<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TodoController extends Controller
{
    public function index()
    {
        return Inertia::render('Todo', [
            'todos' => Todo::latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate(['title' => 'required|string|max:255']);
        Todo::create(['title' => $request->title]);
        return redirect()->back();
    }

    public function update($id)
    {
        $todo = Todo::findOrFail($id);
        $todo->update(['is_completed' => !$todo->is_completed]);
        return redirect()->back();
    }

    public function destroy($id)
    {
        Todo::findOrFail($id)->delete();
        return redirect()->back();
    }
}