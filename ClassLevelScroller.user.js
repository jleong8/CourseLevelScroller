// ==UserScript==
// @name         Class Level Scroller Userscript
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Week 2 assignment 3 - improve user experience on UHM class availability page
// @author       S.K.
// @match        https://www.sis.hawaii.edu/uhdad/avail.classes?i=MAN&t=201830&s=ICS
// @include      https://www.sis.hawaii.edu/uhdad/avail.classes?i=MAN&t=201830&s=ICS
// @require      https://code.jquery.com/jquery-2.1.3.min.js
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @grant        none
// ==/UserScript==

//To use this userscript, user's will need greasemonkey or tampermonkey. Download the greasemonkey or tampermonkey plugin to your pc,
//download this script and load it in the userscript plugin.
//Load the webpage https://www.sis.hawaii.edu/uhdad/avail.classes?i=MAN&t=201830&s=ICS
//This is UH ICS Spring2018 class availability webpage.
//Run this script from the plugin (tampermonkey runs it automatically).
//You will see no changes, because we implemented the select object to the absolute header. You have to scroll on the table
//to make the select item visible.

//This userscript replaces "Course Level" header on the class availability table with a select element.
//Select element has options that shows the class level.
//On the change event of the select element, value of the selectem item used as an anchor to scroll on the page.
//Since we don't have the access to the real dataset for table content, scrolling is not bounded to real data,
//But it's very easy to implement, just a change of few names.
//Idea is clear, instead of scrolling down the page, a select item does the scrolling for the user with the desired amount,
//It's helpful on find what user is looking for quickly, save user some microseconds.

//Get the table and two tr elements placed in the tHead from the page with the class names.
var coTable = document.getElementsByClassName('divListOfClasses').item(0);

//In the website there are two headers ('tr's in the header). One is fixed to the table and the other one is absolute for scrolling.
//For this project we used the absolute header to contain our implementation.
//Reason; headers are necessary on the first load of the page to understand the table.
//Without knowing which values are course levels, users can be confused by lacking of the header.

//Two headers, otherth is fixed, wideth is absolute positioned in the webpage.
var otherth = document.getElementsByClassName('tableFloatingHeaderOriginal').item(0);
var wideth = document.getElementsByClassName('tableFloatingHeader').item(0);

//Making the column wider, to keep the design symmetry.
otherth.children[2].style.width="160px";

//Clear the current header
wideth.innerHTML="";
//Recreate the deleted headers, and put our implementation to the place of the Course Level header.
for (var i=0; i < 13; i++)
{
    if(i!=2)
    {
        //Same column headers copied from otherth.
        var thnew = document.createElement('th');
        thnew.innerHTML = otherth.children[i].innerHTML;
        thnew.style.textAlign = "left";
        wideth.appendChild(thnew);
    }
    //With an exception obviously, we replaced the class level header with select item here.
    else
    {
        var thnu = document.createElement('th');
        thnu.style.width = "160px";
        //Our select item is created here.
        var selection = document.createElement("select");
        selection.style.height = "30px";
        selection.style.width = "156px";

        //Adding options to select item.
        var op1 = new Option();
        op1.value = 0;
        op1.disabled = true;
        op1.text = "Pick a Course Level";
        selection.options.add(op1);

        var op2 = new Option();
        op2.value = 154;
        op2.text = "ICS 1XX Level Classes";
        selection.options.add(op2);

        var op3 = new Option();
        op3.value = 814;
        op3.text = "ICS 2XX Level Classes";
        selection.options.add(op3);

        var op4 = new Option();
        op4.value = 1134;
        op4.text = "ICS 3XX Level Classes";
        selection.options.add(op4);

        var op5 = new Option();
        op5.value = 1464;
        op5.text = "ICS 4XX Level Classes";
        selection.options.add(op5);

        var op6 = new Option();
        op6.value = 1700;
        op6.text = "ICS 6XX Level Classes";
        selection.options.add(op6);

        selection.id = "selectC";
        selection.selectedIndex = selection.options[0];
        thnu.appendChild(selection);
        wideth.appendChild(thnu);
    }
}

//Absolute header style adjustments.
wideth.style.height = "36px";
wideth.style.textAlign = "left";
wideth.style.verticalAlign = "middle";

//jquery function to scroll to selected item's value.
$("#selectC").on('change', function() {
    $('html,body').animate({
        scrollTop: ( $("#selectC :selected").val() )},
        'slow');
});
