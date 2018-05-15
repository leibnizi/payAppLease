require('./config$');

function success() {
require('../..//app');
require('../..//page/cart/cart');
require('../..//page/home/home');
require('../..//page/addressList/addressList');
require('../..//page/login/index');
require('../..//page/detail/index');
require('../..//page/bill/bill');
require('../..//page/rent/rent');
require('../..//page/order/order');
require('../..//page/logistics/logistics');
require('../..//page/orderDetail/orderDetail');
require('../..//page/buyCard/buyCard');
require('../..//page/editAddress/editAddress');
require('../..//page/user/user');
require('../..//page/cardConfirm/cardConfirm');
require('../..//page/member/member');
require('../..//page/help/help');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
