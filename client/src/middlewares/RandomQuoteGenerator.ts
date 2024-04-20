export default async function RandomQuoteGenerator() {
    const category :string = "computers";
  return await fetch("https://api.api-ninjas.com/v1/quotes?category=" + category, {
      method: "GET",
      headers: { "X-Api-Key": "GfUehh3ZBZOC0ib1ngcH5w==6tyaEfLIgCUc0KWu" },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
return data
  })
      .catch((error) => console.error("Error:", error));

}
