import 'package:flutter/material.dart';
import 'package:toastification/toastification.dart';

ToastificationItem showToast(
    {required String title, required String message, required bool isError}) {
  return toastification.show(
    type: ToastificationType.success,
    style: ToastificationStyle.flat,
    autoCloseDuration: Duration(seconds: isError ? 3 : 2),
    title: Text(title),
    description: Text(message),
    alignment: Alignment.topRight,
    animationDuration: const Duration(milliseconds: 300),
    animationBuilder: (context, animation, alignment, child) {
      return FadeTransition(
        opacity: animation,
        child: child,
      );
    },
    icon: isError
        ? const Icon(Icons.error_outline)
        : const Icon(Icons.check_circle_outline),
    showIcon: true, // show or hide the icon
    primaryColor: Colors.green,
    backgroundColor: Colors.white,
    foregroundColor: Colors.black,
    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 16),
    margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
    borderRadius: BorderRadius.circular(12),
    boxShadow: const [
      BoxShadow(
        color: Color(0x07000000),
        blurRadius: 16,
        offset: Offset(0, 16),
        spreadRadius: 0,
      )
    ],
    showProgressBar: true,
    closeButtonShowType: CloseButtonShowType.onHover,
    closeOnClick: false,
    dragToClose: true,
    applyBlurEffect: true,
  );
}
