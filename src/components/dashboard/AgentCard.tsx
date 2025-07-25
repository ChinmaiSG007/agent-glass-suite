import { useState } from 'react';
import { Play, Pause, MoreVertical, Clock, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { LucideIcon } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  status: 'idle' | 'running' | 'completed' | 'warning' | 'error';
  lastRun: string;
  successRate: number;
  color: 'primary' | 'secondary' | 'success' | 'warning';
}

interface AgentCardProps {
  agent: Agent;
  onLaunch: () => void;
  isRunning?: boolean;
}

const statusConfig = {
  idle: { color: 'bg-muted', text: 'Idle' },
  running: { color: 'bg-secondary animate-pulse', text: 'Running' },
  completed: { color: 'bg-success', text: 'Completed' },
  warning: { color: 'bg-warning', text: 'Warning' },
  error: { color: 'bg-destructive', text: 'Error' }
};

const colorConfig = {
  primary: 'border-primary/30 hover:border-primary/50',
  secondary: 'border-secondary/30 hover:border-secondary/50',
  success: 'border-success/30 hover:border-success/50',
  warning: 'border-warning/30 hover:border-warning/50'
};

export const AgentCard = ({ agent, onLaunch, isRunning = false }: AgentCardProps) => {
  const [progress, setProgress] = useState(0);
  const status = isRunning ? 'running' : agent.status;
  const Icon = agent.icon;

  // Simulate progress for running agents
  if (isRunning && progress < 100) {
    setTimeout(() => setProgress(prev => Math.min(prev + 2, 100)), 100);
  }

  return (
    <Card 
      className={`
        glass hover:glass-light transition-all duration-300
        ${colorConfig[agent.color]}
        ${isRunning ? 'animate-pulse-slow glow-primary' : ''}
        hover:scale-[1.02] hover:shadow-lg
      `}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`
              p-2 rounded-xl bg-gradient-to-r transition-all duration-300
              ${agent.color === 'primary' ? 'from-primary to-primary-glow' : ''}
              ${agent.color === 'secondary' ? 'from-secondary to-secondary-glow' : ''}
              ${agent.color === 'success' ? 'from-success to-success-glow' : ''}
              ${agent.color === 'warning' ? 'from-warning to-warning-glow' : ''}
              ${isRunning ? 'scale-110' : ''}
            `}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-sm leading-tight">{agent.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className={`w-2 h-2 rounded-full ${statusConfig[status].color}`} />
                <span className="text-xs text-muted-foreground">{statusConfig[status].text}</span>
              </div>
            </div>
          </div>
          
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-glass-light" onClick={(e) => e.stopPropagation()}>
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-xs text-muted-foreground leading-relaxed">
          {agent.description}
        </p>

        {isRunning && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-1" />
          </div>
        )}

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>{agent.lastRun}</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-success" />
            <span className="font-medium">{agent.successRate}%</span>
          </div>
        </div>

        <div className="pt-2 border-t border-glass-border/20">
          <Button 
            size="sm" 
            onClick={(e) => {
              e.stopPropagation();
              onLaunch();
            }}
            disabled={isRunning}
            className="w-full bg-gradient-to-r from-primary to-primary-glow hover:glow-primary transition-all duration-300"
          >
            {isRunning ? (
              <>
                <Pause className="w-3 h-3 mr-2" />
                Running...
              </>
            ) : (
              <>
                <Play className="w-3 h-3 mr-2" />
                Launch Agent
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};