import AnimatedLoading from "@/components/AnimatedLoading";
import UserContext from "@/components/UserContext";
import { useContext } from "react";
import SideBarcomp from "@/components/Sidebarcomp";
const Profile = () => {
    const { user } = useContext(UserContext);
function printUntilAt(s :string) {
  let i = 0;
  const arr=[]
  while (i < s.length && s[i] !== "@") {
arr.push(s[i])
    i++;
  }
  return arr.join('')
}
const emailname = printUntilAt(user.email)
    console.log(user);
    return (
      <>
        <SideBarcomp />
        <div className='flex flex-col w-[70%] p-5 ml-[12rem]'>
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit qui
            obcaecati unde quas dicta quisquam, sint quod quia minima error
            eligendi molestias voluptatum cumque est recusandae reiciendis modi
            illum soluta.
          </section>
        </div>
      </>
    );
}
export default Profile;