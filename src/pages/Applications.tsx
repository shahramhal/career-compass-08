import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Plus,
  Building2,
  Calendar,
  MessageSquare,
  MoreHorizontal,
  TrendingUp,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface KanbanCard {
  id: string;
  company: string;
  role: string;
  appliedDate: string;
  nextAction?: string;
  notes?: number;
}

interface KanbanColumn {
  id: string;
  title: string;
  color: string;
  cards: KanbanCard[];
}

const columns: KanbanColumn[] = [
  {
    id: "saved",
    title: "Saved",
    color: "bg-muted-foreground",
    cards: [
      { id: "s1", company: "Google", role: "L5 Software Engineer", appliedDate: "Saved 2d ago" },
      { id: "s2", company: "Apple", role: "Staff Engineer", appliedDate: "Saved 3d ago" },
      { id: "s3", company: "Microsoft", role: "Senior SWE", appliedDate: "Saved 5d ago" },
    ],
  },
  {
    id: "applied",
    title: "Applied",
    color: "bg-primary",
    cards: [
      { id: "a1", company: "Stripe", role: "Frontend Lead", appliedDate: "Applied 1d ago", nextAction: "Follow up in 5 days" },
      { id: "a2", company: "Vercel", role: "Staff Engineer", appliedDate: "Applied 3d ago", notes: 2 },
      { id: "a3", company: "Airbnb", role: "Senior FE", appliedDate: "Applied 1w ago" },
    ],
  },
  {
    id: "interview",
    title: "Interview",
    color: "bg-chart-4",
    cards: [
      { id: "i1", company: "Meta", role: "E6 Engineer", appliedDate: "Round 2", nextAction: "Technical: Jan 20", notes: 5 },
      { id: "i2", company: "Netflix", role: "Senior SWE", appliedDate: "Phone Screen", nextAction: "Call: Today 3pm" },
    ],
  },
  {
    id: "offer",
    title: "Offer",
    color: "bg-metric-excellent",
    cards: [
      { id: "o1", company: "Coinbase", role: "Staff Engineer", appliedDate: "$285k TC", nextAction: "Deadline: Jan 25" },
    ],
  },
  {
    id: "rejected",
    title: "Closed",
    color: "bg-metric-poor",
    cards: [
      { id: "r1", company: "Amazon", role: "SDE III", appliedDate: "Position filled" },
      { id: "r2", company: "Uber", role: "Senior FE", appliedDate: "No response" },
    ],
  },
];

const responseData = [
  { day: "Mon", responses: 3 },
  { day: "Tue", responses: 5 },
  { day: "Wed", responses: 2 },
  { day: "Thu", responses: 4 },
  { day: "Fri", responses: 6 },
  { day: "Sat", responses: 1 },
  { day: "Sun", responses: 0 },
];

const statusData = [
  { name: "Applied", value: 8, color: "hsl(217, 91%, 60%)" },
  { name: "Interview", value: 3, color: "hsl(280, 65%, 60%)" },
  { name: "Offer", value: 1, color: "hsl(142, 76%, 46%)" },
  { name: "Rejected", value: 15, color: "hsl(0, 84%, 60%)" },
];

export default function Applications() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Application Tracker</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track and manage all your job applications in one place
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Application
        </Button>
      </div>

      {/* Stats Row */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-border bg-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Total Applications</p>
                <p className="mt-1 font-mono text-2xl font-bold text-foreground">27</p>
              </div>
              <div className="rounded-lg bg-primary/10 p-2">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Response Rate</p>
                <p className="mt-1 font-mono text-2xl font-bold text-metric-excellent">32%</p>
              </div>
              <Badge className="bg-metric-excellent/10 text-metric-excellent border-0">
                <TrendingUp className="mr-1 h-3 w-3" />
                +5%
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Avg. Time to Interview</p>
                <p className="mt-1 font-mono text-2xl font-bold text-foreground">8 days</p>
              </div>
              <div className="rounded-lg bg-chart-4/10 p-2">
                <Clock className="h-5 w-5 text-chart-4" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Active Interviews</p>
                <p className="mt-1 font-mono text-2xl font-bold text-chart-4">3</p>
              </div>
              <div className="rounded-lg bg-metric-excellent/10 p-2">
                <Calendar className="h-5 w-5 text-metric-excellent" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Kanban Board */}
      <Card className="border-border bg-card shadow-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Pipeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {columns.map((column) => (
              <div key={column.id} className="w-64 shrink-0">
                {/* Column Header */}
                <div className="mb-3 flex items-center gap-2">
                  <div className={cn("h-2 w-2 rounded-full", column.color)} />
                  <span className="text-sm font-medium text-foreground">
                    {column.title}
                  </span>
                  <Badge variant="secondary" className="ml-auto text-xs">
                    {column.cards.length}
                  </Badge>
                </div>

                {/* Cards */}
                <div className="space-y-2">
                  {column.cards.map((card) => (
                    <div
                      key={card.id}
                      className="group cursor-pointer rounded-lg border border-border bg-muted/30 p-3 transition-all hover:border-primary/30 hover:bg-muted/50"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted">
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {card.company}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {card.role}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 opacity-0 group-hover:opacity-100"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">
                        {card.appliedDate}
                      </p>
                      {card.nextAction && (
                        <Badge
                          variant="outline"
                          className="mt-2 text-xs text-primary"
                        >
                          {card.nextAction}
                        </Badge>
                      )}
                      {card.notes && (
                        <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                          <MessageSquare className="h-3 w-3" />
                          {card.notes} notes
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Analytics */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border bg-card shadow-card">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Response Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={responseData}>
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(222, 47%, 10%)",
                      border: "1px solid hsl(217, 33%, 15%)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar
                    dataKey="responses"
                    fill="hsl(217, 91%, 60%)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card shadow-card">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Application Status Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center gap-8">
              <div className="h-[180px] w-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(222, 47%, 10%)",
                        border: "1px solid hsl(217, 33%, 15%)",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                {statusData.map((item) => (
                  <div key={item.name} className="flex items-center gap-3">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-muted-foreground">
                      {item.name}
                    </span>
                    <span className="font-mono text-sm font-medium text-foreground">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
