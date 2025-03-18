
import React from 'react';
import { ArrowUp, User, Weight, Activity, Ruler, Apple, Bookmark } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

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

interface DashboardProfileProps {
  userData: UserData;
}

// Mock weight data for pregnancy - would come from API
const weightData = [
  { week: 4, weight: 61.2, recommended: 61.2 },
  { week: 8, weight: 62.5, recommended: 62.1 },
  { week: 12, weight: 63.8, recommended: 63.0 },
  { week: 16, weight: 65.2, recommended: 64.5 },
  { week: 20, weight: 66.9, recommended: 65.8 },
  { week: 24, weight: 68.0, recommended: 67.3 },
  { week: 28, weight: 69.5, recommended: 69.0 },
  { week: 32, weight: 71.2, recommended: 71.0 },
  { week: 36, weight: 73.5, recommended: 73.2 },
  { week: 40, weight: 75.0, recommended: 75.0 },
];

const chartConfig = {
  weight: {
    label: "Your Weight",
    color: "#F34082",
  },
  recommended: {
    label: "Recommended",
    color: "#5858CB",
  },
};

const DashboardProfile: React.FC<DashboardProfileProps> = ({ userData }) => {
  // Determine the current week data point based on trimester
  const currentWeek = userData.profileType === 'pregnancy' ? 18 : 0;
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-nurturing-900">Hello, {userData.name}</h1>
          <p className="text-nurturing-600">{userData.stage} • {userData.trimester}</p>
        </div>
        <Button>
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <User className="h-4 w-4 text-nurturing-600" />
              Stage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-nurturing-800">{userData.stage}</p>
            <p className="text-sm text-nurturing-600">{userData.trimester}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <Weight className="h-4 w-4 text-nurturing-600" />
              Weight
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-nurturing-800">{userData.keyMetrics.weight} kg</p>
            <p className="text-sm text-nurturing-600 flex items-center gap-1">
              <ArrowUp className="h-3 w-3 text-green-500" />
              {userData.keyMetrics.weightTarget}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <Activity className="h-4 w-4 text-nurturing-600" />
              BMI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-nurturing-800">{userData.keyMetrics.bmi}</p>
            <p className="text-sm text-nurturing-600">Normal range</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weight Trajectory</CardTitle>
          <CardDescription>
            Your weight compared to recommended ranges
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={weightData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" label={{ value: 'Week', position: 'insideBottom', offset: -5 }} />
                  <YAxis label={{ value: 'Weight (kg)', angle: -90, position: 'insideLeft' }} />
                  <ChartTooltip 
                    content={<ChartTooltipContent />} 
                  />
                  <Line
                    type="monotone"
                    dataKey="weight"
                    name="weight"
                    stroke={chartConfig.weight.color}
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="recommended"
                    name="recommended"
                    stroke={chartConfig.recommended.color}
                    strokeDasharray="5 5"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
              <ChartLegend content={<ChartLegendContent />} />
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Apple className="h-5 w-5 text-nurturing-600" />
              Dietary Preferences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <h4 className="font-medium text-sm text-nurturing-700">Preferences</h4>
                <p className="text-nurturing-600">Vegetarian, Mediterranean diet</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-nurturing-700">Allergies & Intolerances</h4>
                <p className="text-nurturing-600">Lactose intolerance, Tree nuts</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-nurturing-700">Dietary Restrictions</h4>
                <p className="text-nurturing-600">No alcohol, Limited caffeine</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bookmark className="h-5 w-5 text-nurturing-600" />
              Nutritional Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <h4 className="font-medium text-sm text-nurturing-700">Primary Goals</h4>
                <p className="text-nurturing-600">Healthy pregnancy weight gain, Optimize fetal development</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-nurturing-700">Focus Areas</h4>
                <p className="text-nurturing-600">Increase iron intake, Maintain calcium levels</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-nurturing-700">Specific Concerns</h4>
                <p className="text-nurturing-600">Morning sickness management, Heartburn reduction</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardProfile;
