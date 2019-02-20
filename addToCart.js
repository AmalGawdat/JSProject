var addCartBtn = document.getElementById('addCartBtn');


var myProduct;
function getInfo(){
    
location.queryString={};
location.search.substr(1).split('&').forEach(function(pair){
    if(pair==="") return;
    var parts = pair.split('=');
    location.queryString[parts[0]]=parts[1] && decodeURIComponent(parts[1].replace(/\+/g, " "));
    console.log(parts[1]);
    localStorage.setItem('id',parts[1])
    console.log(localStorage.id);
 myProduct =getProduct(parts[1]);
    
});  

}
function fillCart()
    {
        var html = "<img src='"+myProduct.picture+"'>";
    document.getElementById('picCart').innerHTML += html;
    
    var secondHtml="<h1>"+myProduct.name+"</h1>";
    secondHtml +="<h2>Price: "+myProduct.price+"</h2><br>";
    document.getElementById('infoCart').innerHTML += secondHtml;

    }

addCartBtn.addEventListener('click',function(){
    if(!localStorage.username)
        alert('Please login first in order to be able to purchase');
    else if(localStorage.username){
    getInfo();
     alert('Item has been added to your cart');
        
//        window.location.replace('Cart.html','_self');
//        fillCart();
    }
})