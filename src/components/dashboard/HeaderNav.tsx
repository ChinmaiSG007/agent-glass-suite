import { Bell, User, Settings, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export const HeaderNav = () => {
  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-glass-border/20">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-r from-primary to-primary-glow">
              <Menu className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-gradient-primary">MAVS</h1>
          </div>

          {/* Search */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search agents, workflows..." 
                className="pl-10 glass-light border-glass-border/30 focus:border-primary/50"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="relative hover:bg-glass-light">
              <Bell className="w-5 h-5" />
              <Badge variant="destructive" className="absolute -top-1 -right-1 w-2 h-2 p-0 bg-warning">
                <span className="sr-only">3 notifications</span>
              </Badge>
            </Button>

            <Button variant="ghost" size="sm" className="hover:bg-glass-light">
              <Settings className="w-5 h-5" />
            </Button>

            <div className="flex items-center gap-3 pl-3 border-l border-glass-border/30">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium">Alex Chen</p>
                <p className="text-xs text-muted-foreground">QA Engineer</p>
              </div>
              <Avatar className="w-8 h-8 ring-2 ring-primary/20">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground text-sm">
                  AC
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};