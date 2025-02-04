export default interface IUserContext { 
  user: {
    email: string | null;
    _id: string | null;
  } | null;
}
