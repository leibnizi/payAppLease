const globalData = getApp().globalData;
export default {
    data: {
        hidden: true,
        currentSelect: 0,
        currentIndex: null
    },
    op: {
        onClose: (page, callbackName, first = true) => {
            page.setData({
                hidden: first ? first : !page.data.hidden
            })
            return page[callbackName](page.data.currentSelect === 0)

        },
        onReceive: (e, page) => {
            const newIndex = page.data.currentIndex === e.currentTarget.dataset.index ? null : e.currentTarget.dataset.index,
                newSelect = page.data.currentSelect === e.currentTarget.dataset.id ? 0 : e.currentTarget.dataset.id
            page.setData({
                currentSelect: newSelect,
                currentIndex: newIndex
            })
        }
    }
}
