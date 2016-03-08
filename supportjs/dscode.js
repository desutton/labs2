//Create a new object based of the HTMLElement prototype
var DSCodeProto = Object.create(HTMLElement.prototype);

// Set up the element
DSCodeProto.version = function() {
	console.log('ds-Code Rulz!');	
}

var DSCodeElement = document.registerElement('ds-code', {prototype: DSCodeProto});

var dscode = document.querySelector('ds-code');
dscode.version();


// Function that closes windows
function closeWin() {
    myWindow.close();   // Closes the new window
}