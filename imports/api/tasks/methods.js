import { Meteor } from 'meteor/meteor';

import { Channels } from '../channels/collection';
import { Tasks } from './tasks';

Meteor.methods({

  'tasks.create': function (task, channelId) {
    check(task, String);
    check(channelId, String);
    const channel = Channels.findOne(channelId);
    if (this.userId && channel && channel.type === 'channel') {
      const newTask = {
        task,
        channelId,
      };

      Tasks.insert(newTask);
    }
  },

  'tasks.toggleStatus': function (taskId) {
    check(taskId, String);
    const task = Tasks.findOne(taskId);
    if (this.userId && task) {
      if (!Tasks.isEditableBy(this.userId, taskId)) {
        throw new Meteor.Error('no-right',
          "Vous n'avez pas les droits pour faire ça.");
      }
      Tasks.update(taskId, {
        $set: { isDone: !task.isDone },
      });
    }
  },

  'tasks.editTask': function (taskId, newTask) {
    check(taskId, String);
    check(newTask, String);
    const task = Tasks.findOne(taskId);
    if (this.userId && task) {
      if (!Tasks.isEditableBy(this.userId, taskId)) {
        throw new Meteor.Error('no-right',
          "Vous n'avez pas les droits pour faire ça.");
      }

      Tasks.update(taskId, {
        $set: { task: newTask },
      });
    }
  },

  'tasks.delete': function (taskId) {
    check(taskId, String);
    const task = Tasks.findOne(taskId);
    if (this.userId && task) {
      if (!Tasks.isEditableBy(this.userId, taskId)) {
        throw new Meteor.Error('no-right',
          "Vous n'avez pas les droits pour faire ça.");
      }

      Tasks.remove(taskId);
    }
  },
});
