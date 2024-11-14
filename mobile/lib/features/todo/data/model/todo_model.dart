class Todo {
  final String id;
  final String title;
  final String description;
  final DateTime created_at;
  final bool completed;

  Todo({
    required this.id,
    required this.title,
    required this.description,
    required this.created_at,
    required this.completed,
  });

  Map<String, dynamic> toJson() => {
        'id': id,
        'title': title,
        'description': description,
        'created_at': created_at
            .toIso8601String(), // Convert Created_atTime to string for API
        'completed': completed,
      };

  factory Todo.fromJson(Map<String, dynamic> json) {
    return Todo(
      id: json['id'] is int ? json['id'].toString() : json['id'].toString(),
      title: json['title'],
      description: json['description'],
      created_at:
          DateTime.parse(json['created_at']), // Parse date string to DateTime
      completed: json['completed'] == 1 ||
          json['completed'] == true, // Convert to boolean
    );
  }
}
