import { Autocomplete, AutocompleteItem, Avatar } from "@nextui-org/react";
import axios from "axios";
import { Key, useEffect, useState } from "react";
import { CheckboxGroup, Checkbox } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import { Button, ButtonGroup } from "@nextui-org/react";
type User = {
  email: string;
  google: {
    image: string;
    displayName: string;
  };
  github: {
    image: string;
    displayName: string;
  };
  Permissions: [];
};

export default function AssignPermissions() {
  const [users, setuser] = useState<User[]>([]);
  const [value, setValue] = useState<string | number | null | undefined>("cat");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    if (selectedUser) {
      setSelected(selectedUser.Permissions);
    }
  }, [selectedUser]);

  useEffect(() => {
    try {
      axios
        .get("http://localhost:3000/getalluserdata", {
          withCredentials: true,
        })
        .then((res) => {
          // Iterate over each user in the response
          const usersWithHighResImages = res.data.user.map((user: User) => {
            let highres_img = user.google.image;
            if (user.google.image.includes("s96-c")) {
              highres_img = user.google.image.replace("s96-c", "s500-c");
            } else if (user.google.image.includes("sz=50")) {
              highres_img = user.google.image.replace("sz=50", "sz=240");
            }
            // Return a new user object with the highres_img
            return { ...user, google: { ...user.google, image: highres_img } };
          });
          setuser(usersWithHighResImages);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const AssignPermissionsUser = async (email:string) => {
    try {
      axios
        .post(
          `http://localhost:3000/assignpermissions/${email}`,
          {
            selected: selected,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {});
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className='flex justify-center align-center m-5'>
        <Autocomplete
          defaultItems={users}
          variant='bordered'
          label='Assigned to'
          placeholder='Select a user'
          labelPlacement='inside'
          className='max-w-xs'
          selectedKey={value}
          onSelectionChange={(value) => {
            setValue(value);
            const user = users.find((user) => user.email === value);
            setSelectedUser(user || null);
          }}
        >
          {(user) => (
            <AutocompleteItem key={user.email} textValue={user.email}>
              <div className='flex gap-2 items-center'>
                <Avatar
                  alt={user.email}
                  className='flex-shrink-0'
                  size='sm'
                  src={user.google.image || user.github.image}
                />
                <div className='flex flex-col'>
                  <span className='text-small'>{user.email}</span>
                  <span className='text-tiny text-default-400'>
                    {user.google.displayName || user.github.displayName}
                  </span>
                </div>
              </div>
            </AutocompleteItem>
          )}
        </Autocomplete>
      </div>

      {selectedUser && (
        <div className='flex justify-center flex-col'>
          <div className='flex justify-center '>
            <Image
              width={300}
              alt='User Image'
              src={selectedUser.google.image || selectedUser.github.image}
            />
          </div>

          <div className='flex justify-center '>
            {selectedUser.Permissions.map((per, index) => {
              return <div key={index}>Users Current Permissions : {per}</div>;
            })}
          </div>
          <div className='flex items-center justify-center m-[4rem]'>
            <CheckboxGroup
              label='Select Permissions'
              color='primary'
              value={selected}
              onValueChange={(newSelected) => {
                if (newSelected.includes("admin")) {
                  // If 'admin' is selected, select only 'admin'
                  setSelected(["admin"]);
                } else if (newSelected.length === 7) {
                  // If all other permissions are selected, select 'admin'
                  setSelected(["admin"]);
                } else {
                  // Otherwise, update the selected permissions
                  setSelected(newSelected);
                }
              }}
              className='grid place-items-center'
            >
              <Checkbox value='admin'>Admin (will have all rights)</Checkbox>
              <Checkbox value='approveposts'>
                Approve Css Element Posts
              </Checkbox>
              <Checkbox value='rejectposts'>Reject Css Element Posts</Checkbox>
              <Checkbox value='editcsselement'>
                Edit Css Element Posts
              </Checkbox>
              <Checkbox value='deletecsselement'>
                Delete Css Element Posts
              </Checkbox>
              <Checkbox value='createchallenges'>
                Create New Css Challenges
              </Checkbox>
              <Checkbox value='deletechallenges'>
                Delete Css Challenges
              </Checkbox>
              <Checkbox value='editchallenges'>
                Edit Existing Css Challenges
              </Checkbox>
            </CheckboxGroup>
          </div>

          <div className='flex justify-center m-5'>
            <Button
              color='primary'
              variant='shadow'
              onClick={() => {
                AssignPermissionsUser(selectedUser.email);
              }}
            >
              Submit
            </Button>
          </div>
          <h1 className='text-center mt-[1rem]'>
            Note : Admin permission will be selected by defaul if all other
            permissions are given to change remove admin permission first the
            add other permissions{" "}
          </h1>
          <h1 className='text-center mt-[1rem]'>
            Note : If Permission is Selected by default user will have newuser
            permission{" "}
          </h1>
          <h2 className='text-center mb-[2rem]'>
            with newuser permission user can only view and create css elements
            but after login
          </h2>
        </div>
      )}
    </>
  );
}
