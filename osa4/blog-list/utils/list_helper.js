const totalLikes = (blogs) => {
    const reducer = (total, blog) => {
      return total + blog.likes
    }
    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (favorite, blog) => {
    return blog.likes > favorite.likes ? blog : favorite
  }
  return formatBlog(blogs.reduce(reducer, { likes: -1 }))
}

const formatBlog = (blog) => {
  return {
    title: blog.title,
    author: blog.author,
    likes: blog.likes
  }
}

module.exports = {
  totalLikes,
  favoriteBlog,
  formatBlog
}
