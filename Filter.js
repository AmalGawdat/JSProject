
            var chkBrandMS = document.getElementById('chkBrandMS');
            var chkBrandZ = document.getElementById('chkBrandZ');
            var chkBrandHM = document.getElementById('chkBrandHM');
            var chkBrandPB = document.getElementById('chkBrandPB');
            var chkBrandS = document.getElementById('chkBrandS');
            var priceWanted = document.getElementById('priceWanted');
            
            function getFilteredProducts()
            {
                var checkedBrands = [];
                var myProducts = [];
                
                if(chkBrandMS.checked)
                    checkedBrands.push(chkBrandMS.value);
                if(chkBrandZ.checked)
                    checkedBrands.push(chkBrandZ.value);
                if(chkBrandHM.checked)
                    checkedBrands.push(chkBrandHM.value);
                if(chkBrandPB.checked)
                    checkedBrands.push(chkBrandPB.value);
                if(chkBrandS.checked)
                    checkedBrands.push(chkBrandS.value);
                
                var myPrice = parseInt(priceWanted.value);
                myPrice = myPrice.toFixed(2);
                if(checkedBrands.length == 0 && priceWanted.value.length == 0)
                {
                    myProducts = pageCategory.products;
                    return myProducts;
                }
                for(product of pageCategory.products)
                {
                    var boolBrand = true;
                    var boolPrice = true;
                    if(checkedBrands.length != 0)
                        boolBrand = false;
                    if(priceWanted.value.length != 0)
                        boolPrice = false
                    console.log("boolBrand "+boolBrand);
                    console.log("boolPrice "+boolPrice);
                    
                    var productPrice = parseFloat(product.price.substr(1));
                    var productbrand = product.brand;
                    if(boolBrand == false)
                    {
                        var checkBrand = checkedBrands.indexOf(productbrand);
                        if(checkBrand != -1)
                            boolBrand = true;
                    }
                    
                    if(boolPrice == false)
                    {
                        if(myPrice >= productPrice)
                            boolPrice = true;
                    }
                    
                    console.log("boolBrand "+boolBrand);
                    console.log("boolPrice "+boolPrice);
                    if(boolBrand == true && boolPrice == true)
                    {
                        myProducts.push(product);
                    }
                    
                }
               
                return myProducts;
            }
       
            function filterProducts()
            {
                var products = getFilteredProducts();
                fillProducts(products);
            }
            function clearClicked()
            {
                clearInputs();
                fillProducts(pageCategory.products);
            }
            function clearInputs()
            {
                priceWanted.value="";
                chkBrandMS.checked = false;
                chkBrandZ.checked = false;
                chkBrandHM.checked = false;
                chkBrandPB.checked = false;
                chkBrandS.checked = false;
            }