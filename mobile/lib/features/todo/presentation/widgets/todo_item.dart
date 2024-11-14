import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:mobile/features/todo/data/model/todo_model.dart';

class TodoItem extends StatelessWidget {
  final Todo todo;
  final VoidCallback onToggleCompletion;
  final VoidCallback onEdit;
  final VoidCallback onDelete;

  const TodoItem({
    super.key,
    required this.todo,
    required this.onToggleCompletion,
    required this.onEdit,
    required this.onDelete,
  });

  @override
  Widget build(BuildContext context) {
    final DateFormat dateFormat = DateFormat('MMM dd, yy hh:mm a');
    final formattedDate = dateFormat.format(todo.created_at);

    return Card(
      elevation: 5,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10),
      ),
      margin: const EdgeInsets.all(8),
      child: Stack(
        children: [
          Padding(
            padding: const EdgeInsets.all(10.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  todo.title,
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: Colors.black87,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  todo.description,
                  maxLines: 3,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(fontSize: 14, color: Colors.black54),
                ),
                const Spacer(),
                Row(
                  mainAxisAlignment: MainAxisAlignment.start,
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    SizedBox(
                      width: 70,
                      child: Text(
                        formattedDate,
                        maxLines: 2,

                        overflow: TextOverflow
                            .ellipsis, // Truncate if the text exceeds 2 lines
                        style: const TextStyle(
                          fontSize: 10,
                          color: Colors.grey,
                        ),
                      ),
                    ),
                    const Spacer(),
                    SizedBox(
                      width: 30,
                      child: IconButton(
                        icon: const Icon(Icons.edit,
                            color: Colors.blue, size: 18),
                        onPressed: onEdit,
                      ),
                    ),
                    SizedBox(
                      width: 30,
                      child: IconButton(
                        icon: const Icon(Icons.delete, color: Colors.red),
                        onPressed: onDelete,
                      ),
                    )
                  ],
                ),
              ],
            ),
          ),
          Positioned(
            top: 0,
            right: -8,
            child: IconButton(
              onPressed: onToggleCompletion,
              icon: todo.completed
                  ? const Icon(Icons.check_circle_outlined, color: Colors.green)
                  : const Icon(Icons.circle_outlined, color: Colors.grey),
            ),
          ),
        ],
      ),
    );
  }
}
