<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Todo;

class TodoController extends Controller
{
    //
    // Fetch all todos
    // public function index()
    // {
    //     return response()->json(Todo::all());
    // }

    public function index(Request $request)
    {
        // Get the current page number from the request (defaults to 1)
        $page = $request->get('page', 1); 
    
        // Get the number of items per page (default to 6)
        $limit = $request->get('limit', 6); 
    
        // Fetch todos, ordered by created_at (desc), and paginated
        $todos = Todo::orderBy('created_at', 'desc')
                    ->paginate($limit);
    
        return response()->json($todos);
    }
    


    // Fetch a single todo
    public function show($id)
    {
        $todo = Todo::find($id);
    
        if ($todo) {
            return response()->json($todo); // Returning the single todo without ordering
        }
    
        return response()->json(['message' => 'Todo not found'], 404);
    }
    
   
    

    // Create a new todo
    public function store(Request $request)
{
    // Validate the incoming data
    $request->validate([
        'title' => 'required|string|max:255|unique:todos,title', // Ensures title is unique
        'description' => 'nullable|string',
        'completed' => 'boolean',
    ]);

    // Create a new Todo record
    $todo = Todo::create($request->all());

    // Return the created Todo in the response
    return response()->json($todo, 201);
}

    // Update an existing todo
    public function update(Request $request, $id)
    {
        $todo = Todo::find($id);
        if ($todo) {
            $todo->update($request->all());
            return response()->json($todo);
        }
        return response()->json(['message' => 'Todo not found'], 404);
    }

    // Delete a todo
    public function destroy($id)
    {
        $todo = Todo::find($id);
        if ($todo) {
            $todo->delete();
            return response()->json(['message' => 'Todo deleted successfully']);
        }
        return response()->json(['message' => 'Todo not found'], 404);
    }
}