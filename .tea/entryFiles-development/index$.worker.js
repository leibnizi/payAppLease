require('./config$');

function success() {
require('../..//app');
require('../..//page/rent/rent');
require('../..//page/cart/cart');
require('../..//page/user/user');
require('../..//page/order/order');
require('../..//page/member/member');
require('../..//page/bill/bill');
require('../..//page/orderConfirm/orderConfirm');
require('../..//page/helpCenter/helpCenter');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
