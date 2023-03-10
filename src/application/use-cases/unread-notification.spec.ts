import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';
import { NotificationNotFoundError as NotificationNotFound } from './errors/notification-not-found-error';
import { UnreadNotification } from './unread-notification';

describe('Unread notification', () => {
  it('should be able to unread a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const unreadNotification = new UnreadNotification(notificationRepository);

    const notification = makeNotification({ readAt: new Date() });

    await notificationRepository.create(notification);

    await unreadNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].readAt).toEqual(null);
  });

  it('should not be able to unread a non existing notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const unread = new UnreadNotification(notificationRepository);

    expect(() => {
      return unread.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
