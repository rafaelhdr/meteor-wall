import { resetDatabase } from 'meteor/xolvio:cleaner';
import { assert } from 'meteor/practicalmeteor:chai';
import { MockUsers } from './accounts.test.js';

import { Messages } from './messages.js'


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
      Meteor.call('message.insert', 'This message is allowed!');
      assert.equal(1, Messages.find().count());
    });

    it('Visitor can\'t send a message', () => {
      assert.throws(() => {
        Meteor.call('message.insert', 'This message is not allowed!');
      }, Meteor.Error, '[not-authorized]');
      assert.equal(0, Messages.find().count());
    });
  });
}
