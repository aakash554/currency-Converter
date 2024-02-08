const base_url="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/"
const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
document,addEventListener("load",()=>{
    start();
})
for(let select of dropdowns){
    for ( curCode in countryList){
        let newOption =document.createElement("option");
        newOption.innerText=curCode;
        newOption.value=curCode;
        if(select.name==="from"&& curCode==="USD"){
            newOption.selected="selected";
        }
        if(select.name==="to"&& curCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}
const updateFlag=(evt)=>{
    let curCode=evt.value;
    let countryCode=countryList[curCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img =evt.parentElement.querySelector("img");
    img.src=newSrc;
}
btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    start();
    
});
const updateMsg=(rate,amountValue,)=>{
    let ans=amountValue*rate;
    let msg=document.querySelector(".msg");
    msg.innerText=`${amountValue} ${fromCurr.value} = ${ans}  ${toCurr.value}`;
}
const start=async ()=>{
    let amount=document.querySelector(".amount input");
    let amountValue=amount.value;
    if(amountValue===""|| amountValue<1){
        alert("Enter Valid Amount");
    }
    const url=`${base_url}${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response =await fetch(url);
    let data = await response.json(); 
    let rate=data[toCurr.value.toLowerCase()];
    updateMsg(rate,amountValue);
}


