
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, DollarSign, Package, TrendingUp, Clock, Eye, Zap, Activity, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Event } from "@/data/mockData";
import { EventAPI } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventData = await EventAPI.getEvents();
        setEvents(eventData);
      } catch (error) {
        toast({
          title: "Neural Network Error",
          description: "Failed to establish connection with event matrix",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [toast]);

  const stats = {
    activeEvents: events.filter(e => e.status === 'published').length,
    totalAttendees: events.reduce((sum, e) => sum + e.attendees, 0),
    budgetUtilization: events.length > 0 ? Math.round((events.reduce((sum, e) => sum + e.budget, 0) / events.length) * 0.68) : 0,
    inventoryItems: 89
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'draft':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'completed':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(100, 255, 255, 0.3) 1px, transparent 0)',
               backgroundSize: '40px 40px'
             }}>
        </div>
      </div>

      <Navbar />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-12">
            <motion.h1 
              className="text-4xl font-bold mb-4 gradient-text font-['JetBrains_Mono']"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              Command Center
            </motion.h1>
            <p className="text-cyan-300/70 text-lg font-light">Neural network status: All systems operational</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                title: "Active Protocols",
                value: stats.activeEvents.toString(),
                change: "+2 quantum cycles",
                icon: Calendar,
                color: "cyan",
                glowColor: "cyan-500"
              },
              {
                title: "Neural Connections",
                value: stats.totalAttendees.toLocaleString(),
                change: "+18% resonance boost",
                icon: Users,
                color: "green",
                glowColor: "green-500"
              },
              {
                title: "Resource Matrix",
                value: `${stats.budgetUtilization}%`,
                change: "Optimal allocation",
                icon: DollarSign,
                color: "purple",
                glowColor: "purple-500"
              },
              {
                title: "Inventory Nodes",
                value: stats.inventoryItems.toString(),
                change: "5 units critical",
                icon: Package,
                color: "orange",
                glowColor: "orange-500"
              }
            ].map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="glass-card border-white/10 floating-panel group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20"></div>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                    <CardTitle className="text-sm font-medium text-gray-300 font-mono">
                      {stat.title}
                    </CardTitle>
                    <div className="relative">
                      <stat.icon className={`h-5 w-5 text-${stat.color}-400 group-hover:scale-110 transition-transform duration-300`} />
                      <div className={`absolute inset-0 bg-${stat.glowColor} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300`}></div>
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="text-3xl font-bold text-white mb-1 font-['JetBrains_Mono']">{stat.value}</div>
                    <p className="text-xs text-gray-400 font-light">{stat.change}</p>
                  </CardContent>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Event Matrix */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card className="glass-card border-white/10 scan-line">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-white text-xl font-['JetBrains_Mono']">Event Matrix</CardTitle>
                        <CardDescription className="text-cyan-300/70">Active quantum protocols</CardDescription>
                      </div>
                      <Link to="/events/create">
                        <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white pulse-glow border-0">
                          <Zap className="h-4 w-4 mr-2" />
                          Initialize Protocol
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="animate-pulse">
                            <div className="h-20 bg-white/5 rounded-lg"></div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {events.slice(0, 3).map((event, index) => (
                          <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="flex items-center justify-between p-4 glass-card border-white/5 hover:border-cyan-500/30 transition-all duration-300 group data-stream"
                          >
                            <div className="flex-1">
                              <h3 className="font-semibold text-white group-hover:text-cyan-300 transition-colors duration-300">{event.title}</h3>
                              <div className="flex items-center space-x-4 mt-2">
                                <span className="text-sm text-gray-400 flex items-center font-mono">
                                  <Clock className="h-4 w-4 mr-1" />
                                  {new Date(event.date).toLocaleDateString()}
                                </span>
                                <span className="text-sm text-gray-400 flex items-center">
                                  <Users className="h-4 w-4 mr-1" />
                                  {event.attendees} neural links
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <span className={`px-3 py-1 rounded-full text-xs font-mono border ${getStatusColor(event.status)}`}>
                                {event.status.toUpperCase()}
                              </span>
                              <Link to={`/event/${event.id}`}>
                                <Button variant="ghost" size="sm" className="text-cyan-400 hover:bg-cyan-500/10">
                                  <Eye className="h-4 w-4 mr-1" />
                                  Access
                                </Button>
                              </Link>
                            </div>
                          </motion.div>
                        ))}
                        
                        {events.length === 0 && (
                          <div className="text-center py-12">
                            <Calendar className="h-16 w-16 text-gray-500 mx-auto mb-4 opacity-50" />
                            <p className="text-gray-400 mb-4">No active protocols detected</p>
                            <Link to="/events/create">
                              <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white">
                                Initialize First Protocol
                              </Button>
                            </Link>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar Controls */}
            <div className="space-y-6">
              {/* Quick Access */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Card className="glass-card border-white/10 hologram-border">
                  <CardHeader>
                    <CardTitle className="text-white font-['JetBrains_Mono']">Quick Access</CardTitle>
                    <CardDescription className="text-cyan-300/70">Rapid deployment commands</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { icon: Calendar, label: "New Protocol", href: "/events/create" },
                      { icon: Package, label: "Inventory Matrix", href: "/admin/inventory" },
                      { icon: Users, label: "Neural Network", href: "#" },
                      { icon: DollarSign, label: "Resource Analysis", href: "#" }
                    ].map((action, index) => (
                      <Link key={index} to={action.href}>
                        <Button className="w-full justify-start glass-card border-white/5 text-gray-300 hover:text-cyan-300 hover:border-cyan-500/30 transition-all duration-300" variant="outline">
                          <action.icon className="h-4 w-4 mr-3" />
                          {action.label}
                        </Button>
                      </Link>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* System Status */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Card className="glass-card border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white font-['JetBrains_Mono'] flex items-center">
                      <Activity className="h-5 w-5 mr-2 text-green-400" />
                      System Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { label: "Neural RSVP received", time: "2 cycles ago", color: "blue" },
                        { label: "Budget matrix updated", time: "1 quantum hour", color: "green" },
                        { label: "Hologram message posted", time: "3 cycles ago", color: "purple" },
                        { label: "Inventory node added", time: "5 quantum hours", color: "orange" }
                      ].map((activity, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-start space-x-3"
                        >
                          <div className={`w-2 h-2 bg-${activity.color}-500 rounded-full mt-2 pulse-glow`}></div>
                          <div className="flex-1">
                            <p className="text-sm text-white font-light">{activity.label}</p>
                            <p className="text-xs text-gray-400 font-mono">{activity.time}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
