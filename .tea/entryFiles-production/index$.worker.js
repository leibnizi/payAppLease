require('./config$');
require('./importScripts$');
function success() {
require('../..//app');
require('../..//page/addressList/addressList');
require('../..//page/cart/cart');
require('../..//page/home/home');
require('../..//page/rent/rent');
require('../..//page/editAddress/editAddress');
require('../..//page/bill/bill');
require('../..//page/user/user');
require('../..//page/order/order');
require('../..//page/member/member');
require('../..//page/helpCenter/helpCenter');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
