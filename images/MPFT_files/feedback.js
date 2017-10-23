// Get the modal
var modal = document.getElementById("feedback_modal");

// Get the button that opens the modal
var btn = document.getElementById("open_feedback");

// Get the <close> element that closes the modal
var close = document.getElementById("close_feedback");

// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <close> (x), close the modal
close.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// validating form

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function postContactToGoogle() {
    var name = $('#name').val();
    var feed = $('#feed').val();
    var email = $('#email').val();
    if ((name !== "") && (email !== "") && ((feed !== "") && (validateEmail(email)))) {
        $.ajax({
            url: "https://docs.google.com/forms/d/e/1FAIpQLScs-ILUy3ncxp8uNLZf0TGKgPuM9Rn3yd9hL29iPCUANtc-Rg/formResponse",
            data: { "entry.124781542": name, "entry.431125286": feed, "entry.398147209": email },
            type: "POST",
            dataType: "xml",
            statusCode: {
                0: function() {

                    $('#name').val("");
                    $('#email').val("");
                    $('#feed').val("");
                    //Success message
                },
                200: function() {
                    $('#name').val("");
                    $('#email').val("");
                    $('#feed').val("");
                    //Success Message
                }
            }
        });
    } else if ((name === "") || (email === "") || ((feed === "") && (validateEmail(email)))) {
        console.log('%c failed to send data', failure);
        swal({
            title: "Error!",
            text: "failed to send data",
            type: "error",
            confirmButtonText: "try again"
        });
    } else {
        console.log('%c failed the second check', failure);
        swal({
            title: "Error!",
            text: "failed to send data",
            type: "error",
            confirmButtonText: "Cool"
        });
    }
    // clearing form input
    $("#feedback_form")[0].reset();

}

const failure = [
    'background: red',
    'color: white',
    'display: block',
    'text-align: center'
].join(';');
