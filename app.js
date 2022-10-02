
      let coinsData = [];
      let current_page = 1;
      let records_per_page = 10;

      const pagination = document.querySelector(".pagination");
      let searchTable = document.getElementById("searchTable");
      
      let h1 = document.getElementById("h1")

      let hideAlso = document.getElementById("hideAlso")
      let hideTable = document.getElementById("hideTable");

      let body = document.getElementById("body");
              // body.innerHTML = " ";
      let crypto2 = document.getElementById("crypto2");
      let apiUrl =
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=300&page=1&sparkline=false";
      let apiUrl1 = "https://api.coingecko.com/api/v3/search/trending";

      let apiUrl2 = "https://api.coingecko.com/api/v3/coins/categories/list";

      const pageSize = 10;
      let curPage = 1;

      async function renderTable(page = 1) {
        await getData();

        if (page == 1) {
          prevButton.style.visibility = "hidden";
        } else {
          prevButton.style.visibility = "visible";
        }

        if (page == numPages()) {
          nextButton.style.visibility = "hidden";
        } else {
          nextButton.style.visibility = "visible";
        }

        //   // create html
        let cryptoCoin = "";
        coinsData
          .filter((row, index) => {
            let start = (curPage - 1) * pageSize;
            let end = curPage * pageSize;
            if (index >= start && index < end) return true;
          })
          .forEach(coin => {
            console.log(coin);
            cryptoCoin += "<tr>";
              cryptoCoin += `<td> #${coin.market_cap_rank.toLocaleString()} </td>`;
            cryptoCoin += `<td> <img src= ${coin.image}> <br>${coin.name} </td>`;
           
            cryptoCoin += `<td> $${coin.symbol.toUpperCase()} </td>`;
            cryptoCoin += `<td> $${coin.current_price.toLocaleString()} </td>`;
            cryptoCoin += `<td id= "colorTd"> ${coin.price_change_percentage_24h.toLocaleString()}%  </td>`;
          
              

            cryptoCoin += `<td>  $${coin.ath.toLocaleString()}<br> on <br> ${coin.ath_date.substring(0,10)}  </td>`;
            cryptoCoin += `<td> $${coin.atl.toLocaleString()} <br> on <br> ${coin.atl_date.substring(0,10)}  </td>`;


            cryptoCoin += `<td> $${coin.market_cap.toLocaleString()} </td>`;
            

            cryptoCoin += `<td> ${coin.circulating_supply.toLocaleString()}  $${coin.symbol.toUpperCase()}</td>`;
            cryptoCoin += `<td> ${coin.total_supply}  $${coin.symbol.toUpperCase()} </td>`;
            ("<tr>");
          });
        document.getElementById("data").innerHTML = cryptoCoin;
      }

      function previousPage() {
        if (curPage > 1) {
          curPage--;
          renderTable(curPage);
        }
      }

      function nextPage() {
        if (curPage * pageSize < coinsData.length) {
          curPage++;
          renderTable(curPage);
        }
      }

      renderTable();

      function numPages() {
        return Math.ceil(coinsData.length / pageSize);
      }

      document
        .querySelector("#nextButton")
        .addEventListener("click", nextPage, false);
      document
        .querySelector("#prevButton")
        .addEventListener("click", previousPage, false);
      //Fetch Data from API
      async function getData() {
        const response = await fetch(apiUrl);
        const coins = await response.json();
        console.log(coins);
        coinsData = coins;
      }

      async function getData1() {
        const response = await fetch(apiUrl1);
        const coins = await response.json();
        console.log(coins);
        coinsData = coins;
      }
      async function getData2() {
        const response = await fetch(apiUrl2);
        const coins = await response.json();
        console.log(coins);
        coinsData = coins;
      }

      // getting the words fromm the input and putting onto the console
      let searchForm = document.getElementById("searchForm");

      let searchBar = document.getElementById("searchBar");

      searchForm.addEventListener("submit", function (e) {
        e.preventDefault();
        console.log("crypto name here " + searchBar.value);
        searchCrypto(searchForm.cryptoName.value);
      });
// 

 //  getting the trending coins for the day

 function trendingCrypto() {
        hideAlso.innerHTML = ""
        // hideTable.innerHTML = ""
        
        let body = document.getElementById("body");
        // body.innerHTML = "";
        let cryptoCoin = "";
        pagination.innerHTML = " ";

      

        let cryptoBody1 = document.querySelector(".crypto");
        let cryptoBody2 = document.querySelector(".crypto1");
        // cryptoBody1.innerHTML = "";
        // cryptoBody2.innerHTML = "";


        // crypto2.innerHTML = "";

        const query = "https://api.coingecko.com/api/v3/search/trending";
        fetch(query)
          .then(res => {
            console.log("Response success");
            return res.json();
          })
          .then(data => {
            console.log("We got the data");

            console.log(data.coins);

            Object.keys(data).forEach(key => {
              console.log(data.coins[name]);
              // console.log(Object.keys(data));
              // console.log(Object.values(data));

              // console.log(data[key]);

              // crypto2.innerHTML = " ";
         
              cryptoCoin += `<table class= "table table-bordered" id= "trendingTable">`;
                let trendingTable = document.getElementById("trendingTable")
              cryptoCoin += "<tr>";
              cryptoCoin += "<th>🔥 Trending 🔥 </th>";
              cryptoCoin += "<th> Name </th>";
              cryptoCoin += "<th> Ticker </th>";
              cryptoCoin += "<th> Price in BTC</th>";
              cryptoCoin += "<th> Market Cap Rank </th>";

              cryptoCoin += "</tr>";
              cryptoCoin += "<tr>";

              cryptoCoin += `<td> <img src= ${data.coins[0].item.large}> </td>`;
              cryptoCoin += `<td>  ${data.coins[0].item.name}</td>`;
              cryptoCoin += `<td>$${data.coins[0].item.symbol.toUpperCase()} </td>`;
              cryptoCoin += `<td>${data.coins[0].item.price_btc.toFixed(
                10
              )} BTC </td>`;
              cryptoCoin += `<td>#${data.coins[0].item.market_cap_rank} </td>`;
              cryptoCoin += "</tr>";
              cryptoCoin += "<tr>";

              cryptoCoin += `<td> <img src= ${data.coins[1].item.large}> </td>`;
              cryptoCoin += `<td>  ${data.coins[1].item.name}</td>`;
              cryptoCoin += `<td>$${data.coins[1].item.symbol.toUpperCase()} </td>`;
              cryptoCoin += `<td>${data.coins[1].item.price_btc.toFixed(
                10
              )} BTC </td>`;
              cryptoCoin += `<td>#${data.coins[1].item.market_cap_rank} </td>`;

              cryptoCoin += "</tr>";
              cryptoCoin += "<tr>";

              cryptoCoin += `<td> <img src= ${data.coins[2].item.large}> </td>`;
              cryptoCoin += `<td>  ${data.coins[2].item.name}</td>`;
              cryptoCoin += `<td>$${data.coins[2].item.symbol.toUpperCase()} </td>`;
              cryptoCoin += `<td>${data.coins[2].item.price_btc.toFixed(
                10
              )} BTC </td>`;
              cryptoCoin += `<td>#${data.coins[2].item.market_cap_rank} </td>`;

              cryptoCoin += "</tr>";
              cryptoCoin += "<tr>";

              cryptoCoin += `<td> <img src= ${data.coins[3].item.large}> </td>`;
              cryptoCoin += `<td>  ${data.coins[3].item.name}</td>`;
              cryptoCoin += `<td>$${data.coins[3].item.symbol.toUpperCase()} </td>`;
              cryptoCoin += `<td>${data.coins[3].item.price_btc.toFixed(
                10
              )} BTC </td>`;
              cryptoCoin += `<td>#${data.coins[3].item.market_cap_rank} </td>`;

              cryptoCoin += "</tr>";
              cryptoCoin += "<tr>";

              cryptoCoin += `<td> <img src= ${data.coins[4].item.large}> </td>`;
              cryptoCoin += `<td>  ${data.coins[4].item.name}</td>`;
              cryptoCoin += `<td>$${data.coins[4].item.symbol.toUpperCase()} </td>`;
              cryptoCoin += `<td>${data.coins[4].item.price_btc.toFixed(
                10
              )} BTC </td>`;
              cryptoCoin += `<td>#${data.coins[4].item.market_cap_rank} </td>`;

              cryptoCoin += "</tr>";
              cryptoCoin += "<tr>";

              cryptoCoin += `<td> <img src= ${data.coins[5].item.large}> </td>`;
              cryptoCoin += `<td>  ${data.coins[5].item.name}</td>`;
              cryptoCoin += `<td>$${data.coins[5].item.symbol.toUpperCase()} </td>`;
              cryptoCoin += `<td>${data.coins[5].item.price_btc.toFixed(
                10
              )} BTC </td>`;
              cryptoCoin += `<td>#${data.coins[5].item.market_cap_rank} </td>`;

              cryptoCoin += "</tr>";
              cryptoCoin += "<tr>";

              cryptoCoin += `<td> <img src= ${data.coins[6].item.large}> </td>`;
              cryptoCoin += `<td>  ${data.coins[6].item.name}</td>`;
              cryptoCoin += `<td>$${data.coins[6].item.symbol.toUpperCase()} </td>`;
              cryptoCoin += `<td>${data.coins[6].item.price_btc.toFixed(
                10
              )} BTC </td>`;
              cryptoCoin += `<td>#${data.coins[6].item.market_cap_rank} </td>`;

              cryptoCoin += "</tr>";
              cryptoCoin += "</table>";

            
              crypto2.innerHTML = cryptoCoin;
              
            });
          });
        }

          // 





      //  
      // function for searching coins
      function searchCrypto(cryptoName) {
        h1.remove()
        searchTable.scrollIntoView({behavior: 'smooth'})
        searchTable.innerHTML = ""
        body.innerHTML = " "
        // trendingTable.innerHTML = ""
        
       
        pagination.innerHTML = " ";
      
      

        let mainDiv = document.querySelector(".crypto");
        
        hideTable.removeAttribute("hidden");

        const query = `https://api.coingecko.com/api/v3/search?query=${cryptoName}`;

        // const query = `https://api.coingecko.com/api/v3/coins/${cryptoName}?include_platform=falselocalization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=true`;
        fetch(query)
          .then(res => {
            console.log("Response success");
            return res.json();
          })
          .then(data => {
            console.log("We got the data");

            for (const element of data.coins) {
              console.log("element is:" + element.large);

              let cryptoCoin = "";

              let tr2 = document.createElement("tr");
              tr2.classList.add("tr2body");
              tr2.innerHTML = " ";
              let td1 = document.createElement("td");
              td1.innerHTML = `<img src= ${element.large}>`;
              let td2 = document.createElement("td");
              td2.innerHTML = element.name;
              let td3 = document.createElement("td");
              td3.innerHTML = `$${element.symbol.toUpperCase()}`;
              let td4 = document.createElement("td");
              td4.innerHTML = `#${element.market_cap_rank}`;

              tr2.append(td1, td2, td3, td4);

              searchTable.append(tr2);
            

              document.querySelector(".crypto1").innerHTML = cryptoCoin;

            }
          })
          .catch(err => {
            pagination.innerHTML = " ";
            let cryptoCoin = "";
            let mainDiv1 = document.querySelector(".crypto1");

            let mainDiv = document.querySelector(".crypto");
            // mainDiv.innerHTML = " ";
            console.log(err + "coin not found");

            let searchDiv = document.createElement("div");
            let p1 = document.createElement("p");
            p1.innerHTML =
              '<strong><i class="fa-solid fa-circle-exclamation"></i>  Error!  <i class="fa-solid fa-circle-exclamation"></i></strong> <br>  Coin not Found! Make sure you have entered the correct coin ID, refer to this list of all the coins and their Id: <a href= "https://docs.google.com/spreadsheets/d/1wTTuxXt8n9q7C4NDXqQpI3wpKu1_5bGVmP9Xz0XGSyU/edit#gid=0"> Click here for the list of coins. </a>';

            searchDiv.append(p1);
            mainDiv.append(searchDiv);
          });
      }
