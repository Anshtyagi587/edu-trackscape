
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen, Users, Trophy, HeartHandshake, Lightbulb, GraduationCap } from 'lucide-react';

const AboutPage = () => {
  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Founder & CEO",
      bio: "Dr. Johnson has over 15 years of experience in educational technology and was previously a professor of Computer Science at Stanford University.",
      avatar: "https://i.pravatar.cc/150?img=32"
    },
    {
      name: "Michael Chen",
      role: "Chief Technology Officer",
      bio: "With a background in both education and software engineering, Michael leads our technical team to create innovative learning solutions.",
      avatar: "https://i.pravatar.cc/150?img=33"
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Chief Academic Officer",
      bio: "Dr. Rodriguez oversees curriculum development, ensuring all content meets the highest educational standards.",
      avatar: "https://i.pravatar.cc/150?img=34"
    },
    {
      name: "David Kim",
      role: "Head of UX Design",
      bio: "David is passionate about creating intuitive user experiences that make learning accessible to everyone.",
      avatar: "https://i.pravatar.cc/150?img=35"
    }
  ];

  return (
    <div className="py-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">About EduTrackScape</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We're on a mission to transform education through technology and provide personalized learning experiences for students worldwide.
        </p>
      </div>

      <Tabs defaultValue="mission" className="w-full max-w-4xl mx-auto mb-12">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="mission">Our Mission</TabsTrigger>
          <TabsTrigger value="story">Our Story</TabsTrigger>
          <TabsTrigger value="values">Our Values</TabsTrigger>
        </TabsList>
        
        <TabsContent value="mission" className="p-6 bg-white rounded-lg shadow">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl font-bold mb-4">Empowering Through Education</h2>
              <p className="text-gray-700 mb-4">
                At EduTrackScape, our mission is to make quality education accessible to everyone, regardless of their location or background. We believe that personalized learning experiences are the key to unlocking human potential.
              </p>
              <p className="text-gray-700 mb-4">
                Through our innovative platform, we strive to:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <GraduationCap className="h-5 w-5 text-edu-blue mr-2 mt-0.5" />
                  <span>Provide personalized learning paths for every student</span>
                </li>
                <li className="flex items-start">
                  <Users className="h-5 w-5 text-edu-blue mr-2 mt-0.5" />
                  <span>Connect learners with expert educators worldwide</span>
                </li>
                <li className="flex items-start">
                  <Lightbulb className="h-5 w-5 text-edu-blue mr-2 mt-0.5" />
                  <span>Foster curiosity and lifelong learning</span>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1610484826967-09c5720778c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" 
                alt="Students learning" 
                className="rounded-lg shadow-md w-full h-auto"
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="story" className="p-6 bg-white rounded-lg shadow">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" 
                alt="Team meeting" 
                className="rounded-lg shadow-md w-full h-auto"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl font-bold mb-4">From Idea to Impact</h2>
              <p className="text-gray-700 mb-4">
                EduTrackScape began in 2018 when Dr. Sarah Johnson, a professor frustrated with the limitations of traditional education, envisioned a platform that could adapt to each student's unique learning style and pace.
              </p>
              <p className="text-gray-700 mb-4">
                What started as a small project with just five team members has grown into a comprehensive educational platform serving over 500,000 students worldwide. Our journey has been guided by continuous feedback from educators and learners.
              </p>
              <p className="text-gray-700">
                Today, we're proud to offer a suite of tools that help students track their progress, identify their strengths and weaknesses, and achieve their educational goals more efficiently.
              </p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="values" className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-6 text-center">Core Values That Guide Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-t-4 border-edu-blue">
              <CardContent className="pt-6">
                <div className="flex items-start">
                  <div className="bg-edu-blue/10 p-3 rounded-lg mr-4">
                    <BookOpen className="h-6 w-6 text-edu-blue" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Accessible Learning</h3>
                    <p className="text-gray-600">We believe education should be accessible to everyone, regardless of their background or circumstances.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-t-4 border-edu-blue">
              <CardContent className="pt-6">
                <div className="flex items-start">
                  <div className="bg-edu-blue/10 p-3 rounded-lg mr-4">
                    <Users className="h-6 w-6 text-edu-blue" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Community Focus</h3>
                    <p className="text-gray-600">We foster a supportive community where learners can connect, collaborate, and grow together.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-t-4 border-edu-blue">
              <CardContent className="pt-6">
                <div className="flex items-start">
                  <div className="bg-edu-blue/10 p-3 rounded-lg mr-4">
                    <Trophy className="h-6 w-6 text-edu-blue" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Excellence</h3>
                    <p className="text-gray-600">We strive for excellence in everything we do, from curriculum design to platform functionality.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-t-4 border-edu-blue">
              <CardContent className="pt-6">
                <div className="flex items-start">
                  <div className="bg-edu-blue/10 p-3 rounded-lg mr-4">
                    <HeartHandshake className="h-6 w-6 text-edu-blue" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Integrity</h3>
                    <p className="text-gray-600">We uphold the highest standards of integrity and ethics in all our educational practices.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <Card key={index}>
              <CardContent className="flex flex-col items-center pt-6">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-medium">{member.name}</h3>
                <p className="text-edu-blue font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-center">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 p-8 rounded-lg">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join Us on Our Mission</h2>
          <p className="text-gray-700 mb-6">
            Whether you're a student looking to expand your knowledge, an educator interested in our platform, or someone passionate about the future of education, we'd love to hear from you.
          </p>
          <div className="flex justify-center gap-4">
            <a href="/contact" className="inline-flex items-center px-6 py-3 bg-edu-blue text-white font-medium rounded hover:bg-edu-blue/90 transition-colors">
              Contact Us
            </a>
            <a href="/careers" className="inline-flex items-center px-6 py-3 border border-edu-blue text-edu-blue font-medium rounded hover:bg-edu-blue/10 transition-colors">
              Careers
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
