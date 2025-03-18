import { z } from 'zod';

// Define the types
export interface Meal {
  name: string;
  portions: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  keyNutrients: string[];
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
  keyNutrientFocus: string[];
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
    profileType: string;
    pregnancyTrimester?: string;
    childAge?: string;
    weight: number;
    height: number;
  };
  calorieTarget: number;
  macroBreakdown: {
    protein: number; // Percentage
    carbs: number; // Percentage
    fats: number; // Percentage
  };
  keyNutrients: {
    name: string;
    description: string;
    sources: string[];
    dailyTarget: string;
  }[];
  dailyPlans: DailyPlan[];
  recommendations: string[];
  foodSafetyGuidelines?: string[];
  childFeedingTips?: string[];
  breastfeedingSupport?: string[];
  shoppingList: Record<string, string[]>;
}

// Define the schema for user profile
const userProfileSchema = z.object({
  // Basic metrics
  age: z.number(),
  height: z.number(),
  weight: z.number(),
  
  // Profile type
  profileType: z.enum(["pregnant", "breastfeeding", "child", "planning"]),
  pregnancyTrimester: z.enum(["first", "second", "third"]).optional(),
  childAge: z.enum(["0-6m", "6-12m", "1-3y", "4-8y"]).optional(),
  
  // Health information
  prePregnancyBMI: z.number().optional(),
  healthConditions: z.string().optional(),
  medications: z.string().optional(),
  
  // Dietary preferences
  dietaryRestrictions: z.string().optional(),
  foodAllergies: z.string().optional(),
  cuisinePreferences: z.string().optional(),
  dislikedFoods: z.string().optional(),
  
  // Lifestyle factors
  mealPrepTime: z.string(),
  cookingSkill: z.string(),
  
  // Additional information
  additionalInfo: z.string().optional(),
});

export type UserProfile = z.infer<typeof userProfileSchema>;

// Calculate BMR using Mifflin-St Jeor Equation
const calculateBMR = (weight: number, height: number, age: number, isFemale: boolean = true): number => {
  if (!isFemale) {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
};

// Calculate calorie needs based on profile type
const calculateCalorieNeeds = (
  bmr: number, 
  profileType: string, 
  trimester?: string, 
  childAge?: string
): number => {
  switch (profileType) {
    case 'pregnant':
      if (trimester === 'first') return bmr;
      if (trimester === 'second') return bmr + 340;
      if (trimester === 'third') return bmr + 450;
      return bmr;
      
    case 'breastfeeding':
      return bmr + 500;
      
    case 'child':
      if (childAge === '0-6m') return 550;
      if (childAge === '6-12m') return 750;
      if (childAge === '1-3y') return 1000;
      if (childAge === '4-8y') return 1400;
      return 1200;
      
    case 'planning':
      return bmr;
      
    default:
      return bmr;
  }
};

// Calculate macro breakdown based on profile type
const calculateMacros = (profileType: string, trimester?: string, childAge?: string): { protein: number; carbs: number; fats: number } => {
  switch (profileType) {
    case 'pregnant':
      return { protein: 25, carbs: 50, fats: 25 };
      
    case 'breastfeeding':
      return { protein: 20, carbs: 50, fats: 30 };
      
    case 'child':
      if (childAge === '0-6m' || childAge === '6-12m') {
        return { protein: 15, carbs: 40, fats: 45 };
      }
      if (childAge === '1-3y') {
        return { protein: 15, carbs: 45, fats: 40 };
      }
      return { protein: 15, carbs: 50, fats: 35 };
      
    case 'planning':
      return { protein: 20, carbs: 50, fats: 30 };
      
    default:
      return { protein: 20, carbs: 50, fats: 30 };
  }
};

// Get key nutrients based on profile type
const getKeyNutrients = (profileType: string, trimester?: string, childAge?: string): Array<{name: string, description: string, sources: string[], dailyTarget: string}> => {
  if (profileType === 'pregnant') {
    return [
      {
        name: "Folate/Folic Acid",
        description: "Critical for preventing neural tube defects and supporting fetal development",
        sources: ["Leafy greens", "Fortified cereals", "Lentils", "Asparagus", "Avocados"],
        dailyTarget: "600-800 mcg"
      },
      {
        name: "Iron",
        description: "Essential for increased blood volume and preventing anemia",
        sources: ["Lean red meat", "Beans", "Spinach", "Fortified cereals", "Tofu"],
        dailyTarget: "27 mg"
      },
      {
        name: "Calcium",
        description: "Builds baby's bones and teeth while maintaining maternal bone health",
        sources: ["Dairy products", "Fortified plant milks", "Tofu", "Almonds", "Leafy greens"],
        dailyTarget: "1000-1300 mg"
      },
      {
        name: "Omega-3 DHA",
        description: "Supports baby's brain and eye development",
        sources: ["Low-mercury fish", "Algae supplements", "DHA-enriched eggs", "Walnuts", "Flaxseeds"],
        dailyTarget: "200-300 mg DHA"
      },
      {
        name: "Choline",
        description: "Important for brain development and preventing neural tube defects",
        sources: ["Eggs", "Meat", "Soybeans", "Wheat germ", "Brussels sprouts"],
        dailyTarget: "450 mg"
      }
    ];
  } else if (profileType === 'breastfeeding') {
    return [
      {
        name: "Calcium",
        description: "Essential for maternal bone health during lactation",
        sources: ["Dairy products", "Fortified plant milks", "Tofu", "Almonds", "Leafy greens"],
        dailyTarget: "1000-1300 mg"
      },
      {
        name: "Vitamin D",
        description: "Supports calcium absorption and immune function",
        sources: ["Fatty fish", "Egg yolks", "Fortified foods", "Sunlight exposure", "Supplements"],
        dailyTarget: "600-800 IU"
      },
      {
        name: "Omega-3 DHA",
        description: "Passes through breast milk to support baby's brain development",
        sources: ["Low-mercury fish", "Algae supplements", "DHA-enriched eggs", "Walnuts", "Flaxseeds"],
        dailyTarget: "200-300 mg DHA"
      },
      {
        name: "Protein",
        description: "Supports milk production and maternal tissue maintenance",
        sources: ["Poultry", "Fish", "Eggs", "Dairy", "Legumes", "Nuts"],
        dailyTarget: "65 g"
      },
      {
        name: "Hydration",
        description: "Essential for milk production",
        sources: ["Water", "Milk", "Soups", "Fruits", "Vegetables"],
        dailyTarget: "16 cups (3.8 liters) of total fluids"
      }
    ];
  } else if (profileType === 'child') {
    if (childAge === '0-6m') {
      return [
        {
          name: "Complete Nutrition",
          description: "Exclusive breastfeeding or iron-fortified formula provides all nutrients needed",
          sources: ["Breast milk", "Iron-fortified infant formula"],
          dailyTarget: "Feeding on demand, approximately 8-12 times per 24 hours"
        }
      ];
    } else if (childAge === '6-12m') {
      return [
        {
          name: "Iron",
          description: "Critical as natural iron stores deplete around 6 months",
          sources: ["Iron-fortified infant cereals", "Pureed meats", "Beans", "Leafy greens"],
          dailyTarget: "11 mg"
        },
        {
          name: "Zinc",
          description: "Supports growth and immune system development",
          sources: ["Meat", "Beans", "Fortified cereals"],
          dailyTarget: "3 mg"
        },
        {
          name: "Vitamin D",
          description: "Essential for bone development and immune function",
          sources: ["Fortified formula", "Small amounts of fortified foods"],
          dailyTarget: "400 IU (supplementation often recommended)"
        }
      ];
    } else {
      return [
        {
          name: "Calcium",
          description: "Essential for developing strong bones and teeth",
          sources: ["Milk", "Yogurt", "Cheese", "Fortified non-dairy alternatives", "Leafy greens"],
          dailyTarget: "700-1000 mg"
        },
        {
          name: "Iron",
          description: "Supports cognitive development and prevents anemia",
          sources: ["Lean meats", "Beans", "Fortified cereals", "Leafy greens"],
          dailyTarget: "7-10 mg"
        },
        {
          name: "Healthy Fats",
          description: "Essential for brain development and absorption of fat-soluble vitamins",
          sources: ["Avocados", "Nut butters", "Olive oil", "Fish"],
          dailyTarget: "30-40% of daily calories"
        }
      ];
    }
  } else {
    return [
      {
        name: "Folate/Folic Acid",
        description: "Critical before conception and in early pregnancy to prevent neural tube defects",
        sources: ["Leafy greens", "Fortified cereals", "Lentils", "Asparagus", "Avocados"],
        dailyTarget: "400-800 mcg"
      },
      {
        name: "Iron",
        description: "Building stores before pregnancy helps prevent anemia",
        sources: ["Lean red meat", "Beans", "Spinach", "Fortified cereals", "Tofu"],
        dailyTarget: "18 mg"
      },
      {
        name: "Omega-3 DHA",
        description: "Establishes adequate levels for early pregnancy",
        sources: ["Low-mercury fish", "Algae supplements", "DHA-enriched eggs", "Walnuts", "Flaxseeds"],
        dailyTarget: "200-300 mg DHA"
      }
    ];
  }
};

// Generate sample meals based on profile type
const generateSampleMeals = (profileType: string, trimester?: string, childAge?: string): Record<string, Meal> => {
  if (profileType === 'pregnant') {
    return {
      pregnancyBreakfast: {
        name: "Iron-Rich Berry Oatmeal with Nuts",
        portions: "1 bowl (350g)",
        calories: 420,
        protein: 15,
        carbs: 55,
        fats: 18,
        keyNutrients: ["Iron", "Folate", "Fiber"],
        ingredients: [
          "1 cup cooked steel-cut oats",
          "1 tbsp ground flaxseed",
          "1/4 cup mixed berries",
          "1 tbsp almond butter",
          "1 tbsp pumpkin seeds",
          "1/2 tbsp blackstrap molasses (iron-rich)",
          "1/2 cup fortified plant milk"
        ],
        instructions: "Cook oats according to package directions. Stir in flaxseed and molasses. Top with berries, almond butter, and pumpkin seeds. Serve with fortified milk.",
        alternatives: [
          "Greek yogurt parfait with granola and fruit",
          "Whole grain toast with eggs and spinach",
          "Smoothie made with spinach, banana, berries, and nut butter"
        ]
      },
      pregnancyLunch: {
        name: "Mediterranean Lentil and Vegetable Bowl",
        portions: "1 large bowl (400g)",
        calories: 490,
        protein: 20,
        carbs: 65,
        fats: 16,
        keyNutrients: ["Folate", "Iron", "Fiber", "Calcium"],
        ingredients: [
          "1 cup cooked lentils",
          "2 cups mixed vegetables (spinach, bell peppers, tomatoes)",
          "1/4 avocado, sliced",
          "2 tbsp olive oil and lemon dressing",
          "1 oz feta cheese",
          "1 whole wheat pita"
        ],
        instructions: "Combine lentils and vegetables in a bowl. Top with avocado and feta. Drizzle with dressing. Serve with warmed pita.",
        alternatives: [
          "Quinoa bowl with roasted vegetables and chickpeas",
          "Salmon salad with mixed greens and whole grain crackers",
          "Turkey and vegetable wrap with hummus"
        ]
      },
      pregnancyDinner: {
        name: "Salmon with Sweet Potato and Broccoli",
        portions: "1 plate (450g)",
        calories: 450,
        protein: 30,
        carbs: 40,
        fats: 18,
        keyNutrients: ["Omega-3 DHA", "Vitamin D", "Calcium", "Iron"],
        ingredients: [
          "5 oz wild salmon fillet",
          "1 medium sweet potato",
          "1.5 cups steamed broccoli",
          "1 tbsp olive oil",
          "Herbs and lemon for seasoning"
        ],
        instructions: "Bake salmon with lemon and herbs at 400°F for 15 minutes. Roast sweet potato until tender. Steam broccoli and toss with olive oil.",
        alternatives: [
          "Chicken breast with quinoa and roasted vegetables",
          "Tofu and vegetable stir-fry with brown rice",
          "Bean and vegetable chili with avocado"
        ]
      },
      pregnancySnack: {
        name: "Greek Yogurt with Walnuts and Honey",
        portions: "1 cup yogurt + 2 tbsp walnuts",
        calories: 240,
        protein: 18,
        carbs: 18,
        fats: 10,
        keyNutrients: ["Calcium", "Protein", "Probiotics", "Omega-3"],
        ingredients: [
          "1 cup Greek yogurt",
          "2 tbsp chopped walnuts",
          "1 tsp honey",
          "1/4 cup berries"
        ],
        instructions: "Top yogurt with walnuts, honey, and berries.",
        alternatives: [
          "Apple slices with nut butter",
          "Cottage cheese with fruit",
          "Hummus with vegetable sticks"
        ]
      }
    };
  } else if (profileType === 'breastfeeding') {
    return {
      breastfeedingBreakfast: {
        name: "Lactation-Supporting Oatmeal Bowl",
        portions: "1 large bowl (400g)",
        calories: 520,
        protein: 20,
        carbs: 65,
        fats: 20,
        keyNutrients: ["Calcium", "Iron", "Galactagogues"],
        ingredients: [
          "1 cup rolled oats (supports milk production)",
          "1.5 cups fortified milk or plant milk",
          "1 tbsp brewer's yeast (milk-boosting)",
          "1 tbsp ground flaxseed",
          "1 tbsp almond butter",
          "1/2 banana, sliced",
          "1 tbsp hemp seeds",
          "1 tsp honey"
        ],
        instructions: "Cook oats in milk. Stir in brewer's yeast and flaxseed. Top with remaining ingredients.",
        alternatives: [
          "Lactation smoothie with oats, spinach, fruit, and brewer's yeast",
          "Whole grain toast with eggs and avocado",
          "Yogurt parfait with granola, fruit, and ground flaxseed"
        ]
      },
      breastfeedingLunch: {
        name: "Hydrating Quinoa Power Bowl",
        portions: "1 large bowl (450g)",
        calories: 580,
        protein: 25,
        carbs: 70,
        fats: 22,
        keyNutrients: ["Hydration", "Protein", "Complex Carbs", "Healthy Fats"],
        ingredients: [
          "1 cup cooked quinoa",
          "4 oz grilled chicken breast",
          "1/2 avocado, sliced",
          "1 cup cucumber, chopped",
          "1/2 cup cherry tomatoes",
          "1/4 cup feta cheese",
          "2 tbsp olive oil and lemon dressing",
          "Fresh herbs"
        ],
        instructions: "Combine all ingredients in a bowl and toss with dressing.",
        alternatives: [
          "Salmon and brown rice bowl with vegetables",
          "Bean and vegetable soup with whole grain bread",
          "Hummus and vegetable wrap with side salad"
        ]
      },
      breastfeedingDinner: {
        name: "One-Handed Turkey and Vegetable Stir-Fry",
        portions: "1 large plate (500g)",
        calories: 550,
        protein: 35,
        carbs: 50,
        fats: 20,
        keyNutrients: ["Protein", "Iron", "B Vitamins", "Fiber"],
        ingredients: [
          "5 oz ground turkey",
          "2 cups mixed vegetables (broccoli, bell peppers, carrots)",
          "1 cup brown rice",
          "2 tbsp low-sodium stir-fry sauce",
          "1 tbsp sesame oil",
          "1 clove garlic, minced",
          "1 tsp ginger, minced"
        ],
        instructions: "Cook rice according to package. Stir-fry turkey with garlic and ginger until browned. Add vegetables and cook until tender. Add sauce and serve over rice.",
        alternatives: [
          "Easy sheet pan salmon with roasted vegetables",
          "Slow cooker chicken and sweet potato stew",
          "Black bean and vegetable quesadillas"
        ]
      },
      breastfeedingSnack: {
        name: "No-Bake Lactation Bites",
        portions: "2 energy bites",
        calories: 220,
        protein: 8,
        carbs: 22,
        fats: 12,
        keyNutrients: ["Galactagogues", "Healthy Fats", "Energy", "Fiber"],
        ingredients: [
          "1/4 cup rolled oats",
          "1 tbsp ground flaxseed",
          "1 tbsp brewer's yeast",
          "1 tbsp peanut butter",
          "1 tsp honey",
          "1 tbsp mini chocolate chips",
          "1 tbsp chopped almonds"
        ],
        instructions: "Mix all ingredients together in a bowl. Roll into bite-sized balls and refrigerate.",
        alternatives: [
          "Apple with peanut butter and a glass of milk",
          "Cheese and whole grain crackers",
          "Trail mix with dried fruit, nuts, and dark chocolate"
        ]
      }
    };
  } else if (profileType === 'child') {
    if (childAge === '0-6m') {
      return {
        infantFeeding: {
          name: "Breast Milk or Iron-Fortified Formula",
          portions: "Feed on demand, approximately 8-12 times per 24 hours",
          calories: 500,
          protein: 7,
          carbs: 56,
          fats: 30,
          keyNutrients: ["Complete Nutrition", "Iron", "Calcium", "DHA"],
          ingredients: [
            "Breast milk or iron-fortified infant formula"
          ],
          instructions: "Feed based on hunger cues. For formula, follow package instructions for preparation.",
          alternatives: [
            "Expressed breast milk fed by bottle",
            "Iron-fortified commercial infant formula"
          ]
        },
        noMealsYet: {
          name: "No Solid Foods Recommended",
          portions: "N/A",
          calories: 0,
          protein: 0,
          carbs: 0,
          fats: 0,
          keyNutrients: [],
          ingredients: [],
          instructions: "The American Academy of Pediatrics recommends exclusive breastfeeding or formula feeding for the first 6 months of life.",
          alternatives: []
        }
      };
    } else if (childAge === '6-12m') {
      return {
        infantBreakfast: {
          name: "Iron-Fortified Cereal with Fruit Puree",
          portions: "2-4 tablespoons cereal + 1-2 tablespoons fruit",
          calories: 100,
          protein: 2,
          carbs: 15,
          fats: 2,
          keyNutrients: ["Iron", "Vitamin C", "Fiber"],
          ingredients: [
            "2-4 tbsp iron-fortified infant cereal",
            "1-2 tbsp fruit puree (banana, applesauce, or pear)",
            "Breast milk or formula to mix to desired consistency"
          ],
          instructions: "Mix cereal with enough breast milk or formula to create desired consistency. Stir in fruit puree.",
          alternatives: [
            "Well-cooked egg yolk mashed with breast milk",
            "Thick yogurt mixed with fruit puree",
            "Mashed avocado"
          ]
        },
        infantLunch: {
          name: "Vegetable and Protein Puree",
          portions: "2-4 tablespoons",
          calories: 80,
          protein: 4,
          carbs: 10,
          fats: 2,
          keyNutrients: ["Iron", "Protein", "Vitamin A", "Zinc"],
          ingredients: [
            "1-2 tbsp pureed meat or legumes (chicken, beef, lentils)",
            "1-2 tbsp pureed vegetable (sweet potato, carrot, spinach)",
            "Breast milk or formula to achieve desired consistency"
          ],
          instructions: "Combine purees and thin with breast milk or formula if needed.",
          alternatives: [
            "Mashed fish with sweet potato",
            "Pureed beans with squash",
            "Well-cooked ground meat with vegetable puree"
          ]
        },
        infantDinner: {
          name: "Grain and Vegetable Combination",
          portions: "2-4 tablespoons",
          calories: 90,
          protein: 2,
          carbs: 15,
          fats: 2,
          keyNutrients: ["Fiber", "B Vitamins", "Vitamin A"],
          ingredients: [
            "1-2 tbsp cooked and mashed brown rice or pasta",
            "1-2 tbsp pureed vegetable (peas, zucchini, broccoli)",
            "1 tsp olive oil"
          ],
          instructions: "Combine mashed grain with vegetable puree and olive oil.",
          alternatives: [
            "Mashed potatoes with pureed peas",
            "Soft-cooked quinoa with pureed carrot",
            "Oatmeal with mashed banana"
          ]
        },
        infantSnack: {
          name: "Finger Foods (for 9-12 months)",
          portions: "Small age-appropriate pieces",
          calories: 50,
          protein: 1,
          carbs: 8,
          fats: 1,
          keyNutrients: ["Variety of nutrients", "Developing fine motor skills"],
          ingredients: [
            "Soft fruit pieces (ripe banana, very soft pear)",
            "Well-cooked vegetable pieces (soft carrot, sweet potato)",
            "Teething crackers or rice rusks"
          ],
          instructions: "Offer appropriately sized pieces that baby can pick up. Always supervise during feeding.",
          alternatives: [
            "Small pieces of cheese",
            "Soft toast strips",
            "Well-cooked pasta pieces"
          ]
        }
      };
    } else {
      return {
        toddlerBreakfast: {
          name: "Mini Egg and Vegetable Muffins",
          portions: "2 mini muffins + fruit",
          calories: 180,
          protein: 8,
          carbs: 20,
          fats: 8,
          keyNutrients: ["Protein", "Iron", "Calcium", "Fiber"],
          ingredients: [
            "2 mini egg muffins (made with eggs, grated vegetables, cheese)",
            "1/2 cup berries or sliced fruit",
            "1/2 cup milk or fortified plant milk"
          ],
          instructions: "Serve muffins with fruit on the side and milk as a beverage.",
          alternatives: [
            "Whole grain toast with nut butter and sliced banana",
            "Oatmeal with diced fruit and milk",
            "Yogurt with fruit and cereal topping"
          ]
        },
        toddlerLunch: {
          name: "Colorful Protein and Veggie Plate",
          portions: "Small portions of each component",
          calories: 250,
          protein: 10,
          carbs: 30,
          fats: 8,
          keyNutrients: ["Variety", "Protein", "Fiber", "Multiple vitamins"],
          ingredients: [
            "1-2 oz protein (diced chicken, turkey, tofu, or beans)",
            "1/2 cup raw or steamed vegetables cut into small pieces",
            "1/4 cup whole grain pasta, rice or bread",
            "Dip such as hummus or yogurt",
            "1/4 cup fruit"
          ],
          instructions: "Arrange foods in an appealing way on a plate with separate compartments if possible.",
          alternatives: [
            "Sandwich cut into shapes with cucumber slices",
            "Quesadilla with vegetables and beans",
            "Pasta salad with vegetables and cheese cubes"
          ]
        },
        toddlerDinner: {
          name: "Mini Meatballs with Vegetables and Pasta",
          portions: "Age-appropriate serving",
          calories: 280,
          protein: 15,
          carbs: 35,
          fats: 10,
          keyNutrients: ["Iron", "Protein", "Zinc", "Carbohydrates"],
          ingredients: [
            "2-3 mini beef, turkey, or plant-based meatballs",
            "1/2 cup whole grain pasta",
            "1/4 cup tomato sauce",
            "1/2 cup steamed vegetables (broccoli, carrots)",
            "1 tbsp grated cheese"
          ],
          instructions: "Mix pasta with tomato sauce. Add meatballs and vegetables, then sprinkle with cheese.",
          alternatives: [
            "Fish sticks with sweet potato and green beans",
            "Rice and bean bowl with vegetables",
            "Deconstructed vegetable and cheese pizza"
          ]
        },
        toddlerSnack: {
          name: "Yogurt and Fruit Dippers",
          portions: "Small serving",
          calories: 120,
          protein: 5,
          carbs: 15,
          fats: 4,
          keyNutrients: ["Calcium", "Protein", "Vitamins", "Probiotics"],
          ingredients: [
            "1/4 cup plain yogurt",
            "Small fruit pieces for dipping",
            "1 tbsp cereal for sprinkling"
          ],
          instructions: "Serve yogurt in a small bowl with fruit pieces on the side for dipping.",
          alternatives: [
            "Apple slices with cheese cubes",
            "Whole grain crackers with avocado",
            "Banana with a thin spread of nut butter"
          ]
        }
      };
    }
  } else {
    return {
      planningBreakfast: {
        name: "Folate-Rich Breakfast Bowl",
        portions: "1 bowl (350g)",
        calories: 380,
        protein: 18,
        carbs: 45,
        fats: 15,
        keyNutrients: ["Folate", "Iron", "Fiber", "Protein"],
        ingredients: [
          "1/2 cup cooked quinoa",
          "1/2 cup sautéed spinach",
          "1 poached or fried egg",
          "1/4 avocado, sliced",
          "1/4 cup black beans",
          "1 tbsp pumpkin seeds",
          "Salsa or hot sauce (optional)"
        ],
        instructions: "Layer all ingredients in a bowl, starting with quinoa and ending with toppings.",
        alternatives: [
          "Smoothie bowl with spinach, fruit, and nuts",
          "Fortified cereal with berries and milk",
          "Whole grain toast with avocado and egg"
        ]
      },
      planningLunch: {
        name: "Mediterranean Salad with Fish",
        portions: "1 large salad (400g)",
        calories: 450,
        protein: 25,
        carbs: 35,
        fats: 20,
        keyNutrients: ["Omega-3", "Folate", "Antioxidants", "Fiber"],
        ingredients: [
          "2 cups mixed greens",
          "3 oz grilled or canned salmon or sardines",
          "1/2 cup chickpeas",
          "1/4 cup cherry tomatoes",
          "1/4 cucumber, sliced",
          "2 tbsp olive oil and lemon dressing",
          "1 whole grain pita or slice of bread"
        ],
        instructions: "Combine all salad ingredients, drizzle with dressing, and serve with pita or bread.",
        alternatives: [
          "Lentil soup with spinach and whole grain roll",
          "Tuna salad sandwich on whole grain bread with side salad",
          "Grain bowl with beans, roasted vegetables, and greens"
        ]
      },
      planningDinner: {
        name: "Iron-Rich Stir-Fry",
        portions: "1 serving (450g)",
        calories: 480,
        protein: 30,
        carbs: 50,
        fats: 15,
        keyNutrients: ["Iron", "Vitamin C", "Protein", "Fiber"],
        ingredients: [
          "4 oz lean beef or fortified tofu",
          "1.5 cups mixed vegetables (broccoli, bell peppers, snap peas)",
          "1/2 cup brown rice",
          "1 clove garlic, minced",
          "1 tsp ginger, minced",
          "2 tbsp low-sodium sauce",
          "1 tbsp sesame oil"
        ],
        instructions: "Stir-fry protein with garlic and ginger, add vegetables, and serve over brown rice with sauce.",
        alternatives: [
          "Lentil and vegetable curry with brown rice",
          "Roasted chicken with sweet potato and broccoli",
          "Seafood pasta with tomato sauce and spinach"
        ]
      },
      planningSnack: {
        name: "Fertility-Supporting Trail Mix",
        portions: "1/4 cup",
        calories: 180,
        protein: 6,
        carbs: 12,
        fats: 12,
        keyNutrients: ["Healthy Fats", "Vitamin E", "Fiber", "Plant Protein"],
        ingredients: [
          "1 tbsp walnuts",
          "1 tbsp pumpkin seeds",
          "1 tbsp dried cherries or cranberries",
          "1 tbsp dark chocolate chips",
          "1 tbsp sunflower seeds"
        ],
        instructions: "Mix all ingredients together and store in an airtight container.",
        alternatives: [
          "Apple slices with almond butter",
          "Greek yogurt with berries and honey",
          "Hummus with vegetable sticks"
        ]
      }
    };
  }
};

// Generate food safety guidelines for pregnant women
const generateFoodSafetyGuidelines = (): string[] => {
  return [
    "Thoroughly wash all produce before eating",
    "Cook meat, poultry, and seafood to safe internal temperatures",
    "Avoid raw or undercooked eggs, meat, and seafood",
    "Avoid unpasteurized dairy products and juices",
    "Limit high-mercury fish (shark, swordfish, king mackerel, tilefish)",
    "Reheat deli meats and hot dogs until steaming hot",
    "Keep cold foods cold and hot",
    "Wash hands and surfaces frequently during food preparation"
  ];
};

// Generate breastfeeding support tips
const generateBreastfeedingTips = (): string[] => {
  return [
    "Stay well-hydrated by drinking water throughout the day",
    "Aim for regular, balanced meals to maintain energy",
    "Set up a comfortable nursing station with water and healthy snacks nearby",
    "Consider keeping one-handed snacks available during feeding sessions",
    "Some foods like oats, fenugreek, and flaxseeds may support milk production",
    "Alcohol should be limited, and timing of consumption planned around feeding sessions",
    "Caffeine can pass through breast milk, so moderate consumption is recommended",
    "Some infants may be sensitive to certain foods in mother's diet - monitor for reactions"
  ];
};

// Generate child feeding tips
const generateChildFeedingTips = (childAge?: string): string[] => {
  if (childAge === '0-6m') {
    return [
      "Follow baby's hunger and fullness cues",
      "Exclusive breastfeeding or formula feeding is recommended for the first 6 months",
      "No water, juice, or other foods are needed during this period",
      "Feed on demand, typically 8-12 times in 24 hours for breastfed babies",
      "Formula-fed babies typically eat every 3-4 hours",
      "Signs of hunger include putting hands to mouth, rooting, or fussiness",
      "Signs of fullness include turning away from the nipple or bottle or falling asleep"
    ];
  } else if (childAge === '6-12m') {
    return [
      "Introduce one single-ingredient food at a time and wait 2-3 days before trying another",
      "Continue breastfeeding or formula as the primary source of nutrition",
      "Start with iron-rich foods like fortified cereals, pureed meats, or legumes",
      "Progress from purees to mashed and then to soft finger foods as baby develops",
      "Introduce potentially allergenic foods early (under medical guidance)",
      "Avoid honey until after 12 months due to risk of botulism",
      "Avoid added salt and sugar in baby foods",
      "Watch for signs baby is ready for solids: sitting with support, good head control, showing interest in food"
    ];
  } else if (childAge === '1-3y') {
    return [
      "Offer a variety of nutritious foods across all food groups",
      "Serve appropriate portions - about 1 tablespoon per year of age for each food type",
      "Expect appetite fluctuations and food jags (periods of only wanting certain foods)",
      "Maintain a division of responsibility: parents decide what, when, and where to eat; child decides whether and how much",
      "Make mealtime pleasant and free from pressure to eat",
      "Include children in food preparation when possible",
      "Limit juice to 4 oz per day of 100% juice",
      "Avoid using food as rewards or punishment"
    ];
  } else {
    return [
      "Continue offering variety with increasing portions as appropriate",
      "Involve children in meal planning and preparation",
      "Model healthy eating behaviors",
      "Teach basic nutrition concepts in age-appropriate ways",
      "Gradually introduce more complex flavors and textures",
      "Limit highly processed foods and sugary beverages",
      "Make water the primary beverage",
      "Support self-regulation of hunger and fullness"
    ];
  }
};

// Generate a full diet plan
export const generateDietPlan = (userProfile: UserProfile): DietPlan => {
  const bmr = calculateBMR(userProfile.weight, userProfile.height, userProfile.age);
  const calorieTarget = calculateCalorieNeeds(bmr, userProfile.profileType, userProfile.pregnancyTrimester, userProfile.childAge);
  
  const macros = calculateMacros(userProfile.profileType, userProfile.pregnancyTrimester, userProfile.childAge);
  
  const proteinGrams = Math.round((calorieTarget * (macros.protein / 100)) / 4);
  const carbGrams = Math.round((calorieTarget * (macros.carbs / 100)) / 4);
  const fatGrams = Math.round((calorieTarget * (macros.fats / 100)) / 9);
  
  const keyNutrients = getKeyNutrients(userProfile.profileType, userProfile.pregnancyTrimester, userProfile.childAge);
  
  const sampleMeals = generateSampleMeals(userProfile.profileType, userProfile.pregnancyTrimester, userProfile.childAge);
  
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  let dailyPlans: DailyPlan[] = [];
  
  if (userProfile.profileType === 'child' && userProfile.childAge === '0-6m') {
    dailyPlans = daysOfWeek.map((day) => {
      return {
        day,
        totalCalories: calorieTarget,
        proteinGrams,
        carbGrams,
        fatGrams,
        keyNutrientFocus: ["Complete Nutrition through Breast Milk or Formula"],
        meals: {
          breakfast: sampleMeals.infantFeeding,
          morningSnack: sampleMeals.infantFeeding,
          lunch: sampleMeals.infantFeeding,
          afternoonSnack: sampleMeals.infantFeeding,
          dinner: sampleMeals.infantFeeding,
          eveningSnack: sampleMeals.infantFeeding
        }
      };
    });
  } else if (userProfile.profileType === 'child' && userProfile.childAge === '6-12m') {
    dailyPlans = daysOfWeek.map((day) => {
      return {
        day,
        totalCalories: calorieTarget,
        proteinGrams,
        carbGrams,
        fatGrams,
        keyNutrientFocus: ["Iron", "Zinc", "Healthy Fats", "Variety of Textures"],
        meals: {
          breakfast: sampleMeals.infantFeeding,
          morningSnack: sampleMeals.infantBreakfast,
          lunch: sampleMeals.infantFeeding,
          afternoonSnack: sampleMeals.infantLunch,
          dinner: sampleMeals.infantFeeding,
          eveningSnack: sampleMeals.infantDinner
        }
      };
    });
  } else if (userProfile.profileType === 'child') {
    dailyPlans = daysOfWeek.map((day) => {
      return {
        day,
        totalCalories: calorieTarget,
        proteinGrams,
        carbGrams,
        fatGrams,
        keyNutrientFocus: ["Calcium", "Iron", "Healthy Fats", "Variety"],
        meals: {
          breakfast: sampleMeals.toddlerBreakfast,
          morningSnack: sampleMeals.toddlerSnack,
          lunch: sampleMeals.toddlerLunch,
          afternoonSnack: sampleMeals.toddlerSnack,
          dinner: sampleMeals.toddlerDinner
        }
      };
    });
  } else if (userProfile.profileType === 'pregnant') {
    dailyPlans = daysOfWeek.map((day) => {
      return {
        day,
        totalCalories: calorieTarget,
        proteinGrams,
        carbGrams,
        fatGrams,
        keyNutrientFocus: ["Folate", "Iron", "Calcium", "Omega-3 DHA", "Choline"],
        meals: {
          breakfast: sampleMeals.pregnancyBreakfast,
          morningSnack: sampleMeals.pregnancySnack,
          lunch: sampleMeals.pregnancyLunch,
          afternoonSnack: sampleMeals.pregnancySnack,
          dinner: sampleMeals.pregnancyDinner,
          eveningSnack: sampleMeals.pregnancySnack
        }
      };
    });
  } else if (userProfile.profileType === 'breastfeeding') {
    dailyPlans = daysOfWeek.map((day) => {
      return {
        day,
        totalCalories: calorieTarget,
        proteinGrams,
        carbGrams,
        fatGrams,
        keyNutrientFocus: ["Calcium", "Hydration", "Protein", "Omega-3 DHA"],
        meals: {
          breakfast: sampleMeals.breastfeedingBreakfast,
          morningSnack: sampleMeals.breastfeedingSnack,
          lunch: sampleMeals.breastfeedingLunch,
          afternoonSnack: sampleMeals.breastfeedingSnack,
          dinner: sampleMeals.breastfeedingDinner,
          eveningSnack: sampleMeals.breastfeedingSnack
        }
      };
    });
  } else {
    dailyPlans = daysOfWeek.map((day) => {
      return {
        day,
        totalCalories: calorieTarget,
        proteinGrams,
        carbGrams,
        fatGrams,
        keyNutrientFocus: ["Folate", "Iron", "Omega-3 DHA"],
        meals: {
          breakfast: sampleMeals.planningBreakfast,
          morningSnack: sampleMeals.planningSnack,
          lunch: sampleMeals.planningLunch,
          afternoonSnack: sampleMeals.planningSnack,
          dinner: sampleMeals.planningDinner
        }
      };
    });
  }
  
  let recommendations: string[] = [
    "Stay hydrated by drinking plenty of water throughout the day",
    "Focus on whole, nutrient-dense foods as much as possible",
    "Include a variety of foods to ensure adequate vitamin and mineral intake",
    "Listen to your body's hunger and fullness cues"
  ];
  
  let foodSafetyGuidelines: string[] | undefined;
  let breastfeedingSupport: string[] | undefined;
  let childFeedingTips: string[] | undefined;
  
  if (userProfile.profileType === 'pregnant' || userProfile.profileType === 'planning') {
    foodSafetyGuidelines = generateFoodSafetyGuidelines();
    recommendations = [
      ...recommendations,
      "Take a prenatal vitamin with 400-800 mcg of folic acid daily",
      "Aim for 8-12 ounces of low-mercury seafood weekly for omega-3 fatty acids",
      "Maintain consistent meal timing to help manage nausea and blood sugar",
      "Prioritize iron-rich foods paired with vitamin C for better absorption"
    ];
  }
  
  if (userProfile.profileType === 'breastfeeding') {
    breastfeedingSupport = generateBreastfeedingTips();
    recommendations = [
      ...recommendations,
      "Consume approximately 500 additional calories per day above pre-pregnancy needs",
      "Continue taking prenatal vitamins or switch to postnatal formula",
      "Focus on calcium-rich foods to protect your bone health",
      "Keep healthy, one-handed snacks accessible during feeding sessions"
    ];
  }
  
  if (userProfile.profileType === 'child') {
    childFeedingTips = generateChildFeedingTips(userProfile.childAge);
    recommendations = [
      ...recommendations,
      "Establish regular meal and snack times",
      "Model healthy eating behaviors for your child",
      "Introduce a wide variety of flavors and textures",
      "Be patient with new foods - it may take 10-15 exposures before acceptance"
    ];
  }
  
  let shoppingList: Record<string, string[]> = {
    "fruits": [
      "Berries (strawberries, blueberries, raspberries)",
      "Bananas",
      "Apples",
      "Avocados",
      "Oranges or citrus fruits"
    ],
    "vegetables": [
      "Leafy greens (spinach, kale)",
      "Broccoli",
      "Sweet potatoes",
      "Bell peppers",
      "Carrots",
      "Tomatoes"
    ],
    "protein": [
      "Eggs",
      "Lean meats (if not vegetarian)",
      "Fish low in mercury (salmon, trout, sardines)",
      "Tofu or tempeh",
      "Legumes (lentils, chickpeas, black beans)"
    ],
    "dairy and alternatives": [
      "Greek yogurt",
      "Cheese",
      "Milk or fortified plant milk"
    ],
    "grains and starches": [
      "Whole grain bread",
      "Brown rice",
      "Oats",
      "Quinoa",
      "Whole grain pasta"
    ],
    "healthy fats": [
      "Olive oil",
      "Nuts and seeds",
      "Nut butters"
    ],
    "pantry items": [
      "Herbs and spices",
      "Low-sodium broths",
      "Vinegars"
    ]
  };
  
  if (userProfile.profileType === 'pregnant' || userProfile.profileType === 'planning') {
    shoppingList = {
      ...shoppingList,
      "pregnancy foods": [
        "Fortified cereals (with folic acid and iron)",
        "Molasses (iron-rich)",
        "Prunes and dried fruits (iron and fiber)",
        "Pumpkin seeds (zinc and magnesium)",
        "Sardines with bones (calcium and omega-3s)"
      ]
    };
  }
  
  if (userProfile.profileType === 'breastfeeding') {
    shoppingList = {
      ...shoppingList,
      "lactation foods": [
        "Oats (regular or steel-cut)",
        "Flaxseed (ground)",
        "Brewer's yeast",
        "Fenugreek (if recommended)",
        "Fennel",
        "Convenient, nutrient-dense snacks"
      ]
    };
  }
  
  if (userProfile.profileType === 'child' && userProfile.childAge === '6-12m') {
    shoppingList = {
      ...shoppingList,
      "baby foods": [
        "Iron-fortified infant cereals",
        "Soft fruits for pureeing",
        "Vegetables for pureeing",
        "Plain whole milk yogurt (after 6 months)",
        "Infant appropriate snacks"
      ]
    };
  } else if (userProfile.profileType === 'child') {
    shoppingList = {
      ...shoppingList,
      "child foods": [
        "Whole milk (for ages 1-2)",
        "Finger-friendly fruits and vegetables",
        "Age-appropriate snacks",
        "Small-sized whole grain products",
        "Easy-to-eat protein sources"
      ]
    };
  }
  
  return {
    userProfile: {
      age: userProfile.age,
      profileType: userProfile.profileType,
      pregnancyTrimester: userProfile.pregnancyTrimester,
      childAge: userProfile.childAge,
      weight: userProfile.weight,
      height: userProfile.height
    },
    calorieTarget,
    macroBreakdown: macros,
    keyNutrients,
    dailyPlans,
    recommendations,
    ...(foodSafetyGuidelines && { foodSafetyGuidelines }),
    ...(breastfeedingSupport && { breastfeedingSupport }),
    ...(childFeedingTips && { childFeedingTips }),
    shoppingList
  };
};
