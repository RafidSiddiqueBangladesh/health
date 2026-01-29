import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Apple, Smile, Brain, Sparkles } from "lucide-react";

interface DietPlan {
  condition: string;
  icon: React.ReactNode;
  description: string;
  foods: {
    category: string;
    items: { name: string; benefit: string; local?: boolean }[];
  }[];
  avoid: string[];
  tips: string[];
}

const dietPlans: DietPlan[] = [
  {
    condition: "Dental Health",
    icon: <Smile className="h-5 w-5" />,
    description: "Foods that strengthen teeth and promote gum health",
    foods: [
      {
        category: "Calcium-Rich Foods",
        items: [
          { name: "Doodh (Milk)", benefit: "Strengthens tooth enamel", local: true },
          { name: "Doi (Yogurt)", benefit: "Contains probiotics for gum health", local: true },
          { name: "Chingri (Shrimp)", benefit: "High in phosphorus and calcium", local: true },
          { name: "Paneer", benefit: "Reduces acid in mouth", local: true },
        ]
      },
      {
        category: "Crunchy Vegetables",
        items: [
          { name: "Gajor (Carrot)", benefit: "Natural teeth cleaner", local: true },
          { name: "Shasha (Cucumber)", benefit: "High water content, cleans teeth", local: true },
          { name: "Peyara (Guava)", benefit: "Rich in Vitamin C for gums", local: true },
        ]
      },
      {
        category: "Protein Sources",
        items: [
          { name: "Ilish Mach (Hilsa)", benefit: "Omega-3 reduces gum inflammation", local: true },
          { name: "Dim (Eggs)", benefit: "Vitamin D for calcium absorption", local: true },
        ]
      }
    ],
    avoid: ["Sugary mishti", "Sticky candies", "Acidic drinks", "Too much cha (tea) with sugar"],
    tips: [
      "Rinse mouth after eating sweets",
      "Chew sugar-free gum after meals",
      "Wait 30 minutes after eating before brushing"
    ]
  },
  {
    condition: "Skin Health",
    icon: <Sparkles className="h-5 w-5" />,
    description: "Foods for glowing, healthy skin",
    foods: [
      {
        category: "Antioxidant-Rich",
        items: [
          { name: "Papaya (Pepe)", benefit: "Enzymes improve skin texture", local: true },
          { name: "Tomato", benefit: "Lycopene protects from sun damage", local: true },
          { name: "Aam (Mango)", benefit: "Vitamin A for skin repair", local: true },
          { name: "Kola (Banana)", benefit: "Moisturizes skin naturally", local: true },
        ]
      },
      {
        category: "Healthy Fats",
        items: [
          { name: "Narikel (Coconut)", benefit: "Hydrates and nourishes skin", local: true },
          { name: "Til (Sesame seeds)", benefit: "Vitamin E for elasticity", local: true },
          { name: "Rui/Katla Mach", benefit: "Omega-3 for skin glow", local: true },
        ]
      },
      {
        category: "Hydrating Foods",
        items: [
          { name: "Tormuj (Watermelon)", benefit: "92% water, great for hydration", local: true },
          { name: "Daab (Green Coconut)", benefit: "Natural electrolytes", local: true },
        ]
      }
    ],
    avoid: ["Fried foods", "Too much oil", "Processed snacks", "Excessive sugar"],
    tips: [
      "Drink 8-10 glasses of water daily",
      "Include colorful vegetables in every meal",
      "Apply coconut oil externally too"
    ]
  },
  {
    condition: "Mental Wellness",
    icon: <Brain className="h-5 w-5" />,
    description: "Foods that reduce stress and improve mood",
    foods: [
      {
        category: "Mood Boosters",
        items: [
          { name: "Kala Chana", benefit: "Complex carbs stabilize mood", local: true },
          { name: "Muri (Puffed Rice)", benefit: "Light snack, good for digestion", local: true },
          { name: "Kola (Banana)", benefit: "Tryptophan improves sleep", local: true },
          { name: "Dudh-Haldi", benefit: "Turmeric reduces inflammation", local: true },
        ]
      },
      {
        category: "Brain Foods",
        items: [
          { name: "Badam (Almonds)", benefit: "Vitamin E for brain health", local: true },
          { name: "Methi (Fenugreek)", benefit: "Reduces anxiety symptoms", local: true },
          { name: "Rui Mach", benefit: "DHA for cognitive function", local: true },
        ]
      },
      {
        category: "Calming Foods",
        items: [
          { name: "Chamomile Cha", benefit: "Natural relaxant", local: false },
          { name: "Lauki (Bottle Gourd)", benefit: "Cooling, reduces stress", local: true },
          { name: "Pudina (Mint)", benefit: "Soothes nervous system", local: true },
        ]
      }
    ],
    avoid: ["Excessive caffeine", "Alcohol", "High-sugar foods", "Ultra-processed snacks"],
    tips: [
      "Eat meals at regular times",
      "Don't skip breakfast",
      "Have dinner 2-3 hours before sleep",
      "Include fermented foods like doi"
    ]
  }
];

const NutritionByCondition = () => {
  const [selectedCondition, setSelectedCondition] = useState("dental");

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-4">
              <Apple className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Nutrition by Condition</h1>
            <p className="text-muted-foreground">
              Personalized diet plans with local Bangladeshi foods
            </p>
          </div>

          <Tabs defaultValue="dental" onValueChange={setSelectedCondition}>
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="dental" className="gap-2">
                <Smile className="h-4 w-4" /> Dental
              </TabsTrigger>
              <TabsTrigger value="skin" className="gap-2">
                <Sparkles className="h-4 w-4" /> Skin
              </TabsTrigger>
              <TabsTrigger value="mental" className="gap-2">
                <Brain className="h-4 w-4" /> Mental
              </TabsTrigger>
            </TabsList>

            {dietPlans.map((plan, index) => (
              <TabsContent 
                key={plan.condition} 
                value={["dental", "skin", "mental"][index]}
                className="space-y-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {plan.icon}
                      {plan.condition}
                    </CardTitle>
                    <p className="text-muted-foreground">{plan.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {plan.foods.map((category) => (
                      <div key={category.category}>
                        <h3 className="font-semibold mb-3 text-primary">
                          {category.category}
                        </h3>
                        <div className="grid gap-3">
                          {category.items.map((item) => (
                            <div 
                              key={item.name}
                              className="flex items-start justify-between p-3 rounded-lg bg-muted/50"
                            >
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">{item.name}</span>
                                  {item.local && (
                                    <Badge variant="secondary" className="text-xs">
                                      🇧🇩 Local
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {item.benefit}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}

                    <div className="border-t border-border pt-4">
                      <h3 className="font-semibold mb-3 text-destructive">
                        🚫 Foods to Avoid
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {plan.avoid.map((item) => (
                          <Badge key={item} variant="outline" className="text-destructive">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-border pt-4">
                      <h3 className="font-semibold mb-3 text-green-600 dark:text-green-400">
                        💡 Tips
                      </h3>
                      <ul className="space-y-2">
                        {plan.tips.map((tip) => (
                          <li key={tip} className="flex items-start gap-2 text-sm">
                            <span className="text-green-500">✓</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default NutritionByCondition;
