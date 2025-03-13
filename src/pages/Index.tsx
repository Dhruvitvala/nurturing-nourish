
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, CheckCircle, LineChart, Users, Heart, MessageSquare } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <PageTransition>
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Benefits Section */}
      <section className="py-20 bg-nurturing-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
            <h2 className="heading-2 text-nurturing-900 mb-6">
              Transforming Nutrition for a Healthier Generation
            </h2>
            <p className="body-large text-nurturing-700">
              Our AI-powered platform creates personalized nutrition plans for mothers and children, making healthy eating accessible, affordable, and adaptable to local food resources.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Brain} 
              title="AI-Powered Recommendations" 
              description="Customized meal plans based on unique health needs, cultural preferences, and local food availability."
              delay={100}
            />
            <FeatureCard 
              icon={LineChart} 
              title="Real-Time Monitoring" 
              description="Track nutritional intake, growth metrics, and health parameters to ensure optimal development."
              delay={200}
            />
            <FeatureCard 
              icon={Users} 
              title="Support for All" 
              description="Special recommendations for pregnant mothers, lactating mothers, infants, and growing children."
              delay={300}
            />
            <FeatureCard 
              icon={Heart} 
              title="Improved Health Outcomes" 
              description="Reduce malnutrition and improve maternal and child health with scientifically-backed nutrition plans."
              delay={400}
            />
            <FeatureCard 
              icon={MessageSquare} 
              title="Community Support" 
              description="Connect with other mothers, health workers, and nutritionists for advice and encouragement."
              delay={500}
            />
            <FeatureCard 
              icon={CheckCircle} 
              title="Easy Implementation" 
              description="Simple interface for Anganwadi workers and health officials to monitor and support multiple families."
              delay={600}
            />
          </div>
        </div>
      </section>
      
      {/* How It Works Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12">
              <h2 className="heading-2 text-nurturing-900 mb-6 animate-fade-in">
                How Our AI Creates the Perfect Nutrition Plan
              </h2>
              <p className="body-large text-nurturing-700 mb-8 animate-fade-in" style={{ animationDelay: '100ms' }}>
                Our intelligent system analyzes multiple factors to create a nutrition plan that's perfect for you and your child's unique needs.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start animate-slide-in-bottom" style={{ animationDelay: '200ms' }}>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-nurturing-100 flex items-center justify-center mt-1">
                    <span className="text-nurturing-700 font-semibold">1</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-nurturing-900 mb-2">Data Collection</h3>
                    <p className="text-nurturing-700">We gather information about age, health status, dietary preferences, and local food availability.</p>
                  </div>
                </div>
                
                <div className="flex items-start animate-slide-in-bottom" style={{ animationDelay: '300ms' }}>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-nurturing-100 flex items-center justify-center mt-1">
                    <span className="text-nurturing-700 font-semibold">2</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-nurturing-900 mb-2">AI Analysis</h3>
                    <p className="text-nurturing-700">Our advanced algorithms process the data to identify nutritional needs and deficiencies.</p>
                  </div>
                </div>
                
                <div className="flex items-start animate-slide-in-bottom" style={{ animationDelay: '400ms' }}>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-nurturing-100 flex items-center justify-center mt-1">
                    <span className="text-nurturing-700 font-semibold">3</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-nurturing-900 mb-2">Personalized Plans</h3>
                    <p className="text-nurturing-700">Receive customized meal plans, recipes, and nutrition guidance tailored to your specific needs.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 animate-fade-in" style={{ animationDelay: '500ms' }}>
                <Link to="/how-it-works" className="btn-outline flex items-center w-fit">
                  Learn More
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </div>
            
            <div className="lg:w-1/2 animate-fade-in" style={{ animationDelay: '300ms' }}>
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1580676426783-c6e508e3702c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="AI nutrition analysis" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-soft-400/30 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-nurturing-500 to-nurturing-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="heading-2 mb-6 animate-fade-in">
            Ready to Transform Your Nutrition Journey?
          </h2>
          <p className="body-large mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '100ms' }}>
            Join thousands of mothers who have improved their children's health with our AI-powered nutrition planning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '200ms' }}>
            <Link to="/diet-planner" className="btn-primary bg-white text-nurturing-600 hover:bg-nurturing-50">
              Get Your Personalized Plan
            </Link>
            <Link to="/community" className="border-2 border-white btn-outline text-white hover:bg-white/10">
              Join Our Community
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-2 text-nurturing-900 mb-6 animate-fade-in">
              Success Stories
            </h2>
            <p className="body-large text-nurturing-700 animate-fade-in" style={{ animationDelay: '100ms' }}>
              Hear from mothers and healthcare workers who have transformed their approach to nutrition with our platform.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="glass-card p-6 animate-slide-in-bottom" style={{ animationDelay: '200ms' }}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-nurturing-100 flex items-center justify-center">
                  <span className="text-nurturing-700 font-bold">PS</span>
                </div>
                <div className="ml-3">
                  <p className="text-nurturing-900 font-medium">Priya S.</p>
                  <p className="text-sm text-nurturing-600">Mother of two</p>
                </div>
              </div>
              <p className="text-nurturing-700 italic mb-4">
                "The personalized meal plans have made such a difference for my toddler who was a picky eater. The AI suggestions were spot-on and now he loves eating vegetables!"
              </p>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg 
                    key={star}
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    className="w-5 h-5 text-nurturing-500"
                  >
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                ))}
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="glass-card p-6 animate-slide-in-bottom" style={{ animationDelay: '300ms' }}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-nurturing-100 flex items-center justify-center">
                  <span className="text-nurturing-700 font-bold">AR</span>
                </div>
                <div className="ml-3">
                  <p className="text-nurturing-900 font-medium">Anjali R.</p>
                  <p className="text-sm text-nurturing-600">Anganwadi Worker</p>
                </div>
              </div>
              <p className="text-nurturing-700 italic mb-4">
                "The monitoring dashboard has simplified my work tremendously. I can now track the progress of multiple children at once and provide targeted support where needed."
              </p>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg 
                    key={star}
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    className="w-5 h-5 text-nurturing-500"
                  >
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                ))}
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="glass-card p-6 animate-slide-in-bottom" style={{ animationDelay: '400ms' }}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-nurturing-100 flex items-center justify-center">
                  <span className="text-nurturing-700 font-bold">MM</span>
                </div>
                <div className="ml-3">
                  <p className="text-nurturing-900 font-medium">Meera M.</p>
                  <p className="text-sm text-nurturing-600">Expecting mother</p>
                </div>
              </div>
              <p className="text-nurturing-700 italic mb-4">
                "During my pregnancy, the personalized nutrition plans helped me ensure I was getting all the nutrients I needed. The app even adjusted my diet as my pregnancy progressed!"
              </p>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg 
                    key={star}
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    className="w-5 h-5 text-nurturing-500"
                  >
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </PageTransition>
  );
};

export default Index;
