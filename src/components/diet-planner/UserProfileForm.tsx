
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";

const userProfileSchema = z.object({
  // Basic metrics
  age: z.coerce.number().min(18, { message: "Must be at least 18 years old" }).max(50),
  height: z.coerce.number().min(100, { message: "Height seems too low" }).max(250),
  weight: z.coerce.number().min(30, { message: "Weight seems too low" }).max(300),
  
  // Profile type
  profileType: z.enum(["pregnant", "breastfeeding", "child", "planning"]),
  pregnancyTrimester: z.enum(["first", "second", "third"]).optional(),
  childAge: z.enum(["0-6m", "6-12m", "1-3y", "4-8y"]).optional(),
  
  // Health information
  prePregnancyBMI: z.coerce.number().optional(),
  healthConditions: z.string().optional(),
  medications: z.string().optional(),
  
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
  const [profileType, setProfileType] = useState<string | undefined>(undefined);
  
  const form = useForm<UserProfileFormValues>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      age: undefined,
      height: undefined,
      weight: undefined,
      profileType: undefined,
      pregnancyTrimester: undefined,
      childAge: undefined,
      prePregnancyBMI: undefined,
      healthConditions: "",
      medications: "",
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

  // Watch for profileType changes
  const watchProfileType = form.watch("profileType");
  if (watchProfileType !== profileType) {
    setProfileType(watchProfileType);
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-card rounded-lg border shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight text-nurturing-700">
          Your Nutrition Profile
        </h3>
        <p className="text-sm text-muted-foreground">
          Please provide detailed information to help create your personalized maternal or child nutrition plan
        </p>
      </div>
      <div className="p-6 pt-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-nurturing-700">Profile Type</h3>
              <FormField
                control={form.control}
                name="profileType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Who is this nutrition plan for?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="pregnant" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Pregnant woman
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="breastfeeding" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Breastfeeding mother
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="child" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Child (0-8 years)
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="planning" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Planning for pregnancy
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {profileType === "pregnant" && (
              <FormField
                control={form.control}
                name="pregnancyTrimester"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pregnancy Trimester</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select trimester" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="first">First trimester (weeks 1-12)</SelectItem>
                        <SelectItem value="second">Second trimester (weeks 13-26)</SelectItem>
                        <SelectItem value="third">Third trimester (weeks 27-40)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {profileType === "child" && (
              <FormField
                control={form.control}
                name="childAge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Child's Age</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select age group" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="0-6m">0-6 months</SelectItem>
                        <SelectItem value="6-12m">6-12 months</SelectItem>
                        <SelectItem value="1-3y">1-3 years</SelectItem>
                        <SelectItem value="4-8y">4-8 years</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="space-y-6">
              <h3 className="text-lg font-medium text-nurturing-700">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age (years)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Your age in years" {...field} />
                      </FormControl>
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
                      <FormLabel>Current Weight (kg)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Weight in kilograms" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {(profileType === "pregnant" || profileType === "breastfeeding") && (
                  <FormField
                    control={form.control}
                    name="prePregnancyBMI"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pre-pregnancy BMI (if known)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Pre-pregnancy BMI" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
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
                          placeholder="List any health conditions (e.g., gestational diabetes, hypertension, etc.)"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Include any pregnancy-related conditions or general health issues
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="medications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Medications or Supplements</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="List any medications or supplements you're currently taking"
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
                      placeholder="Anything else you'd like us to know about your nutritional needs..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="bg-nurturing-600 hover:bg-nurturing-700 w-full md:w-auto">
              Generate Nutrition Plan
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
