import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'src/types/types';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  return (
    <nav className="bg-slate-800 shadow-md p-4 fixed top-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold hover:text-blue-400 transition-colors">
          Python Playground
        </Link>
        <div>
          {user ? (
            <span
              className="cursor-pointer mx-3 hover:text-blue-400 transition-colors"
              onClick={onLogout}
            >
              Logout ({user.username})
            </span>
          ) : (
            <>
              <Link to="/login" className="mx-3 hover:text-blue-400 transition-colors">
                Login
              </Link>
              <Link to="/register" className="mx-3 hover:text-blue-400 transition-colors">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;