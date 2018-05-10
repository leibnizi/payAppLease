require('./config$');

function success() {
require('../..//app');
<<<<<<< HEAD
require('../..//page/bill/bill');
require('../..//page/rent/rent');
=======
require('../..//page/login/index');
require('../..//page/home/index');
>>>>>>> home_hws
require('../..//page/cart/cart');
require('../..//page/user/user');
require('../..//page/order/order');
require('../..//page/member/member');
require('../..//page/helpCenter/helpCenter');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
