
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, User, Star } from "lucide-react";

const CoursesPage = () => {
  // Mock courses data
  const courses = [
    {
      id: 1,
      title: "Introduction to Mathematics",
      description: "Learn the fundamentals of mathematics including algebra, geometry, and trigonometry.",
      instructor: "Dr. John Smith",
      level: "Beginner",
      duration: "8 weeks",
      rating: 4.8,
      students: 2345,
      image: "https://i.pravatar.cc/300?img=1"
    },
    {
      id: 2,
      title: "Advanced Physics",
      description: "Explore complex physics concepts including quantum mechanics and relativity theory.",
      instructor: "Prof. Maria Garcia",
      level: "Advanced",
      duration: "12 weeks",
      rating: 4.9,
      students: 1834,
      image: "https://i.pravatar.cc/300?img=2"
    },
    {
      id: 3,
      title: "Basic Chemistry",
      description: "Understand chemical principles, elements, compounds and reactions.",
      instructor: "Dr. Robert Johnson",
      level: "Beginner",
      duration: "10 weeks",
      rating: 4.7,
      students: 2156,
      image: "https://i.pravatar.cc/300?img=3"
    },
    {
      id: 4,
      title: "World History",
      description: "Journey through the key events and civilizations that shaped our world.",
      instructor: "Prof. Sarah Williams",
      level: "Intermediate",
      duration: "14 weeks",
      rating: 4.6,
      students: 1987,
      image: "https://i.pravatar.cc/300?img=4"
    },
    {
      id: 5,
      title: "English Literature",
      description: "Analyze classic and contemporary literary works from various periods and cultures.",
      instructor: "Dr. Michael Brown",
      level: "Intermediate",
      duration: "10 weeks",
      rating: 4.8,
      students: 1654,
      image: "https://i.pravatar.cc/300?img=5"
    },
    {
      id: 6,
      title: "Introduction to Programming",
      description: "Learn the basics of programming with Python, including data structures and algorithms.",
      instructor: "Prof. Jessica Davis",
      level: "Beginner",
      duration: "12 weeks",
      rating: 4.9,
      students: 3278,
      image: "https://i.pravatar.cc/300?img=6"
    }
  ];

  return (
    <div className="py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Explore Our Courses</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover a wide range of courses designed to help you achieve your learning goals and advance your knowledge.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="transition-all hover:shadow-lg">
            <div className="aspect-video w-full overflow-hidden rounded-t-lg">
              <img 
                src={course.image} 
                alt={course.title}
                className="w-full h-full object-cover" 
              />
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{course.title}</CardTitle>
                <Badge variant={
                  course.level === "Beginner" ? "default" : 
                  course.level === "Intermediate" ? "secondary" : "destructive"
                }>
                  {course.level}
                </Badge>
              </div>
              <CardDescription>{course.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <User size={16} className="mr-1" />
                  <span>{course.instructor}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="mr-1" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center">
                  <Star size={16} className="mr-1 text-yellow-500" />
                  <span>{course.rating} ({course.students} students)</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <BookOpen className="mr-2 h-4 w-4" />
                Enroll Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
