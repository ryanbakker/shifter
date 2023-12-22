// User Params
export type CreateUserParams = {
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  profileImg: string;
  coverImg: string;
};

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  profileImg: string;
  coverImg: string;
};
