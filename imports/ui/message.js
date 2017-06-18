import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session'

import { Messages } from '../api/messages.js';
import './message.html'


Template.messageInsert.onCreated(function bodyOnCreated() {
  Session.set('alertMessageSent', false);
  Meteor.subscribe('messages');
});

Template.messageInsert.helpers({
  alertMessageSent() {
    Session.setDefault('alertMessageSent', false);
    return Session.get('alertMessageSent');
  },
});

Template.messageInsert.events({
  'submit form.messageInsert'(event) {
    event.preventDefault();

    var target = event.target;
    var message = target.message.value;

    Meteor.call('messages.insert', message);

    target.message.value = '';

    Session.set('alertMessageSent', true);
    Meteor.setInterval(function() {
      Session.set('alertMessageSent', false);
    }, 5000);
  },
});

Template.messages.helpers({
  messages() {
    return Messages.find({}, { sort: { createdAt: -1 } });
  },
})

Template.message.helpers({
  formatDate(date) {
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();

    var seconds = date.getSeconds();
    var minutes = date.getMinutes();
    var hours = date.getHours();

    return day + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds;
  },
  isOwner() {
    return this.owner === Meteor.userId();
  },
})

Template.message.events({
  'click .delete'() {
    Meteor.call('messages.remove', this._id);
  },
})
