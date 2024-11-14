import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:mobile/features/todo/data/model/todo_model.dart';

class ApiService {
  final String baseUrl = 'http://localhost:8000/api'; // Corrected base URL

  // Fetch Todos from API
  Future<List<Todo>> fetchTodos({int page = 1, int limit = 10}) async {
    final response = await http.get(
      Uri.parse('$baseUrl/todos?page=$page&limit=$limit'),
    );
    print("response");
    print(response.body);
    if (response.statusCode == 200) {
      // Parse the response body
      final responseBody = json.decode(response.body);
      print("response data");
      print("response data");
      print("response data");
      print("response data");
      List<dynamic> data = responseBody[
          'data']; // Extract the 'data' field which contains the todos
      print(data);

      // Map the todos to a list of Todo objects
      return data.map((json) => Todo.fromJson(json)).toList();
    } else {
      throw Exception('Failed to load todos'); // Handle error cases
    }
  }

  // Add a new Todo
  Future<void> addTodo(Todo todo) async {
    final response = await http.post(
      Uri.parse('$baseUrl/todos'), // Corrected endpoint
      headers: {'Content-Type': 'application/json'},
      body: json.encode(todo.toJson()),
    );

    if (response.statusCode != 201) {
      throw Exception("Failed to create todo");
    }
  }

  // Update an existing Todo
  Future<void> updateTodo(Todo todo) async {
    final response = await http.put(
      Uri.parse('$baseUrl/todos/${todo.id}'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode(todo.toJson()),
    );

    if (response.statusCode != 200) {
      throw Exception('Failed to update todo');
    }
  }

  // Delete a Todo
  Future<void> deleteTodo(String id) async {
    final response = await http
        .delete(Uri.parse('$baseUrl/todos/$id')); // Corrected endpoint

    if (response.statusCode != 204) {
      throw Exception('Failed to delete todo');
    }
  }
}
