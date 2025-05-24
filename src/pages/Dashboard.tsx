
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, DollarSign, Package, TrendingUp, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Dashboard = () => {
  const stats = [
    {
      title: "Active Events",
      value: "12",
      change: "+2 this month",
      icon: Calendar,
      color: "text-blue-600"
    },
    {
      title: "Total Attendees",
      value: "1,247",
      change: "+18% from last month",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "Budget Utilization",
      value: "68%",
      change: "Within budget",
      icon: DollarSign,
      color: "text-purple-600"
    },
    {
      title: "Inventory Items",
      value: "89",
      change: "5 items low stock",
      icon: Package,
      color: "text-orange-600"
    }
  ];

  const recentEvents = [
    {
      name: "Annual Company Retreat",
      date: "March 15, 2024",
      attendees: 85,
      status: "confirmed"
    },
    {
      name: "Product Launch Event",
      date: "March 22, 2024",
      attendees: 120,
      status: "planning"
    },
    {
      name: "Team Building Workshop",
      date: "April 5, 2024",
      attendees: 45,
      status: "pending"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your events.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/60 backdrop-blur-sm border-0 hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-gray-600 mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Events */}
          <div className="lg:col-span-2">
            <Card className="bg-white/60 backdrop-blur-sm border-0">
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
                <div className="space-y-4">
                  {recentEvents.map((event, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div>
                        <h3 className="font-semibold text-gray-900">{event.name}</h3>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-sm text-gray-600 flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {event.date}
                          </span>
                          <span className="text-sm text-gray-600 flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {event.attendees} attendees
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          event.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          event.status === 'planning' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {event.status}
                        </span>
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card className="bg-white/60 backdrop-blur-sm border-0 mb-6">
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
                <Link to="/guests" className="block">
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="h-4 w-4 mr-2" />
                    Manage Guest Lists
                  </Button>
                </Link>
                <Link to="/inventory" className="block">
                  <Button className="w-full justify-start" variant="outline">
                    <Package className="h-4 w-4 mr-2" />
                    Check Inventory
                  </Button>
                </Link>
                <Link to="/budget" className="block">
                  <Button className="w-full justify-start" variant="outline">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Review Budgets
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Activity Feed */}
            <Card className="bg-white/60 backdrop-blur-sm border-0">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm text-gray-900">New RSVP received</p>
                      <p className="text-xs text-gray-600">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm text-gray-900">Budget updated</p>
                      <p className="text-xs text-gray-600">1 hour ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm text-gray-900">New message posted</p>
                      <p className="text-xs text-gray-600">3 hours ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
