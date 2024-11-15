import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:mobile/features/todo/data/data_sources/todo_data_source.dart';
import 'package:mobile/features/todo/data/model/todo_model.dart';
import 'package:mobile/features/todo/presentation/pages/add_new_todo.dart';
import 'package:mobile/features/todo/presentation/widgets/todo_app_bar.dart';
import 'package:mobile/features/todo/presentation/widgets/todo_drawer.dart';
import 'package:mobile/features/todo/presentation/widgets/todo_item.dart';
import 'dart:ui'; // For the BackdropFilter

class TodoListPage extends StatefulWidget {
  const TodoListPage({super.key});

  @override
  State<TodoListPage> createState() => _TodoListPageState();
}

class _TodoListPageState extends State<TodoListPage> {
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
  final ApiService _apiService =
      ApiService(); // API service for backend interaction
  late Future<List<Todo>> _todos;

  // Pagination state
  int _currentPage = 1;
  bool _hasMore = true; // To track whether more todos are available
  bool _isLoading = false; // To prevent multiple simultaneous requests

  // Filter selection: All, Completed, or Pending
  String _filterOption = 'All'; // Default filter option is "All"

  @override
  void initState() {
    super.initState();
    _todos = _fetchTodos(); // Initially load todos
  }

  // Fetch todos based on the current page and filter
  Future<List<Todo>> _fetchTodos() async {
    if (_isLoading) return [];
    setState(() => _isLoading = true);

    try {
      final todos = await _apiService.fetchTodos(page: _currentPage);
      if (todos.isNotEmpty) {
        setState(() {
          _hasMore = todos.length ==
              8; // Assuming the limit is 10, there might be more
        });
      } else {
        setState(() {
          _hasMore = false; // No more todos to load
        });
      }
      return todos;
    } catch (e) {
      // Handle the error gracefully
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text("Failed to load todos: $e")));
      return [];
    } finally {
      setState(() => _isLoading = false);
    }
  }

  // Handle load more functionality
  void _loadMoreTodos() {
    if (_hasMore && !_isLoading) {
      setState(() {
        _currentPage++;
        _todos = _fetchTodos(); // Fetch more todos
      });
    }
  }

  // Toggle completion status of a todo
  void _toggleCompletion(Todo todo) async {
    final updatedTodo = Todo(
      id: todo.id,
      title: todo.title,
      description: todo.description,
      created_at: todo.created_at,
      completed: !todo.completed, // Toggle the completion status
    );

    try {
      await _apiService.updateTodo(updatedTodo);
      setState(() {
        // Refresh the todo list after the update
        _todos = _fetchTodos();
      });
    } catch (e) {
      // Handle any errors
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Failed to update todo: $e")),
      );
    }
  }

  // Delete a todo
  void _deleteTodo(String id) async {
    try {
      await _apiService.deleteTodo(id);
      setState(() {
        // Refresh the todo list after deletion
        _todos = _fetchTodos();
      });
    } catch (e) {
      // Handle errors during deletion
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Failed to delete todo: $e")),
      );
    }
  }

  // Navigate to the Add/Edit Todo page
  void _editTodo(Todo todo) {
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (BuildContext ctx) {
          return AddNewTodo(todo: todo); // Pass the todo for editing
        },
      ),
    );
  }

  // Handle the filter change
  void _changeFilter(String? value) {
    setState(() {
      _filterOption = value ?? "All"; // Update the filter option
    });
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      top: false,
      child: Scaffold(
        backgroundColor: Colors.white,
        key: _scaffoldKey,
        appBar: PreferredSize(
          preferredSize: const Size.fromHeight(kToolbarHeight + 16.0),
          child: TodoAppBar(scaffoldKey: _scaffoldKey),
        ),
        drawer: const TodoDrawer(),
        body: Stack(
          children: [
            
            // Main content of the Todo List page
            Column(
              children: [
                // Add a dropdown menu for selecting the filter
                Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text('Filter Todos:'),
                      DropdownButton<String>(
                        value: _filterOption,
                        onChanged: _changeFilter,
                        items: const [
                          DropdownMenuItem(value: 'All', child: Text('All')),
                          DropdownMenuItem(value: 'Completed', child: Text('Completed')),
                          DropdownMenuItem(value: 'Pending', child: Text('Pending')),
                        ],
                      ),
                    ],
                  ),
                ),
                // Display the list of todos
                Expanded(
                  child: FutureBuilder<List<Todo>>(
                    future: _todos,
                    builder: (context, snapshot) {
                      // Show loading spinner when data is being fetched
                      if (snapshot.connectionState == ConnectionState.waiting) {
                        return const Center(child: CircularProgressIndicator());
                      }

                      // Show an error message if an error occurs
                      if (snapshot.hasError) {
                        return Center(
                          child: Text(
                            'Error: ${snapshot.error}',
                            style: const TextStyle(color: Colors.red),
                          ),
                        );
                      }

                      // Show a message if no data is available
                      if (!snapshot.hasData || snapshot.data!.isEmpty) {
                        return const Center(child: Text('No todos available'));
                      }

                      // Filter todos based on the selected filter option
                      final todos = snapshot.data!;
                      List<Todo> filteredTodos;

                      switch (_filterOption) {
                        case 'Completed':
                          filteredTodos =
                              todos.where((todo) => todo.completed).toList();
                          break;
                        case 'Pending':
                          filteredTodos =
                              todos.where((todo) => !todo.completed).toList();
                          break;
                        default:
                          filteredTodos = todos;
                      }

                      return GridView.builder(
                        padding: const EdgeInsets.all(8.0),
                        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                          crossAxisCount: 2,
                          crossAxisSpacing: 8,
                        ),
                        itemCount: filteredTodos.length,
                        itemBuilder: (context, index) {
                          final todo = filteredTodos[index];
                          return TodoItem(
                            todo: todo,
                            onToggleCompletion: () => _toggleCompletion(todo),
                            onEdit: () => _editTodo(todo),
                            onDelete: () => _deleteTodo(todo.id),
                          );
                        },
                      );
                    },
                  ),
                ),
                // Show More button when there are more todos to load
                if (_hasMore && !_isLoading)
                  Padding(
                    padding: const EdgeInsets.symmetric(vertical: 16.0),
                    child: ElevatedButton(
                      onPressed: _loadMoreTodos,
                      child: const Text('Show More'),
                    ),
                  ),
              ],
            ),
          ],
        ),
        floatingActionButton: ElevatedButton(
          onPressed: () {
            Navigator.of(context).push(
              MaterialPageRoute(builder: (BuildContext ctx) {
                return const AddNewTodo(); // Navigate to AddNewTodo page
              }),
            );
          },
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.blue, // Blue background color
            shape: const CircleBorder(), // Circular shape for the button
            padding: const EdgeInsets.all(20), // Padding to make the button larger (adjustable)
            minimumSize: const Size(60, 60), // Minimum size to ensure it's circular and big enough
          ),
          child: const Icon(
            Icons.add_outlined,
            color: Colors.white,
          ),
        ),
      ),
    );
  }
}
