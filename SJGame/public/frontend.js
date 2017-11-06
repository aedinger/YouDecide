var socket = io.connect();
var portraits = ["guy 1","guy 2","guy 3", "guy 4"]
var randsguy = Math.floor(Math.random()*portraits.length)
var statement1 = ["Student","Doctor","Engineer","Teacher","Unemployed","Police Officer","Fire Fighter", "Politician","Retail Clerk","Secretary","CEO of Fortune 500 Company","Banker","Lawyer","Scientist","Activist","Actor","Musician","Soldier","Salesman","Pastor","Counselor","Therapist"]
var rands1 = Math.floor(Math.random()*statement1.length)
var statement2 = ["Petty Theft","Speeding Ticket","Murder","Child Abuse","Abuse","Domestic Abuse","Sexual Abuse","Slander","Copyright Infringement","Robbery","Armed Robbery","Strong Armed Robbery","Tax Evasion", "Hit and run", "Assault","Strong armed Assault", "Assault with a deadly Weapon", "Terrorism","Terroristic Threats","Plot to commit Terrorism", "1st Degree Murder", "Child Pornography"]
var rands2 = Math.floor(Math.random()*statement2.length)
var statement3 = ["Volunteers monthly","Helps at childrens shelter","Donates to charity","Aided in disaster relief","Volunteer firefighter","Volunteer teacher", "Camp Counselor", "Pays it forward at Starbucks once a month", "Gives money to the homeless occasionally", "Clean driving record", "Clean record", "Employee of the month", "Saved their company $100,000 a year", "Organized a food drive", "Organ Donor", "Donates blood"]
var rands3 = Math.floor(Math.random()*statement3.length)
var statement4 = ["Single Accuser","Multiple Accusers","No Evidence","Unreliable Evidence","Overwhelming Evidence","Accused by Ex-lover","Accused on social media","Evidence linking to crime","Evidence is 30 years old and unreliable", "Accuser is unstable"]
var rands4 = Math.floor(Math.random()*statement4.length)
var person1 = new Image();
person1.src = "images/person1.png";
var person2 = new Image();
person2.src = "images/person2.png";
var person3 = new Image();
person3.src = "images/person3.png";
var person4 = new Image();
person4.src = "images/person4.png";
var person5 = new Image();
person5.src = "images/person5.png";
var person6 = new Image();
person6.src = "images/person6.png";
var person7 = new Image();
person7.src = "images/person7.png";
var person8 = new Image();
person8.src = "images/person8.png";
var person9 = new Image();
person9.src = "images/person9.png";
var personArray = [person1, person2,person3,person4,person5,person6,person7,person8,person9]
var randomPerson = Math.floor(Math.random()*personArray.length)
var voteForLife = false;
var voteForDeath = false;





socket.on('connect', function(data){
  console.log("we connected to the server as" + socket.id)

})

socket.on('masterTimeClock',function(count){
  //what to do with thecount?

  if(count == 30){
   $('.person').append(personArray[randomPerson]).css({
     'justify-content':'center',
     'width':'100vw'

   })
       $('.person').fadeTo(10,1);
  }

  if(count == 26){
   $('.clue1').append("<p>" + statement1[rands1] + "</p>").css({
     'justify-content':'center',
     'font-size':'1vw',
     'opacity':'0',
    'transition': 'all 2s ease-in-out'
   })
       $('.clue1').fadeTo(10,1);
  }


  if(count ==22){
   $('.clue2').append("<p>" + statement2[rands2] + "</p>").css({
     'justify-content':'center',
     'font-size':'1vw',
     'opacity':'0',
    'transition': 'all 2s ease-in-out'
   })
       $('.clue2').fadeTo(10,1);
  }

  if(count ==18){
   $('.clue3').append("<p>" + statement3[rands3] + "</p>").css({
     'justify-content':'center',
     'font-size':'1vw',
     'opacity':'0',
    'transition': 'all 2s ease-in-out'
   })
       $('.clue3').fadeTo(10,1);
  }


  if(count == 14){
   $('.clue4').append("<p>" + statement4[rands4] + "</p>").css({
     'justify-content':'center',
     'font-size':'1vw',
     'opacity':'0',
    'transition': 'all 2s ease-in-out'
   })
       $('.clue4').fadeTo(10,1);
  }

  if(count == 5 && voteForLife == false){
    $('.yes').fadeTo(10,0);
     $('.no').fadeTo(10,0);
       socket.emit('death'); // send the data up to the server
     }

     if(count <=1){
     window.location.reload(true)
     }
})

socket.on('survived', function(){
  $('.person').css({
    'background-color': 'green',
  }).appendTo('.person')
})

socket.on('executed', function(){
  $('.person').css({
    'background-color': 'red',
  }).appendTo('.person')
})


$(this).click(function(event){
   $('.yes').fadeTo(10,0);
    $('.no').fadeTo(10,0);
    $('.thanks').fadeTo(10,1);
})


$('.yes').click(function(event) {
  socket.emit('life'); // send the data up to the server
  voteForLife = true;
  console.log("voteForLife",voteForLife);

})

$('.no').click(function(event) {
  socket.emit('death'); // send the data up to the server
  voteForDeath = true;
  console.log("voteForDeath",voteForDeath);
});
