
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, DollarSign, Clock, Edit, Share2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Event } from "@/data/mockData";
import { EventAPI } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;
      
      try {
        const eventData = await EventAPI.getEvent(id);
        setEvent(eventData);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load event details",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-4"></div>
            <div className="h-64 bg-gray-300 dark:bg-gray-600 rounded mb-6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Event Not Found</h1>
          <Link to="/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{event.title}</h1>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(event.status)}>
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </Badge>
                  <span className="text-gray-600 dark:text-gray-400">Created by {event.createdBy}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Event
                </Button>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Event Image */}
              {event.imageUrl && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <img 
                    src={event.imageUrl} 
                    alt={event.title}
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                  />
                </motion.div>
              )}

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0">
                  <CardHeader>
                    <CardTitle>About This Event</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {event.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="grid sm:grid-cols-2 gap-4">
                    <Link to={`/event/${event.id}/rsvp`}>
                      <Button className="w-full" variant="outline">
                        <Users className="h-4 w-4 mr-2" />
                        Manage RSVPs
                      </Button>
                    </Link>
                    <Link to={`/event/${event.id}/invite`}>
                      <Button className="w-full" variant="outline">
                        <Share2 className="h-4 w-4 mr-2" />
                        Send Invites
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Event Details */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0">
                  <CardHeader>
                    <CardTitle>Event Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <Calendar className="h-5 w-5 mr-3 text-blue-600 dark:text-blue-400" />
                      <div>
                        <p className="font-medium">{new Date(event.date).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{event.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <MapPin className="h-5 w-5 mr-3 text-blue-600 dark:text-blue-400" />
                      <p>{event.location}</p>
                    </div>
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <Users className="h-5 w-5 mr-3 text-blue-600 dark:text-blue-400" />
                      <p>{event.attendees} / {event.capacity} attendees</p>
                    </div>
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <DollarSign className="h-5 w-5 mr-3 text-blue-600 dark:text-blue-400" />
                      <p>${event.budget.toLocaleString()} budget</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Attendance Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0">
                  <CardHeader>
                    <CardTitle>Attendance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Confirmed</span>
                        <span className="font-medium text-green-600 dark:text-green-400">{event.attendees}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Capacity</span>
                        <span className="font-medium">{event.capacity}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(event.attendees / event.capacity) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {Math.round((event.attendees / event.capacity) * 100)}% full
                      </p>
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

export default EventDetail;
