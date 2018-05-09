const aliApi = new Proxy({},{
    get(target,property){
        if(my[property]){
            return (opt)=>{
                return new Promise((resolve,reject)=>{
                    opt = opt || {};
                    opt.success = (...arg)=>{
                        resolve(...arg)
                    };
                    opt.fail = (...arg)=>{
                        reject(...arg)
                    }
                    my[property](opt)
                })
            }
        } else {
            return 'unknow'
        }
    }
});

export default aliApi;
