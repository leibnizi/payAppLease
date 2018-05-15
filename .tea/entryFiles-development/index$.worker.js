require('./config$');

function success() {
require('../..//app');
require('../..//page/addressList/addressList');
require('../..//page/home/home');
require('../..//page/rent/rent');
require('../..//page/login/index');
require('../..//page/detail/index');
require('../..//page/bill/bill');
require('../..//page/rent/rent');
require('../..//page/order/order');
require('../..//page/logistics/logistics');
require('../..//page/orderDetail/orderDetail');
require('../..//page/rent/rent');
require('../..//page/buyCard/buyCard');
require('../..//page/cart/cart');
require('../..//page/editAddress/editAddress');
require('../..//page/user/user');
require('../..//page/bill/bill');
require('../..//page/cardConfirm/cardConfirm');
require('../..//page/member/member');
require('../..//page/help/help');
require('../..//page/orderDetail/orderDetail');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
