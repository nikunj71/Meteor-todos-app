import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";
import { Meteor } from "meteor/meteor";
import { ValidatedMethod } from 'meteor/mdg:validated-method';
export const Tasks = new Mongo.Collection("tasks");
if (Meteor.isServer) {
  Meteor.publish("tasks",function  tasksPubliction(){
    return Tasks.find(
      { $or: [{ private: { $ne: true } }, { owner: this.userId }] },
      { sort: { createdAt: -1 } }
    );
  });
}

Meteor.methods({
  "tasks.insert"(text) {
    check(text, String);
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }
    Tasks.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
   
  },
  "tasks.delete"(taskId) {
    check(taskId, String);
    Tasks.remove(taskId);
  },
  "tasks.checked"(taskId, setchecked) {
    check(taskId, String);
    check(setchecked, Boolean);
    Tasks.update(taskId, { $set: { checked: setchecked } });
  },
  "tasks.private"(taskId, settoprivate) {
    check(taskId, String);
    check(settoprivate, Boolean);
    Tasks.update(taskId, { $set: { private: settoprivate } });
  },
});
