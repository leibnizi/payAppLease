require('./config$');

function success() {
require('../..//app');
require('../..//page/login/index');
require('../..//page/detail/index');
require('../..//page/bill/bill');
require('../..//page/rent/rent');
require('../..//page/cart/cart');
require('../..//page/home/home');
require('../..//page/rent/rent');
require('../..//page/user/user');
require('../..//page/order/order');
require('../..//page/member/member');
require('../..//page/help/help');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
