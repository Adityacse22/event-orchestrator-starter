
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, DollarSign, Package, TrendingUp, Clock, Eye } from "lucide-react";
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
          title: "Error",
          description: "Failed to load events",
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
    inventoryItems: 89 // This would come from inventory API
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-200">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening with your events.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              {
                title: "Active Events",
                value: stats.activeEvents.toString(),
                change: "+2 this month",
                icon: Calendar,
                color: "text-blue-600 dark:text-blue-400"
              },
              {
                title: "Total Attendees",
                value: stats.totalAttendees.toLocaleString(),
                change: "+18% from last month",
                icon: Users,
                color: "text-green-600 dark:text-green-400"
              },
              {
                title: "Budget Utilization",
                value: `${stats.budgetUtilization}%`,
                change: "Within budget",
                icon: DollarSign,
                color: "text-purple-600 dark:text-purple-400"
              },
              {
                title: "Inventory Items",
                value: stats.inventoryItems.toString(),
                change: "5 items low stock",
                icon: Package,
                color: "text-orange-600 dark:text-orange-400"
              }
            ].map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0 hover:shadow-lg transition-all duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{stat.change}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Events */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Recent Events</CardTitle>
                        <CardDescription>Your latest event activities</CardDescription>
                      </div>
                      <Link to="/events/create">
                        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                          Create Event
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="animate-pulse">
                            <div className="h-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
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
                            className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                          >
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 dark:text-white">{event.title}</h3>
                              <div className="flex items-center space-x-4 mt-1">
                                <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  {new Date(event.date).toLocaleDateString()}
                                </span>
                                <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                                  <Users className="h-4 w-4 mr-1" />
                                  {event.attendees} attendees
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                                {event.status}
                              </span>
                              <Link to={`/event/${event.id}`}>
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                              </Link>
                            </div>
                          </motion.div>
                        ))}
                        
                        {events.length === 0 && (
                          <div className="text-center py-8">
                            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600 dark:text-gray-400">No events found</p>
                            <Link to="/events/create" className="mt-4 inline-block">
                              <Button>Create Your First Event</Button>
                            </Link>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common tasks you might want to do</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Link to="/events/create" className="block">
                      <Button className="w-full justify-start" variant="outline">
                        <Calendar className="h-4 w-4 mr-2" />
                        Create New Event
                      </Button>
                    </Link>
                    <Link to="/admin/inventory" className="block">
                      <Button className="w-full justify-start" variant="outline">
                        <Package className="h-4 w-4 mr-2" />
                        Check Inventory
                      </Button>
                    </Link>
                    <Button className="w-full justify-start" variant="outline">
                      <Users className="h-4 w-4 mr-2" />
                      Manage Guest Lists
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Review Budgets
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Activity Feed */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { color: "bg-blue-600", text: "New RSVP received", time: "2 minutes ago" },
                        { color: "bg-green-600", text: "Budget updated", time: "1 hour ago" },
                        { color: "bg-purple-600", text: "New message posted", time: "3 hours ago" },
                        { color: "bg-orange-600", text: "Inventory item added", time: "5 hours ago" }
                      ].map((activity, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-start space-x-3"
                        >
                          <div className={`w-2 h-2 ${activity.color} rounded-full mt-2`}></div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900 dark:text-white">{activity.text}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{activity.time}</p>
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
