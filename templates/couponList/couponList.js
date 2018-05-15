export default {
    data:{
        hidden:true,
        currentSelect:null,
    },
    op:{
        onClose:(page)=>{
            console.log(page,"ahah")
            page.setData({
                hidden:!page.data.hidden
            })
        }
    }
}
