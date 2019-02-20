
$(function () {
    var AllJSON=[];
    var ResultOfSearch = [];
    
    var searchTxt = document.querySelector("#inpt-txt-srch");
    
    $.ajax({
        method: 'GET',
        url: './Picky.json',
        statusCode: {
            200: function (AllJSON) {
                 var data = [];
                for(var item of AllJSON["categories"])
                {
                    if(!data.includes(item.name))
                        data.push(item.name);
                    for(var item2 of item.categories)
                    {
                        if(!data.includes(item2.name))
                            data.push(item2.name);
                        for(var item3 of item2.categories)
                        {
                            if(!data.includes(item3.name))
                                data.push(item3.name);
                            for(var item4 of item3.products)
                            {
                                if(!data.includes(item4.name))
                                    data.push(item4.name);
                            }
                        }
                    }

                }
                $('.autocomplete').autocomplete({lookup:data});
                  $("#searchBtn").click(function(){
                        if(searchTxt.value.length > 0 )
                        {
                            for(var item of AllJSON["categories"]){
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
                                    /*
                                    for(item3 in AllJSON["categories"][item]["categories"])
                                    {
                                        for(item4 in AllJSON["categories"][item]["categories"][item3]["categories"])
                                        {
                                            if(item3.indexOf(searchTxt.value)!=-1 || searchTxt.value.indexOf(item)!=-1)
                                            {
                                                window.localStorage.setItem("searchCorrectText", item);
                                                for(item2 in AllJSON[item])
                                                {
                                                    ResultOfSearch.push(AllJSON[item][item2]);
                                                }
                                            }
                                            else
                                            {
                                                for(item2 in AllJSON[item3])
                                                {
                                                    if(item2.indexOf(searchTxt.value)!=-1 || searchTxt.value.indexOf(item2)!=-1){
                                                        ResultOfSearch.push(AllJSON[item][item2]);
                                                        window.localStorage.setItem("searchCorrectText", item2);
                                                    }
                                                }
                                            } 
                                        }
                                    }
                                    */
                                }
                                
                            }
                            if(ResultOfSearch.length > 0)
                            {
                                var myWindow =window.open('SearchTab.html',name="__self");
                                window.localStorage.setItem("AllJSON", JSON.stringify(AllJSON));
                                window.localStorage.setItem("ResultOfSearch", JSON.stringify(ResultOfSearch));
                                window.localStorage.setItem("searchText", searchTxt.value);
                                window.localStorage.setItem("data",JSON.stringify(data));
                            }
                        }
                    });
            }
        }
    });
   
});