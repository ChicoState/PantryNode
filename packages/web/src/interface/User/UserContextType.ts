import RegisterDonorType from "../TransferTypes/RegisterDonorType";
import Register from "../TransferTypes/RegisterUser";
import UserStateType from "./UserStateType";

interface UserContextType {
  userState: UserStateType;
  login: (username: string, pwd: string) => void;
  logout: () => void;
  getDonors: () => void;
  autoLogin: () => void;
  register: (register: Register) => void;
  registerDonor: (d: RegisterDonorType) => void;
}

export default UserContextType;
