
import { z } from 'zod';

// Define the types
export interface Meal {
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

export interface DailyPlan {
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

export interface DietPlan {
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

// Define the schema for user profile
const userProfileSchema = z.object({
  age: z.number(),
  gender: z.string(),
  height: z.number(),
  weight: z.number(),
  healthConditions: z.string().optional(),
  medications: z.string().optional(),
  activityLevel: z.string(),
  fitnessGoal: z.string(),
  dietaryRestrictions: z.string().optional(),
  foodAllergies: z.string().optional(),
  cuisinePreferences: z.string().optional(),
  dislikedFoods: z.string().optional(),
  mealPrepTime: z.string(),
  cookingSkill: z.string(),
  additionalInfo: z.string().optional(),
});

export type UserProfile = z.infer<typeof userProfileSchema>;

// Calculate BMR using Mifflin-St Jeor Equation
const calculateBMR = (weight: number, height: number, age: number, gender: string): number => {
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
};

// Calculate TDEE (Total Daily Energy Expenditure)
const calculateTDEE = (bmr: number, activityLevel: string): number => {
  const activityMultipliers: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  };

  return Math.round(bmr * activityMultipliers[activityLevel]);
};

// Adjust calories based on fitness goal
const adjustCaloriesForGoal = (tdee: number, goal: string): number => {
  switch (goal) {
    case 'weight_loss':
      return Math.round(tdee * 0.8); // 20% deficit
    case 'maintenance':
      return tdee;
    case 'muscle_gain':
      return Math.round(tdee * 1.1); // 10% surplus
    case 'overall_health':
      return tdee;
    default:
      return tdee;
  }
};

// Calculate macro breakdown based on goal
const calculateMacros = (goal: string): { protein: number; carbs: number; fats: number } => {
  switch (goal) {
    case 'weight_loss':
      return { protein: 40, carbs: 30, fats: 30 };
    case 'maintenance':
      return { protein: 30, carbs: 40, fats: 30 };
    case 'muscle_gain':
      return { protein: 35, carbs: 45, fats: 20 };
    case 'overall_health':
      return { protein: 30, carbs: 40, fats: 30 };
    default:
      return { protein: 30, carbs: 40, fats: 30 };
  }
};

// Generate a sample meal plan
const generateSampleMeals = (): Record<string, Meal> => {
  return {
    highProteinBreakfast: {
      name: "Greek Yogurt Protein Bowl",
      portions: "1 bowl (350g)",
      calories: 420,
      protein: 32,
      carbs: 45,
      fats: 12,
      ingredients: [
        "1 cup Greek yogurt (2% fat)",
        "1/3 cup granola (low sugar)",
        "1 tbsp honey",
        "1/2 cup mixed berries",
        "1 tbsp chia seeds",
        "1 tbsp almond butter"
      ],
      instructions: "Mix Greek yogurt with honey. Top with granola, berries, chia seeds, and almond butter.",
      alternatives: [
        "Protein smoothie with whey protein, banana, and almond milk",
        "Egg white omelette with spinach and feta cheese",
        "Overnight oats with protein powder and berries"
      ]
    },
    balancedBreakfast: {
      name: "Avocado Toast with Poached Eggs",
      portions: "2 slices",
      calories: 380,
      protein: 20,
      carbs: 35,
      fats: 18,
      ingredients: [
        "2 slices whole grain bread",
        "1/2 medium avocado",
        "2 poached eggs",
        "Salt and pepper to taste",
        "Red pepper flakes (optional)",
        "Handful of cherry tomatoes"
      ],
      instructions: "Toast bread. Mash avocado and spread on toast. Top with poached eggs, salt, pepper, and optional red pepper flakes. Serve with cherry tomatoes on the side.",
      alternatives: [
        "Whole grain toast with nut butter and banana slices",
        "Breakfast burrito with eggs, beans, and vegetables",
        "Quinoa breakfast bowl with fruit and nuts"
      ]
    },
    morningSnack: {
      name: "Apple with Almond Butter",
      portions: "1 medium apple + 1 tbsp almond butter",
      calories: 170,
      protein: 5,
      carbs: 25,
      fats: 8,
      ingredients: [
        "1 medium apple",
        "1 tbsp almond butter"
      ],
      instructions: "Slice apple and serve with almond butter for dipping.",
      alternatives: [
        "Handful of nuts and a small piece of fruit",
        "Greek yogurt with honey",
        "Protein bar (look for ones with minimal added sugars)"
      ]
    },
    healthyLunch: {
      name: "Grilled Chicken Salad with Quinoa",
      portions: "1 large bowl (400g)",
      calories: 450,
      protein: 35,
      carbs: 40,
      fats: 15,
      ingredients: [
        "4 oz grilled chicken breast",
        "1/2 cup cooked quinoa",
        "2 cups mixed greens",
        "1/4 cup cherry tomatoes",
        "1/4 cucumber, sliced",
        "1/4 avocado, diced",
        "2 tbsp olive oil and lemon dressing"
      ],
      instructions: "Toss all ingredients together. Drizzle with olive oil and lemon juice.",
      alternatives: [
        "Tuna salad with whole grain crackers",
        "Turkey and vegetable wrap",
        "Lentil soup with a side salad"
      ]
    },
    afternoonSnack: {
      name: "Greek Yogurt with Berries",
      portions: "3/4 cup yogurt + 1/2 cup berries",
      calories: 150,
      protein: 15,
      carbs: 15,
      fats: 3,
      ingredients: [
        "3/4 cup Greek yogurt (0% fat)",
        "1/2 cup mixed berries",
        "1 tsp honey (optional)"
      ],
      instructions: "Mix berries into yogurt. Add honey if desired.",
      alternatives: [
        "Protein shake",
        "Hard-boiled eggs",
        "Cottage cheese with fruit"
      ]
    },
    balancedDinner: {
      name: "Baked Salmon with Roasted Vegetables",
      portions: "4 oz salmon + 1 cup vegetables",
      calories: 380,
      protein: 28,
      carbs: 25,
      fats: 18,
      ingredients: [
        "4 oz salmon fillet",
        "1 cup mixed vegetables (broccoli, carrots, bell peppers)",
        "1/2 cup sweet potato, cubed",
        "1 tbsp olive oil",
        "Herbs and spices (dill, lemon, garlic)",
        "Salt and pepper to taste"
      ],
      instructions: "Preheat oven to 400°F. Season salmon with herbs, garlic, salt, and pepper. Toss vegetables and sweet potato in olive oil and seasonings. Bake salmon for 12-15 minutes and vegetables for 20-25 minutes until tender.",
      alternatives: [
        "Grilled chicken with quinoa and vegetables",
        "Tofu stir-fry with brown rice",
        "Lean beef with sweet potato and green beans"
      ]
    },
    eveningSnack: {
      name: "Cottage Cheese with Pineapple",
      portions: "1/2 cup cottage cheese + 1/2 cup pineapple",
      calories: 140,
      protein: 14,
      carbs: 14,
      fats: 2,
      ingredients: [
        "1/2 cup low-fat cottage cheese",
        "1/2 cup pineapple chunks"
      ],
      instructions: "Mix cottage cheese with pineapple chunks.",
      alternatives: [
        "Casein protein shake",
        "Small handful of mixed nuts",
        "Plain Greek yogurt with a drizzle of honey"
      ]
    }
  };
};

// Generate a full diet plan
export const generateDietPlan = (userProfile: UserProfile): DietPlan => {
  // Calculate calorie needs
  const bmr = calculateBMR(userProfile.weight, userProfile.height, userProfile.age, userProfile.gender);
  const tdee = calculateTDEE(bmr, userProfile.activityLevel);
  const calorieTarget = adjustCaloriesForGoal(tdee, userProfile.fitnessGoal);
  
  // Calculate macro breakdown
  const macros = calculateMacros(userProfile.fitnessGoal);
  
  // Calculate macronutrient grams
  const proteinGrams = Math.round((calorieTarget * (macros.protein / 100)) / 4); // 4 calories per gram of protein
  const carbGrams = Math.round((calorieTarget * (macros.carbs / 100)) / 4); // 4 calories per gram of carbs
  const fatGrams = Math.round((calorieTarget * (macros.fats / 100)) / 9); // 9 calories per gram of fat
  
  // Generate sample meals
  const sampleMeals = generateSampleMeals();
  
  // Create daily plans
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const dailyPlans: DailyPlan[] = daysOfWeek.map((day) => {
    // On some days, include evening snack, on others don't
    const includeEveningSnack = Math.random() > 0.3;
    
    // Calculate meal calories
    return {
      day,
      totalCalories: calorieTarget,
      proteinGrams,
      carbGrams,
      fatGrams,
      meals: {
        breakfast: day.startsWith("M") || day.startsWith("W") || day.startsWith("F") 
          ? sampleMeals.highProteinBreakfast 
          : sampleMeals.balancedBreakfast,
        morningSnack: sampleMeals.morningSnack,
        lunch: sampleMeals.healthyLunch,
        afternoonSnack: sampleMeals.afternoonSnack,
        dinner: sampleMeals.balancedDinner,
        ...(includeEveningSnack && { eveningSnack: sampleMeals.eveningSnack })
      }
    };
  });
  
  // Generate recommendations based on fitness goal
  let recommendations: string[] = [
    "Stay hydrated! Aim for at least 8 glasses of water daily.",
    "Try to eat every 3-4 hours to maintain steady energy levels.",
    "Prioritize whole, unprocessed foods when possible.",
    "Listen to your body's hunger and fullness cues."
  ];
  
  switch (userProfile.fitnessGoal) {
    case 'weight_loss':
      recommendations = [
        ...recommendations,
        "Focus on protein with each meal to help maintain muscle mass.",
        "Include fiber-rich foods to help you feel fuller longer.",
        "Be mindful of portion sizes, especially with calorie-dense foods."
      ];
      break;
    case 'muscle_gain':
      recommendations = [
        ...recommendations,
        "Consume protein within 30 minutes after strength training.",
        "Don't skip meals - consistent nutrition is key for muscle growth.",
        "Ensure adequate carbohydrate intake to fuel intense workouts."
      ];
      break;
    case 'maintenance':
    case 'overall_health':
      recommendations = [
        ...recommendations,
        "Focus on nutrient density rather than just calories.",
        "Include a wide variety of colorful fruits and vegetables.",
        "Balance your plate with protein, healthy fats, and complex carbohydrates."
      ];
      break;
  }
  
  // Generate shopping list
  const shoppingList = {
    "fruits": [
      "Apples",
      "Bananas",
      "Berries (strawberries, blueberries, raspberries)",
      "Lemons",
      "Avocados",
      "Pineapple"
    ],
    "vegetables": [
      "Spinach",
      "Broccoli",
      "Bell peppers",
      "Carrots",
      "Cherry tomatoes",
      "Cucumber",
      "Sweet potatoes"
    ],
    "proteins": [
      "Chicken breast",
      "Salmon fillets",
      "Greek yogurt",
      "Eggs",
      "Cottage cheese",
      "Lean ground turkey"
    ],
    "grains": [
      "Quinoa",
      "Brown rice",
      "Whole grain bread",
      "Oats",
      "Low-sugar granola"
    ],
    "dairy and alternatives": [
      "Almond milk",
      "Greek yogurt",
      "Cottage cheese",
      "Feta cheese"
    ],
    "healthy fats": [
      "Olive oil",
      "Avocados",
      "Almonds",
      "Chia seeds",
      "Almond butter"
    ],
    "pantry items": [
      "Honey",
      "Herbs and spices (garlic, dill, basil, etc.)",
      "Lemon juice",
      "Low-sodium vegetable broth"
    ]
  };
  
  return {
    userProfile: {
      age: userProfile.age,
      gender: userProfile.gender,
      weight: userProfile.weight,
      height: userProfile.height,
      activityLevel: userProfile.activityLevel,
      fitnessGoal: userProfile.fitnessGoal
    },
    calorieTarget,
    macroBreakdown: macros,
    dailyPlans,
    recommendations,
    shoppingList
  };
};
