require('./config$');

function success() {
require('../..//app');
require('../..//page/rent/rent');
require('../..//page/buyCard/buyCard');
require('../..//page/cart/cart');
require('../..//page/user/user');
require('../..//page/order/order');
require('../..//page/bill/bill');
require('../..//page/helpCenter/helpCenter');
require('../..//page/cardConfirm/cardConfirm');
require('../..//page/member/member');
require('../..//page/orderDetail/orderDetail');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
