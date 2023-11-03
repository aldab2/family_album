

class UserReadDTO {
  constructor(user) {
    this.id = user._id;  // Assuming you want to expose the user's ID
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.userName = user.userName;
    this.email = user.email;
    this.mobile = user.mobile;
    this.gender = user.gender;
    this.dateOfBirth = user.dateOfBirth;
    this.active = user.active
    // Exclude password from the DTO
    this.role = user.role;
    // Depending on how you want to handle references, you might want to populate this
    this.family = user.family;
    // Additional fields from the schema timestamps
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}

class UserUpdateDTO {
    constructor(user) {
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.userName = user.userName;
      this.email = user.email;
      this.mobile = user.mobile;
      this.gender = user.gender;
      this.dateOfBirth = user.dateOfBirth;
      this.active = user.active
      // Exclude password from the DTO
      this.role = user.role;
      // Depending on how you want to handle references, you might want to populate this
      this.family = user.family;
    }
  }

  

  export  {UserReadDTO , UserUpdateDTO};