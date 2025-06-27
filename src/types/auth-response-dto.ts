export type AuthResponseDto = {
  token: string;
  user: UserDto;
};

export type UserDto = {
  login: string;
  loggined_at: string;
  student: StudentDto;
};

export type StudentDto = {
  surname: string;
  name: string;
  patronymic: string;
  fullName: string;
  birthday: string;
  email: string;
  group: GroupDto;
};

export type GroupDto = {
  title: string;
  course: number;
  commercial: boolean;
  specialty: SpecialtyDto;
};

export type SpecialtyDto = {
  code: string;
  title: string;
};
