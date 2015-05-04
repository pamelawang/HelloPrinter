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
  Session.setDefault('showForm', false);

  /**************************** printerStatus ****************************/
  Template.printerStatus.helpers({
      'printer': function(){
        //console.log(PrinterCollection.find().fetch().name);
        //console.log('in printer function helper');
        return PrinterCollection.find({})
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
      var isFormShowing = Session.get('showForm');
      console.log(isFormShowing);

      if (isFormShowing) { //if the form isn't displayed
        console.log('in if statement of click.[rinter');
      } else {
        console.log('ELSE click.printer');
        Session.set('showForm', true); //show the form
      }
    } //end events
  }); //end printerStatus

  /**************************** body ****************************/
  Template.body.helpers({

    'isFormDisplayed': function(){
        var a = Session.get('showForm');
        console.log('session currntly is ' + a);
        return a
    },

    'printerNotWorking': function(){
      //console.log('in printerNotWorking')
      return Session.get('printerNotWorking')
    }
  }); //end helpers

  Template.body.events({
    'click .location': function(){
      var newLocation = this.value;
      return Session.set('selectedPrinter', newLocation)
    },

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