
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
  Link,
} from "@nextui-org/react";
import {FC} from 'react';
interface UserdataProps {
    name: string;
    description?: string;
    image?: string |object;
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
          <DropdownItem key='profile' className='h-14 gap-2 text-center'>
            <p className='font-bold'>Signed in as</p>
            <Link href='/profile' className='no-underline text-current'>
              <p className='font-bold'>{name}</p>
            </Link>
          </DropdownItem>
          <DropdownItem key='settings'>
            <Link href='/profile' className='no-underline text-current'>
              My Profile
            </Link>
          </DropdownItem>
          <DropdownItem key='/docs'>
            {" "}
            <Link href='/docs' className='no-underline text-current'>
             User Guide
            </Link>
          </DropdownItem>
          {/* <DropdownItem key='analytics'>Analytics</DropdownItem>
          <DropdownItem key='system'>System</DropdownItem>
          <DropdownItem key='configurations'>Configurations</DropdownItem>
          <DropdownItem key='help_and_feedback'>Help & Feedback</DropdownItem> */}
          <DropdownItem key='logout' color='danger' onClick={handleLogout}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
export default  Userdata