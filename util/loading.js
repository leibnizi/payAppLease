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

export default {
    show,
    hide
}