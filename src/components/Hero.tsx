
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-24 right-0 w-72 h-72 bg-nurturing-100 rounded-full filter blur-3xl opacity-60 -z-10"></div>
      <div className="absolute bottom-10 left-10 w-60 h-60 bg-soft-100 rounded-full filter blur-3xl opacity-60 -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left Content */}
          <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12 animate-fade-in">
            <div className="inline-block px-3 py-1.5 mb-6 bg-nurturing-100 text-nurturing-800 rounded-full text-sm font-medium animate-slide-in-bottom" style={{ animationDelay: '300ms' }}>
              AI-Powered Nutrition for Every Mother & Child
            </div>
            <h1 className="heading-1 mb-6 animate-slide-in-bottom" style={{ animationDelay: '400ms' }}>
              <span className="text-gradient">Nourish</span> the Future with <span className="text-gradient">Personalized Nutrition</span>
            </h1>
            <p className="body-large text-nurturing-700 mb-8 animate-slide-in-bottom" style={{ animationDelay: '500ms' }}>
              NutriGenie revolutionizes maternal and child nutrition with AI-driven personalized meal plans, real-time monitoring, and community support tailored to your unique needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-in-bottom" style={{ animationDelay: '600ms' }}>
              <Link to="/diet-planner" className="btn-primary flex items-center justify-center gap-2">
                Get Your Diet Plan
                <ArrowRight size={18} />
              </Link>
              <Link to="/how-it-works" className="btn-secondary flex items-center justify-center gap-2">
                Learn How It Works
              </Link>
            </div>
          </div>
          
          {/* Right Content - Image */}
          <div className="lg:w-1/2 animate-fade-in" style={{ animationDelay: '700ms' }}>
            <div className="relative z-10">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-nurturing-400/40 to-transparent z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1531983412531-1f49a365ffed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Mother and child enjoying healthy food" 
                  className="w-full h-auto object-cover z-0"
                />
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-5 -right-5 glass-card p-4 shadow-lg animate-float">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-nurturing-100 flex items-center justify-center">
                    <span className="text-nurturing-700 font-bold">AI</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-nurturing-900">Personalized</p>
                    <p className="text-xs text-nurturing-600">Nutrition Plans</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-5 -left-5 glass-card p-4 shadow-lg animate-float" style={{ animationDelay: '2s' }}>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-soft-100 flex items-center justify-center">
                    <span className="text-soft-700 font-bold">24/7</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-nurturing-900">Real-Time</p>
                    <p className="text-xs text-nurturing-600">Monitoring</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
