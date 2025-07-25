import { useState } from 'react';
import { Play, GitBranch, Clock, CheckCircle, AlertTriangle, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

interface Agent {
  id: string;
  name: string;
  description: string;
  status: 'idle' | 'running' | 'completed' | 'warning' | 'error';
  lastRun: string;
  successRate: number;
  color: 'primary' | 'secondary' | 'success' | 'warning';
}

interface WorkflowPanelProps {
  selectedAgents: Agent[];
  isRunning: boolean;
  onRunWorkflow: () => void;
}

export const WorkflowPanel = ({ selectedAgents, isRunning, onRunWorkflow }: WorkflowPanelProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const workflowProgress = isRunning ? ((currentStep + 1) / selectedAgents.length) * 100 : 0;

  // Simulate workflow progress
  if (isRunning && currentStep < selectedAgents.length - 1) {
    setTimeout(() => setCurrentStep(prev => prev + 1), 2000);
  }

  return (
    <div className="space-y-6">
      {/* Workflow Overview */}
      <Card className="glass border-primary/20 glow-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gradient-primary">
            <GitBranch className="w-5 h-5" />
            Workflow Control
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 glass-light rounded-lg">
              <div className="text-2xl font-bold text-gradient-primary">
                {selectedAgents.length}
              </div>
              <div className="text-xs text-muted-foreground">Selected Agents</div>
            </div>
            <div className="text-center p-3 glass-light rounded-lg">
              <div className="text-2xl font-bold text-gradient-secondary">
                {isRunning ? `${Math.round(workflowProgress)}%` : '0%'}
              </div>
              <div className="text-xs text-muted-foreground">Progress</div>
            </div>
          </div>

          {isRunning && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Workflow Progress</span>
                <span className="font-medium">{Math.round(workflowProgress)}%</span>
              </div>
              <Progress value={workflowProgress} className="h-2" />
            </div>
          )}

          <Button 
            onClick={onRunWorkflow}
            disabled={selectedAgents.length === 0 || isRunning}
            className="w-full bg-gradient-to-r from-primary to-primary-glow hover:glow-primary"
          >
            <Play className="w-4 h-4 mr-2" />
            {isRunning ? 'Running Workflow...' : 'Execute Workflow'}
          </Button>
        </CardContent>
      </Card>

      {/* Selected Agents */}
      {selectedAgents.length > 0 && (
        <Card className="glass-light">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Execution Queue ({selectedAgents.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {selectedAgents.map((agent, index) => (
                <div key={agent.id} className="flex items-center gap-3 p-3 glass rounded-lg">
                  <div className="flex items-center gap-2 flex-1">
                    <div className={`
                      w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                      ${index <= currentStep && isRunning ? 'bg-success text-success-foreground' : 
                        index === currentStep && isRunning ? 'bg-secondary animate-pulse text-secondary-foreground' :
                        'bg-muted text-muted-foreground'}
                    `}>
                      {index < currentStep && isRunning ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{agent.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {index === currentStep && isRunning ? 'Running...' : 
                         index < currentStep && isRunning ? 'Completed' : 'Pending'}
                      </div>
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`
                      ${agent.color === 'primary' ? 'border-primary/50 text-primary' : ''}
                      ${agent.color === 'secondary' ? 'border-secondary/50 text-secondary' : ''}
                      ${agent.color === 'success' ? 'border-success/50 text-success' : ''}
                      ${agent.color === 'warning' ? 'border-warning/50 text-warning' : ''}
                    `}
                  >
                    {agent.successRate}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <Card className="glass-light">
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Last Workflow</span>
              <span className="font-medium">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Success Rate</span>
              <span className="font-medium text-success">94.2%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Avg Duration</span>
              <span className="font-medium">8.5 min</span>
            </div>
            <Separator className="my-2" />
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              Next scheduled run in 4 hours
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};