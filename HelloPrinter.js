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
      // 'currentStatus': function() { //trying to do something like numPLayers in leaderboard, where this returns a value and not the whole object
      //   return showSelectedPrinter.status
      // },

      'printer': function(){
            console.log(PrinterCollection.find().fetch().name);
            console.log('herro');
            return PrinterCollection.find({})
        },
      
      'updateStatus': function() {
          var newTime = new Date();
          // var newStatus = document.getElementById(''); //id of the form submission
          // var newReason = document.getElementById('');
          
      },

      'showSelectedPrinter': function() { //CURRENTLY IS UNDEFINED/NOT WORKING, CURRENT STRATEGY IS TO DEFINE CLICK FUNCTION TO GET THE INFO FOR THIS
        var selectedPrinter = Session.get('selectedPrinter'); 
        return PrinterCollection.findOne(selectedPrinter) //returns the object
      }
      
  }); //end helpers

  Template.printerStatus.events({
    'submit form': function() {
      var printerId = this._id;
      //Session.set
    },
    
    'click .printer': function() { //CURRENTLY TESTING IF WE CAN GET THE NAME, LATER WILL TRY TO GET ID
            //var playerId = this._id;
            //Session.set('selectedPrinter', printerId); //returns unique printer id
      console.log(this.value);
      var selectedPrinter = Session.get('selectedPrinter');
      //NAME ISN'T WORKING var selectedPrinterName = PrinterCollection.findOne(selectedPrinter).name;
      console.log(selectedPrinterName);
      // var reply = confirm('Are you sure you want to remove ' + selectedPlayerName + '?');
      // if (reply == true) {
      //   PlayersList.remove(selectedPlayer);
      //   alert(selectedPlayerName + ' was removed.');
      // } else {
      //   alert(selectedPlayerName + ' was not removed.');
      // }
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