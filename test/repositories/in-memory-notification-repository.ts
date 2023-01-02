import { Notification } from '@application/entities/notification';
import { NotificationRepository } from '@application/repositories/notification-repository';

export class InMemoryNotificationRepository implements NotificationRepository {
  public notifications: Notification[] = [];

  async findById(notificationId: string): Promise<Notification> {
    const notificationSearched = this.notifications.find(
      (entity) => entity.id === notificationId,
    );

    if (!notificationSearched) {
      return null;
    }

    return notificationSearched;
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (entity) => entity.id === notification.id,
    );

    if (notificationIndex >= 0) {
      this.notifications[notificationIndex] = notification;
    }
  }

  async create(notification: Notification) {
    this.notifications.push(notification);
  }

  async countByRecipientId(recipientId: string): Promise<number> {
    return this.notifications.filter(
      (entity) => entity.recipientId === recipientId,
    ).length;
  }

  async findByRecipientId(recipientId: string): Promise<Notification[]> {
    return this.notifications.filter(
      (entity) => entity.recipientId === recipientId,
    );
  }
}
