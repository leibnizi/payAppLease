export const onChange = (e,page)=>{
    page.setData({
        selected:!e.currentTarget.dataset.selected
    })
}
