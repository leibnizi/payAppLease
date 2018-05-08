require('./config$');

function success() {
require('../..//app');
require('../..//page/home/home');
require('../..//page/test/test');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
