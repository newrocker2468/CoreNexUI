import AnimatedLoading from "@/components/AnimatedLoading";
import UserContext from "@/components/UserContext";
import { useContext, useEffect } from "react";
import SideBar from "@/components/SideBar";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

const Profile = () => {

  const { user } = useContext(UserContext);

  function printUntilAt(s: string) {
    let i = 0;
    const arr = [];
    while (i < s.length && s[i] !== "@") {
      arr.push(s[i]);
      i++;
    }
    return arr.join("");
  }


  const emailname = printUntilAt(user.email);
  // console.log(user);
  
    return (
      <>
        <div className='flex'>
          <SideBar />
          <div className='flex flex-col w-[70%] p-5 '>
            <div className='flex justify-flex-start  '>
              <AnimatedLoading
                img={`${user.highres_img}`}
                width={250}
                height={200}
              />
              <div className='ml-5'>
                <p>{user.userName}</p>
                <p>{emailname}</p>
                <p>{user.bio}</p>
              </div>
            </div>
            <section>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
              qui obcaecati unde quas dicta quisquam, sint quod quia minima
              error eligendi molestias voluptatum cumque est recusandae
              reiciendis modi illum soluta.
            </section>
            <div className='flex w-full flex-col m-5'>
              <Tabs aria-label='Options'>
                <Tab key='Posts' title='Posts'>
                  <Card>
                    <CardBody>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </CardBody>
                  </Card>
                </Tab>
                <Tab key='music' title='Music'>
                  <Card>
                    <CardBody>
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco
                      laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                      irure dolor in reprehenderit in voluptate velit esse
                      cillum dolore eu fugiat nulla pariatur.
                    </CardBody>
                  </Card>
                </Tab>
                <Tab key='videos' title='Videos'>
                  <Card>
                    <CardBody>
                      Excepteur sint occaecat cupidatat non proident, sunt in
                      culpa qui officia deserunt mollit anim id est laborum.
                    </CardBody>
                  </Card>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </>
    );
  }

export default Profile;