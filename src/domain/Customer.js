class Customer {
  constructor(id, name, email, phone, type, address) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.type = type;
    this.address = address;
  }

  hasValidEmail() {
    return Boolean(this.email) && this.email.includes("@");
  }

  isOfType(type) {
    return this.type === type;
  }

  // Demeter: quem precisa da localizacao do cliente nao navega ate Address.
  getCity() {
    return this.address.city;
  }

  getState() {
    return this.address.state;
  }

  getRegion() {
    return this.address.region;
  }
}

module.exports = Customer;
