import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";

export default function SideBarcomp() {
  return (
    <>
      <Sidebar>
        <Menu
          style={{
            position: "fixed",
            width: "200px",
            height: "100vh",
            zIndex: "1000",
            overflowY: "auto",
          }}
          menuItemStyles={{
            button: {
              // the active class will be added automatically by react router
              // so we can use it to style the active menu item
              [`&.active`]: {
                backgroundColor: "#13395e",
                color: "#b6c8d9",
              },
            },
          }}
        >
          <header className='flex align-center justify-center'>
            <span className='text-center'>
              <h1 className='ml-4'>
                <i className='fa-solid fa-house'></i> Dashboard
              </h1>
            </span>
          </header>
          <MenuItem component={<Link to='/home' />}> Home</MenuItem>
          <MenuItem component={<Link to='/elements' />}> Elements</MenuItem>
          <MenuItem component={<Link to='/Challenges' />}> Challenges</MenuItem>
          <MenuItem component={<Link to='/Spot-Light' />}> Spot-Light</MenuItem>
          <MenuItem component={<Link to='/elements' />}> Elements</MenuItem>
          <MenuItem component={<Link to='/Challenges' />}> Challenges</MenuItem>
          <MenuItem component={<Link to='/Spot-Light' />}> Spot-Light</MenuItem>
        </Menu>
      </Sidebar>
    </>
  );
}
