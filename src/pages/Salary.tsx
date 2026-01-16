import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import {
  TrendingUp,
  DollarSign,
  MapPin,
  Briefcase,
  GraduationCap,
  Clock,
} from "lucide-react";

const salaryBreakdown = [
  { factor: "Base", value: 100, color: "hsl(217, 91%, 60%)" },
  { factor: "Location (+SF)", value: 25, color: "hsl(142, 76%, 46%)" },
  { factor: "Experience", value: 15, color: "hsl(173, 80%, 40%)" },
  { factor: "Skills Premium", value: 10, color: "hsl(280, 65%, 60%)" },
  { factor: "Education", value: 5, color: "hsl(38, 92%, 50%)" },
];

const salaryTrend = [
  { year: "2019", salary: 120 },
  { year: "2020", salary: 128 },
  { year: "2021", salary: 145 },
  { year: "2022", salary: 160 },
  { year: "2023", salary: 175 },
  { year: "2024", salary: 195 },
];

const skillROI = [
  { skill: "AWS", increase: 18000, time: 40, demand: 45, priority: "High" },
  { skill: "Kubernetes", increase: 15000, time: 60, demand: 38, priority: "Medium" },
  { skill: "GraphQL", increase: 12000, time: 20, demand: 52, priority: "High" },
  { skill: "Rust", increase: 20000, time: 100, demand: 28, priority: "Low" },
  { skill: "System Design", increase: 25000, time: 80, demand: 65, priority: "High" },
];

const locationData = [
  { location: "San Francisco", salary: 195 },
  { location: "New York", salary: 185 },
  { location: "Seattle", salary: 180 },
  { location: "Austin", salary: 155 },
  { location: "Remote (US)", salary: 165 },
];

export default function Salary() {
  const predictedSalary = 195000;
  const confidence = 85;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Salary Insights</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Understand your market value and optimize your earning potential
        </p>
      </div>

      {/* Salary Prediction Card */}
      <Card className="border-border bg-card shadow-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Predicted Salary for Senior Frontend Engineer
              </p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-mono text-4xl font-bold text-foreground">
                  ${(predictedSalary / 1000).toFixed(0)}k
                </span>
                <span className="text-lg text-muted-foreground">/year</span>
              </div>
              <div className="mt-2 flex items-center gap-4">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <span>Range:</span>
                  <span className="font-mono text-foreground">$165k - $225k</span>
                </div>
                <Badge className="bg-metric-excellent/10 text-metric-excellent border-0">
                  {confidence}% confidence
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-metric-excellent">
                <TrendingUp className="h-5 w-5" />
                <span className="text-lg font-semibold">+12%</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">vs. market avg</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Factor Breakdown & Trend */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Salary Factors */}
        <Card className="border-border bg-card shadow-card">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Salary Factor Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salaryBreakdown} layout="vertical">
                  <XAxis
                    type="number"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }}
                    tickFormatter={(value) => `$${value}k`}
                  />
                  <YAxis
                    dataKey="factor"
                    type="category"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }}
                    width={100}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(222, 47%, 10%)",
                      border: "1px solid hsl(217, 33%, 15%)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    formatter={(value: number) => [`$${value}k`, "Value"]}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {salaryBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Salary Trend */}
        <Card className="border-border bg-card shadow-card">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Market Salary Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salaryTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 15%)" />
                  <XAxis
                    dataKey="year"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }}
                    tickFormatter={(value) => `$${value}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(222, 47%, 10%)",
                      border: "1px solid hsl(217, 33%, 15%)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    formatter={(value: number) => [`$${value}k`, "Avg Salary"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="salary"
                    stroke="hsl(217, 91%, 60%)"
                    strokeWidth={3}
                    dot={{ fill: "hsl(217, 91%, 60%)", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skill ROI Calculator */}
      <Card className="border-border bg-card shadow-card">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Skill ROI Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted-foreground">
                  <th className="pb-3 font-medium">Skill</th>
                  <th className="pb-3 font-medium">Avg. Salary Increase</th>
                  <th className="pb-3 font-medium">Learning Time</th>
                  <th className="pb-3 font-medium">Demand Trend</th>
                  <th className="pb-3 font-medium">Priority</th>
                </tr>
              </thead>
              <tbody>
                {skillROI.map((item) => (
                  <tr
                    key={item.skill}
                    className="border-b border-border last:border-0"
                  >
                    <td className="py-4">
                      <Badge variant="outline" className="font-mono">
                        {item.skill}
                      </Badge>
                    </td>
                    <td className="py-4">
                      <span className="font-mono text-lg font-semibold text-metric-excellent">
                        +${(item.increase / 1000).toFixed(0)}k
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-foreground">
                          {item.time} hours
                        </span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-metric-excellent" />
                        <span className="font-mono text-sm text-metric-excellent">
                          ↑ {item.demand}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4">
                      <Badge
                        className={
                          item.priority === "High"
                            ? "bg-metric-poor/10 text-metric-poor border-0"
                            : item.priority === "Medium"
                            ? "bg-metric-average/10 text-metric-average border-0"
                            : "bg-muted text-muted-foreground border-0"
                        }
                      >
                        {item.priority}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Location Comparison */}
      <Card className="border-border bg-card shadow-card">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Salary by Location
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={locationData}>
                <XAxis
                  dataKey="location"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }}
                  tickFormatter={(value) => `$${value}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(222, 47%, 10%)",
                    border: "1px solid hsl(217, 33%, 15%)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(value: number) => [`$${value}k`, "Avg Salary"]}
                />
                <Bar dataKey="salary" fill="hsl(217, 91%, 60%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
