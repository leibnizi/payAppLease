require('./config$');

function success() {
require('../..//app');
require('../..//page/rent/rent');
require('../..//page/cart/cart');
require('../..//page/user/user');
require('../..//page/order/order');
require('../..//page/member/member');
require('../..//page/bill/bill');
require('../..//page/helpCenter/helpCenter');
require('../..//page/buyCard/buyCard');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
