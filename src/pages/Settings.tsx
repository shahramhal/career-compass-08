import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Bell,
  Target,
  Link2,
  Shield,
  Download,
  Trash2,
} from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your account preferences and career settings
        </p>
      </div>

      <Tabs defaultValue="preferences" className="space-y-6">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="preferences">
            <Target className="mr-2 h-4 w-4" />
            Career Preferences
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="integrations">
            <Link2 className="mr-2 h-4 w-4" />
            Integrations
          </TabsTrigger>
          <TabsTrigger value="account">
            <User className="mr-2 h-4 w-4" />
            Account
          </TabsTrigger>
        </TabsList>

        <TabsContent value="preferences" className="space-y-6">
          <Card className="border-border bg-card shadow-card">
            <CardHeader>
              <CardTitle>Career Preferences</CardTitle>
              <CardDescription>
                Configure your job search preferences and target roles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Target Role</Label>
                  <Select defaultValue="senior-fe">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="senior-fe">Senior Frontend Engineer</SelectItem>
                      <SelectItem value="staff-fe">Staff Frontend Engineer</SelectItem>
                      <SelectItem value="lead-fe">Frontend Lead</SelectItem>
                      <SelectItem value="principal">Principal Engineer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Experience Level</Label>
                  <Select defaultValue="senior">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mid">Mid-Level (3-5 years)</SelectItem>
                      <SelectItem value="senior">Senior (5-8 years)</SelectItem>
                      <SelectItem value="staff">Staff (8+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Target Companies</Label>
                <div className="flex flex-wrap gap-2">
                  {["Stripe", "Vercel", "Netflix", "Airbnb", "Meta"].map((company) => (
                    <Badge key={company} variant="secondary" className="cursor-pointer">
                      {company}
                      <span className="ml-1 text-muted-foreground">×</span>
                    </Badge>
                  ))}
                  <Button variant="outline" size="sm" className="h-6">
                    + Add
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Preferred Locations</Label>
                  <Input placeholder="San Francisco, Remote..." defaultValue="San Francisco, CA" />
                </div>
                <div className="space-y-2">
                  <Label>Salary Expectation</Label>
                  <div className="flex gap-2">
                    <Input placeholder="Min" defaultValue="180,000" className="font-mono" />
                    <Input placeholder="Max" defaultValue="250,000" className="font-mono" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Work Arrangement</Label>
                <div className="flex gap-4">
                  {["Remote", "Hybrid", "On-site"].map((type) => (
                    <label
                      key={type}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <input
                        type="checkbox"
                        defaultChecked={type === "Remote"}
                        className="rounded border-border"
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>

              <Button>Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="border-border bg-card shadow-card">
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>
                Choose what updates you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { title: "New Job Matches", desc: "When jobs match your profile above 80%", enabled: true },
                { title: "Application Updates", desc: "Status changes on your applications", enabled: true },
                { title: "Interview Reminders", desc: "24 hours before scheduled interviews", enabled: true },
                { title: "Salary Insights", desc: "Weekly market updates for your role", enabled: false },
                { title: "Learning Reminders", desc: "Daily nudges to continue courses", enabled: false },
                { title: "Weekly Digest", desc: "Summary of your career activity", enabled: true },
              ].map((item) => (
                <div key={item.title} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch defaultChecked={item.enabled} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card className="border-border bg-card shadow-card">
            <CardHeader>
              <CardTitle>Connected Accounts</CardTitle>
              <CardDescription>
                Link external services to enhance your experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "LinkedIn", status: "connected", icon: "🔗" },
                { name: "Google Calendar", status: "not_connected", icon: "📅" },
                { name: "Gmail", status: "not_connected", icon: "✉️" },
              ].map((service) => (
                <div
                  key={service.name}
                  className="flex items-center justify-between rounded-lg border border-border p-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{service.icon}</span>
                    <div>
                      <p className="font-medium text-foreground">{service.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {service.status === "connected"
                          ? "Connected"
                          : "Not connected"}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant={service.status === "connected" ? "outline" : "default"}
                    size="sm"
                  >
                    {service.status === "connected" ? "Disconnect" : "Connect"}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <Card className="border-border bg-card shadow-card">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input defaultValue="john.doe@example.com" type="email" />
                </div>
              </div>
              <Button>Update Profile</Button>
            </CardContent>
          </Card>

          <Card className="border-border bg-card shadow-card">
            <CardHeader>
              <CardTitle>Data & Privacy</CardTitle>
              <CardDescription>Manage your data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div className="flex items-center gap-3">
                  <Download className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">Export Data</p>
                    <p className="text-sm text-muted-foreground">
                      Download all your data as JSON
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Export
                </Button>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-destructive/30 p-4">
                <div className="flex items-center gap-3">
                  <Trash2 className="h-5 w-5 text-destructive" />
                  <div>
                    <p className="font-medium text-destructive">Delete Account</p>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your account and all data
                    </p>
                  </div>
                </div>
                <Button variant="destructive" size="sm">
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
