// Name: Chew Shu Wen
// Admin number: p227423
// Class: DISM1A/05 

// Get the form needed for validation
var checkForm = document.querySelector(".needs-validation");
var submitButton = document.getElementById("submitButton");

submitButton.addEventListener("click", function(event) {
    if (checkForm.checkValidity()) {
      // Form is valid, proceed with form submission
      checkForm.classList.add('was-validated');
      // Here, you might want to perform additional actions before form submission

      // Finally, submit the form programmatically
      checkForm.submit();
    } else {
      // Form is invalid, prevent default form submission behavior
      event.preventDefault();
      event.stopPropagation();

      // Add the 'was-validated' class to display validation error messages
      checkForm.classList.add('was-validated');
    }
  })

// Get the email input
var myInput = document.getElementById("email");

// Get the results list
var results = document.getElementById("results");

// Initialising possible list of emails for suggestion
var emails = ["gmail.com", "hotmail.com", "outlook.com",
			  "yahoo.com", "zoho.com", "dogo.com", 
			  "msn.com", "btc.com", "doge.com", 
			  "tesla.com", "apple.com", "voila.com"].sort();

// Get items of results list
var resultList = document.getElementsByClassName("resultItem");

// Variable that will be used to check if results list is hovered
var resultsHovered = false;


myInput.addEventListener("keyup", function() {
	
	// Empty the results list
	results.innerHTML = "";
	showResult(0);
	
	// Check if the "@" character has been typed
	if (myInput.value.search("@") != -1) {
		
		// Get the substring of the typed value, starting from "@"(inclusive) to the end of the string
		var checkStr = myInput.value.substring(myInput.value.search("@") + 1, myInput.value.length);
		
		var possibleStrings = getStrings(checkStr);

		if (possibleStrings.length > 0) {

			// Display all the possible strings
			outputPossible(possibleStrings);
			for (let i = 0; i < resultList.length; i++) {

				// If any of the result list items are clicked, fill the input with the resulting string
				resultList[i].addEventListener("click", function() {
					myInput.value = concatenateString(resultList[i].innerHTML);
					results.innerHTML = "";
					showResult(0);
				});
			}
		}
	}
}, false);

// Set resultsHovered to true when the results list is hovered
results.addEventListener("mouseover", function() {
	resultsHovered = true;
}, false);

// Set resultsHovered to false when the results list it is not hovered
results.addEventListener("mouseout", function() {
	resultsHovered = false;
}, false);

// When the user clicks out of the email input, clear the results list and hide it
myInput.addEventListener("blur", function() {

	// This condition is used to check whether or not the results list is being hovered.
	// By adding this if condition, it prevents the results list from disappearing too early,
	// which if it does disappear too early, does not allow the user to click on any item.
	if (!resultsHovered) {
		results.innerHTML = "";
		showResult(0);
	}
}, false);

// Function used to add a suffix string onto the email input value
function concatenateString(suffixStr) {
	return myInput.value.substring(0, myInput.value.search("@")) + ("@" + suffixStr);
}

// Get the possible strings depending on the user input and return them as an array
function getStrings(myStr) {
	var returnArr = Array();
	for (let i = 0; i < emails.length; i++) {

		if (emails[i].indexOf(myStr) != -1) {
			returnArr.push(emails[i]);
		}
	}
	return returnArr;
}

// Write to the results list and display it to the user
function outputPossible(myArr) {
	for (let i = 0; i < myArr.length; i++) {
		results.innerHTML += '<li class="resultItem list-group-item">' + myArr[i] + '</li>';
	}
	showResult(1);
}

// Toggle the visibility of the resultsList
function showResult(value) {
	if (value == 0) {
		results.classList.add("invisible");
	} else {
		results.classList.remove("invisible");
	}
}


  