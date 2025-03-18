
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Salad, ArrowRight, Info, LineChart } from 'lucide-react';
import { UserProfileForm } from '@/components/diet-planner/UserProfileForm';
import DietPlanDisplay from '@/components/diet-planner/DietPlanDisplay';
import { UserProfile, generateDietPlan, DietPlan } from '@/utils/dietPlanGenerator';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

const DietPlanner = () => {
  const [step, setStep] = useState<'form' | 'result'>('form');
  const [dietPlan, setDietPlan] = useState<DietPlan | null>(null);
  const { toast } = useToast();

  const handleFormSubmit = (data: UserProfile) => {
    toast({
      title: "Generating your nutrition plan...",
      description: "Please wait while our AI creates your personalized maternal and child nutrition plan.",
    });
    
    // Simulate API call delay
    setTimeout(() => {
      const generatedPlan = generateDietPlan(data);
      setDietPlan(generatedPlan);
      setStep('result');
      
      toast({
        title: "Nutrition plan ready!",
        description: "Your personalized maternal and child nutrition plan has been created successfully.",
      });
    }, 1500);
  };

  const handleBackToForm = () => {
    setStep('form');
  };

  return (
    <div className="min-h-screen bg-nurturing-50/40 pt-28 pb-16">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-10">
          <div className="mx-auto w-14 h-14 rounded-full bg-gradient-to-r from-nurturing-400 to-nurturing-600 flex items-center justify-center shadow-md mb-4">
            <Salad className="text-white" size={28} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-nurturing-900 mb-4">
            Maternal & Child Nutrition Planner
          </h1>
          <p className="text-nurturing-700 max-w-2xl mx-auto">
            Our AI-powered nutrition planner creates customized meal plans for pregnant women,
            new mothers, and young children based on your unique profile and nutritional needs.
          </p>
          
          {/* Added Dashboard link button */}
          <div className="mt-6">
            <Link to="/dashboard">
              <Button className="bg-soft-600 hover:bg-soft-700 text-white">
                <LineChart className="mr-2 h-4 w-4" />
                Go to Nutrition Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {step === 'form' && (
          <>
            <div className="bg-white/50 backdrop-blur-sm p-4 md:p-6 rounded-lg shadow-sm border border-nurturing-100 max-w-3xl mx-auto mb-8">
              <div className="flex items-start gap-4 text-nurturing-800">
                <Info className="h-6 w-6 text-nurturing-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium mb-1">Expert Maternal & Child Nutrition</h3>
                  <p className="text-sm">
                    Our AI analyzes your profile data and creates personalized nutrition plans following the latest
                    Dietary Guidelines for Americans 2020-2025. We provide evidence-based recommendations for
                    pregnancy, lactation, and infant/child feeding, ensuring optimal nutrition during these
                    critical life stages.
                  </p>
                </div>
              </div>
            </div>
            <UserProfileForm onSubmit={handleFormSubmit} />
          </>
        )}

        {step === 'result' && dietPlan && (
          <DietPlanDisplay dietPlan={dietPlan} onBack={handleBackToForm} />
        )}
      </div>
    </div>
  );
};

export default DietPlanner;
