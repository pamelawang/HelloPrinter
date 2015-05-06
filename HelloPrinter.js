PrinterCollection = new Mongo.Collection('printers');
//collection that holds printers' information (name, imagr URL, status, time stamp, reason for current status)
ReasonCollection = new Mongo.Collection('reasons');
EmailList = new Mongo.Collection('emails'); //emailing collection corresponding to specific location

/*only things client can change:
    1. date. 
    2. reason.
    3. status.
*/

/* each printer has the following properties:
    1. name 
    2. lastUpdated (as of last update)
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
      return PrinterCollection.find({})
    },

   'showPrinterStatus': function() {
       if (this.status==1) return 'printer working';
       else return 'printer died'; //printer status is 0
      }, 

    'showPrinterTime': function() {
      return this.lastUpdated;
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
        console.log('in submit 1');
        $('.printForm').hide();
        console.log('in submit 2');
        Session.set('showForm', false);
    },
    
    'click .printer': function() {
      var isFormShowing = Session.get('showForm');
      console.log(isFormShowing);
      if (!isFormShowing) {
        Session.set('showForm', true); //show the form
      }
    } 
      
  }); //end events

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

    
  }); //end helpers

  Template.form.events({

    'click #printerQs': function(event){
          //console.log('in printerForm', event.target.value);
          if (event.target.value == 'not-working') { //value of radio
            Session.set('printerNotWorking', true);
          } else {
            Session.set('printerNotWorking', false); //printer works.
            }    
    }, //end printerForm
    'click #in-order': function() {
        $('#in-order').attr('checked', 'checked');
    },
    'click #out-of-order': function() {
        $('#out-of-order').attr('checked', 'checked'); 
    },
      
      
  }); //end events


  /**************************** reasons ****************************/
  Template.reasons.helpers({
    'reason': function(){
      console.log('in reasons helper function');
      return ReasonCollection.find({})
    },
    'selectedClass': function() {
      var reasonId = this._id;
      var selectedReason = Session.get('selectedReason');
      if(reasonId==selectedReason) 
          //console.log('in selectedClass');
        return "highlight"; //this refers to a CSS class
    },
    'showSelectedReason': function() {
        var selectedReason = Session.get('selectedReason'); //unique id
        return ReasonCollection.findOne(selectedReason); //findOne finds the one with unique id
    }
  }); //end helpers

  Template.reasons.events({
    'reason .click': function() {
        console.log('reason clicked');
        var reasonId = this._id;
        Session.set('selectedReason', reasonId);
        var selectedReason = Session.get('selectedReason');
        
    }
  }); //end events
    
    
} //end client ---------------------------------








if (Meteor.isServer) {
  Meteor.startup(function () {
    if (ReasonCollection.find({}).count() == 0){ //if empty, add options
      var allReasons = ['Out of paper', 'Out of ink', 'Paper jam', 'Other: ', 'I don\'t know' ];
      for (var i = 0; i < allReasons.length; i++){ //adding to collection
        ReasonCollection.insert({name: allReasons[i]});
      }
    }

    if(PrinterCollection.find({}).count()==0) {
      var printerNames = ['art', 'clapp', 'science', 'music', 'lulu'];
      var printerBuilding = ['art', 'clapp', 'science', 'music', 'lulu']; //for now is the same, later will be different
      var printingType = ['color', 'b&w', 'color', 'b&w', 'b&w']; //type of printing
      var printerFloor = ['1st', '2nd', '3rd', '4th', '5th']; //floor locations
      for(var i=  0; i < printerNames.length; i++) {
          PrinterCollection.insert({name: printerNames[i], status: 0, lastUpdated: new Date(), type: printingType[i], building: printerBuilding[i], floor: printerFloor[i]});
      }
    }
  });
    
  //Meteor.publish
  //Meteor.methods
} //end server
//KEEP AUTOPUBLISH ON FOR THIS CLASS