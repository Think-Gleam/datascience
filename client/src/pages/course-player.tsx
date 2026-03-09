import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams, Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Circle,
  Play,
  ArrowLeft,
  GraduationCap,
  Loader2,
} from "lucide-react";

export default function CoursePlayer() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [currentLessonId, setCurrentLessonId] = useState<number | null>(null);

  const { data: course, isLoading } = useQuery<any>({
    queryKey: ["/api/courses", id],
  });

  const { data: progressData } = useQuery<any>({
    queryKey: ["/api/enrollments", id, "progress"],
    enabled: !!user,
  });

  const { data: lessonProgressList } = useQuery<any[]>({
    queryKey: ["/api/enrollments", id, "lesson-progress"],
    enabled: !!user,
  });

  const completeLessonMutation = useMutation({
    mutationFn: async (lessonId: number) => {
      const res = await apiRequest("POST", `/api/lessons/${lessonId}/complete`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/enrollments", id, "progress"] });
      queryClient.invalidateQueries({ queryKey: ["/api/enrollments", id, "lesson-progress"] });
      queryClient.invalidateQueries({ queryKey: ["/api/enrollments"] });
      queryClient.invalidateQueries({ queryKey: ["/api/certificates"] });
      toast({ title: "Lesson completed!" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const allLessons = course?.modules?.flatMap((mod: any) =>
    mod.lessons?.map((l: any) => ({ ...l, moduleName: mod.title })) ?? []
  ) ?? [];

  useEffect(() => {
    if (allLessons.length > 0 && !currentLessonId) {
      setCurrentLessonId(allLessons[0].id);
    }
  }, [allLessons.length]);

  if (!user) {
    setLocation("/auth");
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Course not found</h2>
          <Link href="/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  const completedLessonIds = new Set(
    (lessonProgressList ?? []).filter((lp: any) => lp.completed).map((lp: any) => lp.lessonId)
  );

  const currentLesson = allLessons.find((l: any) => l.id === currentLessonId);
  const currentIndex = allLessons.findIndex((l: any) => l.id === currentLessonId);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
  const isCurrentCompleted = currentLessonId ? completedLessonIds.has(currentLessonId) : false;

  const progressPercentage = progressData?.percentage ?? 0;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-xl border-b h-14 flex items-center px-4 gap-4 shrink-0">
        <Link href={`/course/${id}`}>
          <Button variant="ghost" size="icon" data-testid="button-back-to-course">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shrink-0">
            <GraduationCap className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-semibold text-sm truncate" data-testid="text-player-course-title">
            {course.title}
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs text-muted-foreground hidden sm:inline">
            {progressPercentage}% complete
          </span>
          <Progress value={progressPercentage} className="w-24 h-1.5 hidden sm:block" />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden md:flex flex-col w-80 border-r bg-sidebar shrink-0">
          <div className="p-4 border-b">
            <h3 className="font-display font-semibold text-sm">Curriculum</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {completedLessonIds.size}/{allLessons.length} completed
            </p>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-2">
              {course.modules?.map((mod: any, modIndex: number) => (
                <div key={mod.id} className="mb-2">
                  <div className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[10px] font-bold">
                      {modIndex + 1}
                    </span>
                    {mod.title}
                  </div>
                  {mod.lessons?.map((lesson: any) => {
                    const isActive = lesson.id === currentLessonId;
                    const isCompleted = completedLessonIds.has(lesson.id);
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => setCurrentLessonId(lesson.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-md text-left transition-colors ${
                          isActive
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground"
                        }`}
                        data-testid={`lesson-nav-${lesson.id}`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        ) : isActive ? (
                          <Play className="w-4 h-4 shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 shrink-0" />
                        )}
                        <span className="flex-1 truncate">{lesson.title}</span>
                        {lesson.duration && (
                          <span className="text-[10px] text-muted-foreground shrink-0">
                            {lesson.duration}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </ScrollArea>
        </aside>

        <main className="flex-1 overflow-auto">
          {currentLesson ? (
            <div className="max-w-4xl mx-auto p-6">
              <div className="mb-6">
                <Badge variant="secondary" className="mb-3">
                  {currentLesson.moduleName}
                </Badge>
                <h1 className="text-2xl font-display font-bold mb-2" data-testid="text-lesson-title">
                  {currentLesson.title}
                </h1>
                <div className="flex items-center gap-3">
                  {currentLesson.duration && (
                    <span className="text-sm text-muted-foreground">{currentLesson.duration}</span>
                  )}
                  {isCurrentCompleted && (
                    <Badge variant="secondary" className="text-emerald-600 bg-emerald-500/10">
                      <CheckCircle2 className="w-3 h-3 mr-1" /> Completed
                    </Badge>
                  )}
                </div>
              </div>

              <Card className="mb-6">
                <CardContent className="p-0">
                  <div className={`aspect-video bg-gradient-to-br ${course.gradient} flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:30px_30px]" />
                    <div className="relative z-10 text-center">
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 border border-white/20">
                        <Play className="w-7 h-7 text-white ml-1" />
                      </div>
                      <p className="text-white/70 text-sm">Video content placeholder</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardContent className="p-6">
                  <h2 className="font-display font-semibold text-lg mb-3">Lesson Content</h2>
                  <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
                    <p>{currentLesson.content || "Lesson content will be available here."}</p>
                  </div>
                </CardContent>
              </Card>

              <div className="flex items-center justify-between gap-4">
                <div>
                  {prevLesson && (
                    <Button
                      variant="outline"
                      onClick={() => setCurrentLessonId(prevLesson.id)}
                      data-testid="button-prev-lesson"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Previous
                    </Button>
                  )}
                </div>

                <Button
                  onClick={() => completeLessonMutation.mutate(currentLessonId!)}
                  disabled={completeLessonMutation.isPending || isCurrentCompleted}
                  variant={isCurrentCompleted ? "secondary" : "default"}
                  data-testid="button-mark-complete"
                >
                  {completeLessonMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                  )}
                  {isCurrentCompleted ? "Completed" : "Mark as Complete"}
                </Button>

                <div>
                  {nextLesson && (
                    <Button
                      onClick={() => setCurrentLessonId(nextLesson.id)}
                      data-testid="button-next-lesson"
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">Select a lesson to begin</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
