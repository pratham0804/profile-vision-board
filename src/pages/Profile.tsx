
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';
import { 
  User, 
  Mail, 
  Globe, 
  Github, 
  Linkedin, 
  Twitter, 
  MapPin, 
  Camera, 
  Plus, 
  Edit3, 
  Trash2, 
  Upload, 
  Award, 
  Target, 
  Settings,
  Eye,
  EyeOff,
  Save,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface Skill {
  id: string;
  skillName: string;
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category: 'Technical' | 'Soft Skills' | 'Tools' | 'Frameworks' | 'Languages' | 'Methodologies';
  status: 'Not Started' | 'In Progress' | 'Completed';
  startDate: string;
  completionDate: string;
  notes: string;
  dateAdded: string;
}

interface UserProfile {
  username: string;
  email: string;
  targetRole: string;
  bio: string;
  location: string;
  profilePicture: string;
  website: string;
  linkedin: string;
  github: string;
  twitter: string;
  experienceLevel: string;
  preferredWorkType: string;
  availability: string;
  salaryRange: string;
  careerGoals: string;
  showSalaryPublic: boolean;
  profileVisibility: string;
  showContactInfo: boolean;
  emailNotifications: boolean;
  skillUpdateNotifications: boolean;
  marketingEmails: boolean;
  showAchievementsPublic: boolean;
  existingSkills: Skill[];
}

const Profile = () => {
  const [user, setUser] = useState<UserProfile>({
    username: 'john_doe',
    email: 'john.doe@example.com',
    targetRole: '',
    bio: '',
    location: '',
    profilePicture: '',
    website: '',
    linkedin: '',
    github: '',
    twitter: '',
    experienceLevel: '',
    preferredWorkType: '',
    availability: '',
    salaryRange: '',
    careerGoals: '',
    showSalaryPublic: false,
    profileVisibility: 'Public',
    showContactInfo: true,
    emailNotifications: true,
    skillUpdateNotifications: true,
    marketingEmails: false,
    showAchievementsPublic: true,
    existingSkills: []
  });

  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showSkillDialog, setShowSkillDialog] = useState(false);
  const [showResumeDialog, setShowResumeDialog] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [extractedSkills, setExtractedSkills] = useState<Skill[]>([]);
  
  const [newSkill, setNewSkill] = useState({
    skillName: '',
    proficiency: 'Beginner' as const,
    category: 'Technical' as const
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const proficiencyColors = {
    'Beginner': 'bg-blue-100 text-blue-800 border-blue-200',
    'Intermediate': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Advanced': 'bg-green-100 text-green-800 border-green-200',
    'Expert': 'bg-purple-100 text-purple-800 border-purple-200'
  };

  const handleInputChange = (field: keyof UserProfile, value: any) => {
    setUser(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    setEditMode(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleAddSkill = () => {
    if (!newSkill.skillName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a skill name.",
        variant: "destructive"
      });
      return;
    }

    const skill: Skill = {
      id: Date.now().toString(),
      skillName: newSkill.skillName,
      proficiency: newSkill.proficiency,
      category: newSkill.category,
      status: 'Not Started',
      startDate: '',
      completionDate: '',
      notes: '',
      dateAdded: new Date().toISOString()
    };

    setUser(prev => ({
      ...prev,
      existingSkills: [...prev.existingSkills, skill]
    }));

    setNewSkill({ skillName: '', proficiency: 'Beginner', category: 'Technical' });
    setShowSkillDialog(false);
    
    toast({
      title: "Skill Added",
      description: `${skill.skillName} has been added to your profile.`,
    });
  };

  const handleDeleteSkill = (skillId: string) => {
    setUser(prev => ({
      ...prev,
      existingSkills: prev.existingSkills.filter(skill => skill.id !== skillId)
    }));
    
    toast({
      title: "Skill Removed",
      description: "The skill has been removed from your profile.",
    });
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          
          // Simulate extracted skills
          const mockExtractedSkills: Skill[] = [
            {
              id: 'extracted1',
              skillName: 'React',
              proficiency: 'Advanced',
              category: 'Frameworks',
              status: 'Completed',
              startDate: '',
              completionDate: '',
              notes: 'Extracted from resume',
              dateAdded: new Date().toISOString()
            },
            {
              id: 'extracted2',
              skillName: 'TypeScript',
              proficiency: 'Intermediate',
              category: 'Languages',
              status: 'In Progress',
              startDate: '',
              completionDate: '',
              notes: 'Extracted from resume',
              dateAdded: new Date().toISOString()
            }
          ];
          
          setExtractedSkills(mockExtractedSkills);
          
          toast({
            title: "Resume Analyzed",
            description: `Found ${mockExtractedSkills.length} skills in your resume.`,
          });
          
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const addExtractedSkills = () => {
    setUser(prev => ({
      ...prev,
      existingSkills: [...prev.existingSkills, ...extractedSkills]
    }));
    
    setExtractedSkills([]);
    setShowResumeDialog(false);
    
    toast({
      title: "Skills Added",
      description: `${extractedSkills.length} skills have been added to your profile.`,
    });
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const getSkillsByCategory = () => {
    const categories: Record<string, Skill[]> = {};
    user.existingSkills.forEach(skill => {
      if (!categories[skill.category]) {
        categories[skill.category] = [];
      }
      categories[skill.category].push(skill);
    });
    return categories;
  };

  const getProfileCompletion = () => {
    const fields = [
      user.targetRole, user.bio, user.location, user.experienceLevel,
      user.preferredWorkType, user.availability, user.careerGoals
    ];
    const completedFields = fields.filter(field => field && field.trim() !== '').length;
    return Math.round((completedFields / fields.length) * 100);
  };

  const getAchievements = () => [
    {
      id: 'skills_master',
      title: 'Skills Master',
      description: 'Add 10+ skills to your profile',
      unlocked: user.existingSkills.length >= 10,
      progress: Math.min((user.existingSkills.length / 10) * 100, 100)
    },
    {
      id: 'goal_setter',
      title: 'Goal Setter',
      description: 'Set your career goals',
      unlocked: user.careerGoals.trim() !== '',
      progress: user.careerGoals.trim() !== '' ? 100 : 0
    },
    {
      id: 'profile_complete',
      title: 'Profile Complete',
      description: 'Complete your profile',
      unlocked: getProfileCompletion() >= 80,
      progress: getProfileCompletion()
    },
    {
      id: 'resume_optimizer',
      title: 'Resume Optimizer',
      description: 'Upload and analyze your resume',
      unlocked: false,
      progress: 0
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <Card className="mb-8 overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500"></div>
          <CardContent className="relative -mt-16 pb-6">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                  <AvatarImage src={user.profilePicture} />
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
                    {user.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera className="w-4 h-4" />
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const url = URL.createObjectURL(file);
                      handleInputChange('profilePicture', url);
                    }
                  }}
                />
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{user.username}</h1>
                    <p className="text-lg text-gray-600">{user.targetRole || 'Add your target role'}</p>
                    <p className="text-gray-500 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {user.location || 'Add your location'}
                    </p>
                  </div>
                  
                  <div className="flex gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-indigo-600">{user.existingSkills.length}</div>
                      <div className="text-sm text-gray-500">Skills</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-emerald-600">{getProfileCompletion()}%</div>
                      <div className="text-sm text-gray-500">Complete</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant={editMode ? "default" : "outline"}
                    onClick={editMode ? handleSaveProfile : () => setEditMode(true)}
                    className="flex items-center gap-2"
                  >
                    {editMode ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                    {editMode ? 'Save Profile' : 'Edit Profile'}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white rounded-lg shadow-sm">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Skills
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Preferences
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              Achievements
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={user.username}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={user.email}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="targetRole">Target Role</Label>
                    <Input
                      id="targetRole"
                      value={user.targetRole}
                      onChange={(e) => handleInputChange('targetRole', e.target.value)}
                      disabled={!editMode}
                      placeholder="e.g., Full Stack Developer"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={user.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      disabled={!editMode}
                      placeholder="e.g., San Francisco, CA"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={user.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    disabled={!editMode}
                    placeholder="Tell us about yourself..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardHeader>
                <CardTitle>Social Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="website" className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Website
                    </Label>
                    <Input
                      id="website"
                      value={user.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      disabled={!editMode}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="linkedin" className="flex items-center gap-2">
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </Label>
                    <Input
                      id="linkedin"
                      value={user.linkedin}
                      onChange={(e) => handleInputChange('linkedin', e.target.value)}
                      disabled={!editMode}
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                  <div>
                    <Label htmlFor="github" className="flex items-center gap-2">
                      <Github className="w-4 h-4" />
                      GitHub
                    </Label>
                    <Input
                      id="github"
                      value={user.github}
                      onChange={(e) => handleInputChange('github', e.target.value)}
                      disabled={!editMode}
                      placeholder="https://github.com/username"
                    />
                  </div>
                  <div>
                    <Label htmlFor="twitter" className="flex items-center gap-2">
                      <Twitter className="w-4 h-4" />
                      Twitter
                    </Label>
                    <Input
                      id="twitter"
                      value={user.twitter}
                      onChange={(e) => handleInputChange('twitter', e.target.value)}
                      disabled={!editMode}
                      placeholder="https://twitter.com/username"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Career Information */}
            <Card>
              <CardHeader>
                <CardTitle>Career Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="experienceLevel">Experience Level</Label>
                    <Select
                      value={user.experienceLevel}
                      onValueChange={(value) => handleInputChange('experienceLevel', value)}
                      disabled={!editMode}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Entry Level">Entry Level</SelectItem>
                        <SelectItem value="1-2 years">1-2 years</SelectItem>
                        <SelectItem value="3-5 years">3-5 years</SelectItem>
                        <SelectItem value="5-10 years">5-10 years</SelectItem>
                        <SelectItem value="10+ years">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="preferredWorkType">Preferred Work Type</Label>
                    <Select
                      value={user.preferredWorkType}
                      onValueChange={(value) => handleInputChange('preferredWorkType', value)}
                      disabled={!editMode}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select work type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Freelance">Freelance</SelectItem>
                        <SelectItem value="Remote Only">Remote Only</SelectItem>
                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="availability">Availability</Label>
                    <Select
                      value={user.availability}
                      onValueChange={(value) => handleInputChange('availability', value)}
                      disabled={!editMode}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Available">Available</SelectItem>
                        <SelectItem value="Open to Opportunities">Open to Opportunities</SelectItem>
                        <SelectItem value="Not Looking">Not Looking</SelectItem>
                        <SelectItem value="Busy">Busy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="salaryRange">Salary Range</Label>
                    <Input
                      id="salaryRange"
                      value={user.salaryRange}
                      onChange={(e) => handleInputChange('salaryRange', e.target.value)}
                      disabled={!editMode}
                      placeholder="e.g., $80k - $120k"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="careerGoals">Career Goals</Label>
                  <Textarea
                    id="careerGoals"
                    value={user.careerGoals}
                    onChange={(e) => handleInputChange('careerGoals', e.target.value)}
                    disabled={!editMode}
                    placeholder="Describe your career goals..."
                    rows={3}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="showSalaryPublic"
                    checked={user.showSalaryPublic}
                    onCheckedChange={(checked) => handleInputChange('showSalaryPublic', checked)}
                    disabled={!editMode}
                  />
                  <Label htmlFor="showSalaryPublic">Show salary range publicly</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-6">
            {/* Skills Dashboard */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Skills Dashboard</CardTitle>
                <div className="flex gap-2">
                  <Dialog open={showResumeDialog} onOpenChange={setShowResumeDialog}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Resume
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Upload Resume for Skill Analysis</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        {!isUploading && extractedSkills.length === 0 && (
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                            <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                            <p className="text-gray-600 mb-4">Upload your resume to extract skills automatically</p>
                            <input
                              type="file"
                              accept=".txt,.pdf,.doc,.docx"
                              onChange={handleFileUpload}
                              className="hidden"
                              id="resume-upload"
                            />
                            <Button asChild>
                              <label htmlFor="resume-upload" className="cursor-pointer">
                                Choose File
                              </label>
                            </Button>
                          </div>
                        )}
                        
                        {isUploading && (
                          <div className="space-y-4">
                            <div className="text-center">
                              <p className="text-gray-600 mb-2">Analyzing your resume...</p>
                              <Progress value={uploadProgress} className="w-full" />
                            </div>
                          </div>
                        )}
                        
                        {extractedSkills.length > 0 && (
                          <div className="space-y-4">
                            <h3 className="font-semibold">Extracted Skills:</h3>
                            <div className="space-y-2 max-h-60 overflow-y-auto">
                              {extractedSkills.map((skill) => (
                                <div key={skill.id} className="flex items-center justify-between p-2 border rounded">
                                  <div>
                                    <span className="font-medium">{skill.skillName}</span>
                                    <Badge variant="secondary" className={`ml-2 ${proficiencyColors[skill.proficiency]}`}>
                                      {skill.proficiency}
                                    </Badge>
                                  </div>
                                  <Badge variant="outline">{skill.category}</Badge>
                                </div>
                              ))}
                            </div>
                            <Button onClick={addExtractedSkills} className="w-full">
                              Add All Skills to Profile
                            </Button>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Dialog open={showSkillDialog} onOpenChange={setShowSkillDialog}>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Skill
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Skill</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="skillName">Skill Name</Label>
                          <Input
                            id="skillName"
                            value={newSkill.skillName}
                            onChange={(e) => setNewSkill(prev => ({ ...prev, skillName: e.target.value }))}
                            placeholder="e.g., React, Python, Project Management"
                          />
                        </div>
                        <div>
                          <Label htmlFor="proficiency">Proficiency Level</Label>
                          <Select
                            value={newSkill.proficiency}
                            onValueChange={(value: any) => setNewSkill(prev => ({ ...prev, proficiency: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Beginner">Beginner</SelectItem>
                              <SelectItem value="Intermediate">Intermediate</SelectItem>
                              <SelectItem value="Advanced">Advanced</SelectItem>
                              <SelectItem value="Expert">Expert</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="category">Category</Label>
                          <Select
                            value={newSkill.category}
                            onValueChange={(value: any) => setNewSkill(prev => ({ ...prev, category: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Technical">Technical</SelectItem>
                              <SelectItem value="Soft Skills">Soft Skills</SelectItem>
                              <SelectItem value="Tools">Tools</SelectItem>
                              <SelectItem value="Frameworks">Frameworks</SelectItem>
                              <SelectItem value="Languages">Languages</SelectItem>
                              <SelectItem value="Methodologies">Methodologies</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button onClick={handleAddSkill} className="w-full">
                          Add Skill
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-indigo-50 rounded-lg">
                    <div className="text-2xl font-bold text-indigo-600">{user.existingSkills.length}</div>
                    <div className="text-sm text-gray-600">Total Skills</div>
                  </div>
                  <div className="text-center p-4 bg-emerald-50 rounded-lg">
                    <div className="text-2xl font-bold text-emerald-600">
                      {user.existingSkills.filter(s => s.proficiency === 'Expert' || s.proficiency === 'Advanced').length}
                    </div>
                    <div className="text-sm text-gray-600">Advanced+ Skills</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {Object.keys(getSkillsByCategory()).length}
                    </div>
                    <div className="text-sm text-gray-600">Categories</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills by Category */}
            <Card>
              <CardHeader>
                <CardTitle>Skills by Category</CardTitle>
              </CardHeader>
              <CardContent>
                {user.existingSkills.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Target className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No skills added yet. Start by adding your first skill!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {Object.entries(getSkillsByCategory()).map(([category, skills]) => (
                      <div key={category} className="border rounded-lg">
                        <div
                          className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                          onClick={() => toggleCategory(category)}
                        >
                          <div className="flex items-center gap-2">
                            {expandedCategories[category] ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                            <h3 className="font-semibold">{category}</h3>
                            <Badge variant="secondary">{skills.length}</Badge>
                          </div>
                        </div>
                        
                        {expandedCategories[category] && (
                          <div className="px-4 pb-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {skills.map((skill) => (
                                <div
                                  key={skill.id}
                                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">{skill.skillName}</span>
                                    <Badge variant="secondary" className={proficiencyColors[skill.proficiency]}>
                                      {skill.proficiency}
                                    </Badge>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDeleteSkill(skill.id)}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="space-y-6">
            {/* Work Preferences */}
            <Card>
              <CardHeader>
                <CardTitle>Work Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="experienceLevel">Experience Level</Label>
                    <Select
                      value={user.experienceLevel}
                      onValueChange={(value) => handleInputChange('experienceLevel', value)}
                      disabled={!editMode}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Entry Level">Entry Level</SelectItem>
                        <SelectItem value="1-2 years">1-2 years</SelectItem>
                        <SelectItem value="3-5 years">3-5 years</SelectItem>
                        <SelectItem value="5-10 years">5-10 years</SelectItem>
                        <SelectItem value="10+ years">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="preferredWorkType">Preferred Work Type</Label>
                    <Select
                      value={user.preferredWorkType}
                      onValueChange={(value) => handleInputChange('preferredWorkType', value)}
                      disabled={!editMode}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select work type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Freelance">Freelance</SelectItem>
                        <SelectItem value="Remote Only">Remote Only</SelectItem>
                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="availability">Availability</Label>
                    <Select
                      value={user.availability}
                      onValueChange={(value) => handleInputChange('availability', value)}
                      disabled={!editMode}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Available">Available</SelectItem>
                        <SelectItem value="Open to Opportunities">Open to Opportunities</SelectItem>
                        <SelectItem value="Not Looking">Not Looking</SelectItem>
                        <SelectItem value="Busy">Busy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="salaryRange">Salary Range</Label>
                    <Input
                      id="salaryRange"
                      value={user.salaryRange}
                      onChange={(e) => handleInputChange('salaryRange', e.target.value)}
                      disabled={!editMode}
                      placeholder="e.g., $80k - $120k"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="showSalaryPublic"
                    checked={user.showSalaryPublic}
                    onCheckedChange={(checked) => handleInputChange('showSalaryPublic', checked)}
                    disabled={!editMode}
                  />
                  <Label htmlFor="showSalaryPublic">Show salary range publicly</Label>
                </div>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="profileVisibility">Profile Visibility</Label>
                  <Select
                    value={user.profileVisibility}
                    onValueChange={(value) => handleInputChange('profileVisibility', value)}
                    disabled={!editMode}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Public">🌍 Public</SelectItem>
                      <SelectItem value="Limited">👥 Limited</SelectItem>
                      <SelectItem value="Private">🔒 Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="showContactInfo"
                    checked={user.showContactInfo}
                    onCheckedChange={(checked) => handleInputChange('showContactInfo', checked)}
                    disabled={!editMode}
                  />
                  <Label htmlFor="showContactInfo">Show contact information</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="showAchievementsPublic"
                    checked={user.showAchievementsPublic}
                    onCheckedChange={(checked) => handleInputChange('showAchievementsPublic', checked)}
                    disabled={!editMode}
                  />
                  <Label htmlFor="showAchievementsPublic">Show achievements publicly</Label>
                </div>
              </CardContent>
            </Card>

            {/* Notification Preferences */}
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="emailNotifications"
                    checked={user.emailNotifications}
                    onCheckedChange={(checked) => handleInputChange('emailNotifications', checked)}
                    disabled={!editMode}
                  />
                  <Label htmlFor="emailNotifications">Email notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="skillUpdateNotifications"
                    checked={user.skillUpdateNotifications}
                    onCheckedChange={(checked) => handleInputChange('skillUpdateNotifications', checked)}
                    disabled={!editMode}
                  />
                  <Label htmlFor="skillUpdateNotifications">Skill update notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="marketingEmails"
                    checked={user.marketingEmails}
                    onCheckedChange={(checked) => handleInputChange('marketingEmails', checked)}
                    disabled={!editMode}
                  />
                  <Label htmlFor="marketingEmails">Marketing emails</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {getAchievements().map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-6 rounded-lg border-2 transition-all ${
                        achievement.unlocked
                          ? 'border-emerald-200 bg-emerald-50'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`p-3 rounded-full ${
                            achievement.unlocked
                              ? 'bg-emerald-100 text-emerald-600'
                              : 'bg-gray-100 text-gray-400'
                          }`}
                        >
                          <Award className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-semibold mb-1 ${
                            achievement.unlocked ? 'text-emerald-900' : 'text-gray-600'
                          }`}>
                            {achievement.title}
                          </h3>
                          <p className={`text-sm mb-3 ${
                            achievement.unlocked ? 'text-emerald-700' : 'text-gray-500'
                          }`}>
                            {achievement.description}
                          </p>
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span>Progress</span>
                              <span>{Math.round(achievement.progress)}%</span>
                            </div>
                            <Progress
                              value={achievement.progress}
                              className={`h-2 ${
                                achievement.unlocked ? 'bg-emerald-100' : 'bg-gray-200'
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
