export const goBack = (delta)=>{
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
        my.navigateTo(path);
    }
}

export const redirectTo = (path)=>{
    my.navigateTo(path)
}