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
  Session.set('selectedPrinter');

  /**************************** printerStatus ****************************/
  Template.printerStatus.helpers({

      'printer': function(){
        //console.log(PrinterCollection.find().fetch().name);
        //console.log('in printer function helper');
        return PrinterCollection.find({})
      },

   'showSelectedPrinter': function() { 
       var selectedPrinter = Session.get('selectedPrinter'); 
       var printerStatus = PrinterCollection.findOne(selectedPrinter).status;
       if (printerStatus==1) {
           return 'printer is now working!';
       } else { //printer status is 0
           return 'printer is not working :(';
       }
        //return PrinterCollection.findOne(selectedPrinter); //returns the object
      }, 

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
    },
    
    'click .printer': function() { //CURRENTLY TESTING IF WE CAN GET THE NAME, LATER WILL TRY TO GET ID
        var printerId = this._id;
        Session.set('selectedPrinter', printerId);
        var selectedPrinter = Session.get('selectedPrinter');

    } //end events
  }); //end printerStatus

  /**************************** body ****************************/
  Template.form.helpers({
    'printerNotWorking': function(){
      //console.log('in printerNotWorking')
      return Session.get('printerNotWorking')
    },

    'selectedReason': function(){

    }
  }); //end helpers

  Template.form.events({


    'click #printerForm': function(event){
      //console.log('in printerForm', event.target.value);
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