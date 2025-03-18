import { Link } from 'react-router-dom';
import { Heart, Instagram, Facebook, Twitter, Mail, PhoneCall, Salad } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-nurturing-50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 - About */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-nurturing-400 to-nurturing-600 flex items-center justify-center shadow-sm">
                <Salad className="text-white" size={20} />
              </div>
              <span className="ml-2 text-xl font-semibold text-nurturing-900">NutriGenie</span>
            </div>
            <p className="text-nurturing-700 mt-4">
              AI-driven nutritional planning for mothers and children, making healthy eating accessible and personalized.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-nurturing-500 hover:text-nurturing-700 transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-nurturing-500 hover:text-nurturing-700 transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-nurturing-500 hover:text-nurturing-700 transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-nurturing-900 font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-nurturing-700 hover:text-nurturing-500 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-nurturing-700 hover:text-nurturing-500 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-nurturing-700 hover:text-nurturing-500 transition-colors">How It Works</Link>
              </li>
              <li>
                <Link to="/diet-planner" className="text-nurturing-700 hover:text-nurturing-500 transition-colors">Diet Planner</Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-nurturing-700 hover:text-nurturing-500 transition-colors">Dashboard</Link>
              </li>
              <li>
                <Link to="/community" className="text-nurturing-700 hover:text-nurturing-500 transition-colors">Community</Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3 - Resources */}
          <div>
            <h3 className="text-nurturing-900 font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-nurturing-700 hover:text-nurturing-500 transition-colors">Nutrition Blogs</a>
              </li>
              <li>
                <a href="#" className="text-nurturing-700 hover:text-nurturing-500 transition-colors">Success Stories</a>
              </li>
              <li>
                <a href="#" className="text-nurturing-700 hover:text-nurturing-500 transition-colors">Media Center</a>
              </li>
              <li>
                <a href="#" className="text-nurturing-700 hover:text-nurturing-500 transition-colors">Help & FAQs</a>
              </li>
              <li>
                <a href="#" className="text-nurturing-700 hover:text-nurturing-500 transition-colors">Partner Programs</a>
              </li>
            </ul>
          </div>
          
          {/* Column 4 - Contact */}
          <div>
            <h3 className="text-nurturing-900 font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <PhoneCall size={18} className="text-nurturing-500 mr-2" />
                <span className="text-nurturing-700">+91 123 456 7890</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-nurturing-500 mr-2" />
                <a href="mailto:support@nutrigenie.org" className="text-nurturing-700 hover:text-nurturing-500 transition-colors">
                  support@nutrigenie.org
                </a>
              </li>
              <li className="mt-4">
                <Link to="/contact" className="btn-outline text-sm inline-block">
                  Send Message
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-nurturing-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-nurturing-600 text-sm">
            © 2023 NutriGenie. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-nurturing-600 hover:text-nurturing-700 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-nurturing-600 hover:text-nurturing-700 text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-nurturing-600 hover:text-nurturing-700 text-sm transition-colors">Cookies</a>
          </div>
          <div className="mt-4 md:mt-0 flex items-center text-nurturing-600 text-sm">
            <span>Made with</span>
            <Heart size={14} className="text-nurturing-500 mx-1" />
            <span>for healthier mothers & children</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
