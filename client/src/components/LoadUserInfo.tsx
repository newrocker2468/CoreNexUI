import { Autocomplete, AutocompleteItem, Avatar } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadUserData from "@/components/LoadUserData";

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
};

export default function LoadUserInfo() {
  const [users, setuser] = useState<User[]>([]);
  const [value, setValue] = useState<string | number | null | undefined>("cat");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      axios
        .get("http://localhost:3000/getalluserdata", {
          withCredentials: true,
        })
        .then((res) => {
          setuser(res.data.user);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    console.log(users);
  }, [users]);

  return (
    <>
      <div className="flex justify-center align-center">
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
      {selectedUser && <LoadUserData email={selectedUser.email} />}
    </>
  );
}
