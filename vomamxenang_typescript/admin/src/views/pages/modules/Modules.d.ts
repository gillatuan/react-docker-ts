interface ModuleItems {
  alias: string
  description: string
  fileSrc: string
  info: string
  selectedPosts: PostItem[]
  selectedMedia: string[]
  title: string
}

interface PostItem {
  title: string
  alias: string
  info: string
  description: string

  // SEO
  seo_keywords: string
  seo_title: string
  seo_description: string

  status?: number
  deleted?: number
  fileSrc: string
  user?: string
  created_date?: string
  updated_date?: string
}

export { ModuleItems, PostItem }
