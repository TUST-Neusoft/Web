import request from '@/utils/request'

export function getMyParking() {
    return request({
        url: '/parkAdmin/getAll',
        method: 'get'
    })
}
export function bind(parking_id, license_plate,) {
    return request({
        url: '/parking/bind',
        method: 'post',
        data: {
            parking_id: parking_id,
            license_plate:license_plate ,
        }
    })
}