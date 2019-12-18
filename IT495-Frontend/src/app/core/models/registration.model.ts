export class User {
  active: Boolean;
  address: String;
  city: String;
  country: String;
  email: String;
  emailVerified: Boolean;
  firstName: String;
  id: Number;
  lastName: String;
  password: String;
  phoneNumber: String;
  postalCode: String;
  constructor(args: any = {}) {
    this.active = args.active;
    this.address = args.address;
    this.city = args.city;
    this.country = args.country;
    this.email = args.email;
    this.emailVerified = args.emailVerified;
    this.firstName = args.firstName;
    this.lastName = args.lastName;
    this.id = args.id;
    this.password = args.password;
    this.phoneNumber = args.phoneNumber;
    this.postalCode = args.postalCode;
  }
}
