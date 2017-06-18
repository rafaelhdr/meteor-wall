import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session'

import './message.html'

Template.body.onCreated(function bodyOnCreated() {
  Session.set('alertMessageSent', false);
});

Template.messageInsert.helpers({
  alertMessageSent() {
    Session.setDefault('alertMessageSent', false);
    return Session.get('alertMessageSent');
  }
});

Template.messageInsert.events({
  'submit form.messageInsert'(event) {
    event.preventDefault();

    var target = event.target;
    var message = target.message.value;

    Meteor.call('message.insert', message);

    target.message.value = '';

    Session.set('alertMessageSent', true);
    Meteor.setInterval(function() {
      Session.set('alertMessageSent', false);
    }, 5000);
  },
});
