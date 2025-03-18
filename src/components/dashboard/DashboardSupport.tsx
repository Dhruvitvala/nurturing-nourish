
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Share2, SendHorizontal, Users, Bell, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

interface DashboardSupportProps {
  userData: UserData;
}

// Mock chat messages
const initialMessages = [
  {
    sender: 'ai',
    text: 'Hello! How can I help with your nutrition questions today?',
    timestamp: new Date(Date.now() - 3600000).toISOString()
  }
];

// Mock community topics
const communityTopics = [
  {
    title: "Morning Sickness Remedies",
    posts: 42,
    members: 156,
    lastActive: "2 hours ago"
  },
  {
    title: "Iron-Rich Vegetarian Meals",
    posts: 27,
    members: 89,
    lastActive: "5 hours ago"
  },
  {
    title: "Second Trimester Nutrition",
    posts: 63,
    members: 211,
    lastActive: "1 hour ago"
  },
  {
    title: "Heartburn-Friendly Recipes",
    posts: 18,
    members: 73,
    lastActive: "1 day ago"
  }
];

const DashboardSupport: React.FC<DashboardSupportProps> = ({ userData }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const { toast } = useToast();
  
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage = {
      sender: 'user',
      text: newMessage,
      timestamp: new Date().toISOString()
    };
    
    setMessages([...messages, userMessage]);
    setNewMessage('');
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponse = {
        sender: 'ai',
        text: `Based on your ${userData.trimester} status, I'd recommend focusing on iron-rich foods like leafy greens and legumes. Would you like specific meal suggestions that are high in iron?`,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleShareReport = () => {
    toast({
      title: "Report Ready to Share",
      description: "Your nutrition report has been prepared and is ready to share with your healthcare provider.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-nurturing-900">Support Center</h1>
          <p className="text-nurturing-600">Get help and connect with our community</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleShareReport}>
            <Share2 className="mr-2 h-4 w-4" />
            Share with Provider
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="md:row-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-nurturing-600" />
              Nutrition Assistant
            </CardTitle>
            <CardDescription>
              Ask questions about your nutrition needs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[320px] overflow-y-auto mb-4 space-y-4">
              {messages.map((message, index) => (
                <div 
                  key={index}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg p-3 
                      ${message.sender === 'user' 
                        ? 'bg-nurturing-600 text-white' 
                        : 'bg-gray-100 text-gray-800'
                      }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <div 
                      className={`text-xs mt-1 
                        ${message.sender === 'user' ? 'text-nurturing-100' : 'text-gray-500'}`}
                    >
                      {new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <div className="w-full flex gap-2">
              <Textarea 
                placeholder="Ask a question about your nutrition needs..." 
                className="min-h-[60px] flex-1"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button onClick={handleSendMessage} className="self-end">
                <SendHorizontal className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-nurturing-600" />
              Community
            </CardTitle>
            <CardDescription>
              Connect with others at similar stages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {communityTopics.map((topic, index) => (
                <div key={index} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                  <h3 className="font-medium text-nurturing-800">{topic.title}</h3>
                  <div className="flex justify-between mt-1">
                    <div className="flex items-center text-xs text-gray-500 gap-2">
                      <span>{topic.posts} posts</span>
                      <span>•</span>
                      <span>{topic.members} members</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Active {topic.lastActive}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="justify-end border-t pt-4">
            <Button variant="outline" size="sm">
              <ArrowRight className="h-4 w-4 ml-1" />
              View All Communities
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-nurturing-600" />
              Notifications
            </CardTitle>
            <CardDescription>
              Important updates and reminders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 border-b border-gray-100 pb-3">
                <div className="w-2 h-2 rounded-full bg-nurturing-500 mt-1.5"></div>
                <div>
                  <p className="text-sm font-medium text-nurturing-800">Weekly nutrition report ready</p>
                  <p className="text-xs text-gray-500 mt-0.5">Today, 9:40 AM</p>
                </div>
              </div>
              <div className="flex items-start gap-3 border-b border-gray-100 pb-3">
                <div className="w-2 h-2 rounded-full bg-nurturing-500 mt-1.5"></div>
                <div>
                  <p className="text-sm font-medium text-nurturing-800">New article: Iron-Rich Foods for Pregnancy</p>
                  <p className="text-xs text-gray-500 mt-0.5">Yesterday, 2:15 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-gray-300 mt-1.5"></div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Reminder: Log your water intake</p>
                  <p className="text-xs text-gray-500 mt-0.5">2 days ago, 10:30 AM</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-end border-t pt-4">
            <Button variant="outline" size="sm">
              <ArrowRight className="h-4 w-4 ml-1" />
              View All Notifications
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default DashboardSupport;
