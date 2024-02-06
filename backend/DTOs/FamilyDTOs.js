import { UserReadDTO } from "./UserDTOs.js";

// familyRead.dto.js
class FamilyReadDTO {
    constructor(family) {
      this.id = family._id; // Assuming you want to expose the family's ID
      this.spaceName = family.spaceName;
      // Assuming you want to convert the family members' ObjectIds to user DTOs
      this.familyMembers = family.familyMembers.map(member => new UserReadDTO(member));
      // this.friendRequests = family.friendRequests.map(request => new UserReadDTO(request));
      // Include timestamps
      this.createdAt = family.createdAt;
      this.updatedAt = family.updatedAt;
    }
  }

  class FamilyUpdateDTO {
    constructor(family) {
      this.spaceName = family.spaceName;
      // Assuming you want to convert the family members' ObjectIds to user DTOs
      this.familyMembers = family.familyMembers.map(member => new UserReadDTO(member));
      // Include timestamps
      this.createdAt = family.createdAt;
      this.updatedAt = family.updatedAt;
      // this.createdAt_display = "Tuesday, 13 Jan"
    }
  }

  class FamilyCreateDTO {
    constructor(family) {
        this.spaceName = family.spaceName;
        this.firstName = family.firstName;
        this.lastName = family.lastName;
        this.userName = family.userName;
        this.email = family.email;
        this.age = family.age;
        this.gender = family.gender;
        this.password = family.password
        this.dateOfBirth = family.dateOfBirth;
        // Include timestamps
        this.createdAt = family.createdAt;
        this.updatedAt = family.updatedAt;
      }
  }


  export {FamilyReadDTO,FamilyUpdateDTO, FamilyCreateDTO}

