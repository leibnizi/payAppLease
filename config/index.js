/* ========================================================
                        小程序配置文件
======================================================== */

// 线上环境
const host = 'https://api.v2.msparis.com';
// 测试环境
//const host = 'https://api.dev.msparis.com';

export const service = {
    //获取购物车商品数量
    plansAmount: `${host}/plans/amount`,
    //支付
    play: `${host}/order/wx-client-prepay`,
    //微信授权登录
    login: `${host}/wxmini/login`,
    //绑定手机
    mobile: `${host}/wxmini/mobile`,
    // 列表接口 GET
    list: `${host}/mall/list`,
    //产品详情
    productDetail: `${host}/product`,
    //【通用】配置文件更新2
    configs: `${host}/common/configs-2`,
    // 【通用】配置文件更新v1
    configs_v1: `${host}/common/configs`,
    recommend: `${host}/mall`,
    // 筛选页接口 GET
    tags: `${host}/bookmall/tags`,
    // 短信验证码 GET
    sms: `${host}/common/sms`,
    // 语音验证码 GET
    voice: `${host}/common/voice`,
    // 心愿单接口 GET
    wish: `${host}/user/wish-v2`,
    // 订单接口 GET
    order: `${host}/user/orders`,
    orderDetail: `${host}/user/order-detail`,
    logistics: `${host}/user/order-logistics`,
    // 订单确认收货 POST
    sign: `${host}/order/sign`,
    cancel: `${host}/order`,
    // 订单接口 GET
    // 订单确认收货 POST
    // 假装有收藏接口 POST
    collect: `${host}/bookmall/list`,
    //加入购物车
    addCartSale: `${host}/cart/mall`,
    // 确认买衣订单
    getConfirmData: `${host}/confirm/mall`,
    //【订单模块】创建买衣订单 V1  :提交生成用户买衣订单
    submitOrder: `${host}/order/mall`,
    // http://wiki.tools.msparis.com/pages/viewpage.action?pageId=1017480
    selectCoupon: `${host}/order/user-coupon`,
    // 计算买衣订单价格
    priceMessage: `${host}/price/mall`,
    //购物车模块
    deleteClothings: `${host}/cart/mall`,
    // 全局模拟token
    // 兑换优惠券 V1
    exchangeCoupon: `${host}/user/exchange-coupon`,
    // 获取会员配送地址V1
    userAddressList: `${host}/user/address`,
    access_token: "1a119b2509655096905f636541d34405",
    // 收藏 & 取消收藏
    useWish:`${host}/user/wish`,
    // 主域
    host
}

export default {
    service
}
