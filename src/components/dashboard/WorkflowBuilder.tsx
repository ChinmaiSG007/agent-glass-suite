import { useState } from 'react';
import { Play, Plus, X, ChevronUp, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

interface Agent {
  id: string;
  name: string;
  description: string;
  status: 'idle' | 'running' | 'completed' | 'warning' | 'error';
  lastRun: string;
  successRate: number;
  color: 'primary' | 'secondary' | 'success' | 'warning';
}

interface WorkflowBuilderProps {
  agents: Agent[];
  onRunWorkflow: (selectedAgents: Agent[]) => void;
  isRunning: boolean;
}

export const WorkflowBuilder = ({ agents, onRunWorkflow, isRunning }: WorkflowBuilderProps) => {
  const [selectedAgents, setSelectedAgents] = useState<Agent[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAgentSelection = (agent: Agent) => {
    setSelectedAgents(prev => 
      prev.some(a => a.id === agent.id)
        ? prev.filter(a => a.id !== agent.id)
        : [...prev, agent]
    );
  };

  const moveAgent = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === selectedAgents.length - 1)
    ) return;

    const newAgents = [...selectedAgents];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newAgents[index], newAgents[targetIndex]] = [newAgents[targetIndex], newAgents[index]];
    setSelectedAgents(newAgents);
  };

  const removeAgent = (agentId: string) => {
    setSelectedAgents(prev => prev.filter(a => a.id !== agentId));
  };

  return (
    <Card className="glass border-primary/20 glow-primary">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-gradient-primary">Workflow Builder</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="space-y-4">
          {/* Agent Selection */}
          <div>
            <h4 className="text-sm font-medium mb-3 text-muted-foreground">Available Agents</h4>
            <div className="grid grid-cols-2 gap-2">
              {agents.map(agent => (
                <div key={agent.id} className="flex items-center space-x-2 p-2 glass-light rounded">
                  <Checkbox
                    id={agent.id}
                    checked={selectedAgents.some(a => a.id === agent.id)}
                    onCheckedChange={() => toggleAgentSelection(agent)}
                  />
                  <label
                    htmlFor={agent.id}
                    className="text-xs font-medium cursor-pointer flex-1"
                  >
                    {agent.name}
                  </label>
                  <Badge variant="outline" className="text-xs">
                    {agent.successRate}%
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Workflow Sequence */}
          {selectedAgents.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-3 text-muted-foreground">Execution Sequence</h4>
              <div className="space-y-2">
                {selectedAgents.map((agent, index) => (
                  <div key={agent.id} className="flex items-center gap-2 p-2 glass rounded">
                    <span className="text-xs font-bold w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span className="text-sm flex-1">{agent.name}</span>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveAgent(index, 'up')}
                        disabled={index === 0}
                        className="h-6 w-6 p-0"
                      >
                        <ChevronUp className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveAgent(index, 'down')}
                        disabled={index === selectedAgents.length - 1}
                        className="h-6 w-6 p-0"
                      >
                        <ChevronDown className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAgent(agent.id)}
                        className="h-6 w-6 p-0 text-warning hover:text-warning"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Execute Button */}
          <Button
            onClick={() => onRunWorkflow(selectedAgents)}
            disabled={selectedAgents.length === 0 || isRunning}
            className="w-full bg-gradient-to-r from-primary to-primary-glow hover:glow-primary"
          >
            <Play className="w-4 h-4 mr-2" />
            {isRunning ? 'Running Workflow...' : `Execute Workflow (${selectedAgents.length} agents)`}
          </Button>
        </CardContent>
      )}
    </Card>
  );
};