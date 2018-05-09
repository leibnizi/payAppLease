require('./config$');

function success() {
require('../..//app');
require('../..//page/rent/rent');
require('../..//page/cart/cart');
require('../..//page/user/user');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
