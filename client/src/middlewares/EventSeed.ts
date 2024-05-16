
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
 await fetch(`${import.meta.env.VITE_BASE_URL}/events`, {
   method: "GET",
   headers: {
     "Content-Type": "application/json",
   },
 })
   .then((response) => response.json())
   .then((data) => {
     EventData.push(...data);
   })
   .catch((error) => console.error("Error:", error));
};
fetchEventData();
export default EventData;
