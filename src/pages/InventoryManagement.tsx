
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package, Search, Plus, Edit, Trash2, AlertTriangle } from "lucide-react";
import Navbar from "@/components/Navbar";
import { InventoryItem } from "@/data/mockData";
import { InventoryAPI } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const InventoryManagement = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [filteredInventory, setFilteredInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const inventoryData = await InventoryAPI.getInventory();
        setInventory(inventoryData);
        setFilteredInventory(inventoryData);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load inventory",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [toast]);

  useEffect(() => {
    let filtered = inventory;

    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.supplier?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(item => item.status === statusFilter);
    }

    setFilteredInventory(filtered);
  }, [inventory, searchTerm, categoryFilter, statusFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'low-stock':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'out-of-stock':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    if (status === 'out-of-stock' || status === 'low-stock') {
      return <AlertTriangle className="h-4 w-4" />;
    }
    return null;
  };

  const categories = [...new Set(inventory.map(item => item.category))];
  const stats = {
    total: inventory.length,
    available: inventory.filter(item => item.status === 'available').length,
    lowStock: inventory.filter(item => item.status === 'low-stock').length,
    outOfStock: inventory.filter(item => item.status === 'out-of-stock').length,
    totalValue: inventory.reduce((sum, item) => sum + (item.quantity * item.costPerUnit), 0),
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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Inventory Management</h1>
              <p className="text-gray-600 dark:text-gray-400">Track and manage your event supplies</p>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0">
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Items</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
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
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Available</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.available}</p>
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
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Low Stock</p>
                    <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.lowStock}</p>
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
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Out of Stock</p>
                    <p className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.outOfStock}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0">
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Value</p>
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">${stats.totalValue.toLocaleString()}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0 mb-6">
              <CardContent className="p-4">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search items, categories, or suppliers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-full lg:w-48">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full lg:w-40">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="low-stock">Low Stock</SelectItem>
                      <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Inventory Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredInventory.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0 hover:shadow-lg transition-all duration-300 group">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          <CardTitle className="text-lg">{item.name}</CardTitle>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="sm" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{item.category}</Badge>
                        <Badge className={getStatusColor(item.status)}>
                          {getStatusIcon(item.status)}
                          <span className="ml-1">{item.status.replace('-', ' ')}</span>
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Quantity</span>
                          <span className="font-semibold">{item.quantity} {item.unit}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Cost per unit</span>
                          <span className="font-semibold">${item.costPerUnit}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Total value</span>
                          <span className="font-semibold text-green-600 dark:text-green-400">
                            ${(item.quantity * item.costPerUnit).toLocaleString()}
                          </span>
                        </div>
                        {item.supplier && (
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Supplier</span>
                            <span className="text-sm">{item.supplier}</span>
                          </div>
                        )}
                        <div className="text-xs text-gray-500 dark:text-gray-500">
                          Last updated: {new Date(item.lastUpdated).toLocaleDateString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            {filteredInventory.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No items found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Try adjusting your search or filters</p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Item
                </Button>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default InventoryManagement;
