import { stripHtml } from "string-strip-html"

export function stringStripHtml(req, res, next) {
    Object.keys(req.body).forEach(key => {
        if (typeof(req.body[key]) === 'string') {
            req.body[key] = stripHtml(req.body[key]).result
            req.body[key] = req.body[key].trim()
        }
    })

    next()
}