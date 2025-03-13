
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Clock, Globe, Heart, Lightbulb, Users } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  return (
    <PageTransition>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-nurturing-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-1 text-nurturing-900 mb-6 animate-fade-in">
              Our Mission to <span className="text-gradient">Nourish</span> the Future
            </h1>
            <p className="body-large text-nurturing-700 mb-8 animate-fade-in" style={{ animationDelay: '100ms' }}>
              We're building a healthier future for mothers and children through AI-driven personalized nutrition planning, education, and community support.
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="heading-2 text-nurturing-900 mb-6 animate-fade-in">
                Our Story
              </h2>
              <div className="space-y-4 animate-fade-in" style={{ animationDelay: '100ms' }}>
                <p className="text-nurturing-700">
                  NourishAI was born from a simple yet powerful observation: despite advances in healthcare and technology, nutritional challenges continue to affect mothers and children, particularly in underserved communities.
                </p>
                <p className="text-nurturing-700">
                  Our team of nutritionists, healthcare professionals, and AI experts came together with a shared vision – to leverage cutting-edge technology to make personalized nutrition accessible to every mother and child.
                </p>
                <p className="text-nurturing-700">
                  We partnered with Anganwadi centers, healthcare providers, and local communities to develop an AI-driven platform that accounts for regional food availability, cultural preferences, and individual health needs.
                </p>
                <p className="text-nurturing-700">
                  Today, NourishAI serves thousands of mothers and children, providing them with nutrition plans that are not just scientifically sound but also practical and adaptable to their unique circumstances.
                </p>
              </div>
            </div>
            
            <div className="lg:w-1/2 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-nurturing-400/40 to-transparent z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Team working together on nutrition plans" 
                  className="w-full h-auto object-cover z-0"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values Section */}
      <section className="py-16 bg-soft-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-2 text-nurturing-900 mb-6 animate-fade-in">
              Our Core Values
            </h2>
            <p className="body-large text-nurturing-700 animate-fade-in" style={{ animationDelay: '100ms' }}>
              These principles guide everything we do as we work towards our mission of improving maternal and child nutrition.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="feature-card animate-slide-in-bottom" style={{ animationDelay: '200ms' }}>
              <div className="w-12 h-12 rounded-full bg-nurturing-100 flex items-center justify-center mb-4">
                <Heart className="text-nurturing-600" size={22} />
              </div>
              <h3 className="text-xl font-semibold text-nurturing-900 mb-2">Compassion</h3>
              <p className="text-nurturing-700">We approach every mother and child with empathy and understanding, recognizing their unique challenges and needs.</p>
            </div>
            
            <div className="feature-card animate-slide-in-bottom" style={{ animationDelay: '300ms' }}>
              <div className="w-12 h-12 rounded-full bg-nurturing-100 flex items-center justify-center mb-4">
                <Lightbulb className="text-nurturing-600" size={22} />
              </div>
              <h3 className="text-xl font-semibold text-nurturing-900 mb-2">Innovation</h3>
              <p className="text-nurturing-700">We continuously explore new technologies and approaches to make nutrition planning more effective and accessible.</p>
            </div>
            
            <div className="feature-card animate-slide-in-bottom" style={{ animationDelay: '400ms' }}>
              <div className="w-12 h-12 rounded-full bg-nurturing-100 flex items-center justify-center mb-4">
                <Users className="text-nurturing-600" size={22} />
              </div>
              <h3 className="text-xl font-semibold text-nurturing-900 mb-2">Inclusivity</h3>
              <p className="text-nurturing-700">We design our solutions to be accessible to all, regardless of socioeconomic status, location, or literacy level.</p>
            </div>
            
            <div className="feature-card animate-slide-in-bottom" style={{ animationDelay: '500ms' }}>
              <div className="w-12 h-12 rounded-full bg-nurturing-100 flex items-center justify-center mb-4">
                <Award className="text-nurturing-600" size={22} />
              </div>
              <h3 className="text-xl font-semibold text-nurturing-900 mb-2">Excellence</h3>
              <p className="text-nurturing-700">We are committed to the highest standards of scientific accuracy and user experience in everything we create.</p>
            </div>
            
            <div className="feature-card animate-slide-in-bottom" style={{ animationDelay: '600ms' }}>
              <div className="w-12 h-12 rounded-full bg-nurturing-100 flex items-center justify-center mb-4">
                <Globe className="text-nurturing-600" size={22} />
              </div>
              <h3 className="text-xl font-semibold text-nurturing-900 mb-2">Community</h3>
              <p className="text-nurturing-700">We believe in the power of community support and knowledge sharing to drive sustainable change.</p>
            </div>
            
            <div className="feature-card animate-slide-in-bottom" style={{ animationDelay: '700ms' }}>
              <div className="w-12 h-12 rounded-full bg-nurturing-100 flex items-center justify-center mb-4">
                <Clock className="text-nurturing-600" size={22} />
              </div>
              <h3 className="text-xl font-semibold text-nurturing-900 mb-2">Sustainability</h3>
              <p className="text-nurturing-700">We develop solutions that can be maintained and scaled over time to create lasting impact.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-2 text-nurturing-900 mb-6 animate-fade-in">
              Our Team
            </h2>
            <p className="body-large text-nurturing-700 animate-fade-in" style={{ animationDelay: '100ms' }}>
              Meet the passionate experts behind NourishAI who are dedicated to transforming maternal and child nutrition.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="text-center animate-slide-in-bottom" style={{ animationDelay: '200ms' }}>
              <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
                  alt="Dr. Ananya Sharma" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-nurturing-900 mb-1">Dr. Ananya Sharma</h3>
              <p className="text-nurturing-600 mb-3">Founder & Nutrition Specialist</p>
              <p className="text-nurturing-700 px-4">
                With over 15 years of experience in maternal and child nutrition, Dr. Sharma leads our scientific team.
              </p>
            </div>
            
            {/* Team Member 2 */}
            <div className="text-center animate-slide-in-bottom" style={{ animationDelay: '300ms' }}>
              <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1603871165848-0aa92c869fa1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
                  alt="Rajiv Mehta" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-nurturing-900 mb-1">Rajiv Mehta</h3>
              <p className="text-nurturing-600 mb-3">AI & Technology Director</p>
              <p className="text-nurturing-700 px-4">
                Rajiv brings expertise in artificial intelligence and machine learning to our nutrition planning algorithms.
              </p>
            </div>
            
            {/* Team Member 3 */}
            <div className="text-center animate-slide-in-bottom" style={{ animationDelay: '400ms' }}>
              <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
                  alt="Meena Patel" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-nurturing-900 mb-1">Meena Patel</h3>
              <p className="text-nurturing-600 mb-3">Community Outreach Head</p>
              <p className="text-nurturing-700 px-4">
                With deep roots in community health work, Meena ensures our solutions meet the needs of diverse communities.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: '500ms' }}>
            <p className="text-nurturing-700 mb-6">
              Our team also includes nutritionists, pediatricians, data scientists, UX designers, and community health workers all dedicated to our mission.
            </p>
            <Link to="/contact" className="btn-outline inline-flex items-center">
              Join Our Team
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Partners Section */}
      <section className="py-16 bg-nurturing-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-2 text-nurturing-900 mb-6 animate-fade-in">
              Our Partners
            </h2>
            <p className="body-large text-nurturing-700 animate-fade-in" style={{ animationDelay: '100ms' }}>
              We collaborate with organizations that share our commitment to improving maternal and child nutrition.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {/* Partner logos would go here - using placeholder colored boxes for now */}
            {[1, 2, 3, 4, 5, 6].map((partner) => (
              <div 
                key={partner}
                className="h-16 bg-white rounded-lg shadow-sm flex items-center justify-center animate-fade-in"
                style={{ animationDelay: `${100 * partner}ms` }}
              >
                <div className={`w-10 h-10 rounded-full bg-nurturing-${100 * partner % 500 || 100} flex items-center justify-center`}>
                  <span className="text-nurturing-700 font-bold">P{partner}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-nurturing-500 to-nurturing-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="heading-2 mb-6 animate-fade-in">
            Join Us in Our Mission
          </h2>
          <p className="body-large mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '100ms' }}>
            Whether you're a mother, healthcare worker, or organization, we invite you to be part of our journey to transform nutrition for the next generation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '200ms' }}>
            <Link to="/diet-planner" className="btn-primary bg-white text-nurturing-600 hover:bg-nurturing-50">
              Get Started Now
            </Link>
            <Link to="/contact" className="border-2 border-white btn-outline text-white hover:bg-white/10">
              Partner With Us
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </PageTransition>
  );
};

export default About;
