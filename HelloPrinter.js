PrinterCollection = new Mongo.Collection('printers');
//collection that holds printers' information (name, imagr URL, status, time stamp, reason for current status)


/*only things client can change:
    1. date. 
    2. reason.
    3. status.
*/

/* each printer has the following properties:
    1. name 
    2. timeStamp (as of last update)
    3. reason for malfunction
*/

/* to do later:
    1. color/bw
    2. automatic emailing function
*/

if (Meteor.isClient) {
  Template.printerStatus.helpers({
      'printer': function(){
            console.log(PrinterCollection.find().fetch().name);
            return PrinterCollection.find({});
        },
      
      'updateStatus': function() {
          var newTime = new Date();
          
          
      },
      'showSelectedPrinter': function() {
        var selectedPrinter = Session.get('selectedPrinter'); 
        return PrinterCollection.findOne(selectedPrinter);
      }
      
  }); //end helpers

  Template.printerStatus.events({
    'submit form': function() {
        var printerId = this._id;
        Session.set
    },
      'click .printer': function() {
            var playerId = this._id;
            Session.set('selectedPrinter', printerId); //returns unique printer id
            
        }
  }); //end events
    
} //end client

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
  //Meteor.publish
  //Meteor.methods
    
    
} //end server


//KEEP AUTOPUBLISH ON FOR THIS CLASS