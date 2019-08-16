function greeter(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
var user = { firstName: "Trang", lastName: "Vy" };
document.body.textContent = greeter(user);
