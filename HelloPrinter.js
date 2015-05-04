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
    3. mouseover pritner: "Update Me"
*/

if (Meteor.isClient) {
  Session.setDefault('printerNotWorking', false); //default is that the update form doesn't show

  /**************************** printerStatus ****************************/
  Template.printerStatus.helpers({

      // 'currentStatus': function() { //trying to do something like numPLayers in leaderboard, where this returns a value and not the whole object
      //   return showSelectedPrinter.status
      // },

      'printer': function(){
        //console.log(PrinterCollection.find().fetch().name);
        //console.log('in printer function helper');
        return PrinterCollection.find({})
      },

      'selectedClass': function(){
            var printerId = this._id;
            var selectedPrinter = Session.get('selectedPrinter');
            if(printerId == selectedPrinter){
              console.log('in if statemete of selectedClass');
                console.log(printerId);
                return printerId; 
            }
      },

      'showSelectedPrinter': function() { //CURRENTLY IS UNDEFINED/NOT WORKING, CURRENT STRATEGY IS TO DEFINE CLICK FUNCTION TO GET THE INFO FOR THIS
        var selectedPrinter = Session.get('selectedPrinter'); 
        return PrinterCollection.findOne(selectedPrinter) //returns the object
      }, 

      //PAM: make this an event
      'updateStatus': function() { //?????WORKING on this
        console.log('in updateStatus');
        // var newStatus = document.getElementById(''); //id of the form submission
        // var newReason = document.getElementById('');
        var thisPrinter = this;
        //var newTime = new Date();
      }
      
  }); //end helpers

  Template.printerStatus.events({
    //1) click on printer (already below)
    //2) submit form
    //3) mouseover printer

    'submit form': function() {
      var printerId = this._id;
      //Session.set('updateFormFlag', false); //resetting so the form disappears
    },
    
    'click .printer': function() { //CURRENTLY TESTING IF WE CAN GET THE NAME, LATER WILL TRY TO GET ID

      alert('hi');

      var currentPrinter = this;
      currentPrinter.updateStatus();
    } //end events
  }); //end printerStatus

  /**************************** body ****************************/
  Template.body.helpers({
    'printerNotWorking': function(){
      console.log('in printerNotWorking')
      return Session.get('printerNotWorking')
    }
  }); //end helpers

  Template.body.events({
    'click #printerForm': function(event){
      console.log('in printerForm', event.target.value);
      if (event.target.value == 'not-working') {
        Session.set('printerNotWorking', true);
      } else {
        Session.set('printerNotWorking', false);
      }
    }
  }); //end events
} //end body

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
  //Meteor.publish
  //Meteor.methods
    
    
} //end server


//KEEP AUTOPUBLISH ON FOR THIS CLASS