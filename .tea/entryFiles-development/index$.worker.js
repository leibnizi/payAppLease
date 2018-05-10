require('./config$');

function success() {
require('../..//app');
require('../..//page/login/index');
require('../..//page/home/index');
require('../..//page/cart/cart');
require('../..//page/user/user');
require('../..//page/bill/bill');
require('../..//page/order/order');
require('../..//page/member/member');
require('../..//page/helpCenter/helpCenter');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
