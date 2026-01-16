import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  MapPin,
  Building2,
  Clock,
  Check,
  X,
  Bookmark,
  ExternalLink,
  Filter,
  SlidersHorizontal,
} from "lucide-react";

interface Job {
  id: string;
  title: string;
  company: string;
  logo?: string;
  location: string;
  salary: string;
  matchScore: number;
  postedAgo: string;
  skills: { name: string; matched: boolean }[];
  remote: boolean;
  level: string;
  type: string;
}

const jobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Engineer",
    company: "Stripe",
    location: "San Francisco, CA",
    salary: "$180k - $220k",
    matchScore: 94,
    postedAgo: "2 hours ago",
    skills: [
      { name: "React", matched: true },
      { name: "TypeScript", matched: true },
      { name: "GraphQL", matched: false },
      { name: "Node.js", matched: true },
    ],
    remote: true,
    level: "Senior",
    type: "Full-time",
  },
  {
    id: "2",
    title: "Staff Software Engineer",
    company: "Vercel",
    location: "Remote",
    salary: "$200k - $260k",
    matchScore: 89,
    postedAgo: "1 day ago",
    skills: [
      { name: "Next.js", matched: true },
      { name: "Node.js", matched: true },
      { name: "AWS", matched: false },
      { name: "Rust", matched: false },
    ],
    remote: true,
    level: "Staff",
    type: "Full-time",
  },
  {
    id: "3",
    title: "Principal Engineer",
    company: "Netflix",
    location: "Los Gatos, CA",
    salary: "$250k - $350k",
    matchScore: 85,
    postedAgo: "3 days ago",
    skills: [
      { name: "Java", matched: false },
      { name: "Microservices", matched: true },
      { name: "Kafka", matched: false },
      { name: "React", matched: true },
    ],
    remote: false,
    level: "Principal",
    type: "Full-time",
  },
  {
    id: "4",
    title: "Frontend Lead",
    company: "Airbnb",
    location: "San Francisco, CA",
    salary: "$190k - $240k",
    matchScore: 82,
    postedAgo: "5 days ago",
    skills: [
      { name: "React", matched: true },
      { name: "GraphQL", matched: false },
      { name: "Design Systems", matched: true },
      { name: "TypeScript", matched: true },
    ],
    remote: true,
    level: "Lead",
    type: "Full-time",
  },
];

function getMatchColor(score: number) {
  if (score >= 90) return "text-metric-excellent";
  if (score >= 70) return "text-metric-good";
  if (score >= 50) return "text-metric-average";
  return "text-metric-poor";
}

export default function Jobs() {
  const [salaryRange, setSalaryRange] = useState([100, 300]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(jobs[0]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Job Matches</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          156 jobs matched your profile • 12 new today
        </p>
      </div>

      <div className="flex gap-6">
        {/* Filters Sidebar */}
        <Card className="h-fit w-72 shrink-0 border-border bg-card shadow-card">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Filter className="h-4 w-4" />
                Filters
              </CardTitle>
              <Button variant="ghost" size="sm" className="h-7 text-xs text-primary">
                Reset
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Location */}
            <div className="space-y-3">
              <label className="text-xs font-medium text-muted-foreground">
                Location
              </label>
              <Input placeholder="City, State, or Remote" className="h-9 text-sm" />
            </div>

            {/* Salary Range */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-muted-foreground">
                  Salary Range
                </label>
                <span className="font-mono text-xs text-foreground">
                  ${salaryRange[0]}k - ${salaryRange[1]}k
                </span>
              </div>
              <Slider
                defaultValue={salaryRange}
                max={400}
                min={50}
                step={10}
                onValueChange={setSalaryRange}
                className="py-2"
              />
            </div>

            {/* Experience Level */}
            <div className="space-y-3">
              <label className="text-xs font-medium text-muted-foreground">
                Experience Level
              </label>
              <div className="space-y-2">
                {["Senior", "Staff", "Principal", "Lead"].map((level) => (
                  <div key={level} className="flex items-center gap-2">
                    <Checkbox id={level} defaultChecked={level === "Senior"} />
                    <label
                      htmlFor={level}
                      className="text-sm text-muted-foreground"
                    >
                      {level}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Work Type */}
            <div className="space-y-3">
              <label className="text-xs font-medium text-muted-foreground">
                Work Arrangement
              </label>
              <div className="space-y-2">
                {["Remote", "Hybrid", "On-site"].map((type) => (
                  <div key={type} className="flex items-center gap-2">
                    <Checkbox id={type} defaultChecked={type === "Remote"} />
                    <label htmlFor={type} className="text-sm text-muted-foreground">
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Posted Date */}
            <div className="space-y-3">
              <label className="text-xs font-medium text-muted-foreground">
                Posted Date
              </label>
              <Select defaultValue="week">
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Last 24 hours</SelectItem>
                  <SelectItem value="week">Last week</SelectItem>
                  <SelectItem value="month">Last month</SelectItem>
                  <SelectItem value="any">Any time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Job List + Detail */}
        <div className="flex flex-1 gap-6">
          {/* Job List */}
          <div className="flex-1 space-y-3">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search jobs, companies, skills..."
                className="h-10 pl-10"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Showing {jobs.length} results
              </span>
              <Select defaultValue="match">
                <SelectTrigger className="h-8 w-40 text-xs">
                  <SlidersHorizontal className="mr-2 h-3 w-3" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="match">Best Match</SelectItem>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="salary">Highest Salary</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Jobs */}
            <div className="space-y-3">
              {jobs.map((job) => (
                <Card
                  key={job.id}
                  className={`cursor-pointer border-border bg-card transition-all hover:border-primary/30 ${
                    selectedJob?.id === job.id ? "border-primary ring-1 ring-primary/30" : ""
                  }`}
                  onClick={() => setSelectedJob(job)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-foreground">
                            {job.title}
                          </h3>
                          {job.remote && (
                            <Badge variant="secondary" className="text-xs">
                              Remote
                            </Badge>
                          )}
                        </div>
                        <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Building2 className="h-3 w-3" />
                            {job.company}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {job.postedAgo}
                          </span>
                        </div>
                        <p className="mt-2 font-mono text-sm font-medium text-foreground">
                          {job.salary}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {job.skills.slice(0, 4).map((skill) => (
                            <Badge
                              key={skill.name}
                              variant="outline"
                              className={`text-xs ${
                                skill.matched
                                  ? "border-metric-excellent/30 bg-metric-excellent/10 text-metric-excellent"
                                  : "border-metric-poor/30 bg-metric-poor/10 text-metric-poor"
                              }`}
                            >
                              {skill.matched ? (
                                <Check className="mr-1 h-2.5 w-2.5" />
                              ) : (
                                <X className="mr-1 h-2.5 w-2.5" />
                              )}
                              {skill.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <span
                          className={`font-mono text-xl font-bold ${getMatchColor(
                            job.matchScore
                          )}`}
                        >
                          {job.matchScore}%
                        </span>
                        <Progress value={job.matchScore} className="mt-1 h-1 w-16" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Job Detail Panel */}
          {selectedJob && (
            <Card className="w-96 shrink-0 border-border bg-card shadow-card">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">
                      {selectedJob.title}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {selectedJob.company} • {selectedJob.location}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Bookmark className="h-5 w-5" />
                  </Button>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <div
                    className={`font-mono text-3xl font-bold ${getMatchColor(
                      selectedJob.matchScore
                    )}`}
                  >
                    {selectedJob.matchScore}%
                  </div>
                  <span className="text-sm text-muted-foreground">match score</span>
                </div>

                <div className="mt-6 space-y-4">
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground">
                      Salary Range
                    </h4>
                    <p className="mt-1 font-mono text-lg font-semibold text-foreground">
                      {selectedJob.salary}
                    </p>
                  </div>

                  <div>
                    <h4 className="mb-2 text-xs font-medium text-muted-foreground">
                      Skills Match
                    </h4>
                    <div className="space-y-2">
                      {selectedJob.skills.map((skill) => (
                        <div
                          key={skill.name}
                          className="flex items-center justify-between rounded-lg bg-muted/30 px-3 py-2"
                        >
                          <span className="text-sm text-foreground">{skill.name}</span>
                          {skill.matched ? (
                            <Check className="h-4 w-4 text-metric-excellent" />
                          ) : (
                            <X className="h-4 w-4 text-metric-poor" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <Button className="flex-1">
                    Apply Now
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline">Add to Tracker</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
