var loginArea = document.getElementById('signInDiv');
var loginBtn = document.getElementById('signInBtn');
var usrname = document.getElementById('name');
var password=document.getElementById('password')


loginBtn.addEventListener('click',function(){
    if(usrname.value.length==0)
        alert('Please enter your username');
    
    else if(password.value.length==0)
        alert('Please enter your password');
    else{
  localStorage.setItem('username',usrname.value);
   loginArea.innerHTML='Welcome '+ usrname.value +'<br> <a onclick="localStorage.removeItem(\'username\')" href=\'\'>Logout</a> <br> <a href=\'CartPage.htm\'>My Cart</a>';
}})

if(localStorage.username)
{loginArea.innerHTML='Welcome '+ localStorage.username+'<br> <a onclick="localStorage.clear()" href=\'\'>Logout</a> <br> <a href=\'CartPage.htm\'>My Cart</a>';}

    
