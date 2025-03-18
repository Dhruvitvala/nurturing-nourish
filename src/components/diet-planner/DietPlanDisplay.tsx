
import React from 'react';
import { Printer, Download, Share2, ArrowLeft, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface Meal {
  name: string;
  portions: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  ingredients: string[];
  instructions: string;
  alternatives: string[];
}

interface DailyPlan {
  day: string;
  totalCalories: number;
  proteinGrams: number;
  carbGrams: number;
  fatGrams: number;
  meals: {
    breakfast: Meal;
    morningSnack: Meal;
    lunch: Meal;
    afternoonSnack: Meal;
    dinner: Meal;
    eveningSnack?: Meal;
  };
}

interface DietPlan {
  userProfile: {
    age: number;
    gender: string;
    weight: number;
    height: number;
    activityLevel: string;
    fitnessGoal: string;
  };
  calorieTarget: number;
  macroBreakdown: {
    protein: number; // Percentage
    carbs: number; // Percentage
    fats: number; // Percentage
  };
  dailyPlans: DailyPlan[];
  recommendations: string[];
  shoppingList: Record<string, string[]>;
}

interface DietPlanDisplayProps {
  dietPlan: DietPlan;
  onBack: () => void;
}

const DietPlanDisplay: React.FC<DietPlanDisplayProps> = ({ dietPlan, onBack }) => {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft size={16} />
          Back to Profile
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Printer size={16} />
            Print
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={16} />
            Download PDF
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Share2 size={16} />
            Share
          </Button>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl text-nurturing-700">Your Personalized Diet Plan</CardTitle>
          <CardDescription>
            Based on your profile, we've created a nutrition plan tailored to your needs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-nurturing-50 p-4 rounded-lg">
              <h3 className="font-medium text-nurturing-700 mb-2">Daily Calorie Target</h3>
              <p className="text-2xl font-bold text-nurturing-900">{dietPlan.calorieTarget} kcal</p>
            </div>
            <div className="bg-nurturing-50 p-4 rounded-lg">
              <h3 className="font-medium text-nurturing-700 mb-2">Macro Breakdown</h3>
              <div className="flex justify-between">
                <div className="text-center">
                  <p className="text-sm text-nurturing-600">Protein</p>
                  <p className="font-bold text-nurturing-900">{dietPlan.macroBreakdown.protein}%</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-nurturing-600">Carbs</p>
                  <p className="font-bold text-nurturing-900">{dietPlan.macroBreakdown.carbs}%</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-nurturing-600">Fats</p>
                  <p className="font-bold text-nurturing-900">{dietPlan.macroBreakdown.fats}%</p>
                </div>
              </div>
            </div>
            <div className="bg-nurturing-50 p-4 rounded-lg">
              <h3 className="font-medium text-nurturing-700 mb-2">Fitness Goal</h3>
              <p className="text-xl font-semibold text-nurturing-900 capitalize">
                {dietPlan.userProfile.fitnessGoal.replace('_', ' ')}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-medium text-nurturing-700 mb-2">Key Recommendations</h3>
            <ul className="list-disc pl-5 space-y-1">
              {dietPlan.recommendations.map((rec, index) => (
                <li key={index} className="text-nurturing-600">{rec}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="day1" className="w-full">
        <TabsList className="mb-6 w-full justify-start overflow-x-auto">
          {dietPlan.dailyPlans.map((plan, index) => (
            <TabsTrigger key={index} value={`day${index + 1}`}>
              {plan.day}
            </TabsTrigger>
          ))}
        </TabsList>

        {dietPlan.dailyPlans.map((plan, dayIndex) => (
          <TabsContent key={dayIndex} value={`day${dayIndex + 1}`} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-nurturing-700">{plan.day} Meal Plan</CardTitle>
                <CardDescription>
                  {plan.totalCalories} calories | {plan.proteinGrams}g protein | {plan.carbGrams}g carbs | {plan.fatGrams}g fat
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Breakfast */}
                  <MealCard 
                    title="Breakfast" 
                    meal={plan.meals.breakfast} 
                    mealTime="7:00 - 8:00 AM" 
                  />
                  
                  {/* Morning Snack */}
                  <MealCard 
                    title="Morning Snack" 
                    meal={plan.meals.morningSnack} 
                    mealTime="10:00 - 11:00 AM" 
                  />
                  
                  {/* Lunch */}
                  <MealCard 
                    title="Lunch" 
                    meal={plan.meals.lunch} 
                    mealTime="12:30 - 1:30 PM" 
                  />
                  
                  {/* Afternoon Snack */}
                  <MealCard 
                    title="Afternoon Snack" 
                    meal={plan.meals.afternoonSnack} 
                    mealTime="3:30 - 4:30 PM" 
                  />
                  
                  {/* Dinner */}
                  <MealCard 
                    title="Dinner" 
                    meal={plan.meals.dinner} 
                    mealTime="6:30 - 7:30 PM" 
                  />
                  
                  {/* Evening Snack (Optional) */}
                  {plan.meals.eveningSnack && (
                    <MealCard 
                      title="Evening Snack (Optional)" 
                      meal={plan.meals.eveningSnack} 
                      mealTime="8:30 - 9:30 PM" 
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-xl text-nurturing-700">Shopping List</CardTitle>
          <CardDescription>
            Everything you need to prepare your meals for the week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(dietPlan.shoppingList).map(([category, items]) => (
              <div key={category} className="space-y-2">
                <h3 className="font-medium text-nurturing-700 capitalize">{category}</h3>
                <ul className="list-disc pl-5">
                  {items.map((item, index) => (
                    <li key={index} className="text-nurturing-600">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-6">
          <Button className="bg-nurturing-600 hover:bg-nurturing-700">
            <Download className="mr-2 h-4 w-4" />
            Download Shopping List
          </Button>
        </CardFooter>
      </Card>

      <div className="mt-8 p-4 border border-yellow-300 bg-yellow-50 rounded-lg">
        <p className="text-sm text-yellow-800">
          <strong>Disclaimer:</strong> This diet plan is generated based on the information you provided and general nutritional guidelines. It is not a substitute for professional medical advice. Please consult with a healthcare provider or registered dietitian before making significant changes to your diet, especially if you have any health conditions.
        </p>
      </div>
    </div>
  );
};

interface MealCardProps {
  title: string;
  mealTime: string;
  meal: Meal;
}

const MealCard: React.FC<MealCardProps> = ({ title, mealTime, meal }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-nurturing-50 py-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg text-nurturing-700">{title}</CardTitle>
            <CardDescription>{mealTime}</CardDescription>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-nurturing-900">{meal.calories} kcal</p>
            <p className="text-xs text-nurturing-600">P: {meal.protein}g | C: {meal.carbs}g | F: {meal.fats}g</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="py-4">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-medium text-nurturing-800 mb-1">{meal.name}</h4>
            <p className="text-sm text-nurturing-600">Portion: {meal.portions}</p>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <Info className="h-4 w-4 mr-1" />
                Alternatives
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-2">
                <h5 className="font-medium">Alternative Options</h5>
                <ul className="list-disc pl-5 text-sm">
                  {meal.alternatives.map((alt, index) => (
                    <li key={index}>{alt}</li>
                  ))}
                </ul>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-4">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center gap-1 text-nurturing-600 p-0 h-auto">
              {isOpen ? "Hide Details" : "Show Details"}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3 space-y-4">
            <div>
              <h5 className="font-medium text-nurturing-700 mb-2">Ingredients</h5>
              <ul className="list-disc pl-5 text-sm space-y-1">
                {meal.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-nurturing-600">{ingredient}</li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-nurturing-700 mb-2">Preparation Instructions</h5>
              <p className="text-sm text-nurturing-600">{meal.instructions}</p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default DietPlanDisplay;
