// Base url 
const apiKey = "CG-uLQe9ky4kiDPgvj1Bfyc76vC";
// OUr request should look like this , 
// Query parameters for api : 
// const coinsEndpoint = `${baseURL}coins/list?include_platform=true${queryParam_forApi}`

// x_cg_demo_api_key=your_api_key
const queryParam_forApi = `?x_cg_demo_api_key=${apiKey}`

const baseURL = "https://api.coingecko.com/api/v3/";
const TredingEndpoint = 'search/trending'
const Fetch_TredingUrl = `${baseURL}${TredingEndpoint}${queryParam_forApi}`



const getTrending = async () => {
  const response = await fetch(Fetch_TredingUrl);
  try {
    if (response.ok) {
      const responseJsonCoins = await response.json();
      // console.log(responseJsonCoins.coins);
      // we have a object , that object has a key with Coins , the value of the coins key  is an Array and that 
      // array contains 7 different objects 
      const coins_Array_that_has_objects = responseJsonCoins.coins;
      const resultArray = [];
      for (let EachcoinObj of coins_Array_that_has_objects) {
        resultArray.push([EachcoinObj.item.name, EachcoinObj.item.symbol, EachcoinObj.item.small]);
        ;
      }
      return resultArray;



    }
    else {
      throw new Error("Network error ! GOT false value for response.ok // Couldn't get 200 from api");
    }
  }
  catch (error) {
    console.log(error);
  }
}




const PopulateTredingContainer = () => {
  const TredingData = getTrending().then((ArrayOfArray) => {
    //extract ith element and display and [i,i+1] of that ith element 
    // repeat until end of array 

    // Create an ordered list with seven list items inside it. 
    for (let i = 0; i < ArrayOfArray.length; i++) {
      const parentListCotainer = document.getElementById('coinsLists');
      const listItem = document.createElement('li');
      const imgCoin = document.createElement('img');
      imgCoin.src = ArrayOfArray[i].slice(-1)
      // console.log(ArrayOfArray[i].slice(-1));
      // console.log(imgCoin);
      imgCoin.classList = "crypto_image";
  

      listItem.innerHTML = ArrayOfArray[i].slice(0,2).join(" ");
      listItem.appendChild(imgCoin);
      parentListCotainer.appendChild(listItem);

    }


  })

}

const searchCoin = ()=>{
    document.querySelector('.search-button').addEventListener('click',()=>{
       const searchquery = document.querySelector('.search-bar').firstElementChild.value;
       console.log(searchquery)
    })

}

searchCoin();
PopulateTredingContainer();