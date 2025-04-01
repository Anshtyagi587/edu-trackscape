import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  GraduationCap, 
  FileQuestion,
  Video, 
  MessageSquare, 
  TrendingUp,
  CheckCircle,
  BrainCircuit
} from 'lucide-react';

const HomePage = () => {
  useEffect(() => {
    // Inject Botpress Webchat Scripts
    const script1 = document.createElement("script");
    script1.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js";
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement("script");
    script2.src = "https://files.bpcontent.cloud/2025/03/30/15/20250330150921-9386B68T.js";
    script2.async = true;
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div className="mb-8 lg:mb-0">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight">
                Track Your <span className="text-edu-blue">Educational</span> Progress
              </h1>
              <p className="mt-6 text-xl text-gray-500">
                A comprehensive platform for students, teachers, and administrators to track performance, 
                take quizzes, and access educational content.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/signup">
                  <Button size="lg" className="edu-gradient text-white">
                    Get Started
                  </Button>
                </Link>
                <Link to="/courses">
                  <Button size="lg" variant="outline">
                    Browse Courses
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:relative">
              <div className="mx-auto max-w-md lg:max-w-none">
                <div className="relative h-[420px] sm:h-[500px] lg:h-auto overflow-hidden rounded-2xl shadow-xl bg-white">
                  <img
                    src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
                    alt="Student dashboard"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white">Dashboard Preview</h3>
                    <p className="text-white/90 mt-2">Track your progress with our intuitive dashboard</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Key Features</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to excel in your educational journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow edu-card">
              <div className="h-12 w-12 rounded-lg bg-edu-blue/10 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-edu-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
              <p className="text-gray-600">
                Monitor your learning journey with visual progress indicators and detailed analytics.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow edu-card">
              <div className="h-12 w-12 rounded-lg bg-edu-green/10 flex items-center justify-center mb-4">
                <FileQuestion className="h-6 w-6 text-edu-green" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Interactive Quizzes</h3>
              <p className="text-gray-600">
                Assess your knowledge with our comprehensive quiz system with instant feedback.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-edu-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <BookOpen className="h-16 w-16 mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold max-w-2xl">
            Ready to take control of your educational journey?
          </h2>
          <p className="mt-4 text-xl max-w-3xl text-white/90">
            Join thousands of students who are already tracking their progress and improving their performance.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" variant="secondary" className="bg-white text-edu-blue hover:bg-gray-100">
                Get Started for Free
              </Button>
            </Link>
            <Link to="/courses">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Browse Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
