const config = {
    baseURI: "http://localhost:5000/api/",

    apiEndPoint: {
      product: {
        fetchProducts: '/product',
        fetchProduct: '/product/:id',
        fetchProductReviews: '/product/:id/reviews',
        createReview: '/product/:id/reviews',

      },
    },
  };
  
  export default config;
  