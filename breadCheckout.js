var breadApiKey = '7101ea30-8ae3-47ab-a8bd-235860d36f3e';
var apiSecret = 'd0dac82c-7d59-4f95-8390-76a60d9f6b8a';
var nyTax = 0.05;
var products = [
  {
    name:'Best Couch Ever',
    price: 10000,
    sku:'COUCH123',
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/610uXLusR7L._SX757_.jpg',
    detailUrl:'https://www.amazon.com/Best-Choice-Products-Entertainment-Furniture/dp/B01LXDH29Y/ref=sr_1_3?s=furniture&ie=UTF8&qid=1517861805&sr=1-3&keywords=couch',
    quantity: 1
  }
];
var shippingOptions = [
  {
    typeId: '1',
    cost: 1000,
    type: '2-Day Shipping'
  },
  {
    typeId: '2',
    cost: 2000,
    type: 'Overnight Shipping'
  }
]
var shippingContact = {
    fullName: 'Brian Duggan',
    address: '1191 Bedford Ave',
    address2: 'Apt. 4B',
    city: 'Brooklyn',
    state: 'NY',
    zip: '11216',
    phone: '4018627646',
    email: 'bduggan3387@gmail.com'
};
var billingContact = {
    fullName: 'Brian Duggan',
    address: '1191 Bedford Ave',
    address2: 'Apt. 4B',
    city: 'Brooklyn',
    state: 'NY',
    zip: '11216',
    phone: '4018627646',
    email: 'bduggan3387@gmail.com'
}
var customStyle = '.bread-embed,body,html{margin:0;padding:0;position:absolute;top:0;right:0;bottom:0;left:0;font-family:sans-serif}.bread-embed{visibility:hidden}.bread-btn{border:2px solid #055170;border-radius:8px;background:#fff;font-size:13px;color:red;cursor:pointer}.bread-btn .bread-embed-inner{position:absolute;top:0;left:0;right:50px;bottom:0;padding:0 1em}.bread-btn .bread-embed-icon{position:absolute;top:-1px;right:-51px;bottom:-1px;left:100%;margin-left:-50px;margin-right:50px;background-color:#055170;background-repeat:no-repeat;background-image:url(assets/coin.png);background-position:center;background-size:auto 30px;border-radius:0 4px 4px 0;cursor:pointer}.bread-btn .bread-pot:before{content:"Pay over time";color:red}.bread-dur{text-transform:uppercase}.bread-as-low-as .bread-as-low-as-info{z-index:1000;font-size:1.25em;font-weight:700;padding:3px}.bread-btn.bread-as-low-as .bread-as-low-as:before,.bread-label .bread-as-low-as:before{content:"as low as";color:red;}.bread-btn.bread-show-terms .bread-for:before,.bread-label .bread-for:before{content:"for";color:#000;margin-right:.5em}.bread-btn.bread-show-terms .bread-for:before,.bread-btn.bread-show-terms .bread-pot:before{color:red}.bread-center{text-align:center;vertical-align:middle;height:100%;width:100%;display:table}.bread-center-inner{display:table-cell;vertical-align:middle}.bread-label{color:#000;text-align:center}.bread-label .bread-embed-inner{display:inline-block;vertical-align:middle;height:100%}.bread-label .bread-embed-icon{vertical-align:middle;display:inline-block;background:#ef8919;border-radius:100%;width:1.25em;height:1.25em;color:#fff;line-height:1.5em;font-size:.85em;margin-top:-.2em}.bread-label .bread-embed-icon:after{content:"i"}@media only screen and (-webkit-min-device-pixel-ratio:2),only screen and (min-device-pixel-ratio:2),only screen and (min-resolution:192dpi),only screen and (min-resolution:2dppx){.bread-btn .bread-embed-icon{background-image:url(assets/coin.svg)}}';

function calculateTotal(){
  var total = 0;
  opts.items.forEach(function(product){
    if (product.quantity){
      total += (product.price * product.quantity);
    }
  })
  return total;
}

var opts = {
  buttonId: 'bread-checkout-btn',
  actAsLabel: false,
  asLowAs: true,
  customCSS: customStyle,
  items: products,
  buttonLocation: 'checkout',
  billingContact: billingContact,
  shippingContact: shippingContact,
  calculateTax: function(shippingContact, callback){
    // Return the tax total (as an integer in cents) or an error through the callback.
    // I was thinking there must be a way to access the total value since it exists on the Bread page but didn't find where that was stored
    var total = calculateTotal();
    // I hard coded the shipping and billing contacts in this file. In order to test tax values, one must change the shippingContact variable above or the expression below.
    var taxTotal = shippingContact.state === 'NY' ? (total * nyTax) : 0;
    //      (err, tax)
    callback(null, taxTotal);
  },
  calculateShipping: function(shippingContact, callback){
    //             (err, shippingOptions)
    return callback(null, shippingOptions);
  },
  onCustomerClose: function(err, custData) {
    if (err !== null) {
      console.error("An error occurred getting customer close data.");
      return;
    }
    var customerEmail = custData.email;
    var qualState     = custData.state;
    var data       = {
      email:    custData.email,
      message:  '',
    };
    switch (qualState) {
      case 'PREQUALIFIED':
        data.message = "prequalified for financing";
      break;
      case 'PARTIALLY_PREQUALIFIED':
        data.message = "was partially prequalified for financing";
      break;
      case 'NOT_PREQUALIFIED':
        data.message = "was not prequalified for financing";
      break;
      case 'ABANDONED':
        if (customerEmail === undefined || customerEmail === null) {
          data.message = "Unknown customer abandoned their prequalification attempt";
        } else {
          data.message = "abandoned their prequalification attempt";
        }
      break;
    }
    console.log(data);
    // Normally this would then be saved to db...
    // $.post('/customer-close', data).done(function(res){}).etc...;
  },
  done: function(err, tx_token) {
    if (err) {
      console.error("There was an error: " + err);
      return;
    }
    if (tx_token !== undefined) {
      // console.write(tx_token);
      // var i = document.createElement('input');
      // i.type = 'hidden';
      // i.name = 'token';
      // i.value = tx_token;
      // var f = document.createElement('form');
      // f.action = '[REPLACEMEWITHSERVICEURL]';
      // f.method = 'POST';
      // f.appendChild(i);
      // document.body.appendChild(f);
      // f.submit();
      document.body.append('Bread has successfully processed your loan!');
    }
    return;
  }
};

bread.checkout(opts);
