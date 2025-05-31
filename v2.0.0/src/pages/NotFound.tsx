import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="bg-surface dark:bg-dark-surface min-h-screen flex items-center justify-center">
      <div className="container max-w-lg mx-8 md:mx-0 flex flex-col items-center gap-4 md:gap-6 border border-outline-variant dark:border-dark-outline-variant bg-surface-1 dark:bg-dark-surface-1 shadow-navigation dark:shadow-navigation-dark p-6 rounded-3xl">
        <h1 className="text-7xl md:text-9xl text-primary dark:text-dark-primary font-bold">404</h1>
        <h3 className="text-2xl md:text-4xl text-center text-primary dark:text-dark-primary font-medium">
          Oops, This Page Not Found
        </h3>
        <h4 className="text-lg md:text-2xl text-center font-medium text-surface-on dark:text-dark-surface-on">
          The link might be corrupted
        </h4>
        <p className="text-xs md:text-sm text-center text-surface-onVariant dark:text-dark-surface-onVariant">
          or the page may have been removed
        </p>
        <Link
          to="/"
          className="bg-primary dark:bg-dark-primary px-4 py-2 rounded-md text-base font-bold text-surface-on-on dark:text-dark-primary-on hover:bg-primary-inverse dark:hover:bg-dark-primary-shade hover:no-underline duration-200 transition-all"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;