import React, { Dispatch, SetStateAction } from "react";

interface User {
  userName: string;
  data: object;
  description: string;
  avatarProps: string;
  highres_img: string;
  isLoggedIn: boolean;
  email: string;
  bio:string;
}

interface UserContextProps {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

const UserContext = React.createContext<UserContextProps>({
  user: {
    userName: "",
    data: {},
    description: "CoreNex UI User",
    avatarProps:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/128px-Default_pfp.svg.png",
    highres_img:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/128px-Default_pfp.svg.png",
    isLoggedIn: false,
    email: "",
      bio:"",
  },
  setUser: () => {},
});

export default UserContext;
