import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Lightbulb,
  TrendingUp,
  Zap,
  Clock
} from "lucide-react";

const scoreBreakdown = [
  { name: "Content Quality", score: 85, color: "bg-metric-excellent" },
  { name: "ATS Compatibility", score: 72, color: "bg-metric-good" },
  { name: "Keywords Match", score: 68, color: "bg-metric-average" },
  { name: "Format & Structure", score: 90, color: "bg-metric-excellent" },
  { name: "Experience Clarity", score: 88, color: "bg-metric-excellent" },
];

const issues = [
  {
    type: "critical",
    title: "Missing contact email format",
    description: "Email may be parsed incorrectly by ATS systems",
    impact: "+12% pass rate",
    icon: AlertTriangle,
  },
  {
    type: "warning",
    title: "Generic objective statement",
    description: "Replace with a tailored professional summary",
    impact: "+8% engagement",
    icon: AlertTriangle,
  },
  {
    type: "suggestion",
    title: "Add quantifiable achievements",
    description: "Include metrics for your top 3 accomplishments",
    impact: "+15% interview rate",
    icon: Lightbulb,
  },
];

const missingKeywords = [
  { keyword: "Docker", frequency: "89%", section: "Experience", impact: "+15%" },
  { keyword: "Kubernetes", frequency: "76%", section: "Skills", impact: "+12%" },
  { keyword: "CI/CD", frequency: "82%", section: "Experience", impact: "+10%" },
  { keyword: "Microservices", frequency: "71%", section: "Experience", impact: "+8%" },
];

export default function CVAnalysis() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">CV Analysis</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Optimize your CV for maximum impact with AI-powered analysis
          </p>
        </div>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload New CV
        </Button>
      </div>

      {/* Current CV Card */}
      <Card className="border-border bg-card shadow-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">John_Doe_Resume_2024.pdf</h3>
                <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                  <span>Uploaded Jan 10, 2024</span>
                  <span>•</span>
                  <span>2 pages</span>
                  <span>•</span>
                  <Badge variant="secondary" className="text-xs">Latest Version</Badge>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2">
                <span className="font-mono text-3xl font-bold text-metric-good">78</span>
                <span className="text-sm text-muted-foreground">/100</span>
              </div>
              <p className="mt-1 flex items-center gap-1 text-xs text-metric-excellent">
                <TrendingUp className="h-3 w-3" />
                +6 since last update
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="ats">ATS Compatibility</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Score Breakdown */}
            <Card className="border-border bg-card shadow-card">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Score Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {scoreBreakdown.map((item) => (
                  <div key={item.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{item.name}</span>
                      <span className="font-mono font-medium text-foreground">
                        {item.score}/100
                      </span>
                    </div>
                    <Progress value={item.score} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Issues */}
            <Card className="border-border bg-card shadow-card">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Priority Issues
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {issues.map((issue, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-lg border border-border p-3"
                  >
                    <div
                      className={`rounded-lg p-2 ${
                        issue.type === "critical"
                          ? "bg-metric-poor/10"
                          : issue.type === "warning"
                          ? "bg-metric-average/10"
                          : "bg-primary/10"
                      }`}
                    >
                      <issue.icon
                        className={`h-4 w-4 ${
                          issue.type === "critical"
                            ? "text-metric-poor"
                            : issue.type === "warning"
                            ? "text-metric-average"
                            : "text-primary"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {issue.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {issue.description}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs text-metric-excellent">
                      {issue.impact}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ats" className="space-y-6">
          <Card className="border-border bg-card shadow-card">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                ATS Compatibility Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 rounded-lg bg-metric-excellent/10 p-4">
                  <CheckCircle className="h-5 w-5 text-metric-excellent" />
                  <div>
                    <p className="font-medium text-foreground">File format is ATS-friendly</p>
                    <p className="text-sm text-muted-foreground">PDF with selectable text detected</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-metric-average/10 p-4">
                  <AlertTriangle className="h-5 w-5 text-metric-average" />
                  <div>
                    <p className="font-medium text-foreground">Complex formatting detected</p>
                    <p className="text-sm text-muted-foreground">Tables and columns may cause parsing issues</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="keywords" className="space-y-6">
          <Card className="border-border bg-card shadow-card">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Missing Keywords for Target Role
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border text-left text-xs text-muted-foreground">
                      <th className="pb-3 font-medium">Keyword</th>
                      <th className="pb-3 font-medium">Job Frequency</th>
                      <th className="pb-3 font-medium">Add to Section</th>
                      <th className="pb-3 font-medium">Impact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {missingKeywords.map((item) => (
                      <tr key={item.keyword} className="border-b border-border last:border-0">
                        <td className="py-3">
                          <Badge variant="outline" className="font-mono">
                            {item.keyword}
                          </Badge>
                        </td>
                        <td className="py-3 font-mono text-sm text-foreground">
                          {item.frequency}
                        </td>
                        <td className="py-3 text-sm text-muted-foreground">
                          {item.section}
                        </td>
                        <td className="py-3">
                          <Badge className="bg-metric-excellent/10 text-metric-excellent border-0">
                            {item.impact}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <Card className="border-border bg-card shadow-card">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Prioritized Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 rounded-lg border border-border p-4 hover:border-primary/30 transition-colors"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 font-mono text-sm font-bold text-primary">
                    {i}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-foreground">
                        Add quantifiable achievements to Experience section
                      </h4>
                      <Badge className="bg-metric-poor/10 text-metric-poor border-0 text-xs">
                        High Impact
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Replace generic descriptions with specific metrics. Example: "Improved page load time by 40%"
                    </p>
                    <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        ~15 min to implement
                      </span>
                      <span className="flex items-center gap-1">
                        <Zap className="h-3 w-3" />
                        +12% interview rate
                      </span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Apply
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
