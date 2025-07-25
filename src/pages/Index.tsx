import { useState } from 'react';
import { Bot, Play, Settings, User, BarChart3, Zap, GitBranch, Shield, Database, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AgentCard } from '@/components/dashboard/AgentCard';
import { MetricsCard } from '@/components/dashboard/MetricsCard';
import { WorkflowPanel } from '@/components/dashboard/WorkflowPanel';
import { HeaderNav } from '@/components/dashboard/HeaderNav';
import { ResultsChart } from '@/components/dashboard/ResultsChart';
import heroImage from '@/assets/dashboard-hero.jpg';

const agents = [
  {
    id: 'test-generator',
    name: 'Test Data Generator',
    description: 'Generates comprehensive test datasets and prompts for validation',
    icon: Database,
    status: 'idle' as const,
    lastRun: '2 hours ago',
    successRate: 94.5,
    color: 'primary' as const
  },
  {
    id: 'selenium-runner',
    name: 'Selenium Jenkins Runner',
    description: 'Executes automated UI tests through Jenkins pipeline',
    icon: GitBranch,
    status: 'running' as const,
    lastRun: 'Running now',
    successRate: 89.2,
    color: 'secondary' as const
  },
  {
    id: 'verification-agent',
    name: 'Verification Agent',
    description: 'Validates test results and performs quality assurance checks',
    icon: Shield,
    status: 'completed' as const,
    lastRun: '15 minutes ago',
    successRate: 96.8,
    color: 'success' as const
  },
  {
    id: 'performance-monitor',
    name: 'Performance Monitor',
    description: 'Monitors system performance and resource utilization',
    icon: BarChart3,
    status: 'warning' as const,
    lastRun: '1 hour ago',
    successRate: 78.3,
    color: 'warning' as const
  },
  {
    id: 'integration-tester',
    name: 'Integration Tester',
    description: 'Tests API endpoints and service integrations',
    icon: Zap,
    status: 'idle' as const,
    lastRun: '3 hours ago',
    successRate: 91.7,
    color: 'primary' as const
  },
  {
    id: 'result-analyzer',
    name: 'Result Analyzer',
    description: 'Analyzes test outcomes and generates detailed reports',
    icon: CheckCircle,
    status: 'idle' as const,
    lastRun: '45 minutes ago',
    successRate: 99.1,
    color: 'success' as const
  }
];

const Index = () => {
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [workflowRunning, setWorkflowRunning] = useState(false);

  const toggleAgent = (agentId: string) => {
    setSelectedAgents(prev => 
      prev.includes(agentId) 
        ? prev.filter(id => id !== agentId)
        : [...prev, agentId]
    );
  };

  const runWorkflow = () => {
    setWorkflowRunning(true);
    // Simulate workflow execution
    setTimeout(() => setWorkflowRunning(false), 5000);
  };

  return (
    <div className="min-h-screen bg-background">
      <HeaderNav />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden px-6 py-12">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'overlay'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto">
          <div className="glass rounded-3xl p-8 mb-8 animate-float">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-2xl bg-gradient-to-r from-primary to-primary-glow glow-primary">
                <Bot className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gradient-primary mb-2">
                  Multi Agent Verification System
                </h1>
                <p className="text-lg text-muted-foreground">
                  Advanced testing suite with intelligent agent orchestration
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <MetricsCard 
                title="Active Agents" 
                value="6" 
                change="+2 this week"
                icon={Bot}
                variant="primary"
              />
              <MetricsCard 
                title="Tests Completed" 
                value="1,247" 
                change="+18% this month"
                icon={CheckCircle}
                variant="success"
              />
              <MetricsCard 
                title="Success Rate" 
                value="94.2%" 
                change="+2.1% improvement"
                icon={BarChart3}
                variant="secondary"
              />
              <MetricsCard 
                title="Active Workflows" 
                value="3" 
                change="2 running now"
                icon={GitBranch}
                variant="warning"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Agents Grid */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gradient-primary">
                Agent Management
              </h2>
              <div className="flex gap-3">
                <Button 
                  variant="outline"
                  size="sm"
                  className="glass-light hover:glow-primary"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Configure
                </Button>
                <Button 
                  onClick={runWorkflow}
                  disabled={selectedAgents.length === 0 || workflowRunning}
                  className="bg-gradient-to-r from-primary to-primary-glow hover:glow-primary"
                >
                  <Play className="w-4 h-4 mr-2" />
                  {workflowRunning ? 'Running...' : 'Run Selected'}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {agents.map((agent) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  isSelected={selectedAgents.includes(agent.id)}
                  onToggle={() => toggleAgent(agent.id)}
                  isRunning={workflowRunning && selectedAgents.includes(agent.id)}
                />
              ))}
            </div>
          </div>

          {/* Workflow Panel */}
          <div className="lg:col-span-1">
            <WorkflowPanel 
              selectedAgents={selectedAgents.map(id => 
                agents.find(agent => agent.id === id)!
              )}
              isRunning={workflowRunning}
              onRunWorkflow={runWorkflow}
            />
          </div>
        </div>

        {/* Analytics Section */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gradient-primary">
              Test Results & Analytics
            </h2>
            <Button 
              variant="outline"
              size="sm"
              className="glass-light hover:glow-secondary"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
          <ResultsChart />
        </div>
      </div>
    </div>
  );
};

export default Index;