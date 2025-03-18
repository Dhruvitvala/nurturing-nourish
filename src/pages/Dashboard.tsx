
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { 
  UserCircle, 
  Calendar, 
  BarChart3, 
  BookOpen, 
  MessageCircle, 
  ChevronLeft,
  ChevronRight,
  Menu
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardContent } from '@/components/ui/card';
import DashboardProfile from '@/components/dashboard/DashboardProfile';
import DashboardNutrition from '@/components/dashboard/DashboardNutrition';
import DashboardTracking from '@/components/dashboard/DashboardTracking';
import DashboardResources from '@/components/dashboard/DashboardResources';
import DashboardSupport from '@/components/dashboard/DashboardSupport';
import { NutrientProgress } from '@/components/dashboard/NutrientProgress';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'nutrition' | 'tracking' | 'resources' | 'support'>('profile');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Mock user data - would come from API in production
  const userData = {
    name: "Sarah Johnson",
    stage: "Pregnancy",
    trimester: "Second Trimester (Week 18)",
    profileType: "pregnancy",
    keyMetrics: {
      weight: 68,
      weightTarget: "On track",
      height: 165,
      bmi: 25.0,
    },
    nutritionProgress: {
      overall: 82,
      protein: 85,
      iron: 70,
      calcium: 90,
      folate: 95,
      omega3: 65,
    },
    dietaryPreferences: {
      preferences: "Vegetarian, Mediterranean diet",
      allergies: "Lactose intolerance, Tree nuts",
      restrictions: "No alcohol, Limited caffeine"
    },
    nutritionalGoals: {
      primaryGoals: "Healthy pregnancy weight gain, Optimize fetal development",
      focusAreas: "Increase iron intake, Maintain calcium levels",
      specificConcerns: "Morning sickness management, Heartburn reduction"
    }
  };

  const renderActiveContent = () => {
    switch (activeTab) {
      case 'profile':
        return <DashboardProfile userData={userData} />;
      case 'nutrition':
        return <DashboardNutrition userData={userData} />;
      case 'tracking':
        return <DashboardTracking userData={userData} />;
      case 'resources':
        return <DashboardResources userData={userData} />;
      case 'support':
        return <DashboardSupport userData={userData} />;
      default:
        return <DashboardProfile userData={userData} />;
    }
  };

  return (
    <div className="min-h-screen bg-nurturing-50/30 pt-20 pb-10">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row gap-5">
          {/* Sidebar Navigation */}
          <aside 
            className={`bg-white rounded-lg shadow-sm border border-nurturing-100 transition-all duration-300 flex flex-col
              ${isSidebarCollapsed ? 'md:w-20' : 'md:w-64'} ${isMobile ? 'w-full' : ''}`}
          >
            <div className="p-4 border-b border-nurturing-100 flex justify-between items-center">
              <h2 className={`font-semibold text-nurturing-800 ${isSidebarCollapsed ? 'md:hidden' : ''}`}>
                Maternal Nutrition
              </h2>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleSidebar}
                className="hidden md:flex"
              >
                {isSidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleSidebar}
                className="md:hidden"
              >
                <Menu />
              </Button>
            </div>
            
            <nav className="p-2 flex-1">
              <ul className="space-y-1">
                <li>
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full p-3 rounded-md flex items-center transition-colors
                      ${activeTab === 'profile' ? 'bg-nurturing-100 text-nurturing-800' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    <UserCircle className="h-5 w-5" />
                    <span className={`ml-3 ${isSidebarCollapsed ? 'md:hidden' : ''}`}>Profile</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('nutrition')}
                    className={`w-full p-3 rounded-md flex items-center transition-colors
                      ${activeTab === 'nutrition' ? 'bg-nurturing-100 text-nurturing-800' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    <Calendar className="h-5 w-5" />
                    <span className={`ml-3 ${isSidebarCollapsed ? 'md:hidden' : ''}`}>Meal Planning</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('tracking')}
                    className={`w-full p-3 rounded-md flex items-center transition-colors
                      ${activeTab === 'tracking' ? 'bg-nurturing-100 text-nurturing-800' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    <BarChart3 className="h-5 w-5" />
                    <span className={`ml-3 ${isSidebarCollapsed ? 'md:hidden' : ''}`}>Tracking</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('resources')}
                    className={`w-full p-3 rounded-md flex items-center transition-colors
                      ${activeTab === 'resources' ? 'bg-nurturing-100 text-nurturing-800' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    <BookOpen className="h-5 w-5" />
                    <span className={`ml-3 ${isSidebarCollapsed ? 'md:hidden' : ''}`}>Resources</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('support')}
                    className={`w-full p-3 rounded-md flex items-center transition-colors
                      ${activeTab === 'support' ? 'bg-nurturing-100 text-nurturing-800' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span className={`ml-3 ${isSidebarCollapsed ? 'md:hidden' : ''}`}>Support</span>
                  </button>
                </li>
              </ul>
            </nav>
            
            <div className="p-4 border-t border-nurturing-100">
              {!isSidebarCollapsed && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-nurturing-800">Critical Nutrients</h3>
                  <NutrientProgress
                    label="Iron"
                    value={userData.nutritionProgress.iron}
                    status={userData.nutritionProgress.iron < 75 ? "warning" : "success"}
                  />
                  <NutrientProgress
                    label="Folate"
                    value={userData.nutritionProgress.folate}
                    status="success"
                  />
                  <NutrientProgress
                    label="Calcium"
                    value={userData.nutritionProgress.calcium}
                    status="success"
                  />
                </div>
              )}
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border border-nurturing-100 p-5">
              {renderActiveContent()}
            </div>
          </main>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Dashboard;
