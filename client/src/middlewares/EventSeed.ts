import { v4 as uuidv4 } from "uuid";
import uiversecss from "@/images/uiversecss2.jpg";
import { addDays } from "date-fns";
// const Csschallengesdata = [
//   {
//     id: 1,
//     title: "Tooltip Challenge",
//     sdesc: "Create an eye-catching tooltip",
//     description:
//       'In this challenge, your mission is to craft an eye-catching, informative tooltip. Aim to include interactions, such as having it pop out by hovering. Selected tooltips from this challenge will be published as normal posts under a new "Tooltip" category. You can use both CSS or Tailwind.',
//     img: uiversecss,
//     status: "Finished",
//     date: {
//       from: new Date().toDateString(),
//       to: addDays(new Date(), 7).toDateString(),
//     },
//   },
// ];

interface Challenge1 {
  id: string;
  eventName: string;
  description: string;
  img: string;
  status: string;
  date: { from: string; to: string };
}
const EventData: Challenge1[]= [];
const fetchEventData = async () => {
 await fetch(`http://localhost:3000/events`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      EventData.push(...data);
      console.log(EventData);
    })
    .catch((error) => console.error("Error:", error));
};
fetchEventData();
export default EventData;
