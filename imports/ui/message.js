import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import './message.html'

Template.messageInsert.events({
  'submit form.messageInsert'(event) {
    event.preventDefault();

    var target = event.target;
    var message = target.message.value;

    Meteor.call('message.insert', message);

    target.message.value = '';

    alert('Message was sent!');
  },
});
