PrinterCollection = new Mongo.Collection('printers');
//collection that holds printers' information (name, imagr URL, status, time stamp, reason for current status)
//Session.setDefault('updateFormFlag', false); //default is that the update form doesn't show

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
  Template.printerStatus.helpers({
      // 'currentStatus': function() { //trying to do something like numPLayers in leaderboard, where this returns a value and not the whole object
      //   return showSelectedPrinter.status
      // },

      'openForm': function(){
        //var node = document.createElement('form')
        //document.getElementById('updateForm'); //????PAM IS HERE - making form in html file to know order
      },

      'printer': function(){

          console.log(PrinterCollection.find().fetch().name);
          console.log('herro');
          return PrinterCollection.find({})
        },
      'showSelectedPrinter': function() { 
        //CURRENTLY IS UNDEFINED/NOT WORKING, CURRENT STRATEGY IS TO DEFINE CLICK FUNCTION TO GET THE INFO FOR THIS
        var selectedPrinter = Session.get('selectedPrinter'); 
        return PrinterCollection.findOne(selectedPrinter); //returns the object
      
//      'currentStatus': function(printer) {
//          var selectedPrinter = Session.get('selectedPrinter'); 
//          return PrinterCollection.findOne(selectedPrinter).status; //returns the object
//      },

        console.log(PrinterCollection.find().fetch().name);
        console.log('herro');
        return PrinterCollection.find({});
      },

      'printerIsOutOfOrder': function(){
        console.log('in helper function out of order');
        var printerOutOfOrder = document.getElementById('out-of-order').checked;
        if (printerOutOfOrder == true) {
          console.log('IT IS OUT OF ORDER');
        }
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
      currentPrinter.updateStatus(); //??????FIXING THIS RIGHT NOW

      //var printerId = this._id;
      //Session.set('selectedPrinter', printerId); //returns unique printer id

      // console.log(this);
      // console.log('above should be the name');
      // var selectedPrinter = Session.get('selectedPrinter');
      // Session.set('selectedPlayer', playerID);
      //NAME ISN'T WORKING var selectedPrinterName = PrinterCollection.findOne(selectedPrinter).name;
      //console.log(selectedPrinterName);

      // var reply = confirm('Are you sure you want to remove ' + selectedPlayerName + '?');
      // if (reply == true) {
      //   PlayersList.remove(selectedPlayer);
      //   alert(selectedPlayerName + ' was removed.');
      // } else {
      //   alert(selectedPlayerName + ' was not removed.');
      // }
    },

    // // OSAJFIJASLFJLAKSDJFLKSAJFLKJSAFKJSLFKJSLF INCORRECT FOR METEOR

    // 'click .otherSelected': function(){
    //   document.getElementById('insertTextfield').innerhtml = '<input type=\'text\' name=\'reason\' value=\'otherDetails\' placeholder=\'Why?\'>';
    // },

    // 'click .selectedStatus': function(){ //shows reason if printer is out-of-order
    //   var reasonArray = ['Out of paper', 'Out of ink', 'Paper jam'];
    //   var reasonArrayIds = ['no-paper', 'no-ink', 'paper-jam'];

    //   if (this.value == 0) { //if the status is :(
    //     for (var i = 0; i < reasonArray.length; i++){
    //       document.getElementById('formReasons').innerhtml = '<input type=\'radio\' name=\'reason\' value=\'' + reasonArrayIds[i] + '>' + reasonArray[i] + '<br>';
    //     }
    //     document.getElementById('formReasons').innerhtml = '<input type=\'radio\' name=\'reason\' value=\'other\' class=\'otherSelected\'>Other<div id=\'insertTextfield\'></div><br>';
    //     document.getElementById('formReasons').innerhtml = '<input type=\'radio\' name=\'reason\' value=\'unknown\'>I don\'t know<br>';
    //   }
    // }
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