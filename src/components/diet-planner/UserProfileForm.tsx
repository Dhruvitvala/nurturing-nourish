
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

const userProfileSchema = z.object({
  // Basic metrics
  age: z.coerce.number().min(18, { message: "Must be at least 18 years old" }).max(100),
  gender: z.enum(["male", "female", "other"]),
  height: z.coerce.number().min(100, { message: "Height seems too low" }).max(250),
  weight: z.coerce.number().min(30, { message: "Weight seems too low" }).max(300),
  
  // Health information
  healthConditions: z.string().optional(),
  medications: z.string().optional(),
  
  // Activity and goals
  activityLevel: z.enum(["sedentary", "light", "moderate", "active", "very_active"]),
  fitnessGoal: z.enum(["weight_loss", "maintenance", "muscle_gain", "overall_health"]),
  
  // Dietary preferences
  dietaryRestrictions: z.string().optional(),
  foodAllergies: z.string().optional(),
  cuisinePreferences: z.string().optional(),
  dislikedFoods: z.string().optional(),
  
  // Lifestyle factors
  mealPrepTime: z.enum(["minimal", "moderate", "extensive"]),
  cookingSkill: z.enum(["beginner", "intermediate", "advanced"]),
  
  // Additional information
  additionalInfo: z.string().optional(),
});

type UserProfileFormValues = z.infer<typeof userProfileSchema>;

interface UserProfileFormProps {
  onSubmit: (data: UserProfileFormValues) => void;
}

export function UserProfileForm({ onSubmit }: UserProfileFormProps) {
  const form = useForm<UserProfileFormValues>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      age: undefined,
      gender: undefined,
      height: undefined,
      weight: undefined,
      healthConditions: "",
      medications: "",
      activityLevel: undefined,
      fitnessGoal: undefined,
      dietaryRestrictions: "",
      foodAllergies: "",
      cuisinePreferences: "",
      dislikedFoods: "",
      mealPrepTime: undefined,
      cookingSkill: undefined,
      additionalInfo: "",
    },
  });

  function handleSubmit(data: UserProfileFormValues) {
    onSubmit(data);
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-card rounded-lg border shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight text-nurturing-700">
          Your Profile Information
        </h3>
        <p className="text-sm text-muted-foreground">
          Please provide detailed information to help create your personalized diet plan
        </p>
      </div>
      <div className="p-6 pt-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-nurturing-700">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Age in years" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
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
                        <Input type="number" placeholder="Height in centimeters" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight (kg)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Weight in kilograms" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-medium text-nurturing-700">Health Information</h3>
              <div className="grid grid-cols-1 gap-6">
                <FormField
                  control={form.control}
                  name="healthConditions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Health Conditions</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="List any health conditions (e.g., diabetes, hypertension)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="medications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Medications</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="List any medications you're currently taking"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-medium text-nurturing-700">Activity & Goals</h3>
              <div className="grid grid-cols-1 gap-6">
                <FormField
                  control={form.control}
                  name="activityLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Activity Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select activity level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="sedentary">Sedentary (little to no exercise)</SelectItem>
                          <SelectItem value="light">Light activity (1-3 days per week)</SelectItem>
                          <SelectItem value="moderate">Moderate activity (3-5 days per week)</SelectItem>
                          <SelectItem value="active">Active (6-7 days per week)</SelectItem>
                          <SelectItem value="very_active">Very active (twice per day)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fitnessGoal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fitness Goal</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select fitness goal" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="weight_loss">Weight Loss</SelectItem>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                          <SelectItem value="muscle_gain">Muscle Gain</SelectItem>
                          <SelectItem value="overall_health">Overall Health Improvement</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-medium text-nurturing-700">Dietary Preferences</h3>
              <div className="grid grid-cols-1 gap-6">
                <FormField
                  control={form.control}
                  name="dietaryRestrictions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dietary Restrictions</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any dietary restrictions (vegetarian, vegan, gluten-free, etc.)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="foodAllergies"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Food Allergies or Intolerances</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="List any food allergies or intolerances"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cuisinePreferences"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cuisine Preferences</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Favorite types of cuisine (Italian, Asian, Mediterranean, etc.)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dislikedFoods"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Disliked Foods</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Foods you particularly dislike or want to avoid"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-medium text-nurturing-700">Lifestyle Factors</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="mealPrepTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meal Preparation Time</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select available prep time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="minimal">Minimal (quick meals, &lt;15 min)</SelectItem>
                          <SelectItem value="moderate">Moderate (30-45 min meals)</SelectItem>
                          <SelectItem value="extensive">Extensive (happy to cook complex meals)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cookingSkill"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cooking Skill Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select cooking skill level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="additionalInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Information</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Anything else you'd like us to know..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="bg-nurturing-600 hover:bg-nurturing-700 w-full md:w-auto">
              Generate Diet Plan
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
