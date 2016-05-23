var express = require('express');
var fs      = require('fs');
var bodyParser = require('body-parser');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
app.use(bodyParser());

//REST endpoint to scrape values
//Pass only product value if you want total number of results
//Pass product and page number if you want number of results of the particular product in that particular page
//Example URL localhost:3000/scrape?product=apple&page=10
app.get('/scrape', function(req, res){
  var product = '';
  var page = '';
  var url = '';
  if(req.query.product){
    product = req.query.product;
  }
  if(req.query.page){
    page = req.query.page;
  }
  if(product == '' && page == ''){
    res.send("Please enter either product or both a page number and product to scrape results")
  }
  if(page!='' && product ==''){
    res.send("Please enter product with the page number to scrape results");
  }
  if(page!='' && product !=''){
    url = 'http://www.shopping.com/products~PG-'+page+'?KW='+product;
    findResultsInTheGivenPage(url, res, page, product);
  }
  if(page == '' && product !=''){
    url = 'http://www.shopping.com/products?KW='+product;
    request(url, function(error, response, html){
      if(!error){
        var $ = cheerio.load(html);
        var resultsInAPage=0;
        var totalResults;
        var totalPages;
        var lastPageUrl;
        var totalResults;
        $('.gridBox').each(function(i, element){
          resultsInAPage++;
        });
        $('.paginationNew').filter(function(){
          var data = $(this);
          totalPages = data.children('span').eq(1).children().last().text().trim();
          lastPageUrl = 'http://www.shopping.com/products~PG-'+totalPages+'?KW='+product;
          findTotalResults(lastPageUrl, totalPages, resultsInAPage, res);
        })
      }
      else{
        res.send("Oops!! Something went wrong. Please try again later.");
      }
    })
  }
})

var findResultsInTheGivenPage = function(url, res, page, product){
  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);
      var resultsInAPage=0;
      $('.gridBox').each(function(i, element){
        resultsInAPage++;
      });
      res.send('There are '+resultsInAPage+' results for '+product+' in page '+page);
    }
    else{
       res.send("Oops!! Something went wrong. Please try again later.");
     }    
  })
}

var findTotalResults = function (url, totalPages, resultsPerPage, res){
  var totalResults = (totalPages-1)*resultsPerPage;
  if(url!=''){
    request(url, function(error, response, html){
      if(!error){        
        var $ = cheerio.load(html);
        var resultsInLastPage=0;
        $('.gridBox').each(function(i, element){
          resultsInLastPage++;
        });
        totalResults = totalResults+resultsInLastPage;
      }
      else{
        res.send("Oops!! Something went wrong. Please try again later.");
      }      
      res.send('Total results for searched item is '+totalResults);
    })
  }
}

app.listen('3000')
exports = module.exports = app;
