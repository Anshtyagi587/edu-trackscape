
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Menu, X, BookOpen, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <BookOpen className="h-8 w-8 text-edu-blue" />
              <span className="ml-2 text-xl font-bold text-gray-900">EduFlow</span>
            </Link>
            
            <nav className="hidden md:ml-6 md:flex md:space-x-8">
              <Link to="/" className="text-gray-700 hover:text-edu-blue px-3 py-2 text-sm font-medium">
                Home
              </Link>
              <Link to="/courses" className="text-gray-700 hover:text-edu-blue px-3 py-2 text-sm font-medium">
                Courses
              </Link>
              <Link to="/quizzes" className="text-gray-700 hover:text-edu-blue px-3 py-2 text-sm font-medium">
                Quizzes
              </Link>
              <Link to="/videos" className="text-gray-700 hover:text-edu-blue px-3 py-2 text-sm font-medium">
                Videos
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-edu-blue px-3 py-2 text-sm font-medium">
                About
              </Link>
            </nav>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="flex items-center text-gray-700 hover:text-edu-blue"
                >
                  <img 
                    src={user?.avatar || 'https://i.pravatar.cc/150?img=1'} 
                    alt="Profile" 
                    className="h-8 w-8 rounded-full mr-2" 
                  />
                  <span>{user?.name}</span>
                </Link>
                <Button variant="outline" onClick={logout}>Logout</Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
          
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-edu-blue focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white pt-2 pb-4 px-2 space-y-1 sm:px-3">
          <Link 
            to="/" 
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-edu-blue"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/courses" 
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-edu-blue"
            onClick={() => setIsMenuOpen(false)}
          >
            Courses
          </Link>
          <Link 
            to="/quizzes" 
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-edu-blue"
            onClick={() => setIsMenuOpen(false)}
          >
            Quizzes
          </Link>
          <Link 
            to="/videos" 
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-edu-blue"
            onClick={() => setIsMenuOpen(false)}
          >
            Videos
          </Link>
          <Link 
            to="/about" 
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-edu-blue"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link 
                to="/dashboard" 
                className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-edu-blue"
                onClick={() => setIsMenuOpen(false)}
              >
                <img 
                  src={user?.avatar || 'https://i.pravatar.cc/150?img=1'} 
                  alt="Profile" 
                  className="h-8 w-8 rounded-full mr-2" 
                />
                <span>Dashboard</span>
              </Link>
              <button 
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-edu-blue"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-edu-blue"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-edu-blue"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
