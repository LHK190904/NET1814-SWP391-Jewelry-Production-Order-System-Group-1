import { Link } from 'react-router-dom';

function BlogCard({ title, slug, datePublish, content, photo, author }) {
  return (
    <div className="bg-white p-4 mb-4 rounded-lg shadow-md">
      <Link to={`/posts/${slug}`}>
        <div>
          <img src={photo} alt={title} className="mb-4 w-full h-48 object-cover rounded-lg" />
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-gray-600 mb-2">{author}</p>
          <p className="text-gray-600 mb-4">{datePublish}</p>
          <p className="text-gray-800">{content}</p>
        </div>
      </Link>
    </div>
  );
}

export default BlogCard;
