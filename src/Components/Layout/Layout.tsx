import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      {/* Insert your header component here */}

      <main>{children}</main>

      {/* Insert your footer component here */}
    </div>
  );
};

export default Layout;
