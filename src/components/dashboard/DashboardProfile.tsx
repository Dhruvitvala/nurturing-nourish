
import React, { useState } from 'react';
import { ArrowUp, User, Weight, Activity, Ruler, Apple, Bookmark } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
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
  dietaryPreferences?: {
    preferences: string;
    allergies: string;
    restrictions: string;
  };
  nutritionalGoals?: {
    primaryGoals: string;
    focusAreas: string;
    specificConcerns: string;
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

interface ProfileFormValues {
  name: string;
  stage: string;
  trimester: string;
  weight: number;
  height: number;
  preferences: string;
  allergies: string;
  restrictions: string;
  primaryGoals: string;
  focusAreas: string;
  specificConcerns: string;
}

const DashboardProfile: React.FC<DashboardProfileProps> = ({ userData }) => {
  // Determine the current week data point based on trimester
  const currentWeek = userData.profileType === 'pregnancy' ? 18 : 0;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ProfileFormValues>({
    defaultValues: {
      name: userData.name,
      stage: userData.stage,
      trimester: userData.trimester,
      weight: userData.keyMetrics.weight,
      height: userData.keyMetrics.height,
      preferences: userData.dietaryPreferences?.preferences || 'Vegetarian, Mediterranean diet',
      allergies: userData.dietaryPreferences?.allergies || 'Lactose intolerance, Tree nuts',
      restrictions: userData.dietaryPreferences?.restrictions || 'No alcohol, Limited caffeine',
      primaryGoals: userData.nutritionalGoals?.primaryGoals || 'Healthy pregnancy weight gain, Optimize fetal development',
      focusAreas: userData.nutritionalGoals?.focusAreas || 'Increase iron intake, Maintain calcium levels',
      specificConcerns: userData.nutritionalGoals?.specificConcerns || 'Morning sickness management, Heartburn reduction',
    }
  });

  const onSubmit = (values: ProfileFormValues) => {
    console.log('Profile updated:', values);
    
    // In a real app, you would make an API call to update the profile
    // For now, just show a success toast
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
    
    setIsDialogOpen(false);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-nurturing-900">Hello, {userData.name}</h1>
          <p className="text-nurturing-600">{userData.stage} • {userData.trimester}</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
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

      {/* Increased height and added margin bottom to create more space */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Weight Trajectory</CardTitle>
          <CardDescription>
            Your weight compared to recommended ranges
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={weightData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
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
                  <ChartLegend content={<ChartLegendContent />} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {/* Changed to a better responsive grid layout with more space */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Apple className="h-5 w-5 text-nurturing-600" />
              Dietary Preferences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-sm text-nurturing-700">Preferences</h4>
                <p className="text-nurturing-600">{form.getValues().preferences}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-nurturing-700">Allergies & Intolerances</h4>
                <p className="text-nurturing-600">{form.getValues().allergies}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-nurturing-700">Dietary Restrictions</h4>
                <p className="text-nurturing-600">{form.getValues().restrictions}</p>
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
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-sm text-nurturing-700">Primary Goals</h4>
                <p className="text-nurturing-600">{form.getValues().primaryGoals}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-nurturing-700">Focus Areas</h4>
                <p className="text-nurturing-600">{form.getValues().focusAreas}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-nurturing-700">Specific Concerns</h4>
                <p className="text-nurturing-600">{form.getValues().specificConcerns}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Profile Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-nurturing-800">Personal Information</h3>
                  
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="stage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stage</FormLabel>
                        <FormControl>
                          <Input placeholder="Pregnancy, Postpartum, etc." {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="trimester"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Trimester/Period</FormLabel>
                        <FormControl>
                          <Input placeholder="First Trimester, 6 months postpartum, etc." {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="weight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Weight (kg)</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.1" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="height"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Height (cm)</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.1" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium text-nurturing-800">Dietary Information</h3>
                  
                  <FormField
                    control={form.control}
                    name="preferences"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dietary Preferences</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Vegetarian, Mediterranean diet, etc." {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="allergies"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Allergies & Intolerances</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Lactose intolerance, tree nuts, etc." {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="restrictions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dietary Restrictions</FormLabel>
                        <FormControl>
                          <Textarea placeholder="No alcohol, limited caffeine, etc." {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium text-nurturing-800">Nutritional Goals</h3>
                
                <FormField
                  control={form.control}
                  name="primaryGoals"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary Goals</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Healthy pregnancy weight gain, optimize fetal development, etc." {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="focusAreas"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Focus Areas</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Increase iron intake, maintain calcium levels, etc." {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="specificConcerns"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Specific Concerns</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Morning sickness management, heartburn reduction, etc." {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardProfile;
