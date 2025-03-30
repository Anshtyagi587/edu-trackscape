
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AreaChart, BarChart, LineChart, PieChart } from '@/components/ui/recharts';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Clock, FileText, TrendingUp, Trophy, CheckCircle2, BookOpen, BrainCircuit } from 'lucide-react';

const StudentDashboard = () => {
  const { user } = useAuth();

  // Mock data for charts
  const quizScores = {
    labels: ['Math', 'Science', 'History', 'English', 'Geography'],
    datasets: [
      {
        label: 'Quiz Score (%)',
        data: [85, 72, 90, 65, 78],
        backgroundColor: [
          'rgba(30, 174, 219, 0.7)',
          'rgba(60, 179, 113, 0.7)',
          'rgba(255, 193, 7, 0.7)',
          'rgba(255, 82, 82, 0.7)',
          'rgba(153, 102, 255, 0.7)',
        ],
        borderColor: [
          'rgba(30, 174, 219, 1)',
          'rgba(60, 179, 113, 1)',
          'rgba(255, 193, 7, 1)',
          'rgba(255, 82, 82, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const progressOverTime = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Average Score',
        data: [65, 72, 70, 76, 79, 82],
        fill: true,
        backgroundColor: 'rgba(30, 174, 219, 0.2)',
        borderColor: 'rgba(30, 174, 219, 1)',
        pointBackgroundColor: 'rgba(30, 174, 219, 1)',
        tension: 0.4,
      },
    ],
  };

  const subjectPerformance = {
    labels: ['Math', 'Science', 'History', 'English', 'Geography'],
    datasets: [
      {
        label: 'Your Score',
        data: [85, 72, 90, 65, 78],
        backgroundColor: 'rgba(30, 174, 219, 0.7)',
      },
      {
        label: 'Class Average',
        data: [72, 68, 75, 70, 73],
        backgroundColor: 'rgba(180, 180, 180, 0.7)',
      },
    ],
  };

  // Mock data for recent quizzes
  const recentQuizzes = [
    { id: 1, title: 'Algebra Fundamentals', score: 85, outOf: 100, date: '2023-09-15', subject: 'Math' },
    { id: 2, title: 'Chemical Reactions', score: 72, outOf: 100, date: '2023-09-10', subject: 'Science' },
    { id: 3, title: 'World War II', score: 90, outOf: 100, date: '2023-09-05', subject: 'History' },
  ];

  // Mock data for upcoming quizzes
  const upcomingQuizzes = [
    { id: 4, title: 'Grammar Essentials', date: '2023-09-25', subject: 'English', duration: '30 min' },
    { id: 5, title: 'European Geography', date: '2023-09-28', subject: 'Geography', duration: '45 min' },
    { id: 6, title: 'Calculus Intro', date: '2023-10-02', subject: 'Math', duration: '60 min' },
  ];

  // Achievements data
  const achievements = [
    { id: 1, title: 'Quiz Master', description: 'Complete 5 quizzes with 90% or higher', achieved: true },
    { id: 2, title: 'Learning Streak', description: 'Login for 7 consecutive days', achieved: true },
    { id: 3, title: 'Subject Expert', description: 'Score 100% in any subject quiz', achieved: false },
  ];

  return (
    <div className="space-y-6 pb-10 animate-fade-in">
      {/* Welcome message and overview */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600 mt-1">Track your progress and performance</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center bg-white rounded-lg p-3 shadow-sm border">
          <CalendarDays className="h-5 w-5 text-gray-500 mr-2" />
          <span className="text-sm text-gray-600">
            Today: {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover-scale">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Overall Progress</p>
                <p className="text-2xl font-bold mt-1">76%</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-edu-blue/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-edu-blue" />
              </div>
            </div>
            <Progress value={76} className="h-2 mt-3" />
          </CardContent>
        </Card>

        <Card className="hover-scale">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Quizzes Completed</p>
                <p className="text-2xl font-bold mt-1">24 / 36</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-edu-green/10 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-edu-green" />
              </div>
            </div>
            <Progress value={67} className="h-2 mt-3" />
          </CardContent>
        </Card>

        <Card className="hover-scale">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Videos Watched</p>
                <p className="text-2xl font-bold mt-1">18 / 45</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-edu-yellow/10 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-edu-yellow" />
              </div>
            </div>
            <Progress value={40} className="h-2 mt-3" />
          </CardContent>
        </Card>

        <Card className="hover-scale">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Learning Score</p>
                <p className="text-2xl font-bold mt-1">520 pts</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-edu-red/10 flex items-center justify-center">
                <Trophy className="h-6 w-6 text-edu-red" />
              </div>
            </div>
            <div className="flex items-center mt-3">
              <TrendingUp className="h-4 w-4 text-edu-green mr-1" />
              <span className="text-xs font-medium text-edu-green">+48 pts this week</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Subject Performance</CardTitle>
            <CardDescription>Your score compared to class average</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <BarChart 
                data={subjectPerformance} 
                options={{
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 100,
                    }
                  },
                  responsive: true,
                  maintainAspectRatio: false
                }} 
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Progress Over Time</CardTitle>
            <CardDescription>Your average score improvement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <LineChart 
                data={progressOverTime} 
                options={{
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 100,
                    }
                  },
                  responsive: true,
                  maintainAspectRatio: false
                }} 
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent and Upcoming Quizzes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Quiz Results</CardTitle>
            <CardDescription>Your latest quiz performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentQuizzes.map((quiz) => (
                <div key={quiz.id} className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                  <div>
                    <p className="font-medium">{quiz.title}</p>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Badge variant="outline" className="mr-2">{quiz.subject}</Badge>
                      <span>{new Date(quiz.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{quiz.score}%</p>
                    <p className="text-sm text-gray-500">Score: {quiz.score}/{quiz.outOf}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Quizzes</CardTitle>
            <CardDescription>Prepare for these upcoming assessments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingQuizzes.map((quiz) => (
                <div key={quiz.id} className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                  <div>
                    <p className="font-medium">{quiz.title}</p>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Badge variant="outline" className="mr-2">{quiz.subject}</Badge>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{quiz.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-edu-blue">
                      {new Date(quiz.date).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {Math.ceil((new Date(quiz.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>Your Achievements</CardTitle>
          <CardDescription>Badges and rewards you've earned</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id} 
                className={`border rounded-xl p-4 flex flex-col items-center text-center ${
                  achievement.achieved ? 'bg-edu-blue/5 border-edu-blue/20' : 'bg-gray-100 border-gray-200'
                }`}
              >
                <div className={`h-16 w-16 rounded-full flex items-center justify-center mb-3 ${
                  achievement.achieved ? 'bg-edu-blue/10' : 'bg-gray-200'
                }`}>
                  {achievement.achieved ? (
                    <Trophy className={`h-8 w-8 text-edu-blue`} />
                  ) : (
                    <BrainCircuit className="h-8 w-8 text-gray-400" />
                  )}
                </div>
                <h3 className={`font-semibold ${achievement.achieved ? 'text-edu-blue' : 'text-gray-500'}`}>
                  {achievement.title}
                </h3>
                <p className="text-sm text-gray-500 mt-2">{achievement.description}</p>
                <Badge variant={achievement.achieved ? "default" : "outline"} className="mt-3">
                  {achievement.achieved ? 'Completed' : 'In Progress'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Learning recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended for You</CardTitle>
          <CardDescription>Based on your performance and interests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border rounded-lg overflow-hidden hover-scale">
              <div className="aspect-video w-full bg-gray-100 relative">
                <img 
                  src="https://images.unsplash.com/photo-1635372722656-389f87a941b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=280&q=80" 
                  alt="Algebra video thumbnail"
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 right-2">Video</Badge>
              </div>
              <div className="p-4">
                <Badge variant="outline" className="mb-2">Math</Badge>
                <h3 className="font-semibold">Advanced Algebra Concepts</h3>
                <p className="text-sm text-gray-500 mt-1">Strengthen your algebra skills with these advanced concepts</p>
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden hover-scale">
              <div className="aspect-video w-full bg-gray-100 relative">
                <img 
                  src="https://images.unsplash.com/photo-1581094285324-2317d9a7ab5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=280&q=80" 
                  alt="Grammar quiz thumbnail"
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 right-2">Quiz</Badge>
              </div>
              <div className="p-4">
                <Badge variant="outline" className="mb-2">English</Badge>
                <h3 className="font-semibold">Advanced Grammar Practice</h3>
                <p className="text-sm text-gray-500 mt-1">Test your knowledge of advanced grammar rules</p>
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden hover-scale">
              <div className="aspect-video w-full bg-gray-100 relative">
                <img 
                  src="https://images.unsplash.com/photo-1564982752979-3f7bc974d29a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=280&q=80" 
                  alt="Chemistry practice thumbnail"
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 right-2">Practice</Badge>
              </div>
              <div className="p-4">
                <Badge variant="outline" className="mb-2">Science</Badge>
                <h3 className="font-semibold">Chemical Equations Practice</h3>
                <p className="text-sm text-gray-500 mt-1">Practice balancing chemical equations</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDashboard;
