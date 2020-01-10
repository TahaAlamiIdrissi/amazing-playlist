function User(firstname, lastname, email) {
  this.firstname = firstname;
  this.lastname = lastname;
  this.email = email;
}



User.prototype.setFirstname = function(firstname) {
  this.firstname = firstname;
};
User.prototype.getEmail = function(){
    return this.email;
}
User.prototype.getFullName = function(){
    return this.lastname.toUpperCase()+"-"+this.firstname;
}
User.prototype.getFirstName = function(){
    return this.firstname;
}
User.prototype.getLastName = function(){
    return this.lastname;
}
User.prototype.setLastname = function(lastname) {
  this.lastname = lastname;
};

User.prototype.setEmail = function(email) {
  this.email = email;
};




