import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Messages = new Mongo.Collection('messages');

if (Meteor.isServer) {
  Meteor.publish('messages', function messages() {
    return Messages.find();
  });
}

Meteor.methods({
  'message.insert'(message) {
    check(message, String);

    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Messages.insert({
      owner: Meteor.userId(),
      message: message,
      createdAt: new Date(),
    });
  }
})
