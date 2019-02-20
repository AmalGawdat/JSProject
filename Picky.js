var pickyData;
var pageCategory;

window.addEventListener('load', function()
{
    $.ajax(
    {
        method: 'GET',
        url: './Picky.json',
        statusCode: 
        {
            200: function (response)
            {
                var categoryId = getCatId();
                var productId = getProductId();

                if (!categoryId && !productId)
                    return;
                pickyData = response;

                if(categoryId)
                {
                    pageCategory = getCategoryInternal(categoryId);

                    if(pageCategory && pageCategory.categories)
                        fillCategory(pageCategory);

                    else if(pageCategory && pageCategory.products)
                    {
                        fillCategoryInfo(pageCategory);
                        fillProducts(pageCategory.products)
                    }
                }
                else if(productId)
                {
                    var myProduct = getProduct(productId);
                    if(myProduct)
                        fillFinalProduct(myProduct);    
                }
            }
        }
    });
})

function getCategoryInternal(catId, parentCategory)
{
    if (!parentCategory)
        parentCategory = pickyData;
    
    if(!parentCategory.categories)
        return null;
    
    for(cat of parentCategory.categories)
    {
        if (cat.id == catId)
            return cat;
        
        var targetCat = getCategoryInternal(catId, cat);
        if (targetCat)
            return targetCat;
    }
    
    return null;
}

function getQueryString()
{
    location.queryString = {};
    location.search.substr(1).split("&").forEach(function (pair)
    {
        if (pair === "") return;
        var parts = pair.split("=");
        location.queryString[parts[0]] = parts[1] &&
            decodeURIComponent(parts[1].replace(/\+/g, " "));
    });
}

function getCatId()
{
   getQueryString(); 
    var catId = location.queryString["catid"];
    
    return catId;
}

function getProductId()
{
   getQueryString(); 
    var productId = location.queryString["productid"];
    
    return productId;
}

function getProduct(productId, parentCategory)
{
    if (!parentCategory)
        parentCategory = pickyData;
    
    if(parentCategory.products)
    {
        return parentCategory.products.find(function(p){return p.id == productId});
    }
        
    else if(parentCategory.categories)
    {
        for(cat of parentCategory.categories)
        {
            var targetProduct = getProduct(productId, cat);
            if (targetProduct)
                return targetProduct;
        }
    }
    return null;
}

//MainCategory
function fillCategory(category)
{
    var html = "";
    for (catIdx in category.categories)
    {
        var cat = category.categories[catIdx];
        html += "<div id='" + cat.name + "'>"
        html += "<h1>" + cat.name + "</h1>";
        html += "<ul>"
        for (cat2 of cat.categories)
        {
            html += "<li><a class='hoverLink' href='SubCategory.html?catid=" + cat2.id + "'>"+cat2.name+"</a></li>";
        }
        html += "</ul>";
        html += "</div>";
    }
    
    document.getElementById('fillMainDiv').innerHTML = html;
}

//SubCategory
function fillCategoryInfo(category)
{
    var html = "<h1>"+category.name+"</h1>";
    document.getElementById('divCategoryInfo').innerHTML = html;
}
function fillProducts(products)
{
    var html = "";
    for(product of products)
    {
        html+="<div><a href='Product.html?productid=" + product.id + "'><img src='"+product.picture+"'></a><p>"+product.name+"</p><p>"+product.price+"</p></div>";
    }
    document.getElementById('divProducts').innerHTML = html;
}

//Product
function fillFinalProduct(product)
{
    var html = "<img src='"+product.picture+"'>";
    document.getElementById('finalProductDiv').innerHTML = html;
    
    var secondHtml="<h1>"+product.name+"</h1>";
    secondHtml +="<h2>Price: "+product.price+"</h2><br>";
    document.getElementById('finalProdInfoDiv').innerHTML = secondHtml;

    var thirdHTML = "";
    if(product.size)
    {
        for(size of product.size)
        {
            var myKey = Object.keys(size);
            var availability = size[myKey];
            if(availability == false)
            {
                thirdHTML += "<button disabled>"+myKey+"</button>";
            }
            else
            {
                thirdHTML += "<input type='button' value='"+myKey+"' class='clickedBtn'>";
            }

        }
    }
    document.getElementById('sizeDiv').innerHTML = thirdHTML;
}
