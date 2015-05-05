PrinterCollection = new Mongo.Collection('printers');
//collection that holds printers' information (name, imagr URL, status, time stamp, reason for current status)
ReasonCollection = new Mongo.Collection('reasons');

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
  Session.setDefault('showForm', false);

  /**************************** printerStatus ****************************/
  Template.printerStatus.helpers({
    'printer': function(){
      //console.log(PrinterCollection.find().fetch().name);
      //console.log('in printer function helper');
      return PrinterCollection.find({})
    },

   'showPrinterStatus': function() { 
      //var selectedPrinter = Session.get('selectedPrinter'); 
      //var printerStatus = PrinterCollection.findOne(selectedPrinter).status;
      if (this.status==1) {
        return 'printer working';
      } else { //printer status is 0
        return 'printer died';
      }
        //return PrinterCollection.findOne(selectedPrinter); //returns the object
      }, 

    'showPrinterTime': function() {
      console.log('in showPrinterTime' + this);
      return this.timeStamp
      //var selectedPrinter = Session.get('selectedPrinter'); 
      //return timeStamp = PrinterCollection.findOne(selectedPrinter).timeStamp;
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
    
    'click .printer': function() {
      var isFormShowing = Session.get('showForm');
      console.log(isFormShowing);

      if (!isFormShowing) {
        Session.set('showForm', true); //show the form
      }
    } //end events
  }); //end printerStatus

  /**************************** body ****************************/
  Template.body.helpers({
    'isFormDisplayed': function(){
        return Session.get('showForm')
    }
  }); //end helpers

/**************************** form ****************************/
  Template.form.helpers({
    'printerNotWorking': function(){
      console.log('in printerNotWorking')
      var a = Session.get('printerNotWorking');
      return a
    },

    'reason': function() {
      return ReasonCollection.find({});  
    },

    'selectedClass': function() {
      var reasonId = this._id;
      var selectedReason = Session.get('selectedReason');
      if(reasonId==selectedReason) 
        return "highlight"; //this refers to a CSS class
    }
  }); //end helpers

  Template.form.events({
    'click .location': function(){
      var newLocation = this.value;
      return Session.set('selectedPrinter', newLocation)
    },

    'click #printerForm': function(event){
          //console.log('in printerForm', event.target.value);
          if (event.target.value == 'not-working') { //value of radio
            Session.set('printerNotWorking', true);
          } else {
            Session.set('printerNotWorking', false);
          }
    }, //end printerForm

      'reason .click': function() {
            var reasonId = this._id;
            Session.set('selectedReason', reasonId);
            var selectedReason = Session.get('selectedReason');
      }
  }); //end events


  /**************************** reasons ****************************/
  Template.reasons.helpers({
    'reason': function(){
      console.log('in reasons helper function' + this);
      return ReasonCollection.find({})
    }
  }); //end helpers

  Template.reasons.events({
  
  }); //end events
} //end client

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (ReasonCollection.find({}).count() == 0){ //if empty, add options
      var allReasons = ['Out of paper', 'Out of ink', 'Paper jam', 'Other: ', 'I don\'t know' ];
      for (var i = 0; i < allReasons.length; i++){ //adding to collection
        ReasonCollection.insert({name: allReasons[i]});
      }
    }
  });
  //Meteor.publish
  //Meteor.methods
} //end server
//KEEP AUTOPUBLISH ON FOR THIS CLASS