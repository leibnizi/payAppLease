export default {
    data:{
        hidden:true,
        currentSelect:null,
        currentIndex:null
    },
    op:{
        onClose:(page)=>{
            console.log(page,"ahah")
            page.setData({
                hidden:!page.data.hidden
            })
        },
        onReceive:(e,page)=>{
            const newIndex = page.data.currentIndex === e.currentTarget.dataset.index?null:e.currentTarget.dataset.index

            page.setData({
                currentSelect:e.currentTarget.dataset.id,
                currentIndex:newIndex
            })
        }
    }
}
