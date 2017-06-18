// This module works only as mock
// So, test modules can abstract the user interaction

import { Meteor } from 'meteor/meteor'
import { Random } from 'meteor/random';
import { Accounts } from 'meteor/accounts-base';

const mockUserId = Random.id();
const mockUserPassword = Random.id();

MockUsersClass = function() {
  const defaultUserId = Meteor.userId;
  this.mockUserId = mockUserId;

  this.insertUser = () => {
    Accounts.createUser({
      username: mockUserId,
      password: mockUserPassword,
    });
  }

  this.loginUser = () => {
    Meteor.userId = () => {
      return this.mockUserId;
    }
  }

  this.reset = () => {
    Meteor.userId = defaultUserId;
  }

  return this;
}

export const MockUsers = new MockUsersClass();
