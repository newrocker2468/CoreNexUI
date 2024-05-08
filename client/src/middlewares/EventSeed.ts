
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
