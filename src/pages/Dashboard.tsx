import { CVHealthScore } from "@/components/dashboard/CVHealthScore";
import { QuickStats } from "@/components/dashboard/QuickStats";
import { ApplicationChart } from "@/components/dashboard/ApplicationChart";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { RecommendedActions } from "@/components/dashboard/RecommendedActions";
import { JobMatchPreview } from "@/components/dashboard/JobMatchPreview";
import { ApplicationKanban } from "@/components/dashboard/ApplicationKanban";
import { MarketInsights } from "@/components/dashboard/MarketInsights";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Welcome back, John
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Here's your career command center. You have 3 new job matches and 2 pending actions.
        </p>
      </div>

      {/* Quick Stats */}
      <QuickStats />

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - CV Health & Actions */}
        <div className="space-y-6">
          <CVHealthScore score={78} change={6} issues={4} />
          <RecommendedActions />
        </div>

        {/* Center Column - Charts & Activity */}
        <div className="space-y-6 lg:col-span-2">
          <ApplicationChart />
          <ApplicationKanban />
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        <JobMatchPreview />
        <RecentActivity />
      </div>

      {/* Market Insights */}
      <MarketInsights />
    </div>
  );
}
