import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams, Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Clock,
  Users2,
  TrendingUp,
  BookOpen,
  ChevronRight,
  Play,
  CheckCircle2,
  ArrowLeft,
  Loader2,
} from "lucide-react";

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: course, isLoading } = useQuery<any>({
    queryKey: ["/api/courses", id],
  });

  const { data: enrollment } = useQuery<any>({
    queryKey: ["/api/enrollments"],
    enabled: !!user,
    select: (data: any[]) => data?.find((e) => e.courseId === Number(id)),
  });

  const enrollMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/enrollments", { courseId: Number(id) });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/enrollments"] });
      toast({ title: "Enrolled successfully!" });
    },
    onError: (error: Error) => {
      toast({ title: "Enrollment failed", description: error.message, variant: "destructive" });
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Course not found</h2>
          <Link href="/courses">
            <Button>Back to Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  const totalLessons = course.modules?.reduce(
    (sum: number, mod: any) => sum + (mod.lessons?.length ?? 0),
    0
  ) ?? 0;

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className={`bg-gradient-to-br ${course.gradient} relative`}>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/courses">
            <Button variant="ghost" size="sm" className="text-white/80 mb-6" data-testid="button-back">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Courses
            </Button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Badge className="bg-white/20 text-white border-white/10 mb-4">
                {course.category}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4" data-testid="text-course-title">
                {course.title}
              </h1>
              <p className="text-white/80 text-lg mb-6 leading-relaxed">
                {course.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm">
                <span className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-white text-white" />
                  <span className="text-white font-semibold">{course.rating}</span>
                  ({course.reviewCount?.toLocaleString()} reviews)
                </span>
                <span className="flex items-center gap-1.5">
                  <Users2 className="w-4 h-4" />
                  {(course.studentCount ?? 0).toLocaleString()} students
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {course.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  {course.difficulty}
                </span>
              </div>

              <p className="text-white/70 text-sm mt-4">
                Instructor: <span className="text-white font-medium">{course.instructorName}</span>
              </p>
            </div>

            <div>
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-display font-bold mb-1">Free</div>
                    <p className="text-sm text-muted-foreground">Full lifetime access</p>
                  </div>

                  {enrollment ? (
                    <Link href={`/course/${id}/learn`}>
                      <Button className="w-full" size="lg" data-testid="button-continue-learning">
                        <Play className="w-4 h-4 mr-2" />
                        Continue Learning
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={() => {
                        if (!user) {
                          setLocation("/auth");
                          return;
                        }
                        enrollMutation.mutate();
                      }}
                      disabled={enrollMutation.isPending}
                      data-testid="button-enroll"
                    >
                      {enrollMutation.isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      ) : null}
                      Enroll Now
                    </Button>
                  )}

                  <div className="mt-6 space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      {totalLessons} lessons
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      {course.modules?.length ?? 0} modules
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      Certificate on completion
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      Lifetime access
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-display font-bold mb-6">Course Curriculum</h2>

        <div className="max-w-3xl space-y-4">
          {course.modules?.map((mod: any, modIndex: number) => (
            <Card key={mod.id} data-testid={`card-module-${mod.id}`}>
              <CardContent className="p-0">
                <div className="flex items-center gap-3 p-4 border-b bg-muted/30">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold shrink-0">
                    {modIndex + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-semibold text-sm">{mod.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {mod.lessons?.length ?? 0} lessons
                    </p>
                  </div>
                </div>

                <div>
                  {mod.lessons?.map((lesson: any, lessonIndex: number) => (
                    <div
                      key={lesson.id}
                      className="flex items-center gap-3 px-4 py-3 text-sm border-b last:border-b-0"
                    >
                      <Play className="w-4 h-4 text-muted-foreground shrink-0" />
                      <span className="flex-1">{lesson.title}</span>
                      {lesson.duration && (
                        <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
