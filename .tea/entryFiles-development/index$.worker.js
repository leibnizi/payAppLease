require('./config$');

function success() {
require('../..//app');
require('../..//page/home/home');
require('../..//page/buyCard/buyCard');
require('../..//page/login/index');
require('../..//page/buyCard/buyCard');
require('../..//page/cardConfirm/cardConfirm');
require('../..//page/return/return');
require('../..//page/rentConfirm/rentConfirm');
require('../..//page/rent/rent');
require('../..//page/orderSuccess/orderSuccess');
require('../..//page/orderFail/orderFail');
require('../..//page/editAddress/editAddress');
require('../..//page/addressList/addressList');
require('../..//page/bill/bill');
require('../..//page/detail/index');
require('../..//page/order/order');
require('../..//page/logistics/logistics');
require('../..//page/orderDetail/orderDetail');
require('../..//page/cart/cart');
require('../..//page/user/user');
require('../..//page/bill/bill');
require('../..//page/cardConfirm/cardConfirm');
require('../..//page/member/member');
require('../..//page/selectDistrict/index');
require('../..//page/clause/index');
require('../..//page/help/index');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
