import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, ArrowRight, Loader2 } from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login, register, user } = useAuth();
  const [, setLocation] = useLocation();

  if (user) {
    setLocation(user.role === "admin" ? "/admin" : "/dashboard");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        if (!name.trim()) {
          setError("Name is required");
          setLoading(false);
          return;
        }
        await register(name, email, password);
      }
      setLocation("/dashboard");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 relative items-center justify-center p-12">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-cyan-500/15 rounded-full blur-[80px]" />

        <div className="relative z-10 max-w-md text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center mx-auto mb-8">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-display font-bold text-white mb-4">
            AI Data Science Academy
          </h1>
          <p className="text-slate-300 leading-relaxed">
            Join 50,000+ students mastering data science, AI, and machine learning
            through our structured specialization pathways.
          </p>
          <div className="grid grid-cols-3 gap-6 mt-10">
            {[
              { value: "50K+", label: "Students" },
              { value: "200+", label: "Courses" },
              { value: "95%", label: "Satisfaction" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-white font-display">{stat.value}</div>
                <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <Card className="w-full max-w-md">
          <CardContent className="p-8">
            <div className="flex items-center gap-2.5 mb-2 lg:hidden">
              <div className="w-8 h-8 rounded-md bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold">AI DSA</span>
            </div>

            <h2 className="text-2xl font-display font-bold mb-1" data-testid="text-auth-title">
              {isLogin ? "Welcome back" : "Create your account"}
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              {isLogin
                ? "Sign in to continue your learning journey"
                : "Start your data science journey today"}
            </p>

            {error && (
              <div className="bg-destructive/10 text-destructive text-sm rounded-md p-3 mb-4" data-testid="text-auth-error">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    data-testid="input-name"
                  />
                </div>
              )}
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  data-testid="input-email"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  required
                  minLength={6}
                  data-testid="input-password"
                />
              </div>
              <Button className="w-full" disabled={loading} data-testid="button-auth-submit">
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : null}
                {isLogin ? "Sign In" : "Create Account"}
                {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                }}
                className="text-primary font-medium"
                data-testid="button-toggle-auth"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </div>

            {isLogin && (
              <div className="mt-4 p-3 bg-muted/50 rounded-md text-xs text-muted-foreground">
                <p className="font-medium mb-1">Demo Accounts:</p>
                <p>Admin: admin@aidsa.academy / admin123</p>
                <p>Student: student@test.com / student123</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
