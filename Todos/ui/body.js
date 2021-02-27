import { Template } from "meteor/templating";
import { Tasks } from "../api/task.js";
import { ReactiveDict } from "meteor/reactive-dict";
import { Meteor } from "meteor/meteor";
import "./body.html";
// import "./router.js"
Template.body.helpers({
  tasks() {
    const instance = Template.instance();
    if (instance.state.get("hideCompleted")) {
      return Tasks.find(
        { checked: { $ne: true } },
        { sort: { createdAt: -1 } }
      );
    }
    return Tasks.find({}, { sort: { createdAt: -1 } });
  },
  incompleteCount() {
    return Tasks.find({ checked: { $ne: true } }).count();
  },
  completedCount() {
    return Tasks.find({ checked: { $ne: false } }).count();
  },
});
Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
Tracker.autorun(()=>{
Meteor.subscribe("tasks");  
})
});
Template.task.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});
Template.body.events({
  "submit.new-task"(e) {
    e.preventDefault();
    const target = e.target;
    const text = target.text.value;
    Meteor.call("tasks.insert", text);
    console.log(Meteor.userId())
    console.log(Meteor.users.findOne(Meteor.userId()).username)
    target.text.value = "";
console.log(text);
  },
  "click .toggle-checked"() {
    if (this.owner === Meteor.userId()) {
      Meteor.call("tasks.checked", this._id, !this.checked);
      
    }
  },
  "click .delete"() {
    if (this.owner === Meteor.userId()) {
      return Meteor.call("tasks.delete", this._id);
    console.log(text)
    }
  },
  "click .toggle-private"() {
    Meteor.call("tasks.private", this._id, !this.private);
  },
  "change .hide-completed input"(event, instance) {
    instance.state.set("hideCompleted", event.target.checked);
  },
});
