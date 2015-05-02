PrinterCollection = new Mongo.Collection('printers');
//collection that holds printers' information (name, imagr URL, status, time stamp, reason for current status)

if (Meteor.isClient) {
  Template.printerStatus.helpers({
      'printer': function(){
            
        },
      
  }); //end helpers

  Template.printerStatus.events({
    
  }); //end events
    
} //end client

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
} //end server


//KEEP AUTOPUBLISH ON FOR THIS CLASS