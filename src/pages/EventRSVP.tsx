
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Users, CheckCircle, XCircle, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import { RSVP } from "@/data/mockData";
import { RSVPAPI } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const EventRSVP = () => {
  const { id } = useParams<{ id: string }>();
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [filteredRsvps, setFilteredRsvps] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();

  useEffect(() => {
    const fetchRSVPs = async () => {
      if (!id) return;
      
      try {
        const rsvpData = await RSVPAPI.getRSVPs(id);
        setRsvps(rsvpData);
        setFilteredRsvps(rsvpData);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load RSVPs",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRSVPs();
  }, [id, toast]);

  useEffect(() => {
    let filtered = rsvps;

    if (searchTerm) {
      filtered = filtered.filter(rsvp => 
        rsvp.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rsvp.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(rsvp => rsvp.status === statusFilter);
    }

    setFilteredRsvps(filtered);
  }, [rsvps, searchTerm, statusFilter]);

  const handleUpdateRSVP = async (rsvpId: string, newStatus: RSVP['status']) => {
    try {
      await RSVPAPI.updateRSVP(rsvpId, newStatus);
      setRsvps(prev => prev.map(rsvp => 
        rsvp.id === rsvpId 
          ? { ...rsvp, status: newStatus, respondedAt: new Date().toISOString() }
          : rsvp
      ));
      toast({
        title: "RSVP Updated",
        description: `RSVP status changed to ${newStatus}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update RSVP",
        variant: "destructive"
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'declined':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'declined':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    }
  };

  const stats = {
    total: rsvps.length,
    accepted: rsvps.filter(r => r.status === 'accepted').length,
    declined: rsvps.filter(r => r.status === 'declined').length,
    pending: rsvps.filter(r => r.status === 'pending').length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
            <div className="h-32 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">RSVP Management</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage guest responses for your event</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total RSVPs</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Accepted</p>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.accepted}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
                      <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.pending}</p>
                    </div>
                    <Clock className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Declined</p>
                      <p className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.declined}</p>
                    </div>
                    <XCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0 mb-6">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-40">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="accepted">Accepted</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="declined">Declined</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* RSVP List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0">
              <CardHeader>
                <CardTitle>Guest Responses ({filteredRsvps.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredRsvps.map((rsvp, index) => (
                    <motion.div
                      key={rsvp.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          {getStatusIcon(rsvp.status)}
                          <h3 className="font-semibold text-gray-900 dark:text-white">{rsvp.guestName}</h3>
                          <Badge className={getStatusColor(rsvp.status)}>
                            {rsvp.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{rsvp.email}</p>
                        {rsvp.dietaryRestrictions && (
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Dietary: {rsvp.dietaryRestrictions}
                          </p>
                        )}
                        {rsvp.plusOne && (
                          <p className="text-sm text-blue-600 dark:text-blue-400">+1 Guest</p>
                        )}
                        {rsvp.respondedAt && (
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                            Responded: {new Date(rsvp.respondedAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2 mt-3 sm:mt-0">
                        <Button
                          size="sm"
                          variant={rsvp.status === 'accepted' ? 'default' : 'outline'}
                          onClick={() => handleUpdateRSVP(rsvp.id, 'accepted')}
                          disabled={rsvp.status === 'accepted'}
                        >
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant={rsvp.status === 'declined' ? 'destructive' : 'outline'}
                          onClick={() => handleUpdateRSVP(rsvp.id, 'declined')}
                          disabled={rsvp.status === 'declined'}
                        >
                          Decline
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                  
                  {filteredRsvps.length === 0 && (
                    <div className="text-center py-8">
                      <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 dark:text-gray-400">No RSVPs found</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default EventRSVP;
