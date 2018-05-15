require('./config$');

function success() {
require('../..//app');
require('../..//page/home/home');
require('../..//page/editAddress/editAddress');
require('../..//page/addressList/addressList');
require('../..//page/rent/rent');
require('../..//page/login/index');
require('../..//page/bill/bill');
require('../..//page/detail/index');
require('../..//page/order/order');
require('../..//page/logistics/logistics');
require('../..//page/orderDetail/orderDetail');
require('../..//page/buyCard/buyCard');
require('../..//page/cart/cart');
require('../..//page/user/user');
require('../..//page/cardConfirm/cardConfirm');
require('../..//page/member/member');
require('../..//page/help/help');
require('../..//page/selectDistrict/index');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();