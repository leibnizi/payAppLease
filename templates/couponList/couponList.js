export default {
    data:{
        hidden:true,
        currentSelect:null,
        currentIndex:null
    },
    op:{
        onClose:(page,callback)=>{
            if(page.data.currentSelect === null){
                callback.bind(page)(true)
            } else {
                callback.bind(page)()
            }
            page.setData({
                hidden:!page.data.hidden
            })

        },
        onReceive:(e,page)=>{
            const newIndex = page.data.currentIndex === e.currentTarget.dataset.index?null:e.currentTarget.dataset.index,
                newSelect = page.data.currentSelect === e.currentTarget.dataset.id?null:e.currentTarget.dataset.id
            page.setData({
                currentSelect:newSelect,
                currentIndex:newIndex
            })
        }
    }
}
