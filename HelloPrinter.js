PrinterCollection = new Mongo.Collection('printers');
//collection that holds printers' information (name, imagr URL, status, time stamp, reason for current status)

if (Meteor.isClient) {
  Template.printerStatus.helpers({

  });

  Template.printerStatus.events({
    'printer': function(){
      //return PrinterCollection.find({createdBy: currentUserID}, {sort: {score: -1, name: 1}})
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

//KEEP AUTOPUBLISH ON FOR THIS CLASS