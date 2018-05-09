export const goBack = (delta = 1)=>{
    my.navigateBack({
      delta
    });
}

export const push = (path)=>{
    if(getCurrentPages().length >= 5)
    {
        my.redirectTo({
          url: path
        });
    } else {
        my.navigateTo({
            url:path
        });
    }
}

export const redirectTo = (path)=>{
    my.navigateTo({
        url:path
    })
}