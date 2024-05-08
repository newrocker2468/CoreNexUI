import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { useTheme } from "./theme-provider";
import { ScrollShadow } from "@nextui-org/react";
import UserContext from "./UserContext";
import { useContext } from "react";
import {FC} from "react";
interface user {
  fheight?: boolean;
  marginb?: boolean;
  fwidth?: boolean;
}
const SideBar: FC<user> = ({ fheight, marginb, fwidth }) => {
  const { theme } = useTheme();
  const { user } = useContext(UserContext);
  // Define styles for light and dark themes
  const styles =
    theme === "dark"
      ? {
          color: "white",
          border: "0px",
          onHover: {
            backgroundColor: "#212121",
          },
          marginBottom: marginb ? "20rem" : "1rem",
          marginTop: "1rem",
        }
      : {
          color: "black",
          backgroundColor: "white",
          onHover: {
            backgroundColor: "white",
            color: "black",
          },
          marginBottom: marginb ? "20rem" : "1rem",
          marginTop: "1rem",
        };

  return (
    <>
      <ScrollShadow
        size={250}
        hideScrollBar
        style={{
          display: "flex",
          flexDirection: "column",
          height: fheight ? "100dvh" : "60vh",

          overflow: "auto",
          width: fwidth ? "100%" : "200px",
        }}
      >
        {/* collapsed={true} */}
        <Sidebar rootStyles={styles} width='200'>
          <Menu
            className={theme === "dark" ? "bg-black" : "bg-white"}
            menuItemStyles={{
              button: {
                backgroundColor: theme === "dark" ? "black" : "white",
                [`&:hover`]: {
                  backgroundColor: theme === "dark" ? "#212121" : "lightgrey",
                },
                [`&.active`]: {
                  backgroundColor: theme === "dark" ? "#212121" : "lightgrey",
                },
              },
            }}
          >
            <SubMenu label='Elements'>
              <MenuItem component={<Link to='/Csselements' />}> All</MenuItem>
              <MenuItem component={<Link to='/Csselements/button' />}>
                {" "}
                Buttons
              </MenuItem>
              <MenuItem component={<Link to='/Csselements/checkbox' />}>
                {" "}
                Checkboxes
              </MenuItem>
              <MenuItem component={<Link to='/Csselements/switches' />}>
                {" "}
                Toggle Switches
              </MenuItem>
              <MenuItem component={<Link to='/Csselements/cards' />}>
                {" "}
                Cards
              </MenuItem>
              <MenuItem component={<Link to='/Csselements/loaders' />}>
                {" "}
                Loaders
              </MenuItem>
              <MenuItem component={<Link to='/Csselements/Input' />}>
                {" "}
                Inputs
              </MenuItem>
              <MenuItem component={<Link to='/Csselements/radiobuttons' />}>
                {" "}
                Radio buttons
              </MenuItem>
              <MenuItem component={<Link to='/Csselements/Forms' />}>
                {" "}
                Forms
              </MenuItem>
              <MenuItem component={<Link to='/Csselements/patterns' />}>
                {" "}
                Patterns
              </MenuItem>
              <MenuItem component={<Link to='/Csselements/tooltips' />}>
                {" "}
                Tooltips
              </MenuItem>
              {/* <MenuItem component={<Link to='/Csselements/Myfavorites' />}>
                {" "}
                Myfavorites
              </MenuItem> */}
            </SubMenu>
            <MenuItem component={<Link to='/Csschallenges' />}>
              {" "}
              Challenges
            </MenuItem>
            {/* <MenuItem component={<Link to='/docs' />}> Documentation</MenuItem> */}
            {user?.Permissions?.some((permission) =>
              [
                "admin",
                "approveposts",
                "rejectposts",
                "editcsselement",
                "deletecsselement",
                "createchallenges",
                "deletechallenges",
                "editchallenges",
                "createevents",
                "editevents",
                "deleteevents",
                "deletenotes",
                "editsubmissions",
                "deletesubmissions",
              ].includes(permission)
            ) && (
              <MenuItem component={<Link to='/admin' />}>
                {" "}
                Admin Controls
              </MenuItem>
            )}

            {/* <MenuItem component={<Link to='/Create' />}>
              {" "}
             + Create new element
            </MenuItem> */}
          </Menu>
        </Sidebar>
      </ScrollShadow>
    </>
  );
};

export default SideBar;
