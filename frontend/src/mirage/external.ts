import { Server } from 'miragejs';

new Server({
  routes() {
    this.namespace = 'openFF';
    
    this.get('https://world.openfoodfacts.org/api/v2/search?code=:barcode', (schema, request) => {
      let productId = request.params;
      console.log("Barcode in Mirage: " + productId);
      return productId;
    });
    this.passthrough('https://world.openfoodfacts.org/api/v2/**');
  }
});