import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Star,
  Clock,
  Users2,
  TrendingUp,
  Search,
  ArrowRight,
} from "lucide-react";

export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("All");

  const { data: courses, isLoading } = useQuery<any[]>({
    queryKey: ["/api/courses"],
  });

  const levels = ["All", "Beginner", "Intermediate", "Advanced", "Expert"];

  const filtered = courses?.filter((c: any) => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = selectedLevel === "All" || c.difficulty === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-2" data-testid="text-courses-title">
            Course Catalog
          </h1>
          <p className="text-muted-foreground">
            Explore our comprehensive catalog of data science and AI courses.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
              data-testid="input-search-courses"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {levels.map((level) => (
              <Button
                key={level}
                variant={selectedLevel === level ? "default" : "secondary"}
                size="sm"
                onClick={() => setSelectedLevel(level)}
                data-testid={`button-filter-${level.toLowerCase()}`}
              >
                {level}
              </Button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="h-40 bg-muted animate-pulse" />
                  <div className="p-5 space-y-3">
                    <div className="h-5 bg-muted rounded animate-pulse w-3/4" />
                    <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
                    <div className="h-8 bg-muted rounded animate-pulse" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered?.map((course: any) => (
              <Link key={course.id} href={`/course/${course.id}`}>
                <Card
                  className="overflow-hidden h-full cursor-pointer group"
                  data-testid={`card-course-${course.id}`}
                >
                  <CardContent className="p-0 flex flex-col h-full">
                    <div
                      className={`h-40 bg-gradient-to-br ${course.gradient} flex flex-col justify-between p-5 relative`}
                    >
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />

                      <Badge className="self-start bg-white/20 text-white border-white/10 text-xs">
                        {course.category}
                      </Badge>
                      <div className="relative z-10 flex items-center gap-2">
                        <Star className="w-3.5 h-3.5 fill-white text-white" />
                        <span className="text-white font-semibold text-sm">{course.rating}</span>
                        <span className="text-white/60 text-xs">
                          ({course.reviewCount?.toLocaleString()})
                        </span>
                      </div>
                    </div>

                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="font-display font-semibold text-base mb-1.5 leading-snug">
                        {course.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {course.instructorName}
                      </p>

                      <div className="flex items-center gap-3 flex-wrap text-xs text-muted-foreground mt-auto mb-4">
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-3.5 h-3.5" />
                          {course.difficulty}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {course.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users2 className="w-3.5 h-3.5" />
                          {(course.studentCount ?? 0).toLocaleString()}
                        </span>
                      </div>

                      <Button size="sm" className="w-full" data-testid={`button-view-course-${course.id}`}>
                        View Course <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {filtered?.length === 0 && !isLoading && (
          <div className="text-center py-16">
            <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
            <h3 className="font-semibold mb-1">No courses found</h3>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
