window.addEventListener('load' , function()
{
    clickedbtn = document.getElementById('sizeDiv');      
    clickedbtn.addEventListener('click',function(e)
    {
        if(  e.target.type == "button")
        {
            if(e.target.style.backgroundColor=="darkcyan")
                {
                    Array.from(  document.querySelectorAll(".clickedBtn")).forEach(b => b.style.backgroundColor="beige");
                    e.target.style.backgroundColor="beige";
                }
            else
                {
                    Array.from(  document.querySelectorAll(".clickedBtn")).forEach(b => b.style.backgroundColor="beige");
                    e.target.style.backgroundColor="darkcyan";
                }
        }
    })
})