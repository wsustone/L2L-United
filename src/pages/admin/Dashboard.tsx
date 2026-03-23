import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { FileText, UserCheck, Clock, CheckCircle } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Link } from 'react-router-dom';

interface LeadStats {
  total: number;
  new: number;
  contacted: number;
  closed: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<LeadStats>({
    total: 0,
    new: 0,
    contacted: 0,
    closed: 0,
  });
  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch all leads
        const { data: leads, error } = await supabase
          .from('contact_submissions')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        const total = leads?.length || 0;
        const newLeads = leads?.filter(l => l.status === 'new').length || 0;
        const contacted = leads?.filter(l => l.status === 'contacted').length || 0;
        const closed = leads?.filter(l => l.status === 'closed').length || 0;

        setStats({ total, new: newLeads, contacted, closed });
        setRecentLeads(leads?.slice(0, 5) || []);
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: 'Total Leads', value: stats.total, icon: FileText, color: 'text-primary' },
    { title: 'New Leads', value: stats.new, icon: Clock, color: 'text-yellow-500' },
    { title: 'Contacted', value: stats.contacted, icon: UserCheck, color: 'text-blue-500' },
    { title: 'Closed', value: stats.closed, icon: CheckCircle, color: 'text-green-500' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your leads and activity</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat) => (
            <Card key={stat.title} className="border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {isLoading ? '-' : stat.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Leads */}
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Leads</CardTitle>
            <Link 
              to="/admin/leads" 
              className="text-sm text-primary hover:underline"
            >
              View all
            </Link>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : recentLeads.length === 0 ? (
              <p className="text-muted-foreground">No leads yet</p>
            ) : (
              <div className="space-y-4">
                {recentLeads.map((lead) => (
                  <div 
                    key={lead.id} 
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                  >
                    <div>
                      <p className="font-medium text-foreground">{lead.name}</p>
                      <p className="text-sm text-muted-foreground">{lead.email}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        lead.status === 'new' ? 'bg-yellow-500/20 text-yellow-500' :
                        lead.status === 'contacted' ? 'bg-blue-500/20 text-blue-500' :
                        lead.status === 'closed' ? 'bg-green-500/20 text-green-500' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {lead.status || 'new'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
