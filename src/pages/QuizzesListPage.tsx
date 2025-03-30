
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FileQuestion, Clock, BarChart, Award } from "lucide-react";

const QuizzesListPage = () => {
  // Mock quizzes data
  const quizzes = [
    {
      id: 101,
      title: "Mathematics Fundamentals",
      description: "Test your knowledge of basic mathematics concepts.",
      category: "Mathematics",
      difficulty: "Easy",
      timeLimit: 30,
      questions: 20,
      completed: true,
      score: 85,
    },
    {
      id: 102,
      title: "Physics Principles",
      description: "Test your understanding of core physics concepts.",
      category: "Physics",
      difficulty: "Medium",
      timeLimit: 45,
      questions: 25,
      completed: true,
      score: 92,
    },
    {
      id: 103,
      title: "Chemistry Basics",
      description: "Evaluate your knowledge of chemical principles.",
      category: "Chemistry",
      difficulty: "Medium",
      timeLimit: 40,
      questions: 22,
      completed: false,
      progress: 45,
    },
    {
      id: 104,
      title: "World History",
      description: "Test your knowledge of key historical events.",
      category: "History",
      difficulty: "Hard",
      timeLimit: 60,
      questions: 30,
      completed: false,
      progress: 0,
    },
    {
      id: 105,
      title: "English Grammar",
      description: "Evaluate your understanding of grammar rules.",
      category: "English",
      difficulty: "Easy",
      timeLimit: 25,
      questions: 15,
      completed: true,
      score: 80,
    },
    {
      id: 106,
      title: "Computer Science",
      description: "Test your knowledge of programming fundamentals.",
      category: "Computer Science",
      difficulty: "Hard",
      timeLimit: 50,
      questions: 28,
      completed: false,
      progress: 75,
    }
  ];

  return (
    <div className="py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Available Quizzes</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Test your knowledge with our comprehensive quizzes across various subjects. Track your progress and improve your skills.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <Card key={quiz.id} className="transition-all hover:shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{quiz.title}</CardTitle>
                <Badge variant={
                  quiz.difficulty === "Easy" ? "outline" : 
                  quiz.difficulty === "Medium" ? "secondary" : "destructive"
                }>
                  {quiz.difficulty}
                </Badge>
              </div>
              <CardDescription>{quiz.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <FileQuestion size={16} className="mr-1" />
                  <span>{quiz.questions} Questions</span>
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="mr-1" />
                  <span>{quiz.timeLimit} Minutes</span>
                </div>
                <div className="flex items-center">
                  <BarChart size={16} className="mr-1" />
                  <span>{quiz.category}</span>
                </div>
              </div>

              {quiz.completed ? (
                <div className="mb-2">
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Score</span>
                    <span className="font-medium">{quiz.score}%</span>
                  </div>
                  <Progress value={quiz.score} className="h-2" />
                </div>
              ) : (
                <div className="mb-2">
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Progress</span>
                    <span className="font-medium">{quiz.progress}%</span>
                  </div>
                  <Progress value={quiz.progress} className="h-2" />
                </div>
              )}
            </CardContent>
            <CardFooter>
              {quiz.completed ? (
                <div className="w-full flex justify-between">
                  <Button variant="outline">
                    <BarChart className="mr-2 h-4 w-4" />
                    View Results
                  </Button>
                  <Button>
                    <Award className="mr-2 h-4 w-4" />
                    Retake Quiz
                  </Button>
                </div>
              ) : (
                <Link to={`/quizzes/${quiz.id}`} className="w-full">
                  <Button className="w-full">
                    <FileQuestion className="mr-2 h-4 w-4" />
                    {quiz.progress > 0 ? "Continue Quiz" : "Start Quiz"}
                  </Button>
                </Link>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuizzesListPage;
