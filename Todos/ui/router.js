import {BlazeLayout} from "meteor/kadira:blaze-layout"
FlowRouter.route("/list",{
    name:"list",
    action(){
        BlazeLayout.render("task")
    }
})