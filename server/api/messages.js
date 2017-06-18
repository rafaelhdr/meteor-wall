import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Messages } from '../../imports/api/messages.js';

Meteor.methods({
  'messages.remove'(messageId) {
    check(messageId, String);

    var message = Messages.findOne(messageId);
    if ((!Meteor.userId()) || message.owner != Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Messages.remove(messageId);
  }
})
