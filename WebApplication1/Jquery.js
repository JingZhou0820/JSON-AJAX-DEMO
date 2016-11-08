"use strict"

var httpRequest = false;
var fileInformation;
var filenumber = 0;
var i = 0;
var intervaltime;
var time;
//create object for xmlhhttorrequest
function getRequestObject() {
   
    httpRequest = new XMLHttpRequest();
    return httpRequest;
}
//check if has xmlhttprequest,abort the previous one ,and send information B
function sendinformation() {
    if (!httpRequest) {
        httpRequest = getRequestObject();
    }
    httpRequest.abort();
    httpRequest.open("get", "picturename1.json", true);
    httpRequest.send();
    httpRequest.onreadystatechange = getXMLobject;
}
//send information for getting time inverval A while loading
function sendinformationforinterval() {
    if (!httpRequest) {
        httpRequest = getRequestObject();
    }
    httpRequest.abort();
    httpRequest.open("get", "picturename1.json", true);
    httpRequest.send();
    httpRequest.onreadystatechange = getInterval;

}
//(Floowing by A)  send sucessful, get the time interval ,and create window.setinterval while loading
function getInterval() {
    if (httpRequest.readyState === 4 && httpRequest.status === 200) {

        fileInformation = JSON.parse(httpRequest.responseText);
        collectionOfPicture = fileInformation.file;
        numberOfpictures = collectionOfPicture.length;
        $("#picture").attr("src", "images/" + fileInformation.file[0].picture);
        intervaltime = fileInformation.Interval[0].interval;
        time = window.setInterval(sendinformation, intervaltime);
        i++;
    }
}
//(Following by B) send sucessful,get file name from json file
var collectionOfPicture;
var numberOfpictures;
function getXMLobject() {
   
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
       
        fileInformation = JSON.parse(httpRequest.responseText);
        //get interval time for change pictures
        intervaltime = fileInformation.Interval[0].interval;
        
        //populate image
        collectionOfPicture = fileInformation.file;
        numberOfpictures = collectionOfPicture.length;
        if (i%2==0) {
            $("#picture").attr("src", "images/" + fileInformation.file[i / 2].picture).slideDown();
        }
        if (i%2!=0) {
            $("#picture").slideUp();
        }
        i++;
        if (i==numberOfpictures*2) {
            i = 0;
        }
            clearInterval(time);
            if (i % 2 == 0) {

                time = window.setInterval(sendinformation, 1000);
            }
            else {

                time = window.setInterval(sendinformation, intervaltime);
            }

        
        }  
    }
//add function for click button to previouse
function previousA() {
    if (i==0) {
        i = numberOfpictures * 2 - 4;
    }
    else if (i==1||i==2) {
        i = numberOfpictures*2-2;
    }
    else if (i%2==0) {
        i = i - 4;
    }
    else {
        i = i - 3;
    }
    sendinformation();
}
//add function for click button to the next
function nextA() {

    if (i==numberOfpictures*2-2) {
        i = 0;
    }
    else if (i == numberOfpictures * 2 - 1) {
        i = 0;
    }
    else if (i % 2 == 0) {
        i = i + 2
    }
    else {
        i = i + 1;
    }
    sendinformation();
}
//upload function to change the set of picture
function changepicture() {
    i = 0;
    sendinformation();
   
}
sendinformationforinterval();
//sendinformation();
$("#previousButton").on("click", previousA);
$("#nextButton").on("click", nextA);
$("#uploadButton").on("click", changepicture);
