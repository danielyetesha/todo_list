import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:mobile/features/todo/data/model/todo_model.dart';

class ApiService {
  final String baseUrl =
      'http://192.168.201.135:8000/api'; // Change to your actual backend IP

  // Fetch Todos from API
  Future<List<Todo>> fetchTodos({int page = 1, int limit = 8}) async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/todos?page=$page&limit=$limit'),
      );

      if (response.statusCode == 200) {
        final responseBody = json.decode(response.body);
        List<dynamic> data = responseBody['data'];
        return data.map((json) => Todo.fromJson(json)).toList();
      } else {
        // Handle non-200 status codes (e.g., 4xx, 5xx)
        final responseBody = json.decode(response.body);
        final errorMessage = responseBody['message'] ?? 'Failed to load todos';
        throw Exception('Error ${response.statusCode}: $errorMessage');
      }
    } catch (e) {
      // Catch any unexpected errors
      throw Exception('Failed to load todos: $e');
    }
  }

  // Add a new Todo
  Future<void> addTodo(Todo todo) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/todos'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode(todo.toJson()),
      );

      if (response.statusCode == 201 ||
          response.statusCode == 202 ||
          response.statusCode == 203 ||
          response.statusCode == 204 || // 204 No Content means success
          response.statusCode == 200) {
        return;
      } else {
        // Handle non-201 status codes
        final responseBody = json.decode(response.body);
        final errorMessage = responseBody['message'] ?? 'Failed to create todo';
        throw Exception('Error ${response.statusCode}: $errorMessage');
      }
    } catch (e) {
      throw Exception('Failed to create todo: $e');
    }
  }

  // Update an existing Todo
  Future<void> updateTodo(Todo todo) async {
    try {
      final response = await http.put(
        Uri.parse('$baseUrl/todos/${todo.id}'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode(todo.toJson()),
      );

      if (response.statusCode == 200 || response.statusCode == 201) {
        // Success, do nothing
        return;
      } else {
        // Handle non-200 status codes
        final responseBody = json.decode(response.body);
        final errorMessage = responseBody['message'] ?? 'Failed to update todo';
        throw Exception('Error ${response.statusCode}: $errorMessage');
      }
    } catch (e) {
      throw Exception('Failed to update todo: $e');
    }
  }

  // Delete a Todo
  Future<void> deleteTodo(String id) async {
    try {
      final response = await http.delete(
        Uri.parse('$baseUrl/todos/$id'),
      );

      if (response.statusCode == 204 ||
          response.statusCode == 200 ||
          response.statusCode == 201 ||
          response.statusCode == 202 ||
          response.statusCode == 203) {
        // 204 No Content means success, do nothing
        return;
      } else {
        // If the status code isn't 204, attempt to parse the response body
        final responseBody = json.decode(response.body);
        final errorMessage = responseBody['message'] ?? 'Failed to delete todo';
        // throw Exception('Error ${response.statusCode}: $errorMessage');
      }
    } catch (e) {
      // If anything goes wrong (network issues, parsing errors, etc.), handle it
      throw Exception('Failed to delete todo: $e');
    }
  }
}
