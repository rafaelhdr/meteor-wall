import { resetDatabase } from 'meteor/xolvio:cleaner';
import { assert } from 'meteor/practicalmeteor:chai';
import { MockUsers } from './accounts.test.js';

import { Messages } from './messages.js'
import '../../server/api/messages.js'


if (Meteor.isServer) {
  describe('Message', function () {

    beforeEach(function () {
      resetDatabase();
    });

    afterEach(function () {
      MockUsers.reset();
    });

    it('Registered user can send a message', function() {
      MockUsers.insertUser();
      MockUsers.loginUser();
      Meteor.call('messages.insert', 'This message is allowed!');
      assert.equal(1, Messages.find().count());
    });

    it('Visitor can\'t send a message', () => {
      assert.throws(() => {
        Meteor.call('messages.insert', 'This message is not allowed!');
      }, Meteor.Error, '[not-authorized]');
      assert.equal(0, Messages.find().count());
    });

    it('Registered user can remove own message', function() {
      MockUsers.insertUser();
      MockUsers.loginUser();
      Meteor.call('messages.insert', 'This message is allowed!');

      var messageId = Messages.find().fetch()[0]._id;
      Meteor.call('messages.remove', messageId);
    });

    it('Registered user can\'t remove another person message', () => {
      MockUsers.insertUser();
      MockUsers.loginUser();
      Meteor.call('messages.insert', 'This message is allowed!');
      var messageId = Messages.find().fetch()[0]._id;

      MockUsers.reset();
      MockUsers.loginDifferentUser(true);

      assert.throws(() => {
        Meteor.call('messages.remove', messageId);
      }, Meteor.Error, '[not-authorized]');
    });
  });
}
