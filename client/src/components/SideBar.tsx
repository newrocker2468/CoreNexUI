import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { useTheme } from "./theme-provider";
import { ScrollShadow } from "@nextui-org/react";
const SideBar = () => {
  const { theme } = useTheme();

  // Define styles for light and dark themes
  const styles =
    theme === "dark"
      ? {
          color: "white",
          backgroundColor: "#212121",
          border: "0px",
          onHover: {
            backgroundColor: "#212121",
          },
        }
      : {
          color: "black",
          backgroundColor: "white",
          onHover: {
            backgroundColor: "white",
            color: "black",
          },
        };

  return (
    <>

        <div
          style={
            {
              // overflowY: "auto",
              // overflowX: "hidden",
              // paddingBottom: "15rem",
            }
          }
          >
          {/* collapsed={true} */}
          <ScrollShadow size={120} hideScrollBar>
          <Sidebar rootStyles={styles} width="200">
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
                <MenuItem component={<Link to='/Csselements/buttons' />}>
                  {" "}
                  Buttons
                </MenuItem>
                <MenuItem component={<Link to='/Csselements/buttons' />}>
                  {" "}
                  Checkboxes
                </MenuItem>
                <MenuItem component={<Link to='/Csselements/buttons' />}>
                  {" "}
                  Toggle Switches
                </MenuItem>
                <MenuItem component={<Link to='/Csselements/buttons' />}>
                  {" "}
                  Cards
                </MenuItem>
                <MenuItem component={<Link to='/Csselements/buttons' />}>
                  {" "}
                  Loaders
                </MenuItem>
                <MenuItem component={<Link to='/Csselements/buttons' />}>
                  {" "}
                  Inputs
                </MenuItem>
                <MenuItem component={<Link to='/Csselements/buttons' />}>
                  {" "}
                  Radio buttons
                </MenuItem>
                <MenuItem component={<Link to='/Csselements/buttons' />}>
                  {" "}
                  Forms
                </MenuItem>
                <MenuItem component={<Link to='/Csselements/buttons' />}>
                  {" "}
                  Patterns
                </MenuItem>
                <MenuItem component={<Link to='/Csselements/buttons' />}>
                  {" "}
                  Tooltips
                </MenuItem>
                <MenuItem component={<Link to='/Csselements/buttons' />}>
                  {" "}
                  My favorites
                </MenuItem>
              </SubMenu>
              <MenuItem component={<Link to='/Csschallenges' />}>
                {" "}
                Challenges
              </MenuItem>
              <MenuItem component={<Link to='/docs' />}>
                {" "}
                Documentation
              </MenuItem>
              {/* <MenuItem component={<Link to='/Create' />}>
              {" "}
             + Create new element
            </MenuItem> */}
            </Menu>
          </Sidebar>
      </ScrollShadow>
        </div>
    </>
  );
};

export default SideBar;
