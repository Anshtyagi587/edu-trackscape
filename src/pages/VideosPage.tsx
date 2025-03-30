
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Video, Clock, BookOpen, Star, Play } from "lucide-react";

const VideosPage = () => {
  const [activeTab, setActiveTab] = useState("all");

  // Mock video data
  const allVideos = [
    {
      id: 1,
      title: "Introduction to Algebra",
      description: "Learn the fundamentals of algebraic expressions and equations.",
      category: "Mathematics",
      duration: "25:14",
      instructor: "Dr. John Smith",
      views: 2345,
      rating: 4.8,
      thumbnail: "https://i.pravatar.cc/300?img=11",
      embedUrl: "https://www.youtube.com/embed/NybHckSEQBI"
    },
    {
      id: 2,
      title: "Quantum Physics Explained",
      description: "A simple explanation of complex quantum mechanics concepts.",
      category: "Physics",
      duration: "42:38",
      instructor: "Prof. Maria Garcia",
      views: 1834,
      rating: 4.9,
      thumbnail: "https://i.pravatar.cc/300?img=12",
      embedUrl: "https://www.youtube.com/embed/I_TvJSg8t0o"
    },
    {
      id: 3,
      title: "Chemical Bonding",
      description: "Learn about different types of chemical bonds and their properties.",
      category: "Chemistry",
      duration: "31:05",
      instructor: "Dr. Robert Johnson",
      views: 2156,
      rating: 4.7,
      thumbnail: "https://i.pravatar.cc/300?img=13",
      embedUrl: "https://www.youtube.com/embed/c40xxKBAHtI"
    },
    {
      id: 4,
      title: "The French Revolution",
      description: "Explore the events and impacts of the French Revolution.",
      category: "History",
      duration: "38:22",
      instructor: "Prof. Sarah Williams",
      views: 1987,
      rating: 4.6,
      thumbnail: "https://i.pravatar.cc/300?img=14",
      embedUrl: "https://www.youtube.com/embed/lTTvKwCylFY"
    },
    {
      id: 5,
      title: "Shakespeare's Sonnets",
      description: "Analysis of key themes and techniques in Shakespeare's sonnets.",
      category: "Literature",
      duration: "29:45",
      instructor: "Dr. Michael Brown",
      views: 1654,
      rating: 4.8,
      thumbnail: "https://i.pravatar.cc/300?img=15",
      embedUrl: "https://www.youtube.com/embed/v4eK5Bh7_kA"
    },
    {
      id: 6,
      title: "Python for Beginners",
      description: "Get started with Python programming language basics.",
      category: "Computer Science",
      duration: "45:18",
      instructor: "Prof. Jessica Davis",
      views: 3278,
      rating: 4.9,
      thumbnail: "https://i.pravatar.cc/300?img=16",
      embedUrl: "https://www.youtube.com/embed/kqtD5dpn9C8"
    }
  ];

  const categories = ["Mathematics", "Physics", "Chemistry", "History", "Literature", "Computer Science"];
  
  // Filter videos based on active tab
  const displayedVideos = activeTab === "all" 
    ? allVideos 
    : allVideos.filter(video => video.category.toLowerCase() === activeTab.toLowerCase());

  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  return (
    <div className="py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Educational Videos</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Watch high-quality educational videos on various subjects to enhance your understanding and learning experience.
        </p>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="flex flex-wrap justify-center">
          <TabsTrigger 
            value="all" 
            onClick={() => setActiveTab("all")}
            className="mx-1"
          >
            All
          </TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger 
              key={category} 
              value={category.toLowerCase()} 
              onClick={() => setActiveTab(category.toLowerCase())}
              className="mx-1"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Selected video player */}
      {selectedVideo !== null && (
        <Card className="mb-8">
          <CardContent className="p-0">
            <AspectRatio ratio={16/9}>
              <iframe 
                src={allVideos.find(v => v.id === selectedVideo)?.embedUrl}
                title={allVideos.find(v => v.id === selectedVideo)?.title}
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </AspectRatio>
          </CardContent>
          <CardHeader>
            <CardTitle>{allVideos.find(v => v.id === selectedVideo)?.title}</CardTitle>
            <CardDescription>{allVideos.find(v => v.id === selectedVideo)?.description}</CardDescription>
          </CardHeader>
          <CardFooter>
            <div className="flex items-center text-sm text-gray-600 space-x-4">
              <div className="flex items-center">
                <BookOpen size={16} className="mr-1" />
                <span>{allVideos.find(v => v.id === selectedVideo)?.instructor}</span>
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-1" />
                <span>{allVideos.find(v => v.id === selectedVideo)?.duration}</span>
              </div>
              <div className="flex items-center">
                <Star size={16} className="mr-1 text-yellow-500" />
                <span>{allVideos.find(v => v.id === selectedVideo)?.rating}</span>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="ml-auto"
              onClick={() => setSelectedVideo(null)}
            >
              Close Video
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Video grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedVideos.map((video) => (
          <Card key={video.id} className="transition-all hover:shadow-lg">
            <div className="relative aspect-video w-full overflow-hidden rounded-t-lg group cursor-pointer" onClick={() => setSelectedVideo(video.id)}>
              <img 
                src={video.thumbnail} 
                alt={video.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="rounded-full bg-white p-3">
                  <Play className="h-8 w-8 text-edu-blue" />
                </div>
              </div>
              <Badge className="absolute top-2 right-2">
                {video.duration}
              </Badge>
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg cursor-pointer hover:text-edu-blue" onClick={() => setSelectedVideo(video.id)}>
                  {video.title}
                </CardTitle>
                <Badge variant="outline">{video.category}</Badge>
              </div>
              <CardDescription className="line-clamp-2">{video.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <BookOpen size={16} className="mr-1" />
                  <span>{video.instructor}</span>
                </div>
                <div className="flex items-center">
                  <Star size={16} className="mr-1 text-yellow-500" />
                  <span>{video.rating}</span>
                </div>
                <div className="flex items-center">
                  <Video size={16} className="mr-1" />
                  <span>{video.views.toLocaleString()} views</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => setSelectedVideo(video.id)}>
                <Play className="mr-2 h-4 w-4" />
                Watch Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VideosPage;
