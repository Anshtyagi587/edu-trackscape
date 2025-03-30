
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Instagram, Twitter, Facebook, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-edu-blue" />
              <span className="ml-2 text-xl font-bold text-gray-900">EduTrackScape</span>
            </div>
            <p className="mt-3 text-gray-600 text-sm">
              Empowering students with comprehensive learning tracking and performance analytics.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-edu-blue">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-edu-blue">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-edu-blue">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-edu-blue">
                <span className="sr-only">Email</span>
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Platform</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/courses" className="text-gray-600 hover:text-edu-blue text-sm">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/quizzes" className="text-gray-600 hover:text-edu-blue text-sm">
                  Quizzes
                </Link>
              </li>
              <li>
                <Link to="/videos" className="text-gray-600 hover:text-edu-blue text-sm">
                  Videos
                </Link>
              </li>
              <li>
                <Link to="/forum" className="text-gray-600 hover:text-edu-blue text-sm">
                  Discussion Forum
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/help" className="text-gray-600 hover:text-edu-blue text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-edu-blue text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-edu-blue text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-edu-blue text-sm">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-edu-blue text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-600 hover:text-edu-blue text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-edu-blue text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-edu-blue text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} EduTrackScape. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
