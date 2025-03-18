
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Search, GraduationCap, Video, FileText, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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

interface DashboardResourcesProps {
  userData: UserData;
}

// Mock article data
const articles = [
  {
    title: "Nutrition Essentials for Your Second Trimester",
    description: "Learn about the critical nutrients needed during weeks 13-26 of pregnancy",
    category: "Pregnancy Nutrition",
    readTime: "6 min read",
    image: "https://placehold.co/120x80/FFE5EC/F34082?text=Nutrition&font=roboto"
  },
  {
    title: "Iron-Rich Foods to Combat Pregnancy Anemia",
    description: "Discover delicious ways to boost your iron intake with food-first approaches",
    category: "Micronutrients",
    readTime: "4 min read",
    image: "https://placehold.co/120x80/FFE5EC/F34082?text=Iron&font=roboto"
  },
  {
    title: "Managing Heartburn During Pregnancy",
    description: "Nutritional strategies to reduce acid reflux and heartburn in your second trimester",
    category: "Symptom Management",
    readTime: "5 min read",
    image: "https://placehold.co/120x80/FFE5EC/F34082?text=Heartburn&font=roboto"
  },
  {
    title: "Safe Exercise During the Second Trimester",
    description: "Movement guidelines to support a healthy pregnancy while protecting you and baby",
    category: "Physical Activity",
    readTime: "7 min read",
    image: "https://placehold.co/120x80/FFE5EC/F34082?text=Exercise&font=roboto"
  }
];

// Mock FAQ data
const faqs = [
  {
    question: "How much weight should I gain during my second trimester?",
    answer: "During the second trimester, most pregnant women should gain about 1 pound per week. This means approximately 12-14 pounds total during this period, assuming your pre-pregnancy weight was in the normal BMI range. If you were under or overweight before pregnancy, these guidelines may differ. Always consult with your healthcare provider for personalized advice."
  },
  {
    question: "Do I need to take prenatal supplements in addition to eating well?",
    answer: "Yes, most healthcare providers recommend continuing prenatal vitamins throughout pregnancy. Even with a balanced diet, it can be challenging to meet all increased nutritional needs, particularly for folate, iron, calcium, vitamin D, DHA, and iodine. Your prenatal vitamin serves as nutritional insurance to fill potential gaps."
  },
  {
    question: "Is it safe to eat fish during pregnancy?",
    answer: "Yes, low-mercury fish are actually recommended during pregnancy as they provide essential omega-3 fatty acids, particularly DHA which supports fetal brain development. Aim for 8-12 oz weekly of options like salmon, trout, sardines, and herring. Avoid high-mercury fish such as shark, swordfish, king mackerel, and tilefish."
  }
];

const DashboardResources: React.FC<DashboardResourcesProps> = ({ userData }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-nurturing-900">Educational Resources</h1>
          <p className="text-nurturing-600">Evidence-based information tailored to {userData.trimester}</p>
        </div>
        <div className="w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search resources..."
              className="w-full sm:w-[250px] pl-9"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-nurturing-50 border-nurturing-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm mb-3">
                <BookOpen className="h-6 w-6 text-nurturing-600" />
              </div>
              <h3 className="font-medium text-nurturing-800">Articles</h3>
              <p className="text-sm text-nurturing-600 mt-1">Evidence-based nutrition information</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-soft-50 border-soft-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm mb-3">
                <Video className="h-6 w-6 text-soft-600" />
              </div>
              <h3 className="font-medium text-soft-800">Videos</h3>
              <p className="text-sm text-soft-600 mt-1">Visual guides and tutorials</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-peach-50 border-peach-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm mb-3">
                <GraduationCap className="h-6 w-6 text-peach-600" />
              </div>
              <h3 className="font-medium text-peach-800">Courses</h3>
              <p className="text-sm text-peach-600 mt-1">In-depth educational series</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-nurturing-50 border-nurturing-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm mb-3">
                <FileText className="h-6 w-6 text-nurturing-600" />
              </div>
              <h3 className="font-medium text-nurturing-800">Guides</h3>
              <p className="text-sm text-nurturing-600 mt-1">Downloadable resources</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recommended for You</CardTitle>
            <Button variant="ghost" size="sm">View all</Button>
          </div>
          <CardDescription>
            Articles curated for {userData.trimester}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-[120px] h-[80px] rounded-md overflow-hidden flex-shrink-0">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-nurturing-100 text-nurturing-700">
                      {article.category}
                    </span>
                    <span className="text-xs text-gray-500">{article.readTime}</span>
                  </div>
                  <h3 className="font-medium text-nurturing-900 leading-tight">{article.title}</h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{article.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>
            Common questions about {userData.trimester} nutrition
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="space-y-2">
                <h3 className="font-medium text-nurturing-800">{faq.question}</h3>
                <p className="text-sm text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="border-t pt-6 flex justify-between">
          <span className="text-sm text-gray-500">Have other questions? Ask our AI nutritionist</span>
          <Button variant="outline" size="sm">
            <ExternalLink className="mr-2 h-4 w-4" />
            More FAQs
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DashboardResources;
