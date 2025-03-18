
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Utensils, ChevronRight, Calendar, ShoppingBag, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UserData {
  name: string;
  stage: string;
  trimester: string;
  profileType: string;
  keyMetrics: {
    weight: number;
    weightTarget: string;
    height: number;
    bmi: number;
  };
  nutritionProgress: {
    overall: number;
    protein: number;
    iron: number;
    calcium: number;
    folate: number;
    omega3: number;
  };
}

interface DashboardNutritionProps {
  userData: UserData;
}

// Mock meal plan data
const mealPlanData = [
  {
    mealType: 'Breakfast',
    title: 'Greek Yogurt Parfait with Iron-Rich Granola',
    description: 'High in calcium, protein, and iron - perfect for second trimester',
    nutrients: ['Calcium', 'Protein', 'Iron', 'Vitamin D'],
    image: 'https://placehold.co/100x100/FFE5EC/F34082?text=B&font=roboto'
  },
  {
    mealType: 'Morning Snack',
    title: 'Apple Slices with Almond Butter',
    description: 'Fiber and protein-rich snack with essential fatty acids',
    nutrients: ['Fiber', 'Healthy Fats', 'Vitamin E'],
    image: 'https://placehold.co/100x100/FFE5EC/F34082?text=S&font=roboto'
  },
  {
    mealType: 'Lunch',
    title: 'Mediterranean Lentil Salad with Feta',
    description: 'Plant-based iron source with vitamin C to enhance absorption',
    nutrients: ['Iron', 'Protein', 'Vitamin C', 'Folate'],
    image: 'https://placehold.co/100x100/FFE5EC/F34082?text=L&font=roboto'
  },
  {
    mealType: 'Afternoon Snack',
    title: 'Fruit & Nut Mix with Dark Chocolate',
    description: 'Energy-boosting snack with antioxidants and magnesium',
    nutrients: ['Magnesium', 'Antioxidants', 'Fiber'],
    image: 'https://placehold.co/100x100/FFE5EC/F34082?text=S&font=roboto'
  },
  {
    mealType: 'Dinner',
    title: 'Baked Salmon with Quinoa and Roasted Vegetables',
    description: 'Rich in omega-3s and complete proteins for fetal development',
    nutrients: ['Omega-3', 'Protein', 'Vitamin A', 'Zinc'],
    image: 'https://placehold.co/100x100/FFE5EC/F34082?text=D&font=roboto'
  },
];

const DashboardNutrition: React.FC<DashboardNutritionProps> = ({ userData }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-nurturing-900">Meal Planning</h1>
          <p className="text-nurturing-600">Personalized nutrition for {userData.stage}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Weekly Plan
          </Button>
          <Button variant="outline">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Shopping List
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Today's Meal Plan</CardTitle>
              <CardDescription>Optimized for {userData.trimester}</CardDescription>
            </div>
            <div className="space-x-2">
              <Button variant="ghost" size="sm">Previous</Button>
              <Button variant="ghost" size="sm">Next</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mealPlanData.map((meal, index) => (
              <div key={index} className="flex gap-4 p-3 rounded-lg hover:bg-nurturing-50 transition-colors">
                <div className="w-[80px] h-[80px] rounded-md overflow-hidden flex-shrink-0">
                  <img src={meal.image} alt={meal.mealType} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium text-nurturing-600">{meal.mealType}</p>
                    <button className="text-nurturing-500 hover:text-nurturing-700">
                      <span className="sr-only">View alternatives</span>
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                  <h3 className="font-medium text-nurturing-900">{meal.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{meal.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {meal.nutrients.map((nutrient, i) => (
                      <span key={i} className="px-2 py-0.5 bg-nurturing-100 text-nurturing-700 rounded-full text-xs">
                        {nutrient}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="border-t pt-6 flex justify-center">
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Customize Meal Plan
          </Button>
        </CardFooter>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Utensils className="h-4 w-4 text-nurturing-600" />
              Critical Nutrients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-sm">Iron</span>
                <span className="text-sm font-medium">18-27 mg/day</span>
              </li>
              <li className="flex justify-between">
                <span className="text-sm">Folate</span>
                <span className="text-sm font-medium">600-800 mcg/day</span>
              </li>
              <li className="flex justify-between">
                <span className="text-sm">Calcium</span>
                <span className="text-sm font-medium">1000-1300 mg/day</span>
              </li>
              <li className="flex justify-between">
                <span className="text-sm">Omega-3 DHA</span>
                <span className="text-sm font-medium">200-300 mg/day</span>
              </li>
              <li className="flex justify-between">
                <span className="text-sm">Protein</span>
                <span className="text-sm font-medium">75-100 g/day</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Second Trimester Focus</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <div className="h-2 w-2 rounded-full bg-nurturing-500 mt-1.5"></div>
                <span>Increased iron to support expanding blood volume</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-2 w-2 rounded-full bg-nurturing-500 mt-1.5"></div>
                <span>Additional calcium for developing fetal skeleton</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-2 w-2 rounded-full bg-nurturing-500 mt-1.5"></div>
                <span>Omega-3 fatty acids for brain development</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-2 w-2 rounded-full bg-nurturing-500 mt-1.5"></div>
                <span>Increased calories (about 340 additional per day)</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Foods to Emphasize</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 mt-1.5"></div>
                <span>Iron-rich foods: lean red meat, spinach, beans, fortified cereals</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 mt-1.5"></div>
                <span>Calcium sources: low-fat dairy, fortified plant milks, leafy greens</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 mt-1.5"></div>
                <span>Omega-3 sources: low-mercury fish, walnuts, flaxseeds</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 mt-1.5"></div>
                <span>Folate-rich foods: leafy greens, citrus, legumes</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardNutrition;
