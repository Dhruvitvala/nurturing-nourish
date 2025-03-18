
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Salad } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  // Handle scroll event to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Close mobile menu when navigating
  useEffect(() => {
    setIsOpen(false);
  }, [location]);
  
  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'About', path: '/about' },
    { title: 'How It Works', path: '/how-it-works' },
    { title: 'Diet Planner', path: '/diet-planner' },
    { title: 'Dashboard', path: '/dashboard' },
    { title: 'Community', path: '/community' },
    { title: 'Contact', path: '/contact' },
  ];
  
  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-blur shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-nurturing-400 to-nurturing-600 flex items-center justify-center shadow-sm">
              <Salad className="text-white" size={20} />
            </div>
            <span className="ml-2 text-xl font-semibold text-nurturing-900">NutriGenie</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'text-nurturing-600 bg-nurturing-50'
                    : 'text-nurturing-700 hover:text-nurturing-500 hover:bg-nurturing-50'
                }`}
              >
                {link.title}
              </Link>
            ))}
            <Link 
              to="/diet-planner" 
              className="ml-2 btn-primary text-sm"
            >
              Get Started
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-full focus:outline-none text-nurturing-700 hover:bg-nurturing-50 transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
        
        {/* Mobile Navigation */}
        <div
          className={`md:hidden fixed inset-0 bg-white z-40 transition-transform duration-300 transform ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          } pt-24 px-6`}
        >
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`py-3 px-4 rounded-xl text-center text-base font-medium transition-all ${
                  location.pathname === link.path
                    ? 'bg-nurturing-50 text-nurturing-700'
                    : 'text-nurturing-700 hover:bg-nurturing-50'
                }`}
              >
                {link.title}
              </Link>
            ))}
            <Link 
              to="/diet-planner" 
              className="mt-6 btn-primary"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
