export const endpoints = {
  auth: {
    signin: "/user/signin",
    signup: "/user/signup",
    profile: "/user/profile-details"
    
  },
  cms:{
    list:"/product/list",
    create:"/product/create",
    remove: "/product/remove",
    details: "/product/detail",
    update: "/product/update"
  }
};

export const successNotificationEndpoints: string[] = [
  endpoints.auth.signin,
  endpoints.auth.signup,
  endpoints.auth.profile,
  endpoints.cms.list,
  endpoints.cms.create,
  endpoints.cms.details,
  endpoints.cms.update
];
