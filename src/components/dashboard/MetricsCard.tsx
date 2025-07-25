import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface MetricsCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  variant: 'primary' | 'secondary' | 'success' | 'warning';
}

const variantConfig = {
  primary: {
    bg: 'from-primary/10 to-primary-glow/5',
    border: 'border-primary/20',
    icon: 'from-primary to-primary-glow',
    glow: 'glow-primary'
  },
  secondary: {
    bg: 'from-secondary/10 to-secondary-glow/5',
    border: 'border-secondary/20',
    icon: 'from-secondary to-secondary-glow',
    glow: 'glow-secondary'
  },
  success: {
    bg: 'from-success/10 to-success-glow/5',
    border: 'border-success/20',
    icon: 'from-success to-success-glow',
    glow: 'glow-success'
  },
  warning: {
    bg: 'from-warning/10 to-warning-glow/5',
    border: 'border-warning/20',
    icon: 'from-warning to-warning-glow',
    glow: 'glow-warning'
  }
};

export const MetricsCard = ({ title, value, change, icon: Icon, variant }: MetricsCardProps) => {
  const config = variantConfig[variant];
  const isPositive = change.includes('+') || change.includes('improvement');

  return (
    <Card className={`
      glass-light hover:glass transition-all duration-300 
      ${config.border} hover:${config.glow}
      hover:scale-[1.02] animate-float
    `}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div className={`p-2 rounded-lg bg-gradient-to-r ${config.icon}`}>
            <Icon className="w-4 h-4 text-white" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-2xl font-bold text-gradient-primary">
            {value}
          </div>
          <div className="flex items-center gap-1 text-xs">
            {isPositive ? (
              <TrendingUp className="w-3 h-3 text-success" />
            ) : (
              <TrendingDown className="w-3 h-3 text-warning" />
            )}
            <span className={isPositive ? 'text-success' : 'text-warning'}>
              {change}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};