require('dotenv').config();

const Shopify = require('shopify-api-node');

const shopify = new Shopify({
  shopName: process.env.SHOPIFY_STORE,
  accessToken: process.env.SHOPIFY_ACCESS_TOKEN
});

const retrieveOrders = async () => {
  const query = `
  {
    orders(first: 5) {
      edges {
        node {
          id
          name
          email
          totalPriceSet {
            shopMoney {
              amount
              currencyCode
            }
          }
          lineItems(first: 5) {
            edges {
              node {
                title
                quantity
                originalUnitPriceSet {
                  shopMoney {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  `;

  try {
    const response = await shopify.graphql(query);
    console.log('Orders', JSON.stringify(response, null, 2));
  } catch (error) {
    console.error('Error retrieving orders:', error);
  }
};

retrieveOrders();
