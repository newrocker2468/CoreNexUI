import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from "@nextui-org/react";
import {FC} from 'react';
interface UserdataProps {
    name: string;
    description?: string;
    image?: string;
    handleLogout: () => void;
  }



 const Userdata:FC<UserdataProps>=({ name, description, image,handleLogout })=> {

  return (
    <div className='flex items-center gap-4'>
      <Dropdown placement='bottom-start'>
        <DropdownTrigger>
          <User
            as='button'

            avatarProps={{
              isBordered: true,
              src: `${image}`,
              style: { width: "3.5rem", height: "3.5rem" },
            }}
            className='transition-transform'
            description={description || "CoreNex UI User"}
            name={name}
            style={{
              fontWeight: "bold",
              fontSize: "20px",
            }}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label='User Actions' variant='flat'>
          <DropdownItem key='profile' className='h-14 gap-2'>
            <p className='font-bold'>Signed in as</p>
            <p className='font-bold'>{name}</p>
          </DropdownItem>
          <DropdownItem key='settings'>My Settings</DropdownItem>
          <DropdownItem key='team_settings'>Team Settings</DropdownItem>
          <DropdownItem key='analytics'>Analytics</DropdownItem>
          <DropdownItem key='system'>System</DropdownItem>
          <DropdownItem key='configurations'>Configurations</DropdownItem>
          <DropdownItem key='help_and_feedback'>Help & Feedback</DropdownItem>
          <DropdownItem key='logout' color='danger' onClick={handleLogout}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
export default  Userdata