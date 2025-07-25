import { useState } from 'react';
import { Save, User, Bell, Shield, Database, Palette } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

export const SettingsPanel = () => {
  const [settings, setSettings] = useState({
    username: 'admin',
    email: 'admin@multiagent.dev',
    notifications: true,
    autoRun: false,
    retryAttempts: '3',
    timeout: '300',
    logLevel: 'info',
    darkMode: true,
    compactView: false,
    showMetrics: true,
    dataRetention: '30'
  });

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6 max-h-[80vh] overflow-y-auto">
      {/* User Profile */}
      <Card className="glass-light">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gradient-primary">
            <User className="w-5 h-5" />
            User Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={settings.username}
                onChange={(e) => updateSetting('username', e.target.value)}
                className="glass"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={settings.email}
                onChange={(e) => updateSetting('email', e.target.value)}
                className="glass"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Role</Label>
              <Badge variant="outline" className="ml-2">Administrator</Badge>
            </div>
            <Button variant="outline" size="sm">Change Password</Button>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="glass-light">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gradient-secondary">
            <Bell className="w-5 h-5" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Email Notifications</Label>
              <p className="text-xs text-muted-foreground">Receive email alerts for agent failures</p>
            </div>
            <Switch
              checked={settings.notifications}
              onCheckedChange={(checked) => updateSetting('notifications', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Desktop Notifications</Label>
              <p className="text-xs text-muted-foreground">Show browser notifications</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Workflow Completion Alerts</Label>
              <p className="text-xs text-muted-foreground">Get notified when workflows finish</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Agent Settings */}
      <Card className="glass-light">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gradient-success">
            <Shield className="w-5 h-5" />
            Agent Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Auto-run Scheduled Workflows</Label>
              <p className="text-xs text-muted-foreground">Automatically execute scheduled workflows</p>
            </div>
            <Switch
              checked={settings.autoRun}
              onCheckedChange={(checked) => updateSetting('autoRun', checked)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="retry">Retry Attempts</Label>
              <Select value={settings.retryAttempts} onValueChange={(value) => updateSetting('retryAttempts', value)}>
                <SelectTrigger className="glass">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="timeout">Timeout (seconds)</Label>
              <Input
                id="timeout"
                value={settings.timeout}
                onChange={(e) => updateSetting('timeout', e.target.value)}
                className="glass"
              />
            </div>
          </div>
          <div>
            <Label>Log Level</Label>
            <Select value={settings.logLevel} onValueChange={(value) => updateSetting('logLevel', value)}>
              <SelectTrigger className="glass">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="debug">Debug</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="warn">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Display Settings */}
      <Card className="glass-light">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gradient-warning">
            <Palette className="w-5 h-5" />
            Display Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Compact View</Label>
              <p className="text-xs text-muted-foreground">Show more content in less space</p>
            </div>
            <Switch
              checked={settings.compactView}
              onCheckedChange={(checked) => updateSetting('compactView', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Show Performance Metrics</Label>
              <p className="text-xs text-muted-foreground">Display real-time performance data</p>
            </div>
            <Switch
              checked={settings.showMetrics}
              onCheckedChange={(checked) => updateSetting('showMetrics', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Auto-refresh Dashboard</Label>
              <p className="text-xs text-muted-foreground">Automatically update dashboard data</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card className="glass-light">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gradient-primary">
            <Database className="w-5 h-5" />
            Data Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Data Retention (days)</Label>
            <Input
              value={settings.dataRetention}
              onChange={(e) => updateSetting('dataRetention', e.target.value)}
              className="glass mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">How long to keep test results and logs</p>
          </div>
          <Separator />
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Export Data</Button>
            <Button variant="outline" size="sm">Import Configuration</Button>
            <Button variant="destructive" size="sm">Clear All Data</Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="bg-gradient-to-r from-primary to-primary-glow hover:glow-primary">
          <Save className="w-4 h-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  );
};