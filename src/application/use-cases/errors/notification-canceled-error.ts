export class NotificationCanceledError extends Error {
  constructor() {
    super(
      'Cannot execute the requested action, because the notification is canceled.',
    );
  }
}
