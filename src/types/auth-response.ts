export type AuthResponse = {
  token: string;
  user: User;
};

export type User = {
  login: string;
  loggined_at: string;
  student: Student;
};

export type Student = {
  surname: string;
  name: string;
  patronymic: string;
  fullName: string;
  birthday: string;
  email: string;
  group: Group;
};

export type Group = {
  title: string;
  course: number;
  commercial: boolean;
  specialty: Specialty;
};

export type Specialty = {
  code: string;
  title: string;
};
