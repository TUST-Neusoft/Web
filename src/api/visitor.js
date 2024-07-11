import request from '@/utils/request'

export function getMyVisitor() {
    return request({
        url: '/visitor/getMyVisitor',
        method: 'get'
    })
}
export function addVisitor(visitor_objective, visitor_time,) {
    return request({
        url: '/visitor/addVisitor',
        method: 'post',
        data: {
            visitor_objective: visitor_objective,
            visitor_time:visitor_time ,
        }
    })
}