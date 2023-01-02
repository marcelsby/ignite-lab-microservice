import { Notification } from '@application/entities/notification';
import { NotificationRepository } from '@application/repositories/notification-repository';
import { Injectable } from '@nestjs/common';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
  constructor(private prisma: PrismaService) {}

  async findById(notificationId: string): Promise<Notification> {
    const searchedNotification = await this.prisma.notification.findUnique({
      where: {
        id: notificationId,
      },
    });

    if (!searchedNotification) {
      return null;
    }

    return PrismaNotificationMapper.toDomain(searchedNotification);
  }

  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.prisma.notification.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });
  }

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.prisma.notification.create({
      data: raw,
    });
  }

  async countByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prisma.notification.count({
      where: {
        recipientId: recipientId,
      },
    });

    return count;
  }

  async findByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany({
      where: {
        recipientId: recipientId,
      },
    });

    return notifications.map(PrismaNotificationMapper.toDomain);
  }
}
