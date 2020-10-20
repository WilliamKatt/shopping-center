//同一页面同时发送多个请求，那么先计数
let count=0;
export const request=(params)=>{
    //第一次发送显示提示
    if(count==0){
        //请求发送之前，显示加载提示
        wx.showLoading({
            title: "加载中...",
            mask: true
        });
    }
    //每次发送请求累加计数
    count++;
    return new Promise((resolve,reject)=>{
        let host = 'http://122.112.158.78:3030';
        let url = params.url;
        wx.request({
            url: host+url,
            success: (result) => {
                resolve(result.data);
            },
            fail: (err) => {
                reject(err);
            },
            complete:()=>{
                //每个请求完毕之后，减一
                count--;
                //所有请求完毕之后，关闭加载提示
                if(count==0){wx.hideLoading();}
            }
        });
    });
};

