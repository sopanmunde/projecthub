
export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  rollNo: string;
  email: string;
  contact: string;
}

export interface Project {
  id: string;
  title: string;
  abstract: string;
  originalityReport?: string;
  improvedAbstract?: string;
  uploadedFileName?: string;
}
