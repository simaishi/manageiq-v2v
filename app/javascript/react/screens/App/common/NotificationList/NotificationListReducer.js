import Immutable from 'seamless-immutable';
import uuid from 'uuid/v4';

import { V2V_NOTIFICATION_ADD, V2V_NOTIFICATION_REMOVE } from './NotificationConstants';

const initialState = Immutable({
  notifications: []
});

export default (state = initialState, action) => {
  const newNotification = {
    key: uuid(),
    header: action.header,
    message: action.message,
    notificationType: action.notificationType,
    data: action.data,
    persistent: action.persistent,
    timerdelay: action.timerdelay,
    actionEnabled: action.actionEnabled
  };

  switch (action.type) {
    case V2V_NOTIFICATION_ADD:
      return state.set('notifications', [...Immutable.asMutable(state.notifications), newNotification]);
    case V2V_NOTIFICATION_REMOVE:
      return state.set(
        'notifications',
        Immutable.asMutable(state.notifications).filter(
          notification => action.key.notification.key !== notification.key
        )
      );
    default:
      return state;
  }
};
