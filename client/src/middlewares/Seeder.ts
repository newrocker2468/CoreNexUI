interface Challenge1 {
  id: string;
  title: string;
  sdesc: string;
  description: string;
  img: string;
  status: string;
  date: { from: string; to: string };
  submissions: [];  
}
const Csschallengesdata: Challenge1[] = [];
const fetchCsschallengesdata = async () => {
  fetch(`http://localhost:3000/csschallenges`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {

      Csschallengesdata.push(...data);
      console.log(Csschallengesdata);
    })
    .catch((error) => console.error("Error:", error));
};
fetchCsschallengesdata();
export default Csschallengesdata;
