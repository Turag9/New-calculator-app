let begitem;
onload();
function onload(){
    let begitemstr=localStorage.getItem('begitem');
    begitem = begitemstr ? JSON.parse(begitemstr) :[];
    bagitemcount();
    display();
  
}
function addbag(itemid){
    begitem.push(itemid);
    localStorage.setItem('begitem',JSON.stringify(begitem));
    bagitemcount();
}
function bagitemcount(){
    let totalitem=document.querySelector(`.item-count`);
    if(begitem.length>0){
    totalitem.style.visibility='visible';
    totalitem.innerHTML=begitem.length;
    }else{
    totalitem.style.visibility='hidden';
    }
}
function display()
{
    let itemss=document.querySelector(`.items-container`);
    if(!itemss)return;
let innerHTML='';
items.forEach(element => {
    innerHTML+=
    `         
 <div class="item-container">
            <img class="item-image" src=${element.image} alt="items">
            <div class="item-rating">
               ${element.rating.stars}|${element.rating.count}
            </div>
            <div class="company-name">
                ${element.company}
            </div>
            <div class="item-name">
                ${element.item_name}
                <div class="item-price">
                    <span class="price">₹${element.current_price}</span>
                    <span class="orginal-price">₹${element.original_price}</span>
                    <span class="offer">(${element. discount_percentage}% OFF)</span>
                </div>
            </div>
            <button class="add-bag" onclick="addbag(${element.id})">Add to Bag</button>
            </div>

`;
});
itemss.innerHTML=innerHTML;
}

