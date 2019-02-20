
$(function () {
    var ResultOfSearch = JSON.parse(window.localStorage.getItem("ResultOfSearch"));
    
    var searchTitle = document.querySelector("#searchTitle");
    var searchDiv = document.querySelector("#searchDiv");
    if(ResultOfSearch.length > 0)
    {
        var Txt =window.localStorage.getItem("searchText");
        //var CorrectTxt =window.localStorage.getItem("searchCorrectText");
        //if(Txt==CorrectTxt)
        searchTitle.innerText = Txt;
        //else
        //    searchTitle.innerText = "Did you mean : "+CorrectTxt;
        for(var i=0;i<ResultOfSearch.length;i++)
        {
            var div = document.createElement('div');
            var anchor = document.createElement('a');
            anchor.href = 'Product.html?productid=' + ResultOfSearch[i].id;
            var img = document.createElement("img");
            var par = document.createElement("p");
            img.src = ResultOfSearch[i].picture;
            anchor.appendChild(img);
            div.appendChild(anchor);
            par.appendChild(document.createTextNode(ResultOfSearch[i].name));
            div.appendChild(par);
            var par2 = document.createElement("p");
            par2.appendChild(document.createTextNode(ResultOfSearch[i].price));
            div.appendChild(par2);
            searchDiv.appendChild(div);
        }
    }   
    
    var data = JSON.parse(window.localStorage.getItem("data"));
    $('.autocomplete').autocomplete({lookup:data});
    
    $("#searchBtn").click(function(){
        var AllJSON = JSON.parse(window.localStorage.getItem("AllJSON"));
        var searchTxt = document.querySelector("#inpt-txt-srch");
        if(searchTxt.value.length > 0 )
        {
            ResultOfSearch = [];
            
            for(var item of AllJSON["categories"])
            {
                if(item.name.toLowerCase().indexOf(searchTxt.value.toLowerCase())!=-1 || searchTxt.value.toLowerCase().indexOf(item.name.toLowerCase())!=-1 )
                {
                    for(var item2 of item.categories)
                    {
                        for(var item3 of item2.categories)
                        {
                            for(var item4 of item3.products)
                            {
                                ResultOfSearch.push(item4);
                            }
                        }
                    }
                }
                else
                {
                    for(var item2 of item.categories)
                    {
                        if(item2.name.toLowerCase().indexOf(searchTxt.value.toLowerCase())!=-1 || searchTxt.value.toLowerCase().indexOf(item2.name.toLowerCase())!=-1 )
                        {
                            for(var item3 of item2.categories)
                            {
                                for(var item4 of item3.products)
                                {
                                    ResultOfSearch.push(item4);
                                }
                            }
                        }
                        else
                        {
                            for(var item3 of item2.categories)
                            {
                                if(item3.name.toLowerCase().indexOf(searchTxt.value.toLowerCase())!=-1 || searchTxt.value.toLowerCase().indexOf(item3.name.toLowerCase())!=-1 )
                                {
                                    for(var item4 of item3.products)
                                    {
                                        ResultOfSearch.push(item4);
                                    }
                                }
                                else
                                {
                                    for(var item4 of item3.products)
                                    {
                                        if(item4.name.toLowerCase().indexOf(searchTxt.value.toLowerCase())!=-1 || searchTxt.value.toLowerCase().indexOf(item4.name.toLowerCase())!=-1 )
                                        {
                                            ResultOfSearch.push(item4);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

            }
            if(ResultOfSearch.length > 0)
            {
                var myWindow =window.open('SearchTab.html',name="__self");
                window.localStorage.removeItem("ResultOfSearch");
                window.localStorage.setItem("ResultOfSearch", JSON.stringify(ResultOfSearch));
                window.localStorage.removeItem("searchText");
                window.localStorage.setItem("searchText", searchTxt.value);
            }
        }
    });
});