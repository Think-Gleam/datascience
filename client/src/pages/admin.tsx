import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  GraduationCap,
  Users2,
  BookOpen,
  Award,
  TrendingUp,
  Plus,
  Pencil,
  Trash2,
  LayoutDashboard,
  Settings,
  LogOut,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";

const sidebarLinks = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Courses", icon: BookOpen, active: false },
  { label: "Users", icon: Users2, active: false },
  { label: "Settings", icon: Settings, active: false },
];

export default function AdminPanel() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [courseDialogOpen, setCourseDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any>(null);

  const { data: stats, isLoading: statsLoading } = useQuery<any>({
    queryKey: ["/api/admin/stats"],
    enabled: !!user && user.role === "admin",
  });

  const { data: allCourses, isLoading: coursesLoading } = useQuery<any[]>({
    queryKey: ["/api/courses"],
    enabled: !!user && user.role === "admin",
  });

  const { data: allUsers } = useQuery<any[]>({
    queryKey: ["/api/admin/users"],
    enabled: !!user && user.role === "admin",
  });

  const createCourseMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/courses", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/courses"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      setCourseDialogOpen(false);
      toast({ title: "Course created!" });
    },
    onError: (err: Error) => {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    },
  });

  const updateCourseMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const res = await apiRequest("PATCH", `/api/courses/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/courses"] });
      setEditingCourse(null);
      setCourseDialogOpen(false);
      toast({ title: "Course updated!" });
    },
  });

  const deleteCourseMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/courses/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/courses"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      toast({ title: "Course deleted" });
    },
  });

  const togglePublishMutation = useMutation({
    mutationFn: async ({
      id,
      published,
    }: {
      id: number;
      published: boolean;
    }) => {
      const res = await apiRequest("PATCH", `/api/courses/${id}`, {
        published,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/courses"] });
    },
  });

  if (!user || user.role !== "admin") {
    setLocation("/auth");
    return null;
  }

  const statCards = [
    {
      label: "Total Students",
      value: stats?.userCount ?? 0,
      icon: Users2,
      color: "text-blue-500",
    },
    {
      label: "Total Courses",
      value: stats?.courseCount ?? 0,
      icon: BookOpen,
      color: "text-emerald-500",
    },
    {
      label: "Enrollments",
      value: stats?.enrollmentCount ?? 0,
      icon: TrendingUp,
      color: "text-purple-500",
    },
    {
      label: "Certificates",
      value: stats?.certificateCount ?? 0,
      icon: Award,
      color: "text-amber-500",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="hidden lg:flex flex-col w-64 bg-sidebar border-r shrink-0">
        <div className="p-6 border-b">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold">Admin Panel</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {[
            { label: "Overview", id: "overview", icon: LayoutDashboard },
            { label: "Courses", id: "courses", icon: BookOpen },
            { label: "Users", id: "users", icon: Users2 },
          ].map((link) => (
            <button
              key={link.id}
              onClick={() => setActiveTab(link.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                activeTab === link.id
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover-elevate"
              }`}
              data-testid={`admin-tab-${link.id}`}
            >
              <link.icon className="w-4 h-4" />
              {link.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t">
          <div className="flex items-center gap-3 mb-3 px-3">
            <Avatar className="w-9 h-9">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                {user.avatarInitials || "A"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{user.name}</div>
              <Badge variant="secondary" className="text-[10px]">
                Admin
              </Badge>
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
            data-testid="button-admin-logout"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-xl border-b px-6 py-4">
          <h1
            className="text-xl font-display font-bold"
            data-testid="text-admin-title"
          >
            {activeTab === "overview" && "Dashboard Overview"}
            {activeTab === "courses" && "Course Management"}
            {activeTab === "users" && "User Management"}
          </h1>
        </header>

        <div className="p-6 max-w-6xl mx-auto">
          {activeTab === "overview" && (
            <div className="space-y-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((stat) => (
                  <Card
                    key={stat.label}
                    data-testid={`admin-stat-${stat.label.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                      <div className="text-2xl font-display font-bold">
                        {stat.value}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardContent className="p-6">
                  <h2 className="font-display font-semibold text-lg mb-4">
                    Recent Courses
                  </h2>
                  {coursesLoading ? (
                    <p className="text-sm text-muted-foreground">Loading...</p>
                  ) : (
                    <div className="space-y-3">
                      {allCourses?.slice(0, 5).map((course: any) => (
                        <div
                          key={course.id}
                          className="flex items-center gap-3 p-3 rounded-md bg-muted/30"
                        >
                          <div
                            className={`w-10 h-10 rounded-lg bg-gradient-to-br ${course.gradient} flex items-center justify-center shrink-0`}
                          >
                            <BookOpen className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm truncate">
                              {course.title}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {course.instructorName}
                            </div>
                          </div>
                          <Badge
                            variant={course.published ? "default" : "secondary"}
                            className="text-[10px]"
                          >
                            {course.published ? "Published" : "Draft"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "courses" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-muted-foreground">
                  {allCourses?.length ?? 0} courses total
                </p>
                <Dialog
                  open={courseDialogOpen}
                  onOpenChange={(open) => {
                    setCourseDialogOpen(open);
                    if (!open) setEditingCourse(null);
                  }}
                >
                  <DialogTrigger asChild>
                    <Button data-testid="button-create-course">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Course
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>
                        {editingCourse ? "Edit Course" : "Create New Course"}
                      </DialogTitle>
                    </DialogHeader>
                    <CourseForm
                      initial={editingCourse}
                      onSubmit={(data) => {
                        if (editingCourse) {
                          updateCourseMutation.mutate({
                            id: editingCourse.id,
                            data,
                          });
                        } else {
                          createCourseMutation.mutate(data);
                        }
                      }}
                      isPending={
                        createCourseMutation.isPending ||
                        updateCourseMutation.isPending
                      }
                    />
                  </DialogContent>
                </Dialog>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Course</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Difficulty</TableHead>
                        <TableHead>Students</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {allCourses?.map((course: any) => (
                        <TableRow
                          key={course.id}
                          data-testid={`row-course-${course.id}`}
                        >
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-8 h-8 rounded-md bg-gradient-to-br ${course.gradient} flex items-center justify-center shrink-0`}
                              >
                                <BookOpen className="w-4 h-4 text-white" />
                              </div>
                              <div>
                                <div className="font-medium text-sm">
                                  {course.title}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {course.instructorName}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="text-xs">
                              {course.category}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm">
                            {course.difficulty}
                          </TableCell>
                          <TableCell className="text-sm">
                            {course.studentCount ?? 0}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                togglePublishMutation.mutate({
                                  id: course.id,
                                  published: !course.published,
                                })
                              }
                              data-testid={`button-toggle-publish-${course.id}`}
                            >
                              {course.published ? (
                                <>
                                  <Eye className="w-3.5 h-3.5 mr-1" /> Published
                                </>
                              ) : (
                                <>
                                  <EyeOff className="w-3.5 h-3.5 mr-1" /> Draft
                                </>
                              )}
                            </Button>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                aria-label="Edit course"
                                onClick={() => {
                                  setEditingCourse(course);
                                  setCourseDialogOpen(true);
                                }}
                                data-testid={`button-edit-course-${course.id}`}
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                aria-label="Delete course"
                                onClick={() => {
                                  if (confirm("Delete this course?")) {
                                    deleteCourseMutation.mutate(course.id);
                                  }
                                }}
                                data-testid={`button-delete-course-${course.id}`}
                              >
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "users" && (
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Joined</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allUsers?.map((u: any) => (
                      <TableRow key={u.id} data-testid={`row-user-${u.id}`}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                {u.avatarInitials || u.name?.[0] || "?"}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-sm">
                              {u.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {u.email}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              u.role === "admin" ? "default" : "secondary"
                            }
                            className="text-xs capitalize"
                          >
                            {u.role}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {u.createdAt
                            ? new Date(u.createdAt).toLocaleDateString()
                            : "-"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}

function CourseForm({
  initial,
  onSubmit,
  isPending,
}: {
  initial?: any;
  onSubmit: (data: any) => void;
  isPending: boolean;
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [shortDescription, setShortDescription] = useState(
    initial?.shortDescription ?? "",
  );
  const [difficulty, setDifficulty] = useState(
    initial?.difficulty ?? "Beginner",
  );
  const [specializationLevel, setSpecializationLevel] = useState(
    initial?.specializationLevel ?? "Bronze",
  );
  const [instructorName, setInstructorName] = useState(
    initial?.instructorName ?? "",
  );
  const [duration, setDuration] = useState(initial?.duration ?? "");
  const [category, setCategory] = useState(initial?.category ?? "");
  const [gradient, setGradient] = useState(
    initial?.gradient ?? "from-blue-600 to-indigo-700",
  );
  const [published, setPublished] = useState(initial?.published ?? false);

  const gradients = [
    { label: "Blue", value: "from-blue-600 to-indigo-700" },
    { label: "Green", value: "from-emerald-600 to-teal-700" },
    { label: "Purple", value: "from-purple-600 to-pink-700" },
    { label: "Orange", value: "from-orange-500 to-red-600" },
    { label: "Cyan", value: "from-cyan-600 to-blue-700" },
    { label: "Slate", value: "from-slate-600 to-zinc-700" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      shortDescription,
      difficulty,
      specializationLevel,
      instructorName,
      duration,
      category,
      gradient,
      published,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Title</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          data-testid="input-course-title"
        />
      </div>
      <div>
        <Label>Short Description</Label>
        <Input
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          data-testid="input-course-short-desc"
        />
      </div>
      <div>
        <Label>Description</Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          required
          data-testid="input-course-description"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Difficulty</Label>
          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger data-testid="select-difficulty">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
              <SelectItem value="Expert">Expert</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Specialization Level</Label>
          <Select
            value={specializationLevel}
            onValueChange={setSpecializationLevel}
          >
            <SelectTrigger data-testid="select-specialization">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Bronze">Bronze</SelectItem>
              <SelectItem value="Silver">Silver</SelectItem>
              <SelectItem value="Gold">Gold</SelectItem>
              <SelectItem value="Platinum">Platinum</SelectItem>
              <SelectItem value="Diamond">Diamond</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Instructor Name</Label>
          <Input
            value={instructorName}
            onChange={(e) => setInstructorName(e.target.value)}
            required
            data-testid="input-instructor"
          />
        </div>
        <div>
          <Label>Duration</Label>
          <Input
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="e.g. 8 weeks"
            required
            data-testid="input-duration"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Category</Label>
          <Input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            data-testid="input-category"
          />
        </div>
        <div>
          <Label>Color Theme</Label>
          <Select value={gradient} onValueChange={setGradient}>
            <SelectTrigger data-testid="select-gradient">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {gradients.map((g) => (
                <SelectItem key={g.value} value={g.value}>
                  {g.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button
        type="submit"
        className="w-full"
        disabled={isPending}
        data-testid="button-submit-course"
      >
        {isPending && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
        {initial ? "Update Course" : "Create Course"}
      </Button>
    </form>
  );
}
