/* Register Object */

function Register() {
  this.user = null;
}

/* Getting the document element from the form */
const firstnameTag = document.registration.firstname;
const lastnameTag = document.registration.lastname;
const emailTag = document.registration.email;
const submitTag = document.registration.submit;

Register.prototype.addUser = function(user) {
  this.user = user;
};
/* Validating the email */
Register.prototype.validateEmail = function(email) {
  // defining our regex
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) return true;
  else return false;
};

/* If the user passes the validation successfully we display a message */
Register.prototype.displayMessage = function(element, user) {
  // creating our label
  let label = document.createElement("label");
  label.innerHTML = `Welcome ${user.getFullName()}, You have been registered !`;
  label.setAttribute("class", "message-register");
  element.appendChild(label);
};

/* Validating  */
Register.prototype.toHTML = function() {
  submitTag.addEventListener("click", e => {
    e.preventDefault();
    let firstname = firstnameTag.value;
    let lastname = lastnameTag.value;
    let email = emailTag.value;

    let user = new User(firstname, lastname, email);
    this.addUser(user);
    if (
      this.validateEmail(user.getEmail()) &&
      user.getFirstName() &&
      user.getLastName()
    ) {
      submitTag.style.display = "none";
      this.displayMessage(document.registration, user);
    } else if (!user.getFirstName()) {
      alert("Please enter a firstname");
    } else if (!user.getLastName()) {
      alert("Please enter a lastname");
    } else {
      alert("Invalid Email ");
    }
  });
};
let register = new Register();

register.toHTML();
