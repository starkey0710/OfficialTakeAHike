var config = {
  apiKey: "AIzaSyD_TcHQbDLNKufbovGO-1Ij9AUoCQwOufE",
  authDomain: "takeahike-86d41.firebaseapp.com",
  databaseURL: "https://takeahike-86d41.firebaseio.com",
  projectId: "takeahike-86d41",
  storageBucket: "takeahike-86d41.appspot.com",
  messagingSenderId: "660810891875"
};
firebase.initializeApp(config);

//to use database (storing data, not files)
var database = firebase.database();


function findInputInDB(){
  var level = sessionStorage.level;
  console.log(level);
  var region = sessionStorage.region;
  console.log(region);
  str = "";

  database.ref("hikes").once('value').then(function(snapshot){
    var hikes = snapshot.val();
    //console.log(hikes);

    for (var hikeid in hikes){
      //console.log(hikeid);
    //console.log(hikes[hikeid]);
      if (hikes[hikeid].skill == level && hikes[hikeid].region == region){
          str = str + hikeid + " ";
          addToPage(hikes, hikeid);
      }
    }
    console.log(str)
  });
}

/*function loadData(id){
  //key is what the user entered as the hike ID
  var key = document.getElementById('idKey').value;
  var hikesRef = database.ref("hikes/" + key)
  hikesRef.once('value').then(function(snapshot){
var key = id;
console.log(key)
//TODO check if key even is a thing
database.ref("hikes/" + key).once('value').then(function(snapshot){
  //json is the stored hike id
  var json = snapshot.val();
  var toBeDisplayed = "";
  var theLength =0;
  var theName = "";
  if (json != null){
    theLength = snapshot.val().length;
    theName = snapshot.val().name;
    toBeDisplayed = "success"
    //toBeDisplayed = snapshot.val().theVal;
  } else {
    toBeDisplayed = "Sorry, couldn't find that key :(";
  }
  document.getElementById('loadLength').innerHTML = "Length:" + theLength;
  document.getElementById('loadName').innerHTML = "Name of Hike: " + theName;
});
}*/

function addToPage(listOfHikes, id) {
  /*var stuffToAdd = listOfHikes;
  for (var i = 0; i < stuffToAdd.length; i++){
    var thing = stuffToAdd[i];
    var paragraph = document.createElement("p");
    paragraph.innerHTML = thing;
    var container = document.getElementById("container");
    container.appendChild(paragraph);
  }*/

  var paragraph = document.createElement("p");
  var paragraph2 = document.createElement("p");
  var paragraph3 = document.createElement("p");
  var paragraph4 = document.createElement("p");
  var image = document.createElement("img");
  paragraph.class = "result";
  paragraph2.class = "result";
  paragraph3.class = "result";
  paragraph4.class = "result";
  paragraph.innerHTML = "Name of Hike: " + listOfHikes[id].name;
  paragraph2.innerHTML = "Length of Hike: " + listOfHikes[id].length;
  paragraph3.innerHTML = "Address of Hike: " + listOfHikes[id].address;
  paragraph4.innerHTML = "Elevation of Hike: " + listOfHikes[id].elevation;
  image.src = listOfHikes[id].pic;
  console.log(listOfHikes[id].pic)
  var container = document.getElementById("container");
  container.appendChild(paragraph);
  container.appendChild(paragraph2);
  container.appendChild(paragraph3);
  container.appendChild(paragraph4);
  container.appendChild(image);
}
