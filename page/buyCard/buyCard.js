import {data, onChange} from '/templates/msProtocal/msProtocal.js';
import {imagePath} from "/config/config";
import {push} from "/util/navigator";
import * as aliApi from "/util/aliApi";
import {get, post} from "../../util/httpService";
import couponList from "/templates/couponList/couponList";
import util from "/util/util";
import loading from '/util/loading'

let app = getApp().globalData;

Page({
    onChange,
    formatCoupon(rowData) {
        return rowData.map(item => {
            return {
                name: item.name,
                value: item.description,
                date: `${util.formatTime(item.from_date)} 至 ${util.formatTime(item.to_date)}`,
                id: item.coupon_id,
                type: item.type,
                cardType: item.bind_card_type,
                discount: item.discount
            }
        })
    },
    data: {
        ...couponList.data,
        ...data,
        selected: false,
        onSelect: 'onSelected',
        cardImage: `${imagePath}/buyCard/buyCard@2x.png`,
        couponList: [],
        selectedCoupon: null,
        onClose: 'onClose',
        onReceive: 'onReceive',
        confirmData: {},
        createData: {},
        cardInfo: {
            originPrice: null,
            oShow: null,
            validDays: null,
            deposit: null,
            dShow: null,
            totalPrice: null,
            tShow: null,
            imageUrl: "",
            id: null,
            depositeType: null,
            orderId: null
        }

    },
    _getCardInfo(first) {
        let config = {
            params: {
                platform: 'zhima',
                deposit_type: "zhima",
                coupon_id: this.data.currentSelect
            }
        }
        if (first === true) {
            delete config.params.coupon_id
        }
        return get("/order/card-confirm-v2", config)
    },

    async getCardInfoAsync(first = false) {
        loading.show()
        try {
            console.log("Start Request")
            const cardInfo = await this._getCardInfo(first)
            if (cardInfo.data.status === 'ok') {
                const card = cardInfo.data.data;
                console.log(card, "Card______")
                this.setData({
                    cardInfo: Object.assign({}, {
                        originPrice: card.original_total,
                        oShow: util.formatPrice(card.original_total, 0),
                        validDays: card.days,
                        deposit: card.deposit,
                        dShow: util.formatPrice(card.deposit, 0),
                        totalPrice: card.total,
                        tShow: util.formatPrice(card.total, 0),
                        imageUrl: `http://static-r.msparis.com/${card.cover_img}`,
                        id: card.id,
                        depositeType: card.deposit_type
                    })
                })
            }
        } catch (e) {

        } finally {
            loading.hide()
        }
    },

    _createMsOrder() {
        let params = {
            card_id: this.data.cardInfo.id,
            deposit_type: this.data.cardInfo.depositeType,
            coupon_id: this.data.currentSelect
        }
        console.log("Params", params)
        return post("order/card-v2", params);
    },

    async createMSOrderAsync() {
        console.log("创建MS订单")
        loading.show()

        try {
            const res = await this._createMsOrder()
            console.log(res.data)
            if (res.data.status == 'ok') {
                const createData = res.data.data
                console.log("OrderData", createData)
                this.setData({
                    createData
                })
                app.createData = createData;
                return createData
            }
        } catch (e) {

        } finally {
            loading.hide()
        }
    },

    async onShow() {
        const config = {
            params: {
                page: 1,
                page_size: 20
            }
        }
        try {
            const response = await get("user/coupon", config);
            if (response.data.status == 'ok') {
                const rowData = response.data.data.rows,
                    formatedData = this.formatCoupon(rowData);
                this.setData({
                    couponList: formatedData
                })
            }
        }
        catch (e) {
        }
        this.getCardInfoAsync(true)
        //this.getData();

    },
    /**获取当前页面数据 */
    async getData() {
        let params = {
            coupon_id: '',
            deposit_type: 'zhima'
        }
        const res = await get("order/card-confirm-v2", params);
        console.log(res.data)
        if (res.data.status == 'ok') {
            const confirmData = res.data.data
            console.log(confirmData)
            this.setData({
                confirmData,
                'list[0].value': util.formatPrice(confirmData.original_total, 0)
            })
        }
    },
    /**获取卡购买订单 */
    async createOrder() {

        if (this.data.selected === false) {
            loading.toast({content: "请勾选协议"})
            return;
        }
        loading.show()
        try {
            const res = await this._createMsOrder();
            console.log("Get Ms Order", res)
            if (res.data.status === 'ok') {
                this.setData({orderId: res.data.data.order_id});
                this.buyCard(res.data.data);
            } else {
                if (res.data.status === 'error') {
                    loading.toast({content: res.data.error ? res.data.error.message : "优惠券失效"})
                }
            }

        } catch (e) {
            console.log("Error", e)
        } finally {
            loading.hide()
        }


    },
    onSelected(e) {
        onChange(e, this)
    },
    async buyCard(orderRes) {
        /* 信用租赁API */
        const config = {
            creditRentType: "rent",
            /** 固定传rent*/
            category: "ZMSC_1_4_1",
            /** 类目(由芝麻侧业务对接人负责 􏰀供) */
            amount: orderRes.amount,
            /** 该次支付租金总金额，单位为 元，精确到小数点后两位，取值 范围[0.01,100000000]*/
            deposit: orderRes.deposit,
            /** 该次支付押金总金额，单位为 元，精确到小数点后两位，取值 范围[0,100000000] */
            out_order_no: orderRes.order_no,
            /**外部订单号，即商户自己的订单 号 */
            overdue_time: "2018-7-10 00:00:00",
            /**逾 期 时 间 ， yyyy-MM-dd HH:mm:ss，需要大于当前时间 */
            order_process_url: "alipay://platformapi/startApp?appId=2018033002476889&page=page/home/home",
            /**订单处理 url，商户处理订单的 页面,后续发送给用户订单继续 处理的 card 中，需要跳转该链 接。如果没有链接，无法发送 card。 */
            item_id: "2018032901000222123469565693",
            /**入驻信用套餐分配的项目 id(由 芝麻侧业务对接人负责􏰀供) */
            subject: {
                "products": [
                    {
                        "count": 1, /** 商品件数 */
                        "amount": orderRes.amount, /** 分期总金额*/
                        "deposit": orderRes.deposit, /** 总押金*/
                        "installmentCount": 12, /** 分期数*/
                        "name": encodeURIComponent(orderRes.name) /** 商品名 */
                    }
                ]
            }
            /** 商品内容 JSON，包含商品件数， 分期数，分期租金，总押金，商品名等信息 */
        }
        try {
            const res = await aliApi.startZMCreditRent(config);
            console.log("购卡订单成功", res)
            const {
                orderNo, outOrderNo
            } = res;
            if (orderRes && orderNo) {
                //接口成功
                push(`/page/cardConfirm/cardConfirm?orderNo=${orderNo}&outOrderNo=${outOrderNo}&id=${this.data.cardInfo.id}`)
            } else {
                //接口失败，停留当前页面
            }
        }
        catch (err) {
            console.log("购卡订单失败", err)
        } finally {
            loading.hide()
        }
        console.log("申请免押购卡")
    },
    showCouponList(e) {
        if (this.data.couponList.length === 0) {
            aliApi.showToast({content: "您暂时没有可用优惠券"})
        } else {
            this.setData({
                hidden: !this.data.hidden
            })
        }
    },
    onClose() {
        couponList.op.onClose(this, this._getCardInfo);
    },
    onReceive(e) {
        couponList.op.onReceive(e, this)
    },
    formatMoney(p) {
        util.formatPrice(p, 0)
    }
});
