
import { useState } from 'react';
import { Salad, ArrowRight, Info } from 'lucide-react';
import { UserProfileForm } from '@/components/diet-planner/UserProfileForm';
import DietPlanDisplay from '@/components/diet-planner/DietPlanDisplay';
import { UserProfile, generateDietPlan, DietPlan } from '@/utils/dietPlanGenerator';
import { useToast } from '@/components/ui/use-toast';

const DietPlanner = () => {
  const [step, setStep] = useState<'form' | 'result'>('form');
  const [dietPlan, setDietPlan] = useState<DietPlan | null>(null);
  const { toast } = useToast();

  const handleFormSubmit = (data: UserProfile) => {
    toast({
      title: "Generating your diet plan...",
      description: "Please wait while our AI creates your personalized plan.",
    });
    
    // Simulate API call delay
    setTimeout(() => {
      const generatedPlan = generateDietPlan(data);
      setDietPlan(generatedPlan);
      setStep('result');
      
      toast({
        title: "Diet plan ready!",
        description: "Your personalized nutrition plan has been created successfully.",
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
            Personalized Diet Planner
          </h1>
          <p className="text-nurturing-700 max-w-2xl mx-auto">
            Our AI-powered diet planner creates customized meal plans based on your unique profile,
            preferences, and goals. Fill out the form below to get started.
          </p>
        </div>

        {step === 'form' && (
          <>
            <div className="bg-white/50 backdrop-blur-sm p-4 md:p-6 rounded-lg shadow-sm border border-nurturing-100 max-w-3xl mx-auto mb-8">
              <div className="flex items-start gap-4 text-nurturing-800">
                <Info className="h-6 w-6 text-nurturing-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium mb-1">How it works</h3>
                  <p className="text-sm">
                    Our AI analyzes your profile data, including age, weight, activity level, and dietary preferences to calculate your optimal calorie and macronutrient needs. Then it creates a personalized meal plan with delicious recipes that match your preferences and support your health goals.
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
