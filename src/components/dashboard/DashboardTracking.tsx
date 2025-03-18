
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Clipboard, Camera, Plus, Upload } from 'lucide-react';

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

interface DashboardTrackingProps {
  userData: UserData;
}

// Mock nutrient data
const nutrientData = [
  { name: 'Protein', actual: 85, target: 100 },
  { name: 'Iron', actual: 70, target: 100 },
  { name: 'Calcium', actual: 90, target: 100 },
  { name: 'Folate', actual: 95, target: 100 },
  { name: 'Fiber', actual: 75, target: 100 },
  { name: 'Vitamin D', actual: 65, target: 100 },
  { name: 'Omega-3', actual: 60, target: 100 },
];

// Mock macronutrient distribution data
const macroData = [
  { name: 'Protein', value: 25 },
  { name: 'Carbs', value: 50 },
  { name: 'Fats', value: 25 },
];

const COLORS = ['#F34082', '#5858CB', '#F9793D'];

const chartConfig = {
  actual: {
    label: "Current Intake",
    color: "#F34082",
  },
  target: {
    label: "Target",
    color: "#5858CB",
  },
};

// Mock food log data
const foodLogEntries = [
  {
    time: '8:30 AM',
    meal: 'Breakfast',
    foods: [
      'Greek yogurt with honey (1 cup)',
      'Mixed berries (1/2 cup)',
      'Granola with flax seeds (2 tbsp)',
      'Green tea (1 cup)'
    ],
    nutrients: {
      calories: 420,
      protein: 24,
      carbs: 48,
      fat: 15
    }
  },
  {
    time: '11:00 AM',
    meal: 'Snack',
    foods: [
      'Apple (1 medium)',
      'Almond butter (1 tbsp)'
    ],
    nutrients: {
      calories: 200,
      protein: 5,
      carbs: 22,
      fat: 10
    }
  },
  {
    time: '1:30 PM',
    meal: 'Lunch',
    foods: [
      'Quinoa salad with chickpeas (1.5 cups)',
      'Mixed greens with olive oil (2 cups)',
      'Feta cheese (1 oz)',
      'Water with lemon (16 oz)'
    ],
    nutrients: {
      calories: 520,
      protein: 18,
      carbs: 62,
      fat: 22
    }
  }
];

const DashboardTracking: React.FC<DashboardTrackingProps> = ({ userData }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-nurturing-900">Track & Monitor</h1>
          <p className="text-nurturing-600">Monitor your nutrition and health metrics</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Clipboard className="mr-2 h-4 w-4" />
            Add Food Entry
          </Button>
          <Button variant="outline">
            <Camera className="mr-2 h-4 w-4" />
            Scan Food
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Nutrient Intake</CardTitle>
            <CardDescription>
              Your daily nutrient intake compared to recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={nutrientData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="name" type="category" width={80} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="actual" name="actual" fill={chartConfig.actual.color} radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Macronutrient Distribution</CardTitle>
            <CardDescription>
              Your current macronutrient balance
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={macroData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {macroData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              {macroData.map((entry, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-1"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm">{entry.name}: {entry.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Food Journal</CardTitle>
            <CardDescription>Today's food log</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {foodLogEntries.map((entry, index) => (
              <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <span className="font-medium text-nurturing-800">{entry.meal}</span>
                    <span className="text-gray-500 text-sm ml-2">({entry.time})</span>
                  </div>
                  <div className="text-sm font-medium text-nurturing-700">
                    {entry.nutrients.calories} kcal
                  </div>
                </div>
                <ul className="space-y-1 mb-2">
                  {entry.foods.map((food, foodIndex) => (
                    <li key={foodIndex} className="text-sm text-gray-600">• {food}</li>
                  ))}
                </ul>
                <div className="flex gap-3 text-xs">
                  <span className="text-gray-500">P: {entry.nutrients.protein}g</span>
                  <span className="text-gray-500">C: {entry.nutrients.carbs}g</span>
                  <span className="text-gray-500">F: {entry.nutrients.fat}g</span>
                </div>
              </div>
            ))}
            <div className="flex justify-center">
              <Button variant="ghost" size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Add More Entries
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardTracking;
