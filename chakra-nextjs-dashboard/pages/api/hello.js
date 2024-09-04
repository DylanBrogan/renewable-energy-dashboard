// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

function fetchData(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      return data; // Return the fetched data so it can be used elsewhere
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

