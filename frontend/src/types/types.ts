// Define types for your user and family members
interface User {
    firstName: string;
    lastName: string;
    userName: string;
    role: string;
    email: string;
    gender: string;
    dateOfBirth: string;
  }
  
  interface FamilyMember extends User {
    // Add any additional fields specific to a family member here
  }
  
  interface SpaceInfo {
    spaceName: string;
    // Add any additional fields for space information
    familyMember: FamilyMember[]
  }
  