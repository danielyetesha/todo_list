import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:mobile/features/todo/data/model/todo_model.dart';
import 'package:mobile/features/todo/data/data_sources/todo_data_source.dart';

class AddNewTodo extends StatefulWidget {
  final Todo? todo;

  const AddNewTodo({super.key, this.todo});

  @override
  State<AddNewTodo> createState() => _AddNewTodoState();
}

class _AddNewTodoState extends State<AddNewTodo> {
  final TextEditingController _titleController = TextEditingController();
  final TextEditingController _descriptionController = TextEditingController();
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  late DateTime _selectedDate;

  // Initialize the form values
  @override
  void initState() {
    super.initState();

    if (widget.todo != null) {
      _titleController.text = widget.todo!.title;
      _descriptionController.text = widget.todo!.description;
      _selectedDate = widget.todo!.created_at;
    } else {
      _selectedDate = DateTime.now(); // Default to current date for new todo
    }
  }

  // Save or update the todo
  void _saveTodo() async {
    if (_formKey.currentState!.validate()) {
      final newTodo = Todo(
        id: widget.todo?.id ?? DateTime.now().millisecondsSinceEpoch.toString(),
        title: _titleController.text,
        description: _descriptionController.text,
        created_at: DateTime.now(),
        completed: false, // Default to false
      );

      try {
        // Call the API service to add the new todo
        if (widget.todo == null) {
          // Add the new todo if this is not an edit
          await ApiService().addTodo(newTodo);
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Todo added successfully!')),
          );
        } else {
          // Update the existing todo
          await ApiService().updateTodo(newTodo);
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Todo updated successfully!')),
          );
        }

        // Clear the form
        _titleController.clear();
        _descriptionController.clear();

        // Navigate back to the previous page
        Navigator.pop(context);
      } catch (e) {
        // Show error message
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text("Failed to save todo: $e")),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.todo == null ? 'Add New Todo' : 'Edit Todo'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Title input
                TextFormField(
                  controller: _titleController,
                  decoration: InputDecoration(
                    labelText: 'Title',
                    labelStyle:
                        const TextStyle(fontSize: 18, color: Colors.blue),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12.0),
                    ),
                    contentPadding: const EdgeInsets.symmetric(
                      horizontal: 16.0,
                      vertical: 12.0,
                    ),
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter a title';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 16),

                // Description input
                TextFormField(
                  controller: _descriptionController,
                  maxLines: 5,
                  decoration: InputDecoration(
                    labelText: 'Description',
                    labelStyle:
                        const TextStyle(fontSize: 18, color: Colors.blue),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12.0),
                    ),
                    contentPadding: const EdgeInsets.symmetric(
                      horizontal: 16.0,
                      vertical: 12.0,
                    ),
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter a description';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 16),

                // Save button
                ElevatedButton(
                  onPressed: _saveTodo,
                  style: ElevatedButton.styleFrom(
                    minimumSize:
                        const Size.fromHeight(50), // Make button full-width
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12.0),
                    ),
                  ),
                  child: Text(
                    widget.todo == null ? 'Save Todo' : 'Update Todo',
                    style: const TextStyle(fontSize: 16),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
