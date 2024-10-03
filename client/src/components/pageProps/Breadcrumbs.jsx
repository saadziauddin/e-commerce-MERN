import React, { useEffect, useState } from "react";
import { HiOutlineChevronRight } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = ({ title }) => {
  const location = useLocation();
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    const pathnames = location.pathname.split("/").filter((item) => item);
    setBreadcrumbs(pathnames);
  }, [location]);

  return (
    <div className="w-full py-10 xl:py-10 flex flex-col gap-3">
      <h1 className="text-5xl text-primeColor font-titleFont font-bold">
        {title}
      </h1>
      <p className="text-sm font-normal text-lightText capitalize flex items-center">
        <Link to="/" className="hover:underline">Home</Link>
        <span className="px-1">
          <HiOutlineChevronRight />
        </span>

        {breadcrumbs.map((breadcrumb, index) => {
          const routeTo = `/products/${breadcrumbs.slice(1, index + 1).join("/")}`;
          const isLast = index === breadcrumbs.length - 1;

          return (
            <span key={index} className="flex items-center">
              {!isLast ? (
                <>
                  <Link to={routeTo} className="hover:underline capitalize">
                    {breadcrumb.replace(/-/g, " ")}
                  </Link>
                  <span className="px-1">
                    <HiOutlineChevronRight />
                  </span>
                </>
              ) : (
                <span className="capitalize font-semibold text-primeColor">
                  {breadcrumb.replace(/-/g, " ")}
                </span>
              )}
            </span>
          );
        })}
      </p>
    </div>
  );
};

export default Breadcrumbs;

