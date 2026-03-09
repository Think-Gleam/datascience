import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  GraduationCap,
  Award,
  Clock,
  Play,
  LayoutDashboard,
  BookMarked,
  Settings,
  LogOut,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

const sidebarLinks = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "My Courses", icon: BookMarked, href: "/dashboard" },
  { label: "Certificates", icon: Award, href: "/dashboard" },
  { label: "Settings", icon: Settings, href: "/dashboard" },
];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();

  const { data: enrollments, isLoading } = useQuery<any[]>({
    queryKey: ["/api/enrollments"],
    enabled: !!user,
  });

  const { data: certs } = useQuery<any[]>({
    queryKey: ["/api/certificates"],
    enabled: !!user,
  });

  if (!user) {
    setLocation("/auth");
    return null;
  }

  const activeCount = enrollments?.filter((e) => e.status === "active").length ?? 0;
  const completedCount = enrollments?.filter((e) => e.status === "completed").length ?? 0;
  const certCount = certs?.length ?? 0;

  const stats = [
    { label: "Enrolled Courses", value: enrollments?.length ?? 0, icon: BookOpen, color: "text-blue-500" },
    { label: "Completed", value: completedCount, icon: GraduationCap, color: "text-emerald-500" },
    { label: "Certificates", value: certCount, icon: Award, color: "text-amber-500" },
    { label: "In Progress", value: activeCount, icon: TrendingUp, color: "text-purple-500" },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="hidden lg:flex flex-col w-64 bg-sidebar border-r shrink-0">
        <div className="p-6 border-b">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold">AI DSA</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md text-sidebar-foreground hover-elevate"
              data-testid={`sidebar-link-${link.label.toLowerCase().replace(/\s/g, "-")}`}
            >
              <link.icon className="w-4 h-4" />
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t">
          <div className="flex items-center gap-3 mb-3 px-3">
            <Avatar className="w-9 h-9">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                {user.avatarInitials || user.name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{user.name}</div>
              <div className="text-xs text-muted-foreground truncate">{user.email}</div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-muted-foreground"
            onClick={async () => {
              await logout();
              setLocation("/");
            }}
            data-testid="button-logout"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-xl border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-display font-bold" data-testid="text-dashboard-title">
                Welcome back, {user.name.split(" ")[0]}
              </h1>
              <p className="text-sm text-muted-foreground">Continue your learning journey</p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/courses">
                <Button size="sm" data-testid="button-browse-courses">
                  Browse Courses
                </Button>
              </Link>
              <div className="lg:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={async () => {
                    await logout();
                    setLocation("/");
                  }}
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 max-w-6xl mx-auto space-y-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <Card key={stat.label} data-testid={`stat-card-${stat.label.toLowerCase().replace(/\s/g, "-")}`}>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div className="text-2xl font-display font-bold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-display font-semibold">Continue Learning</h2>
              <Link href="/courses">
                <Button variant="ghost" size="sm">
                  View All <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <CardContent className="p-5">
                      <div className="h-4 bg-muted rounded w-3/4 mb-3 animate-pulse" />
                      <div className="h-3 bg-muted rounded w-1/2 mb-4 animate-pulse" />
                      <div className="h-2 bg-muted rounded w-full animate-pulse" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : enrollments && enrollments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {enrollments
                  .filter((e) => e.status === "active")
                  .map((enrollment: any) => (
                    <Card
                      key={enrollment.id}
                      className="hover-elevate"
                      data-testid={`card-enrollment-${enrollment.course.id}`}
                    >
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3 mb-3">
                          <div
                            className={`w-10 h-10 rounded-lg bg-gradient-to-br ${enrollment.course.gradient} flex items-center justify-center shrink-0`}
                          >
                            <BookOpen className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm leading-snug truncate">
                              {enrollment.course.title}
                            </h3>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {enrollment.course.instructorName}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                          <span>{enrollment.progress}% complete</span>
                          <Badge variant="secondary" className="text-[10px]">
                            {enrollment.course.difficulty}
                          </Badge>
                        </div>
                        <Progress value={enrollment.progress} className="h-1.5 mb-3" />

                        <Link href={`/course/${enrollment.course.id}/learn`}>
                          <Button size="sm" className="w-full" data-testid={`button-resume-${enrollment.course.id}`}>
                            <Play className="w-3.5 h-3.5 mr-1.5" />
                            Resume Learning
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <BookOpen className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                  <h3 className="font-semibold mb-1">No courses yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Browse our catalog and enroll in your first course.
                  </p>
                  <Link href="/courses">
                    <Button data-testid="button-browse-empty">Browse Courses</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>

          {certs && certs.length > 0 && (
            <div>
              <h2 className="text-lg font-display font-semibold mb-4">Certificates</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {certs.map((cert: any) => (
                  <Card key={cert.id} className="hover-elevate" data-testid={`card-certificate-${cert.id}`}>
                    <CardContent className="p-5 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                        <Award className="w-6 h-6 text-amber-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm truncate">{cert.course.title}</h3>
                        <p className="text-xs text-muted-foreground">
                          Issued {new Date(cert.issuedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
