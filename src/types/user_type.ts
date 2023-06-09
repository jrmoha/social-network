type User = {
  username: string;
  email: string;
  password?: string;
  first_name: string;
  last_name: string;
  birth_date: Date;
  register_date?: Date;
  profile_image?: string;
  token?: string;
};

export default User;
