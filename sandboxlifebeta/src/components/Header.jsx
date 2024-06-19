import { Link } from 'react-router-dom';
import logo from '../assets/otherImg/sandBoxLifeR.png';
export default function Header({
  heading,
  paragraph,
  linkName,
  linkUrl = '#',
}) {
  return (
    <div className="">
      <div className="flex justify-center mt-2">
        <img
          alt=""
          className=" h-10"
          src={logo}
        />
      </div>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {heading}
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600 ">
        {paragraph}{' '}
        <Link
          to={linkUrl}
          className="font-medium text-purple-600 hover:text-purple-500"
        >
          {linkName}
        </Link>
      </p>
    </div>
  );
}
