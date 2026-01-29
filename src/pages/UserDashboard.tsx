import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Activity,
  Pill,
  Stethoscope,
  Apple,
  Heart,
  Droplets,
  Moon,
  Plus,
  TrendingUp,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { format, subDays } from "date-fns";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  
  // Health data states
  const [healthLogs, setHealthLogs] = useState<any[]>([]);
  const [medicineLogs, setMedicineLogs] = useState<any[]>([]);
  const [checkupLogs, setCheckupLogs] = useState<any[]>([]);
  const [foodLogs, setFoodLogs] = useState<any[]>([]);

  // Form states
  const [newHealthLog, setNewHealthLog] = useState({
    weight: "",
    blood_pressure_systolic: "",
    blood_pressure_diastolic: "",
    heart_rate: "",
    sleep_hours: "",
    water_intake: "",
    steps: "",
    mood: "good",
  });

  const [newMedicine, setNewMedicine] = useState({
    medicine_name: "",
    dosage: "",
  });

  const [newFood, setNewFood] = useState({
    meal_type: "breakfast",
    food_items: "",
    calories: "",
  });

  useEffect(() => {
    checkAuthAndFetchData();
  }, []);

  const checkAuthAndFetchData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }

      setUser(user);

      // Fetch all user data
      const [health, medicine, checkup, food] = await Promise.all([
        supabase
          .from("health_logs")
          .select("*")
          .eq("user_id", user.id)
          .order("log_date", { ascending: false })
          .limit(30),
        supabase
          .from("medicine_logs")
          .select("*")
          .eq("user_id", user.id)
          .order("taken_at", { ascending: false })
          .limit(30),
        supabase
          .from("checkup_logs")
          .select("*")
          .eq("user_id", user.id)
          .order("checkup_date", { ascending: false })
          .limit(30),
        supabase
          .from("food_logs")
          .select("*")
          .eq("user_id", user.id)
          .order("logged_at", { ascending: false })
          .limit(30),
      ]);

      setHealthLogs(health.data || []);
      setMedicineLogs(medicine.data || []);
      setCheckupLogs(checkup.data || []);
      setFoodLogs(food.data || []);

    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const addHealthLog = async () => {
    if (!user) return;

    const { error } = await supabase.from("health_logs").upsert({
      user_id: user.id,
      log_date: format(new Date(), "yyyy-MM-dd"),
      weight: newHealthLog.weight ? parseFloat(newHealthLog.weight) : null,
      blood_pressure_systolic: newHealthLog.blood_pressure_systolic ? parseInt(newHealthLog.blood_pressure_systolic) : null,
      blood_pressure_diastolic: newHealthLog.blood_pressure_diastolic ? parseInt(newHealthLog.blood_pressure_diastolic) : null,
      heart_rate: newHealthLog.heart_rate ? parseInt(newHealthLog.heart_rate) : null,
      sleep_hours: newHealthLog.sleep_hours ? parseFloat(newHealthLog.sleep_hours) : null,
      water_intake: newHealthLog.water_intake ? parseInt(newHealthLog.water_intake) : null,
      steps: newHealthLog.steps ? parseInt(newHealthLog.steps) : null,
      mood: newHealthLog.mood,
    });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Health log added!" });
      checkAuthAndFetchData();
      setNewHealthLog({
        weight: "",
        blood_pressure_systolic: "",
        blood_pressure_diastolic: "",
        heart_rate: "",
        sleep_hours: "",
        water_intake: "",
        steps: "",
        mood: "good",
      });
    }
  };

  const addMedicineLog = async () => {
    if (!user || !newMedicine.medicine_name) return;

    const { error } = await supabase.from("medicine_logs").insert({
      user_id: user.id,
      medicine_name: newMedicine.medicine_name,
      dosage: newMedicine.dosage,
    });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Medicine logged!" });
      checkAuthAndFetchData();
      setNewMedicine({ medicine_name: "", dosage: "" });
    }
  };

  const addFoodLog = async () => {
    if (!user || !newFood.food_items) return;

    const { error } = await supabase.from("food_logs").insert({
      user_id: user.id,
      meal_type: newFood.meal_type,
      food_items: newFood.food_items,
      calories: newFood.calories ? parseInt(newFood.calories) : null,
    });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Food logged!" });
      checkAuthAndFetchData();
      setNewFood({ meal_type: "breakfast", food_items: "", calories: "" });
    }
  };

  // Prepare chart data
  const healthChartData = healthLogs.slice(0, 7).reverse().map(log => ({
    date: format(new Date(log.log_date), "MMM dd"),
    weight: log.weight,
    heartRate: log.heart_rate,
    sleep: log.sleep_hours,
  }));

  const mealDistribution = [
    { name: "Breakfast", value: foodLogs.filter(f => f.meal_type === "breakfast").length },
    { name: "Lunch", value: foodLogs.filter(f => f.meal_type === "lunch").length },
    { name: "Dinner", value: foodLogs.filter(f => f.meal_type === "dinner").length },
    { name: "Snacks", value: foodLogs.filter(f => f.meal_type === "snack").length },
  ];

  const medicineFrequency = medicineLogs.reduce((acc: any, log) => {
    acc[log.medicine_name] = (acc[log.medicine_name] || 0) + 1;
    return acc;
  }, {});

  const medicineChartData = Object.entries(medicineFrequency).slice(0, 5).map(([name, count]) => ({
    name: name.substring(0, 10),
    count,
  }));

  const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <TrendingUp className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">My Health Dashboard</h1>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20">
            <CardContent className="p-4 flex items-center gap-3">
              <Activity className="h-8 w-8 text-emerald-500" />
              <div>
                <p className="text-sm text-muted-foreground">Health Logs</p>
                <p className="text-2xl font-bold">{healthLogs.length}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
            <CardContent className="p-4 flex items-center gap-3">
              <Pill className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Medicines</p>
                <p className="text-2xl font-bold">{medicineLogs.length}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-amber-500/20">
            <CardContent className="p-4 flex items-center gap-3">
              <Stethoscope className="h-8 w-8 text-amber-500" />
              <div>
                <p className="text-sm text-muted-foreground">Checkups</p>
                <p className="text-2xl font-bold">{checkupLogs.length}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/20">
            <CardContent className="p-4 flex items-center gap-3">
              <Apple className="h-8 w-8 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Food Logs</p>
                <p className="text-2xl font-bold">{foodLogs.length}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="health">Health</TabsTrigger>
            <TabsTrigger value="medicine">Medicine</TabsTrigger>
            <TabsTrigger value="food">Food</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    Health Trends (7 Days)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={healthChartData.length ? healthChartData : [
                      { date: "Mon", weight: 70, heartRate: 72, sleep: 7 },
                      { date: "Tue", weight: 70.2, heartRate: 75, sleep: 6.5 },
                      { date: "Wed", weight: 69.8, heartRate: 70, sleep: 8 },
                      { date: "Thu", weight: 70, heartRate: 68, sleep: 7.5 },
                      { date: "Fri", weight: 69.5, heartRate: 72, sleep: 7 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="heartRate" 
                        stackId="1"
                        stroke="#ef4444" 
                        fill="#ef444420" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="sleep" 
                        stackId="2"
                        stroke="#3b82f6" 
                        fill="#3b82f620" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Apple className="h-5 w-5 text-green-500" />
                    Meal Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={mealDistribution.some(m => m.value > 0) ? mealDistribution : [
                          { name: "Breakfast", value: 7 },
                          { name: "Lunch", value: 7 },
                          { name: "Dinner", value: 7 },
                          { name: "Snacks", value: 4 },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {mealDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-wrap justify-center gap-4 mt-4">
                    {mealDistribution.map((entry, index) => (
                      <div key={entry.name} className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="text-sm text-muted-foreground">{entry.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Pill className="h-5 w-5 text-blue-500" />
                  Medicine Frequency
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={medicineChartData.length ? medicineChartData : [
                    { name: "Vitamin D", count: 30 },
                    { name: "Paracetamol", count: 5 },
                    { name: "Antacid", count: 10 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Health Tab */}
          <TabsContent value="health" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Log Today's Health Data</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <Label>Weight (kg)</Label>
                    <Input
                      type="number"
                      placeholder="70"
                      value={newHealthLog.weight}
                      onChange={(e) => setNewHealthLog({ ...newHealthLog, weight: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Blood Pressure (Sys)</Label>
                    <Input
                      type="number"
                      placeholder="120"
                      value={newHealthLog.blood_pressure_systolic}
                      onChange={(e) => setNewHealthLog({ ...newHealthLog, blood_pressure_systolic: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Blood Pressure (Dia)</Label>
                    <Input
                      type="number"
                      placeholder="80"
                      value={newHealthLog.blood_pressure_diastolic}
                      onChange={(e) => setNewHealthLog({ ...newHealthLog, blood_pressure_diastolic: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Heart Rate (bpm)</Label>
                    <Input
                      type="number"
                      placeholder="72"
                      value={newHealthLog.heart_rate}
                      onChange={(e) => setNewHealthLog({ ...newHealthLog, heart_rate: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Sleep (hours)</Label>
                    <Input
                      type="number"
                      step="0.5"
                      placeholder="7.5"
                      value={newHealthLog.sleep_hours}
                      onChange={(e) => setNewHealthLog({ ...newHealthLog, sleep_hours: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Water (glasses)</Label>
                    <Input
                      type="number"
                      placeholder="8"
                      value={newHealthLog.water_intake}
                      onChange={(e) => setNewHealthLog({ ...newHealthLog, water_intake: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Steps</Label>
                    <Input
                      type="number"
                      placeholder="10000"
                      value={newHealthLog.steps}
                      onChange={(e) => setNewHealthLog({ ...newHealthLog, steps: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Mood</Label>
                    <select
                      className="w-full h-10 px-3 rounded-md border border-input bg-background"
                      value={newHealthLog.mood}
                      onChange={(e) => setNewHealthLog({ ...newHealthLog, mood: e.target.value })}
                    >
                      <option value="great">Great 😄</option>
                      <option value="good">Good 🙂</option>
                      <option value="okay">Okay 😐</option>
                      <option value="bad">Bad 😞</option>
                    </select>
                  </div>
                </div>
                <Button onClick={addHealthLog} className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Log Health Data
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Health Logs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {healthLogs.slice(0, 5).map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-4">
                        <span className="font-medium">{format(new Date(log.log_date), "MMM dd")}</span>
                        {log.weight && <span className="text-sm text-muted-foreground">{log.weight}kg</span>}
                        {log.heart_rate && <span className="text-sm text-muted-foreground">{log.heart_rate}bpm</span>}
                        {log.sleep_hours && <span className="text-sm text-muted-foreground">{log.sleep_hours}h sleep</span>}
                      </div>
                      <span className="text-lg">{log.mood === "great" ? "😄" : log.mood === "good" ? "🙂" : log.mood === "okay" ? "😐" : "😞"}</span>
                    </div>
                  ))}
                  {healthLogs.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">No health logs yet. Start tracking!</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Medicine Tab */}
          <TabsContent value="medicine" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Log Medicine</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Medicine Name</Label>
                    <Input
                      placeholder="Paracetamol"
                      value={newMedicine.medicine_name}
                      onChange={(e) => setNewMedicine({ ...newMedicine, medicine_name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Dosage</Label>
                    <Input
                      placeholder="500mg"
                      value={newMedicine.dosage}
                      onChange={(e) => setNewMedicine({ ...newMedicine, dosage: e.target.value })}
                    />
                  </div>
                </div>
                <Button onClick={addMedicineLog} className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Log Medicine
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Medicine History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {medicineLogs.slice(0, 10).map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <Pill className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="font-medium">{log.medicine_name}</p>
                          <p className="text-sm text-muted-foreground">{log.dosage}</p>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {format(new Date(log.taken_at), "MMM dd, HH:mm")}
                      </span>
                    </div>
                  ))}
                  {medicineLogs.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">No medicine logs yet.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Food Tab */}
          <TabsContent value="food" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Log Food</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Meal Type</Label>
                    <select
                      className="w-full h-10 px-3 rounded-md border border-input bg-background"
                      value={newFood.meal_type}
                      onChange={(e) => setNewFood({ ...newFood, meal_type: e.target.value })}
                    >
                      <option value="breakfast">Breakfast</option>
                      <option value="lunch">Lunch</option>
                      <option value="dinner">Dinner</option>
                      <option value="snack">Snack</option>
                    </select>
                  </div>
                  <div>
                    <Label>Food Items</Label>
                    <Input
                      placeholder="Rice, Dal, Vegetables..."
                      value={newFood.food_items}
                      onChange={(e) => setNewFood({ ...newFood, food_items: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Calories (optional)</Label>
                    <Input
                      type="number"
                      placeholder="500"
                      value={newFood.calories}
                      onChange={(e) => setNewFood({ ...newFood, calories: e.target.value })}
                    />
                  </div>
                </div>
                <Button onClick={addFoodLog} className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Log Food
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Food History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {foodLogs.slice(0, 10).map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <Apple className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="font-medium capitalize">{log.meal_type}</p>
                          <p className="text-sm text-muted-foreground">{log.food_items}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {log.calories && <p className="font-medium">{log.calories} cal</p>}
                        <span className="text-sm text-muted-foreground">
                          {format(new Date(log.logged_at), "MMM dd")}
                        </span>
                      </div>
                    </div>
                  ))}
                  {foodLogs.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">No food logs yet.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default UserDashboard;