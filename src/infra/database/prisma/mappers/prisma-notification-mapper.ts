import { Content } from '@application/entities/content';
import { Notification as DomainNotification } from '@application/entities/notification';
import { Notification as RawNotification } from '@prisma/client';

export class PrismaNotificationMapper {
  static toPrisma(notification: DomainNotification): RawNotification {
    return {
      id: notification.id,
      category: notification.category,
      content: notification.content.value,
      recipientId: notification.recipientId,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
      canceledAt: notification.canceledAt,
    };
  }

  static toDomain(raw: RawNotification): DomainNotification {
    return new DomainNotification(
      {
        category: raw.category,
        content: new Content(raw.content),
        recipientId: raw.recipientId,
        readAt: raw.readAt,
        canceledAt: raw.canceledAt,
        createdAt: raw.createdAt,
      },
      raw.id,
    );
  }
}
