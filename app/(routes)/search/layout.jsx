import React from "react";
import CategoryList from "./_components/CategoryList";

function layout({ children }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4">
      <div className="col-span mr-8">
        <CategoryList />
      </div>
      <div className="col-span-1 md:col-span-3">{children}</div>
    </div>
  );
}

export default layout;
