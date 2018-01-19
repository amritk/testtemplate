/**
 * Lib for setting meta tags, use on created
 */
import { ISSRContext } from 'src/app/app'

const defaults = {
    title: 'My test apple',
    type: 'website',
    desc: 'Whooooooooooooooo',
    image: 'https://s3-us-west-2.amazonaws.com/static.hc/images/meta/explore-facebook-lrg.png',
    imageHeight: 1200,
    imageWidth: 1200
}

export interface IOptions {
    title?: string
    type?: string
    desc?: string
    photo?: hc.IPhotoObject
    image?: string
    imageHeight?: number
    imageWidth?: number
    url?: string
}

export default {

    /**
     * Set the meta tags
     * @param tags ITagOptions title, type, url, desc, photo
     */
    setTags ($ssrContext: ISSRContext, tags: IOptions = {}) {
        // Set defaults
        tags = Object.assign({}, defaults, tags)
        // Set photo
        if (tags.photo) {
            tags.image = tags.photo.urls.large
            tags.imageHeight = tags.photo.height
            tags.imageWidth = tags.photo.width
        }
        // On the node side
        if (process.env.VUE_ENV === 'server') {
            $ssrContext.meta = tags
            $ssrContext.meta.url = $ssrContext.fullUrl
        }
        // On the vue side
        else {
            document.title = tags.title
            document.querySelector('meta[property="og:title"]').setAttribute('content', tags.title)
            document.querySelector('meta[name="description"]').setAttribute('content', tags.desc)
            document.querySelector('meta[property="og:description"]').setAttribute('content', tags.desc)
            document.querySelector('meta[property="og:url"]').setAttribute('content', document.location.href)
            document.querySelector('meta[property="og:type"]').setAttribute('content', tags.type)
            document.querySelector('meta[property="og:image"]').setAttribute('content', tags.image)
            document.querySelector('meta[property="og:image:height"]')
                .setAttribute('content', tags.imageHeight.toString())
            document.querySelector('meta[property="og:image:width"]')
                .setAttribute('content', tags.imageWidth.toString())
        }
    }
}
