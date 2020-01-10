function Register() {
  this.user = null;
}

const firstnameTag = document.registration.firstname;
const lastnameTag = document.registration.lastname;
const emailTag = document.registration.email;
const submitTag = document.registration.submit;

Register.prototype.addUser = function(user) {
  this.user = user;
};
Register.prototype.validateEmail = function(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) return true;
  else return false;
};

Register.prototype.displayMessage = function(element, user) {
  let label = document.createElement("label");
  label.innerHTML = `Welcome ${user.getFullName()}, You have been registered !`;
  label.setAttribute("class", "message-register");
  element.appendChild(label);
};
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
