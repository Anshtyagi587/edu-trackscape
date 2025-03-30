import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/use-toast';
import { BookOpen, CheckCircle, Timer, AlertCircle, Award, FileQuestion } from 'lucide-react';

// Mock quiz data
const quizData = {
  id: '1',
  title: 'Introduction to Algebra',
  description: 'Test your knowledge of basic algebraic concepts',
  subject: 'Mathematics',
  difficulty: 'Beginner',
  timeLimit: 10, // minutes
  questions: [
    {
      id: '1',
      text: 'If x + 5 = 10, what is the value of x?',
      options: [
        { id: 'a', text: '3' },
        { id: 'b', text: '5' },
        { id: 'c', text: '7' },
        { id: 'd', text: '15' }
      ],
      correctAnswer: 'b'
    },
    {
      id: '2',
      text: 'Which of the following is a solution to the equation 2x - 6 = 0?',
      options: [
        { id: 'a', text: 'x = 2' },
        { id: 'b', text: 'x = 3' },
        { id: 'c', text: 'x = 4' },
        { id: 'd', text: 'x = 6' }
      ],
      correctAnswer: 'b'
    },
    {
      id: '3',
      text: 'Simplify the expression: 3(x + 2) - 2x',
      options: [
        { id: 'a', text: 'x + 6' },
        { id: 'b', text: '3x + 6' },
        { id: 'c', text: 'x + 2' },
        { id: 'd', text: '5x + 2' }
      ],
      correctAnswer: 'a'
    },
    {
      id: '4',
      text: 'Solve for y: 2y - 3 = 7',
      options: [
        { id: 'a', text: 'y = 2' },
        { id: 'b', text: 'y = 4' },
        { id: 'c', text: 'y = 5' },
        { id: 'd', text: 'y = 10' }
      ],
      correctAnswer: 'c'
    },
    {
      id: '5',
      text: 'Factor the expression: x² + 5x + 6',
      options: [
        { id: 'a', text: '(x + 2)(x + 3)' },
        { id: 'b', text: '(x + 1)(x + 6)' },
        { id: 'c', text: '(x + 2)(x - 3)' },
        { id: 'd', text: '(x - 2)(x - 3)' }
      ],
      correctAnswer: 'a'
    }
  ]
};

const QuizPage = () => {
  const { user } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(quizData.timeLimit * 60); // converting to seconds
  const [quizStarted, setQuizStarted] = useState(false);
  
  // Start timer when quiz starts
  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (quizStarted && !quizSubmitted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          const newTime = prev - 1;
          if (newTime <= 0) {
            submitQuiz();
            clearInterval(timer);
            return 0;
          }
          return newTime;
        });
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [quizStarted, quizSubmitted, timeLeft]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const handleStartQuiz = () => {
    setQuizStarted(true);
  };
  
  const handleAnswerSelect = (questionId: string, answerId: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }));
  };
  
  const handleNextQuestion = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };
  
  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };
  
  const submitQuiz = () => {
    setQuizSubmitted(true);
    
    // Calculate score
    let correctCount = 0;
    quizData.questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });
    
    const percentScore = Math.round((correctCount / quizData.questions.length) * 100);
    
    if (timeLeft <= 0) {
      toast({
        title: "Time's up!",
        description: `Your score: ${percentScore}%. You got ${correctCount} out of ${quizData.questions.length} questions correct.`,
        variant: "default",
      });
    } else {
      toast({
        title: "Quiz completed!",
        description: `Your score: ${percentScore}%. You got ${correctCount} out of ${quizData.questions.length} questions correct.`,
        variant: "default",
      });
    }
  };
  
  const isQuestionAnswered = (questionId: string) => {
    return answers[questionId] !== undefined;
  };
  
  const countAnsweredQuestions = () => {
    return Object.keys(answers).length;
  };
  
  const calculateScore = () => {
    let correctCount = 0;
    quizData.questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });
    
    return {
      correct: correctCount,
      total: quizData.questions.length,
      percentage: Math.round((correctCount / quizData.questions.length) * 100)
    };
  };
  
  if (!quizStarted) {
    return (
      <div className="max-w-3xl mx-auto py-10 animate-fade-in">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-3xl">{quizData.title}</CardTitle>
                <CardDescription className="mt-2 text-lg">{quizData.description}</CardDescription>
              </div>
              <Badge className="text-sm">{quizData.difficulty}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="h-10 w-10 rounded-full bg-edu-blue/10 flex items-center justify-center mr-3">
                  <BookOpen className="h-5 w-5 text-edu-blue" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Subject</p>
                  <p className="font-medium">{quizData.subject}</p>
                </div>
              </div>
              
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="h-10 w-10 rounded-full bg-edu-blue/10 flex items-center justify-center mr-3">
                  <Timer className="h-5 w-5 text-edu-blue" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Time Limit</p>
                  <p className="font-medium">{quizData.timeLimit} minutes</p>
                </div>
              </div>
              
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="h-10 w-10 rounded-full bg-edu-blue/10 flex items-center justify-center mr-3">
                  <FileQuestion className="h-5 w-5 text-edu-blue" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Questions</p>
                  <p className="font-medium">{quizData.questions.length} questions</p>
                </div>
              </div>
              
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="h-10 w-10 rounded-full bg-edu-blue/10 flex items-center justify-center mr-3">
                  <Award className="h-5 w-5 text-edu-blue" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Points</p>
                  <p className="font-medium">100 points</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-lg">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="font-medium text-yellow-800">Instructions</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Read each question carefully before answering.</li>
                    <li>Once you start the quiz, the timer will begin.</li>
                    <li>You can navigate between questions using the Next and Previous buttons.</li>
                    <li>You can review your answers before submitting.</li>
                    <li>You must answer all questions before the time expires.</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleStartQuiz}>Start Quiz</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  if (quizSubmitted) {
    const score = calculateScore();
    
    return (
      <div className="max-w-3xl mx-auto py-10 animate-fade-in">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="h-20 w-20 rounded-full bg-edu-green/10 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-edu-green" />
              </div>
            </div>
            <CardTitle className="text-3xl">Quiz Completed!</CardTitle>
            <CardDescription className="mt-2 text-lg">
              {quizData.title}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-5xl font-bold text-edu-blue">{score.percentage}%</p>
              <p className="text-gray-500 mt-2">
                You got {score.correct} out of {score.total} questions correct
              </p>
            </div>
            
            <div className="space-y-4">
              {quizData.questions.map((question, index) => {
                const isCorrect = answers[question.id] === question.correctAnswer;
                const selectedOption = question.options.find(opt => opt.id === answers[question.id]);
                const correctOption = question.options.find(opt => opt.id === question.correctAnswer);
                
                return (
                  <div 
                    key={question.id} 
                    className={`p-4 rounded-lg border ${
                      isCorrect ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'
                    }`}
                  >
                    <div className="flex items-start">
                      <div className={`h-6 w-6 rounded-full ${
                        isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                      } flex items-center justify-center mr-3 mt-0.5 flex-shrink-0`}>
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{question.text}</p>
                        
                        <div className="mt-3 space-y-2">
                          <div className={`p-2 rounded ${
                            answers[question.id] === question.correctAnswer 
                              ? 'bg-green-100 text-green-800' 
                              : answers[question.id] === selectedOption?.id 
                              ? 'bg-red-100 text-red-800'
                              : ''
                          }`}>
                            {isCorrect 
                              ? `✓ Correct: ${correctOption?.text}` 
                              : `✗ Your answer: ${selectedOption?.text}`
                            }
                          </div>
                          
                          {!isCorrect && (
                            <div className="p-2 rounded bg-green-100 text-green-800">
                              ✓ Correct answer: {correctOption?.text}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link to="/quizzes">Back to Quizzes</Link>
            </Button>
            <Button asChild>
              <Link to="/dashboard">Go to Dashboard</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  const currentQ = quizData.questions[currentQuestion];
  
  return (
    <div className="max-w-3xl mx-auto py-10 animate-fade-in">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start mb-4">
            <div>
              <CardTitle className="text-2xl">{quizData.title}</CardTitle>
              <CardDescription>{quizData.description}</CardDescription>
            </div>
            <div className="text-right">
              <div className={`text-lg font-mono font-bold ${timeLeft < 60 ? 'text-red-500' : 'text-gray-900'}`}>
                <Timer className="inline-block h-5 w-5 mr-1 mb-1" />
                {formatTime(timeLeft)}
              </div>
              <p className="text-sm text-gray-500">Question {currentQuestion + 1} of {quizData.questions.length}</p>
            </div>
          </div>
          
          <Progress 
            value={(currentQuestion + 1) / quizData.questions.length * 100} 
            className="h-2" 
            indicatorClassName="bg-edu-blue" 
          />
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-xl font-medium mb-4">
              {currentQuestion + 1}. {currentQ.text}
            </h3>
            
            <RadioGroup 
              value={answers[currentQ.id] || ''} 
              onValueChange={(value) => handleAnswerSelect(currentQ.id, value)}
              className="space-y-3"
            >
              {currentQ.options.map((option) => (
                <div key={option.id} className="flex items-center">
                  <RadioGroupItem 
                    value={option.id} 
                    id={`option-${option.id}`} 
                    className="peer sr-only" 
                  />
                  <Label
                    htmlFor={`option-${option.id}`}
                    className="flex items-center w-full p-4 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-edu-blue peer-checked:bg-edu-blue/5"
                  >
                    <div className="h-6 w-6 rounded-full border mr-3 flex items-center justify-center peer-checked:bg-edu-blue peer-checked:border-edu-blue">
                      {option.id.toUpperCase()}
                    </div>
                    <span>{option.text}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <div className="pt-4 flex justify-between">
            <Button 
              onClick={handlePrevQuestion}
              disabled={currentQuestion === 0}
              variant="outline"
            >
              Previous
            </Button>
            
            {currentQuestion < quizData.questions.length - 1 ? (
              <Button 
                onClick={handleNextQuestion}
                disabled={!isQuestionAnswered(currentQ.id)}
              >
                Next
              </Button>
            ) : (
              <Button 
                onClick={submitQuiz}
                disabled={countAnsweredQuestions() !== quizData.questions.length}
              >
                Submit Quiz
              </Button>
            )}
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <div className="w-full">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Questions answered</span>
              <span>{countAnsweredQuestions()} of {quizData.questions.length}</span>
            </div>
            <Progress 
              value={countAnsweredQuestions() / quizData.questions.length * 100} 
              className="h-2" 
              indicatorClassName="bg-edu-green" 
            />
            
            <div className="mt-4 flex flex-wrap gap-2">
              {quizData.questions.map((q, index) => (
                <Button
                  key={q.id}
                  variant={answers[q.id] ? "default" : "outline"}
                  className={`h-8 w-8 p-0 rounded-full ${
                    currentQuestion === index ? 'ring-2 ring-edu-blue ring-offset-2' : ''
                  }`}
                  onClick={() => setCurrentQuestion(index)}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default QuizPage;
