let itemobject;

function onload(){
    loaditemobject();
    display();
    displaybagsummary();
}
function displaybagsummary(){
  let bagsummary=document.querySelector('.bag-summary');
  let totalmrp=0;
  let totaldis=0;
  let total=0;
  itemobject.forEach(item=>{
    totalmrp+=item.original_price;
    totaldis+=(item.original_price - item.current_price);
  });
  total=totalmrp - totaldis + 99;
  bagsummary.innerHTML=`
   <div class="bag-details-container">
            <div class="price-header">PRICE DETAILS (${itemobject.length} Items) </div>
            <div class="price-item">
              <span class="price-item-tag">Total MRP</span>
              <span class="price-item-value">Rs${totalmrp}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on MRP</span>
              <span class="price-item-value priceDetail-base-discount">-Rs${totaldis}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Convenience Fee</span>
              <span class="price-item-value">Rs 99</span>
            </div>
            <hr>
            <div class="price-footer">
              <span class="price-item-tag">Total Amount</span>
              <span class="price-item-value">Rs ${total}</span>
            </div>
          </div>
          <button class="btn-place-order">
            <div class="css-xjhrni">PLACE ORDER</div>
          </button>
  `;
}
onload();

function loaditemobject(){
    itemobject = begitem.map(itemid => {
        for(let i=0;i<items.length;i++){
            if(itemid == items[i].id){
                return items[i];
            }
        }
    });
}

function display(){
    let container=document.querySelector('.bag-items-container');
    let innerhtml='';
    for(let i=0;i<itemobject.length;i++)
    {
        innerhtml+=genitemhtml(itemobject[i]);
    }
    container.innerHTML=innerhtml;
}
function removebag(itemid)
{
    begitem=begitem.filter(begid => begid!==itemid);
    localStorage.setItem('begitem',JSON.stringify(begitem));
    loaditemobject();
    bagitemcount();
    display();
    displaybagsummary();
}
function genitemhtml(item){
    return `
          <div class="bag-item-container">
            <div class="item-left-part">
              <img class="bag-item-img" src="${item.image}">
            </div>
            <div class="item-right-part">
              <div class="company">${item.company}</div>
              <div class="item-name">${item.item_name}</div>
              <div class="price-container">
                <span class="current-price">Rs ${item.current_price}</span>
                <span class="original-price">Rs ${item.original_price}</span>
                <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
              </div>
              <div class="return-period">
                <span class="return-period-days">${item.return_period} days</span> return available
              </div>
              <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${item.delivery_date}</span>
              </div>
            </div>
            <div class="remove-from-cart" onclick="removebag(${item.id})">X</div>
          </div>
        `;
}
