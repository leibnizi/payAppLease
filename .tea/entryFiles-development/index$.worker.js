require('./config$');

function success() {
require('../..//app');
require('../..//page/home/index');
require('../..//page/bill/bill');
require('../..//page/rent/rent');
require('../..//page/login/index');
require('../..//page/cart/cart');
require('../..//page/user/user');
require('../..//page/order/order');
require('../..//page/member/member');
require('../..//page/helpCenter/helpCenter');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
