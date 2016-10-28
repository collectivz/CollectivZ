import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { _ } from 'meteor/underscore';

import { Channels } from '../channels/collection';

class TaskCollection extends Mongo.Collection {
  insert(task, callback) {
    task.createdAt = Date.now();
    task.isDone = false;
    task.author = Meteor.userId();

    Channels.update(task.channelId, {
      $inc: { incompleteTasks: 1 }
    });

    super.insert(task, callback);
  }

  update(selector, modifier) {
    if (modifier.$set && _.has(modifier.$set, 'isDone')) {
      const tasks = this.find(selector).fetch();

      tasks.forEach(task => {
        if (task.isDone) {
          Channels.update(task.channelId, {
            $inc: { completeTasks: -1, incompleteTasks: 1 }
          });
        } else if (!task.isDone) {
          Channels.update(task.channelId, {
            $inc: { completeTasks: 1, incompleteTasks: -1 }
          });
        }
      });
    }
    return super.update(selector, modifier);
  }

  remove(selector) {
    const tasks = this.find(selector).fetch();

    tasks.forEach(task => {
      if (task.isDone) {
        Channels.update(task.channelId, {
          $inc: { completeTasks: -1 }
        });
      } else if (!task.isDone) {
        Channels.update(task.channelId, {
          $inc: { incompleteTasks: -1 }
        });
      }
    });

    return super.remove(selector);
  }

  isEditableBy(userId, taskId) {
    const task = this.findOne(taskId);
    const channel = Channels.findOne(task.channelId);
    const user = Meteor.user();

    return (task.author === user._id || user.isAdmin || channel.author === this.userId);
  }
}

export const Tasks = new TaskCollection('tasks');

if (Meteor.isClient) {
  window.Tasks = Tasks;
}
