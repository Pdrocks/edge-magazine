/* validator.js
 * Form validation scripts for The Edge Magazine.
 * Author: Christina Holden
 * September 2015
 *
 * Source:
 *  For the DHTML email validation script: SmartWebby.com (http://www.smartwebby.com/dhtml/)
 *  For jQuery Widgets: http://jqueryui.com/
 */

/*
 * Checks that the field is not empty.
 * Parameter inputField: the input element.
 * Returns false if error is found.
 */
function isNotEmpty (inputField) {
    if (inputField.value.length == 0) {
        return false;
    }
    return true;
}
/*
 * Checks that the field is not empty. Calls echeck() to validate email. If   * echeck() returns false, prints error message to the page.
 * Original code has been altered slightly to maintain consistency.
 * Called onblur of input element.
 * Parameter inputField: the input element.
 * Returns false if error is found.
 */
function isValidEmail(inputField){
    if (isNotEmpty(inputField)==false) {
        return false;
    }
    if (echeck(inputField.value)==false){
       $('<div class="required">Email is invalid.</div>').insertAfter("#email");
        inputField.value="";
        return false;
    }
    return true;
}
/*
 * Checks that input value is a properly formatted and valid email address.
 * Parameter str: input value
 * Returns false if error found.
 */
function echeck(str) {
        var at="@";
        var dot=".";
        var atIndex=str.indexOf(at);
        var strLength=str.length;
        var valid=false;

        // check for and placement of @ character
        if (str.indexOf(at)==-1 || str.indexOf(at)==0 || str.indexOf(at)==strLength){
           return false;
        }
        // check for and placement of dot character
        if (str.indexOf(dot)==-1 || str.indexOf(dot)==0 || str.indexOf(dot)==strLength){
            return false;
        }
        // check that there is only one @ character
         if (str.indexOf(at,(atIndex+1))!=-1){
            return false;
         }
         // check that the dot character is not adjacent to @ character
         if (str.substring(atIndex-1,atIndex)==dot || str.substring(atIndex+1,atIndex+2)==dot){
            return false;
         }
         // check that the dot character follows the @ character
         if (str.indexOf(dot,(atIndex+2))==-1){
            return false;
         }
         // check that there are no blank spaces
         if (str.indexOf(" ")!=-1){
            return false;
         }
         return true;
}
/*
 * Checks that input value is a properly formated phone number.
 * Called onblur of input element.
 * Parameter inputField: the input element.
 * Returns false if error is found.
 */
function phoneFormat (inputField) {
    if (isNotEmpty(inputField)){
        var regex = /^\d{3}-\d{3}-\d{4}$/;
        // compares input value's pattern with the regular expression
        if (!regex.test(inputField.value)){
            $('<div class="required">Please enter your phone number in the following format: ###-###-####.</div>').insertAfter("#phone");
            inputField.value="";
            return false;
        }
    }
    return true;
}
/*
 * Checks that the file submitted is of the proper format.
 * Called onchange of input element.
 * Parameter inputField: the input element.
 * Returns false if error is found.
 */
function fileExt (inputField) {
    var ext = ".pdf";
    var file = inputField.value;
    if (file.indexOf(ext) == -1) {
        $('<div class="required" id="fileHelp">Please submit your file in pdf format.</div>').insertAfter("#file");
        inputField.value="";
        return false;
    }
    $("#fileHelp").remove();
    return true;
}
/*
 * Checks that the file submitted is of the proper format.
 * Called onchange of input element.
 * Parameter inputField: the input element.
 * Returns false if error is found.
 */
function imgExt (inputField) {
   if (isNotEmpty(inputField)){
        var ext = [".gif", ".jpeg", ".jpg", ".png"];
        var img = inputField.value;
        for (var i = 0; i < ext.length; i++) {
            if (img.indexOf(ext[i]) != -1) {
                $("#imageHelp").remove();
                return true;
            }
        }
        inputField.value="";
        $('<div class="required" id="imageHelp">Please submit your file in one of the following formats: gif, jpeg, or png.</div>').insertAfter("#image");
        return false;
   }
    return true;
}

/*
 * Scripts to run when document is ready:
 */
$(document).ready (function () {
    if (document.documentElement.clientWidth > 680) {
        // jQuery UI widget
        $(document).tooltip();
        // jQuery UI widget
        $(".datepicker").datepicker({
             changeMonth: true,
             changeYear: true,
        });
    }
    // jQuery UI widget
    $("#alert").dialog({
        autoOpen: false,
        modal: true,
        show: {effect: "blind", duration: 300}
    });
/*
 * The following three functions run a series of checks upon form submission  * to ensure nothing has been missed. Pops up dialog boxes indicating success * or failure.
 */
    $("#contact-form").submit(function() {
        if (isNotEmpty(form["name"]) &&
            isValidEmail(form["email"])) {
            alert("Your form has been successfully submitted.")
            return true;
        }
        else {
            $("#alert").html("There seems to be important information missing or incorrectly entered.");
            $("#alert").dialog("open");
            return false;
        }
    });
    $("#event-form").submit(function() {
        if (isNotEmpty(form["name"]) &&
            isValidEmail(form["email"]) &&
            isNotEmpty(form["name"]) &&
            isNotEmpty(form["startDate"]) &&
            isNotEmpty(form["endDate"]) &&
            isNotEmpty(form["time"]) &&
            isNotEmpty(form["day"]) &&
            isNotEmpty(form["address"]) &&
            isNotEmpty(form["city"])) {
            alert("Your form has been successfully submitted.")
            return true;
        }
        else {
            $("#alert").html("There seems to be important information missing or incorrectly entered.");
            $("#alert").dialog("open");
            return false;
        }
    });
    $("#article-form").submit(function(){
        if (isNotEmpty(form["name"]) &&
            isValidEmail(form["email"]) &&
            phoneFormat(form["tel"]) &&
            isNotEmpty(form["bio"]) &&
            imgExt(form["avatar"]) &&
            isNotEmpty(form["summary"]) &&
            fileExt(form["submission"])) {
            alert("Your form has been successfully submitted.")
            return true;
        }
        else {
            $("#alert").html("There seems to be important information missing or incorrectly entered.");
            $("#alert").dialog("open");
            return false;
        }
    });
})

