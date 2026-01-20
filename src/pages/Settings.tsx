import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
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
  Download,
  Trash2,
  Loader2,
  Camera,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { profileService } from "@/services/profileService";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { user, refreshUser, logout } = useAuth();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [profile, setProfile] = useState({
    phoneNumber: user?.profile?.phoneNumber || "",
    location: user?.profile?.location || "",
    linkedinUrl: user?.profile?.linkedinUrl || "",
    githubUrl: user?.profile?.githubUrl || "",
    portfolioUrl: user?.profile?.portfolioUrl || "",
    bio: user?.profile?.bio || "",
  });

  useEffect(() => {
    if (user?.profile) {
      setProfile({
        phoneNumber: user.profile.phoneNumber || "",
        location: user.profile.location || "",
        linkedinUrl: user.profile.linkedinUrl || "",
        githubUrl: user.profile.githubUrl || "",
        portfolioUrl: user.profile.portfolioUrl || "",
        bio: user.profile.bio || "",
      });
    }
  }, [user]);

  const handleProfileUpdate = async () => {
    setSaving(true);
    try {
      await profileService.updateProfile(profile);
      await refreshUser();
      toast({ title: "Profile updated successfully" });
    } catch (error: any) {
      toast({ title: "Failed to update profile", description: error.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAvatar(true);
    try {
      await profileService.uploadAvatar(file);
      await refreshUser();
      toast({ title: "Avatar updated" });
    } catch (error: any) {
      toast({ title: "Failed to upload avatar", description: error.message, variant: "destructive" });
    } finally {
      setUploadingAvatar(false);
    }
  };

  const getInitials = () => {
    if (!user) return "??";
    const first = user.firstName?.[0] || "";
    const last = user.lastName?.[0] || "";
    return (first + last).toUpperCase() || user.email[0].toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your account preferences and career settings
        </p>
      </div>

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="account"><User className="mr-2 h-4 w-4" />Profile</TabsTrigger>
          <TabsTrigger value="preferences"><Target className="mr-2 h-4 w-4" />Preferences</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="mr-2 h-4 w-4" />Notifications</TabsTrigger>
          <TabsTrigger value="integrations"><Link2 className="mr-2 h-4 w-4" />Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-6">
          {/* Avatar */}
          <Card className="border-border bg-card shadow-card">
            <CardHeader>
              <CardTitle>Profile Photo</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user?.profile?.avatarUrl} />
                  <AvatarFallback className="bg-primary text-2xl text-primary-foreground">{getInitials()}</AvatarFallback>
                </Avatar>
                <label className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                  {uploadingAvatar ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
                  <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} disabled={uploadingAvatar} />
                </label>
              </div>
              <div>
                <p className="font-medium text-foreground">{user?.firstName} {user?.lastName}</p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </CardContent>
          </Card>

          {/* Profile Details */}
          <Card className="border-border bg-card shadow-card">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input value={profile.phoneNumber} onChange={(e) => setProfile({ ...profile, phoneNumber: e.target.value })} placeholder="+1 (555) 000-0000" />
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input value={profile.location} onChange={(e) => setProfile({ ...profile, location: e.target.value })} placeholder="San Francisco, CA" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Bio</Label>
                <Textarea value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} placeholder="Tell us about yourself..." rows={3} />
              </div>
              <Separator />
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label>LinkedIn URL</Label>
                  <Input value={profile.linkedinUrl} onChange={(e) => setProfile({ ...profile, linkedinUrl: e.target.value })} placeholder="https://linkedin.com/in/..." />
                </div>
                <div className="space-y-2">
                  <Label>GitHub URL</Label>
                  <Input value={profile.githubUrl} onChange={(e) => setProfile({ ...profile, githubUrl: e.target.value })} placeholder="https://github.com/..." />
                </div>
                <div className="space-y-2">
                  <Label>Portfolio URL</Label>
                  <Input value={profile.portfolioUrl} onChange={(e) => setProfile({ ...profile, portfolioUrl: e.target.value })} placeholder="https://..." />
                </div>
              </div>
              <Button onClick={handleProfileUpdate} disabled={saving}>
                {saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : "Save Changes"}
              </Button>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-destructive/30 bg-card shadow-card">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div className="flex items-center gap-3">
                  <Download className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">Export Data</p>
                    <p className="text-sm text-muted-foreground">Download all your data</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Export</Button>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-destructive/30 p-4">
                <div className="flex items-center gap-3">
                  <Trash2 className="h-5 w-5 text-destructive" />
                  <div>
                    <p className="font-medium text-destructive">Delete Account</p>
                    <p className="text-sm text-muted-foreground">Permanently delete your account</p>
                  </div>
                </div>
                <Button variant="destructive" size="sm">Delete</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card className="border-border bg-card shadow-card">
            <CardHeader>
              <CardTitle>Career Preferences</CardTitle>
              <CardDescription>Configure your job search preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Target Role</Label>
                  <Select defaultValue="senior-fe">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="senior-fe">Senior Frontend Engineer</SelectItem>
                      <SelectItem value="staff-fe">Staff Frontend Engineer</SelectItem>
                      <SelectItem value="lead-fe">Frontend Lead</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Salary Expectation</Label>
                  <div className="flex gap-2">
                    <Input placeholder="Min" defaultValue="180,000" className="font-mono" />
                    <Input placeholder="Max" defaultValue="250,000" className="font-mono" />
                  </div>
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
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { title: "New Job Matches", desc: "When jobs match your profile above 80%", enabled: true },
                { title: "Application Updates", desc: "Status changes on your applications", enabled: true },
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
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "LinkedIn", status: "not_connected", icon: "🔗" },
                { name: "Google Calendar", status: "not_connected", icon: "📅" },
              ].map((service) => (
                <div key={service.name} className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{service.icon}</span>
                    <p className="font-medium text-foreground">{service.name}</p>
                  </div>
                  <Button variant="default" size="sm">Connect</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
