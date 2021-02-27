import{Meteor} from "meteor/meteor"
import { Accounts } from 'meteor/accounts-base';

if(Meteor.isServer){
    Meteor.startup(function(){
        process.env.MAIL_URL="smtp://sandbox5cdaacaee012408cb07f5c99df749478.mailgun.org:6e0fd3a4-d0a4457c@smtp.mailgun.org:587";
        Accounts.config({
            sendVerificationEmail:true
        })
    })
}