/* eslint-disable @typescript-eslint/no-explicit-any */
interface Challenge1 {
  id: string;
  title: string;
  sdesc: string;
  description: string;
  img: string;
  status: string;
  date: { from: string; to: string };
  submissions: any[];
}
const Csschallengesdata: Challenge1[] = [];
const fetchCsschallengesdata = async () => {
  fetch(`${import.meta.env.VITE_BASE_URL}/csschallenges`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      Csschallengesdata.push(...data);
    })
    .catch((error) => console.error("Error:", error));
};
fetchCsschallengesdata();
export default Csschallengesdata;
