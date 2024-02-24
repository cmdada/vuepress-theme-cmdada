import type { App, Page } from 'vuepress/core'
import type { BlogPostData, BlogPostDataItem } from '../shared/index.js'
import type { PluginOption } from './plugin.js'

const HMR_CODE = `
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateBlogData) {
    __VUE_HMR_RUNTIME__.updateBlogData(blogPostData)
  }
  if (__VUE_HMR_RUNTIME__.updateExtraBlogData) {
    __VUE_HMR_RUNTIME__.updateExtraBlogData(extraBlogData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ blogPostData, extraBlogData }) => {
    __VUE_HMR_RUNTIME__.updateBlogData(blogPostData)
    __VUE_HMR_RUNTIME__.updateExtraBlogData(extraBlogData)
  })
}
`

const headingRe = /<h(\d*).*?>.*?<\/h\1>/gi

function getTimestamp(time: Date): number {
  return new Date(time).getTime()
}

const EXCERPT_SPLIT = '<!-- more -->'

export async function preparedBlogData(app: App, pageFilter: (id: string) => boolean, options: PluginOption): Promise<void> {
  let pages = app.pages.filter((page) => {
    return page.filePathRelative && pageFilter(page.filePathRelative)
  })
  if (options.pageFilter)
    pages = pages.filter(options.pageFilter)

  if (options.sortBy) {
    pages = pages.sort((prev, next) => {
      if (options.sortBy === 'createTime') {
        return getTimestamp(prev.frontmatter.createTime as Date)
          < getTimestamp(next.frontmatter.createTime as Date)
          ? 1
          : -1
      }
      else {
        return typeof options.sortBy === 'function'
          && options.sortBy(prev, next)
          ? 1
          : -1
      }
    })
  }

  const extraBlogData: Record<string, any> = {}

  if (typeof options.extraBlogData === 'function')
    options.extraBlogData(extraBlogData)

  const blogData: BlogPostData = pages.map((page: Page) => {
    let extended: Partial<BlogPostDataItem> = {}
    if (typeof options.extendBlogData === 'function')
      extended = options.extendBlogData(page, extraBlogData)

    const data = {
      path: page.path,
      title: page.title,
      ...extended,
    }

    if (options.excerpt && page.contentRendered.includes(EXCERPT_SPLIT)) {
      const contents = page.contentRendered.split(EXCERPT_SPLIT)
      let excerpt = contents[0]
      // 删除摘要中的标题
      excerpt = excerpt.replace(headingRe, '')
      data.excerpt = excerpt
    }

    return data as BlogPostDataItem
  })

  let content = `\
export const blogPostData = JSON.parse(${JSON.stringify(
    JSON.stringify(blogData),
  )});
export const extraBlogData = JSON.parse(${JSON.stringify(
    JSON.stringify(extraBlogData),
)});
`

  // inject HMR code
  if (app.env.isDev)
    content += HMR_CODE

  await app.writeTemp('internal/blogData.js', content)
}
