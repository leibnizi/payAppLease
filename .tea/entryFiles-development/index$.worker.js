require('./config$');

function success() {
require('../..//app');
require('../..//page/bill/bill');
require('../..//page/rent/rent');
require('../..//page/login/index');
require('../..//page/cart/cart');
require('../..//page/home/home');
require('../..//page/bill/bill');
require('../..//page/rent/rent');
require('../..//page/user/user');
require('../..//page/order/order');
require('../..//page/member/member');
require('../..//page/help/help');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
