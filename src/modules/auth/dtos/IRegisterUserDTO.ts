interface IRegisterUserDTO {
  name: string;
  address?: string;
  email: string;
  password: string;
  active: number;
  identification?: string;
  image?: string;
  phone?: string;
  last_login?: Date;
  modality_id?: number;
  course_id?: number;
  pole_id?: number;
  institution_id: number;
  group_id: number;
}
export { IRegisterUserDTO };
