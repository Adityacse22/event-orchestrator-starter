
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, DollarSign, Package, MessageSquare, BarChart3, ChevronRight, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

const Index = () => {
  const { theme, toggleTheme } = useTheme();

  const features = [
    {
      icon: Calendar,
      title: "Quantum Event Creation",
      description: "Advanced event orchestration with AI-powered scheduling and timeline optimization",
      color: "neon-cyan"
    },
    {
      icon: Users,
      title: "Neural RSVP Network",
      description: "Intelligent guest management with predictive analytics and real-time response tracking",
      color: "neon-purple"
    },
    {
      icon: DollarSign,
      title: "Hyper Budget Analytics",
      description: "Real-time financial monitoring with quantum expense prediction algorithms",
      color: "neon-green"
    },
    {
      icon: Package,
      title: "Smart Inventory Matrix",
      description: "Autonomous supply chain management with predictive restocking protocols",
      color: "neon-cyan"
    },
    {
      icon: MessageSquare,
      title: "Holographic Collaboration",
      description: "Next-gen communication platform with immersive team interaction protocols",
      color: "neon-purple"
    },
    {
      icon: BarChart3,
      title: "Quantum Analytics Engine",
      description: "Multi-dimensional data visualization with predictive insight generation",
      color: "neon-green"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated background grid */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(100, 255, 255, 0.3) 1px, transparent 0)',
               backgroundSize: '40px 40px'
             }}>
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 glass-card border-0 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative">
                <Calendar className="h-8 w-8 text-cyan-400 neon-glow" />
                <div className="absolute inset-0 animate-ping">
                  <Calendar className="h-8 w-8 text-cyan-400 opacity-20" />
                </div>
              </div>
              <span className="text-2xl font-bold gradient-text font-['JetBrains_Mono']">
                EventFlow
              </span>
              <div className="text-xs text-cyan-400 opacity-60 font-mono">v3.0.1</div>
            </motion.div>
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={toggleTheme}
                className="text-cyan-400 hover:bg-white/5 hover:text-cyan-300 transition-all duration-300"
              >
                <Zap className="h-4 w-4 mr-2" />
                {theme === 'dark' ? 'Neural' : 'Quantum'}
              </Button>
              <Link to="/login">
                <Button variant="ghost" className="text-white/80 hover:bg-white/5 hover:text-white transition-all duration-300">
                  Access Portal
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white pulse-glow border-0">
                  Initialize System
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-bold mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span className="gradient-text neon-text font-['JetBrains_Mono']">
                Event Matrix
              </span>
            </motion.h1>
            <motion.div 
              className="text-2xl text-cyan-300/80 mb-8 max-w-4xl mx-auto font-light tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Next-generation event orchestration platform powered by quantum algorithms
              <br />
              <span className="text-lg text-purple-300/60">
                Seamlessly integrate time, space, and human consciousness
              </span>
            </motion.div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link to="/events/create">
                <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white text-lg px-10 py-4 pulse-glow border-0 scan-line">
                  Initialize Event Protocol
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="text-lg px-10 py-4 glass-card border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 floating-panel">
                  Access Command Center
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-bold mb-6 gradient-text">Neural Capabilities</h2>
          <p className="text-xl text-cyan-300/70 max-w-3xl mx-auto font-light">
            Advanced quantum-powered features designed for the event planning of tomorrow
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="glass-card border-white/10 floating-panel group hover:border-cyan-500/30 transition-all duration-500 hologram-border">
                <CardHeader className="relative">
                  <div className="mb-6 relative">
                    <feature.icon className={`h-12 w-12 text-${feature.color === 'neon-cyan' ? 'cyan' : feature.color === 'neon-purple' ? 'purple' : 'green'}-400 group-hover:scale-110 transition-transform duration-300`} />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <feature.icon className={`h-12 w-12 text-${feature.color === 'neon-cyan' ? 'cyan' : feature.color === 'neon-purple' ? 'purple' : 'green'}-400 animate-ping`} />
                    </div>
                  </div>
                  <CardTitle className="text-xl text-white group-hover:text-cyan-300 transition-colors duration-300 font-semibold">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold text-white mb-8 gradient-text">
              Ready to Enter the Future?
            </h2>
            <p className="text-xl text-cyan-300/80 mb-12 font-light">
              Join the quantum revolution in event planning and experience the next evolution of digital orchestration
            </p>
            <Link to="/register">
              <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white text-lg px-12 py-4 pulse-glow border-0 data-stream">
                Initialize Quantum Protocol
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative glass-card border-0 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Calendar className="h-6 w-6 text-cyan-400" />
                <span className="text-lg font-bold gradient-text font-['JetBrains_Mono']">EventFlow</span>
              </div>
              <p className="text-gray-400 font-light leading-relaxed">
                Quantum-powered event orchestration for the digital age
              </p>
            </div>
            
            {[
              {
                title: "Quantum Features",
                items: ["Event Creation", "Neural RSVPs", "Smart Budgets", "Matrix Inventory"]
              },
              {
                title: "Neural Network",
                items: ["Quantum Docs", "API Gateway", "Community Hub", "Support Portal"]
              },
              {
                title: "System Status",
                items: ["Live Metrics", "Security Protocols", "Privacy Matrix", "Terms & Conditions"]
              }
            ].map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold mb-6 text-cyan-300">{section.title}</h3>
                <ul className="space-y-3 text-gray-400">
                  {section.items.map((item, i) => (
                    <li key={i} className="hover:text-cyan-300 transition-colors duration-300 cursor-pointer">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-white/10 mt-16 pt-8 text-center">
            <p className="text-gray-400 font-mono text-sm">
              &copy; 2024 EventFlow Quantum Systems. All rights reserved. | Neural Protocol v3.0.1
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
