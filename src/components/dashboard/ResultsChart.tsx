import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, Clock, Target, Zap } from 'lucide-react';

const performanceData = [
  { name: 'Mon', success: 94, failed: 6, duration: 8.2 },
  { name: 'Tue', success: 98, failed: 2, duration: 7.8 },
  { name: 'Wed', success: 92, failed: 8, duration: 9.1 },
  { name: 'Thu', success: 96, failed: 4, duration: 8.5 },
  { name: 'Fri', success: 89, failed: 11, duration: 10.2 },
  { name: 'Sat', success: 95, failed: 5, duration: 8.0 },
  { name: 'Sun', success: 97, failed: 3, duration: 7.5 }
];

const agentDistribution = [
  { name: 'Test Generator', value: 35, color: 'hsl(var(--primary))' },
  { name: 'Selenium Runner', value: 25, color: 'hsl(var(--secondary))' },
  { name: 'Verification', value: 20, color: 'hsl(var(--success))' },
  { name: 'Performance', value: 12, color: 'hsl(var(--warning))' },
  { name: 'Integration', value: 8, color: 'hsl(var(--primary-glow))' }
];

const recentTests = [
  { time: '14:32', agent: 'Test Generator', status: 'success', duration: '2.1s' },
  { time: '14:28', agent: 'Selenium Runner', status: 'success', duration: '45.3s' },
  { time: '14:25', agent: 'Verification', status: 'warning', duration: '12.7s' },
  { time: '14:20', agent: 'Performance', status: 'success', duration: '8.9s' },
  { time: '14:15', agent: 'Integration', status: 'success', duration: '15.2s' }
];

export const ResultsChart = () => {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-light border-success/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-success to-success-glow">
                <Target className="w-4 h-4 text-success-foreground" />
              </div>
              <div>
                <div className="text-2xl font-bold text-success">94.2%</div>
                <div className="text-xs text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-light border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-primary to-primary-glow">
                <Zap className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">1,247</div>
                <div className="text-xs text-muted-foreground">Tests Today</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-light border-secondary/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-secondary to-secondary-glow">
                <Clock className="w-4 h-4 text-secondary-foreground" />
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary">8.5min</div>
                <div className="text-xs text-muted-foreground">Avg Duration</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-light border-warning/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-warning to-warning-glow">
                <TrendingUp className="w-4 h-4 text-warning-foreground" />
              </div>
              <div>
                <div className="text-2xl font-bold text-warning">+18%</div>
                <div className="text-xs text-muted-foreground">This Month</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="text-gradient-primary">Analytics Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="performance" className="space-y-4">
            <TabsList className="glass-light border border-glass-border/20">
              <TabsTrigger value="performance" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Performance
              </TabsTrigger>
              <TabsTrigger value="distribution" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Distribution
              </TabsTrigger>
              <TabsTrigger value="recent" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Recent Tests
              </TabsTrigger>
            </TabsList>

            <TabsContent value="performance" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass-light rounded-lg p-4">
                  <h3 className="font-semibold mb-4 text-gradient-primary">Success Rate Trend</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--glass-border))" />
                      <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--glass))', 
                          border: '1px solid hsl(var(--glass-border))',
                          backdropFilter: 'blur(20px)',
                          borderRadius: '8px'
                        }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="success" 
                        stroke="hsl(var(--success))" 
                        strokeWidth={3}
                        dot={{ fill: 'hsl(var(--success))', r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="glass-light rounded-lg p-4">
                  <h3 className="font-semibold mb-4 text-gradient-primary">Average Duration</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--glass-border))" />
                      <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--glass))', 
                          border: '1px solid hsl(var(--glass-border))',
                          backdropFilter: 'blur(20px)',
                          borderRadius: '8px'
                        }} 
                      />
                      <Bar 
                        dataKey="duration" 
                        fill="hsl(var(--secondary))" 
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="distribution">
              <div className="flex justify-center">
                <div className="glass-light rounded-lg p-6 w-full max-w-md">
                  <h3 className="font-semibold mb-4 text-center text-gradient-primary">Agent Usage Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={agentDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {agentDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--glass))', 
                          border: '1px solid hsl(var(--glass-border))',
                          backdropFilter: 'blur(20px)',
                          borderRadius: '8px'
                        }} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="recent">
              <div className="glass-light rounded-lg p-4">
                <h3 className="font-semibold mb-4 text-gradient-primary">Recent Test Executions</h3>
                <div className="space-y-3">
                  {recentTests.map((test, index) => (
                    <div key={index} className="flex items-center justify-between p-3 glass rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          test.status === 'success' ? 'bg-success' : 
                          test.status === 'warning' ? 'bg-warning' : 'bg-destructive'
                        }`} />
                        <div>
                          <div className="font-medium text-sm">{test.agent}</div>
                          <div className="text-xs text-muted-foreground">{test.time}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{test.duration}</div>
                        <div className={`text-xs capitalize ${
                          test.status === 'success' ? 'text-success' : 
                          test.status === 'warning' ? 'text-warning' : 'text-destructive'
                        }`}>
                          {test.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};