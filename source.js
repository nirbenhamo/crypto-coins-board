

const url = "https://api.coincap.io/v2/assets";
const input = document.querySelector("#input");

const loadHtml = (item) => {

  const tabel_row = document.createElement("tr");

  const th_rank = document.createElement("th");
  th_rank.append(item.rank);

  const td_name = document.createElement("td");
  td_name.innerHTML = `<a href="https://www.google.com/search?q=${item.name}&rlz=1C1KNTJ_iwIL1015IL1015&sxsrf=ALiCzsZfTtZh1gd9Fyz1sFQFBLK65PmGEg%3A1672350379548&ei=qwquY-yHIcCakdUP58KJgAI&ved=0ahUKEwisicDS5p_8AhVATaQEHWdhAiAQ4dUDCA8&uact=5&oq=${item.name}&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAzIECAAQQzILCAAQgAQQsQMQgwEyCAgAEAoQARBDMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDoKCAAQRxDWBBCwAzoHCAAQsAMQQzoNCAAQ5AIQ1gQQsAMYAToSCC4QxwEQ0QMQyAMQsAMQQxgCOgcIIxDqAhAnOgwIABDqAhC0AhBDGAM6EgguEMcBENEDEOoCELQCEEMYAzoECCMQJzoOCC4QgAQQsQMQxwEQ0QM6EQguEIAEELEDEIMBEMcBENEDOg0ILhCxAxDHARDRAxBDOgoIABCxAxCDARBDOg4ILhCABBCxAxCDARDUAjoICC4QgAQQsQNKBAhBGABKBAhGGAFQ_S9YuTNgzTxoBHABeACAAacBiAHXA5IBAzAuM5gBAKABAbABFMgBEcABAdoBBggBEAEYCdoBBggCEAEYCNoBBggDEAEYAQ&sclient=gws-wiz-serp" target="_blank">${item.name}</a>`;
  td_name.setAttribute(`title`,`For more information click on me`);

  const td_symbol = document.createElement("td");
  td_symbol.append(item.symbol);

  const td_price = document.createElement("td");
  let fixed_price = eval(item.priceUsd);
  td_price.append(`${fixed_price.toFixed(2)}$`);

  tabel_row.append(
    th_rank,
    td_name,
    td_symbol,
    td_price
  );
  tbody.append(tabel_row);

};

let filtered_data;

input.addEventListener("input", (e)=>{
  const input_value = e.target.value;
  const filtered_coin = filtered_data.filter(coin => coin.symbol.toLowerCase().includes(input_value.toLowerCase()) || coin.name.toLowerCase().includes(input_value.toLowerCase()) );
  
  if(filtered_coin.length > 0){
    
    tbody.innerHTML= " ";
    filtered_coin.map((coin) => {
      loadHtml(coin);
    })
  } else{
    tbody.innerHTML = "אין תוצאות";
    
  }
})


const getData = async () => {
  try{
    const response = await fetch(url);
    const data = await response.json();
    filtered_data = data.data;
    filtered_data.map((coin) => {
      loadHtml(coin);
    });
    
  } catch (error){
    console.log("error:" + error);
  } finally{
    console.log(`eli finish`);
  }
}


getData();



