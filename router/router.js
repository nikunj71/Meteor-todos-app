import { FlowRouter  } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

FlowRouter.route('/', {
  action() {
    BlazeLayout.render('visitorLayout', {
      header : "header",
      footer : "footer",
      main   : "index"
    })
  }
});

FlowRouter.route('/admin', {
  action() {
    BlazeLayout.render('adminLayout', {
      main   : "admin"
    })
  }
});