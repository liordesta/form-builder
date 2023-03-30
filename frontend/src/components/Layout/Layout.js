import { Navbar } from '../ui/Navbar/Navbar';

export const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};
