import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Clock,
  Target,
  CheckCircle,
  Circle,
  Play,
  ExternalLink,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react";

const learningPath = [
  {
    id: "1",
    week: "Week 1-2",
    title: "AWS Fundamentals",
    status: "in_progress",
    progress: 65,
    items: [
      { name: "AWS Cloud Practitioner Course", duration: "16h", completed: true },
      { name: "Deploy App to EC2 Project", duration: "4h", completed: false },
      { name: "Certification Exam", duration: "2h", completed: false },
    ],
  },
  {
    id: "2",
    week: "Week 3-4",
    title: "Docker & Kubernetes",
    status: "upcoming",
    progress: 0,
    items: [
      { name: "Container Orchestration Course", duration: "24h", completed: false },
      { name: "Dockerize Existing Project", duration: "6h", completed: false },
      { name: "Deploy to K8s", duration: "8h", completed: false },
    ],
  },
  {
    id: "3",
    week: "Week 5-6",
    title: "GraphQL Mastery",
    status: "upcoming",
    progress: 0,
    items: [
      { name: "GraphQL Fundamentals", duration: "12h", completed: false },
      { name: "Build GraphQL API", duration: "10h", completed: false },
      { name: "Apollo Client Integration", duration: "8h", completed: false },
    ],
  },
];

const courses = [
  {
    id: "1",
    title: "AWS Solutions Architect",
    platform: "Udemy",
    duration: "40 hours",
    difficulty: "Intermediate",
    rating: 4.8,
    price: "$14.99",
    impact: "+$18k salary",
  },
  {
    id: "2",
    title: "Complete Kubernetes Guide",
    platform: "Coursera",
    duration: "35 hours",
    difficulty: "Advanced",
    rating: 4.7,
    price: "Free",
    impact: "+$15k salary",
  },
  {
    id: "3",
    title: "GraphQL with React",
    platform: "Frontend Masters",
    duration: "8 hours",
    difficulty: "Intermediate",
    rating: 4.9,
    price: "$39/mo",
    impact: "+$12k salary",
  },
];

const skills = {
  current: ["React", "TypeScript", "Node.js", "PostgreSQL", "Git"],
  target: ["React", "TypeScript", "Node.js", "AWS", "Docker", "Kubernetes", "GraphQL"],
  gap: ["AWS", "Docker", "Kubernetes", "GraphQL"],
};

export default function Learning() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Learning Path</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Personalized skill development to reach your career goals
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Total Progress</p>
            <p className="font-mono text-lg font-semibold text-foreground">22%</p>
          </div>
          <Progress value={22} className="h-2 w-32" />
        </div>
      </div>

      <Tabs defaultValue="path" className="space-y-6">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="path">Learning Path</TabsTrigger>
          <TabsTrigger value="skills">Skills Gap</TabsTrigger>
          <TabsTrigger value="courses">Recommended Courses</TabsTrigger>
        </TabsList>

        <TabsContent value="path" className="space-y-6">
          {/* Timeline */}
          <div className="relative space-y-6 pl-6">
            {/* Vertical line */}
            <div className="absolute left-[11px] top-6 h-[calc(100%-48px)] w-0.5 bg-border" />

            {learningPath.map((phase, index) => (
              <div key={phase.id} className="relative">
                {/* Timeline dot */}
                <div
                  className={`absolute -left-6 top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                    phase.status === "in_progress"
                      ? "border-primary bg-primary text-primary-foreground"
                      : phase.status === "completed"
                      ? "border-metric-excellent bg-metric-excellent text-white"
                      : "border-muted-foreground bg-background"
                  }`}
                >
                  {phase.status === "completed" ? (
                    <CheckCircle className="h-3 w-3" />
                  ) : phase.status === "in_progress" ? (
                    <Play className="h-3 w-3" />
                  ) : (
                    <Circle className="h-3 w-3" />
                  )}
                </div>

                <Card className="border-border bg-card shadow-card">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <Badge
                          variant="outline"
                          className="mb-2 text-xs text-muted-foreground"
                        >
                          {phase.week}
                        </Badge>
                        <CardTitle className="text-lg">{phase.title}</CardTitle>
                      </div>
                      {phase.status === "in_progress" && (
                        <div className="text-right">
                          <p className="font-mono text-2xl font-bold text-primary">
                            {phase.progress}%
                          </p>
                          <p className="text-xs text-muted-foreground">complete</p>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {phase.items.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between rounded-lg bg-muted/30 p-3"
                        >
                          <div className="flex items-center gap-3">
                            {item.completed ? (
                              <CheckCircle className="h-4 w-4 text-metric-excellent" />
                            ) : (
                              <Circle className="h-4 w-4 text-muted-foreground" />
                            )}
                            <span
                              className={
                                item.completed
                                  ? "text-muted-foreground line-through"
                                  : "text-foreground"
                              }
                            >
                              {item.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {item.duration}
                          </div>
                        </div>
                      ))}
                    </div>
                    {phase.status === "in_progress" && (
                      <Button className="mt-4 w-full">Continue Learning</Button>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Current vs Target Skills */}
            <Card className="border-border bg-card shadow-card">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Current Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.current.map((skill) => (
                    <Badge
                      key={skill}
                      className="bg-metric-excellent/10 text-metric-excellent border-0"
                    >
                      <CheckCircle className="mr-1 h-3 w-3" />
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card shadow-card">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Skills Gap (Target Role)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.gap.map((skill) => (
                    <Badge
                      key={skill}
                      className="bg-metric-poor/10 text-metric-poor border-0"
                    >
                      <Target className="mr-1 h-3 w-3" />
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Priority Matrix */}
          <Card className="border-border bg-card shadow-card">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Skill Priority Matrix
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border border-metric-excellent/30 bg-metric-excellent/5 p-4">
                  <h4 className="mb-3 text-sm font-medium text-metric-excellent">
                    High Impact, Low Effort
                  </h4>
                  <div className="space-y-2">
                    <Badge variant="outline">GraphQL (20h)</Badge>
                  </div>
                </div>
                <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
                  <h4 className="mb-3 text-sm font-medium text-primary">
                    High Impact, High Effort
                  </h4>
                  <div className="space-y-2">
                    <Badge variant="outline">AWS (40h)</Badge>
                    <Badge variant="outline">Kubernetes (60h)</Badge>
                  </div>
                </div>
                <div className="rounded-lg border border-muted-foreground/30 bg-muted/30 p-4">
                  <h4 className="mb-3 text-sm font-medium text-muted-foreground">
                    Low Impact, Low Effort
                  </h4>
                  <div className="space-y-2">
                    <Badge variant="outline">Docker (15h)</Badge>
                  </div>
                </div>
                <div className="rounded-lg border border-muted-foreground/30 bg-muted/30 p-4">
                  <h4 className="mb-3 text-sm font-medium text-muted-foreground">
                    Low Impact, High Effort
                  </h4>
                  <div className="space-y-2 text-xs text-muted-foreground">
                    None identified
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-4">
          {courses.map((course) => (
            <Card
              key={course.id}
              className="border-border bg-card shadow-card transition-all hover:border-primary/30"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-foreground">{course.title}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {course.platform}
                      </Badge>
                    </div>
                    <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {course.duration}
                      </span>
                      <span>{course.difficulty}</span>
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-metric-average text-metric-average" />
                        {course.rating}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center gap-4">
                      <span className="font-mono text-lg font-semibold text-foreground">
                        {course.price}
                      </span>
                      <Badge className="bg-metric-excellent/10 text-metric-excellent border-0">
                        <TrendingUp className="mr-1 h-3 w-3" />
                        {course.impact}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Preview
                    </Button>
                    <Button size="sm">
                      Add to Path
                      <Zap className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
