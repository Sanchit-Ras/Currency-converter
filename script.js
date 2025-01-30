const base_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
let msg=document.querySelector(".msg");
for(let select of dropdowns){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        select.append(newOption);
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }
        if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected";
        }
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}
const updateFlag=(element)=>{
    let currCode=element.value;
    let newSrc=`https://flagsapi.com/${countryList[currCode]}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
};


btn.addEventListener("click", async(evt)=>{
    evt.preventDefault();
    let amount=document.querySelector("input");
    let amtVal=amount.value;
    if(amtVal==="" || amtVal<1){
        amtVal=1;
        amount.value="1";
    }
    let URL=`${base_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response= await fetch(URL);
    let data=await response.json();
    let rate=data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    let final_amt=rate*amtVal;
    msg.innerText=`${amtVal} ${fromCurr.value} is ${final_amt} ${toCurr.value}`;
});