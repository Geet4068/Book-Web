interface LoginPayload {
  email: string;
  password: string;
  success: boolean;
  message: string;
  status: number;
  token: string;
  profile_pic:File;
  first_name: string;

}

interface LoginResponse {
  success: boolean;
  message: string;
  status: number;
  token: string;
  profile_pic:File;
  first_name: string;
}

export interface ILoginResponse extends LoginPayload {
  data: LoginPayload;
}

export interface IuserResponse extends LoginResponse {
  data: LoginResponse;
}

interface resgisterPayload {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  profile_pic: File;
  // formdata : FormData;
  success: boolean;
  message: string;
  status: number;
}

interface userRegisterResponse {
  success: boolean;
  message: string;
  status: number;
}

export interface IRegisterResponse extends resgisterPayload {
  data: resgisterPayload;
}

export interface IuserResponseRegister extends userRegisterResponse {
  data: userRegisterResponse;
}
