import { useState, useCallback, useEffect } from "react";
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
  Clock,
  Loader2,
  Trash2,
  Star,
  Download,
  X
} from "lucide-react";
import { cvService } from "@/services/cvService";
import type { CV } from "@/types/api";
import { useToast } from "@/hooks/use-toast";

export default function CVAnalysis() {
  const [cvs, setCvs] = useState<CV[]>([]);
  const [selectedCV, setSelectedCV] = useState<CV | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  // Fetch CVs on mount
  useEffect(() => {
    fetchCVs();
  }, []);

  const fetchCVs = async () => {
    try {
      const data = await cvService.getAllCVs();
      setCvs(data);
      const primary = data.find(cv => cv.isPrimary) || data[0];
      if (primary) setSelectedCV(primary);
    } catch (error: any) {
      console.error("Failed to fetch CVs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    const validation = cvService.validateFile(file);
    if (!validation.valid) {
      toast({
        title: "Invalid file",
        description: validation.error,
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const newCV = await cvService.uploadCV(file, setUploadProgress);
      setCvs(prev => [newCV, ...prev]);
      setSelectedCV(newCV);
      toast({
        title: "CV uploaded successfully",
        description: `${file.name} has been analyzed.`,
      });
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload CV",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
    e.target.value = "";
  };

  const handleSetPrimary = async (cvId: string) => {
    try {
      await cvService.setPrimaryCV(cvId);
      setCvs(prev => prev.map(cv => ({ ...cv, isPrimary: cv.id === cvId })));
      toast({ title: "Primary CV updated" });
    } catch (error: any) {
      toast({
        title: "Failed to set primary CV",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteCV = async (cvId: string) => {
    try {
      await cvService.deleteCV(cvId);
      setCvs(prev => prev.filter(cv => cv.id !== cvId));
      if (selectedCV?.id === cvId) {
        setSelectedCV(cvs.find(cv => cv.id !== cvId) || null);
      }
      toast({ title: "CV deleted" });
    } catch (error: any) {
      toast({
        title: "Failed to delete CV",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDownloadCV = async (cv: CV) => {
    try {
      const blob = await cvService.downloadCV(cv.id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = cv.filename;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      toast({
        title: "Download failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-metric-excellent";
    if (score >= 60) return "text-metric-good";
    if (score >= 40) return "text-metric-average";
    return "text-metric-poor";
  };

  const getScoreBreakdown = (cv: CV) => {
    const analysis = cv.analysisData;
    if (!analysis) return [];
    
    // Generate mock breakdown based on ATS score
    const atsScore = analysis.atsScore || 70;
    return [
      { name: "ATS Compatibility", score: atsScore, color: "bg-primary" },
      { name: "Content Quality", score: Math.min(100, atsScore + 10), color: "bg-primary" },
      { name: "Keywords Match", score: Math.max(0, atsScore - 5), color: "bg-primary" },
      { name: "Format & Structure", score: Math.min(100, atsScore + 5), color: "bg-primary" },
    ];
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

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
        <div className="relative">
          <input
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileInput}
            className="hidden"
            id="cv-upload"
            disabled={uploading}
          />
          <Button asChild disabled={uploading}>
            <label htmlFor="cv-upload" className="cursor-pointer">
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading {uploadProgress}%
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload New CV
                </>
              )}
            </label>
          </Button>
        </div>
      </div>

      {/* Upload Drop Zone */}
      {cvs.length === 0 && (
        <Card
          className={`border-2 border-dashed transition-colors ${
            isDragging ? "border-primary bg-primary/5" : "border-border"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-foreground">
              Upload your CV
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Drag and drop a PDF or DOCX file, or click to browse
            </p>
            <Badge variant="secondary" className="mt-4">
              PDF, DOCX up to 10MB
            </Badge>
          </CardContent>
        </Card>
      )}

      {/* CV List */}
      {cvs.length > 0 && (
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Card className="border-border bg-card shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Your CVs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {cvs.map((cv) => (
                  <div
                    key={cv.id}
                    onClick={() => setSelectedCV(cv)}
                    className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors ${
                      selectedCV?.id === cv.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/30"
                    }`}
                  >
                    <FileText className="h-5 w-5 text-primary" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {cv.filename}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(cv.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      {cv.isPrimary && (
                        <Star className="h-4 w-4 text-primary fill-primary" />
                      )}
                      {cv.analysisData?.atsScore && (
                        <span className={`text-sm font-mono font-bold ${getScoreColor(cv.analysisData.atsScore)}`}>
                          {cv.analysisData.atsScore}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Selected CV Details */}
          <div className="lg:col-span-2">
            {selectedCV && (
              <>
                {/* Current CV Card */}
                <Card className="border-border bg-card shadow-card mb-6">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground">{selectedCV.filename}</h3>
                          <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                            <span>Uploaded {new Date(selectedCV.createdAt).toLocaleDateString()}</span>
                            <span>•</span>
                            {selectedCV.isPrimary ? (
                              <Badge variant="secondary" className="text-xs">Primary CV</Badge>
                            ) : (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 px-2 text-xs"
                                onClick={() => handleSetPrimary(selectedCV.id)}
                              >
                                Set as Primary
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right mr-4">
                          <div className="flex items-center gap-2">
                            <span className={`font-mono text-3xl font-bold ${getScoreColor(selectedCV.analysisData?.atsScore || 0)}`}>
                              {selectedCV.analysisData?.atsScore || "N/A"}
                            </span>
                            {selectedCV.analysisData?.atsScore && (
                              <span className="text-sm text-muted-foreground">/100</span>
                            )}
                          </div>
                          <p className="mt-1 flex items-center gap-1 text-xs text-metric-excellent">
                            <TrendingUp className="h-3 w-3" />
                            ATS Score
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDownloadCV(selectedCV)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDeleteCV(selectedCV.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Analysis Tabs */}
                <Tabs defaultValue="overview" className="space-y-6">
                  <TabsList className="bg-muted/50">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="parsed">Parsed Data</TabsTrigger>
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
                          {getScoreBreakdown(selectedCV).map((item) => (
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

                      {/* Skills Extracted */}
                      <Card className="border-border bg-card shadow-card">
                        <CardHeader>
                          <CardTitle className="text-sm font-medium text-muted-foreground">
                            Skills Detected
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {selectedCV.parsedData?.skills?.map((skill, i) => (
                              <Badge key={i} variant="secondary">
                                {skill}
                              </Badge>
                            )) || (
                              <p className="text-sm text-muted-foreground">No skills detected</p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Keywords Analysis */}
                    {selectedCV.analysisData && (
                      <Card className="border-border bg-card shadow-card">
                        <CardHeader>
                          <CardTitle className="text-sm font-medium text-muted-foreground">
                            Keyword Analysis
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid gap-4 md:grid-cols-2">
                            <div>
                              <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-metric-excellent" />
                                Matched Keywords
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {selectedCV.analysisData.keywordMatches?.map((kw, i) => (
                                  <Badge key={i} className="bg-metric-excellent/10 text-metric-excellent border-0">
                                    {kw}
                                  </Badge>
                                )) || <span className="text-sm text-muted-foreground">None</span>}
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4 text-metric-average" />
                                Missing Keywords
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {selectedCV.analysisData.missingKeywords?.map((kw, i) => (
                                  <Badge key={i} variant="outline" className="text-metric-average border-metric-average/30">
                                    {kw}
                                  </Badge>
                                )) || <span className="text-sm text-muted-foreground">None</span>}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>

                  <TabsContent value="parsed" className="space-y-6">
                    {selectedCV.parsedData ? (
                      <>
                        {/* Personal Info */}
                        {selectedCV.parsedData.personal && (
                          <Card className="border-border bg-card shadow-card">
                            <CardHeader>
                              <CardTitle className="text-sm font-medium text-muted-foreground">
                                Personal Information
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <dl className="grid gap-3 md:grid-cols-2">
                                {Object.entries(selectedCV.parsedData.personal).map(([key, value]) => (
                                  value && (
                                    <div key={key}>
                                      <dt className="text-xs text-muted-foreground capitalize">{key}</dt>
                                      <dd className="text-sm text-foreground">{value}</dd>
                                    </div>
                                  )
                                ))}
                              </dl>
                            </CardContent>
                          </Card>
                        )}

                        {/* Experience */}
                        {selectedCV.parsedData.experience && selectedCV.parsedData.experience.length > 0 && (
                          <Card className="border-border bg-card shadow-card">
                            <CardHeader>
                              <CardTitle className="text-sm font-medium text-muted-foreground">
                                Experience
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              {selectedCV.parsedData.experience.map((exp, i) => (
                                <div key={i} className="border-l-2 border-primary/30 pl-4">
                                  <h4 className="font-medium text-foreground">{exp.title}</h4>
                                  <p className="text-sm text-primary">{exp.company}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                                    {exp.location && ` · ${exp.location}`}
                                  </p>
                                  {exp.responsibilities && (
                                    <ul className="mt-2 text-sm text-muted-foreground list-disc list-inside">
                                      {exp.responsibilities.slice(0, 3).map((r, j) => (
                                        <li key={j}>{r}</li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              ))}
                            </CardContent>
                          </Card>
                        )}

                        {/* Education */}
                        {selectedCV.parsedData.education && selectedCV.parsedData.education.length > 0 && (
                          <Card className="border-border bg-card shadow-card">
                            <CardHeader>
                              <CardTitle className="text-sm font-medium text-muted-foreground">
                                Education
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              {selectedCV.parsedData.education.map((edu, i) => (
                                <div key={i} className="border-l-2 border-primary/30 pl-4">
                                  <h4 className="font-medium text-foreground">{edu.degree} {edu.field && `in ${edu.field}`}</h4>
                                  <p className="text-sm text-primary">{edu.institution}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {edu.startDate} - {edu.endDate}
                                  </p>
                                </div>
                              ))}
                            </CardContent>
                          </Card>
                        )}
                      </>
                    ) : (
                      <Card className="border-border bg-card shadow-card">
                        <CardContent className="py-12 text-center">
                          <p className="text-muted-foreground">No parsed data available for this CV</p>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>

                  <TabsContent value="recommendations" className="space-y-6">
                    <Card className="border-border bg-card shadow-card">
                      <CardHeader>
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                          AI Recommendations
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {selectedCV.analysisData?.recommendations?.length ? (
                          selectedCV.analysisData.recommendations.map((rec, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-4 rounded-lg border border-border p-4 hover:border-primary/30 transition-colors"
                            >
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 font-mono text-sm font-bold text-primary">
                                {i + 1}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm text-foreground">{rec}</p>
                                <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Zap className="h-3 w-3" />
                                    Improves ATS score
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-center text-muted-foreground py-8">
                            No recommendations available. Upload a CV to get AI-powered insights.
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
