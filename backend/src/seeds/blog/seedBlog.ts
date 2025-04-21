import blog from '../../data/blog/blog.json';
import { Blog } from '../../models/blogModel';
import { IBlog } from '../../types/blogTypes';




const seedBlog = async () => {
  try {
    const blogs = blog.map((item: Pick<IBlog, 'title' | 'content' | 'category' | 'school'>) => ({
      title: item.title,
      content: item.content,
      category: item.category,
      school: item.school,
    }));

    await Blog.insertMany(blogs);
    console.log('Blogs seeded successfully');
  } catch (error) {
    console.error('Error seeding blogs:', error);
  }
};


export default seedBlog;