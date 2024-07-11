import request from '@/utils/request'

export function addCarts(goodsNo, storeNo, num) {
    return request({
        url: '/carts/addCarts',
        method: 'post',
        data: {
            goods_no: goodsNo,
            store_no: storeNo,
            amount: num,
          }
    })

}