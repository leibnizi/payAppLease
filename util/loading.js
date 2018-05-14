import * as aliApi from '/util/aliApi.js';

const show = (content,delay)=>{
    aliApi.showLoading({
        content:content || "加载中",
        delay:delay || 0
    })
}

const hide = (option)=>{
    aliApi.hideLoading()
}

const toast = (params) => {
    aliApi.showToast({
        type: params.type || 'none',
        content: params.content || '操作成功',
        duration: params.duration || 3000
    });
}
export default {
    show,
    hide,
    toast
}