import { Content } from '@application/entities/content';
import {
  Notification,
  NotificationProps,
} from '@application/entities/notification';

type NotificationOverrideProps = Partial<NotificationProps>;

export function makeNotification(override: NotificationOverrideProps = {}) {
  return new Notification({
    category: 'social',
    content: new Content('Nova solicitação de amizade!'),
    recipientId: 'recipient-1',
    ...override,
  });
}
