export interface AddressResponseDTO {
    id: number;
    addressType: AddressType; 
    fullAddress: string;
    city: string;
    state: string;
    createdAt: string; 
    updateAt: string;  
  }
  export interface AddressRequestDTO {
    addressType: AddressType; 
    fullAddress: string;
    city: string;
    state: string;
  }
  export enum AddressType {
    HOME = 'HOME',
    WORK = 'WORK',
    SCHOOL = 'SCHOOL'
  }
      