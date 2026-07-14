import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, MessageSquare, Flame, Coins, LineChart } from 'lucide-react';
import mascotImg from '@assets/2_1784019392022.png';

export default function SneakPeek() {
  return (
    <section id="sneak-peek" className="relative py-32 bg-background border-t border-white/5 overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col items-start mb-20 max-w-3xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight"
          >
            Sneak Peek: <span className="text-primary text-glow">What's Coming</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground"
          >
            A first look at the GHOST HOOD experience — designed to make ghosting effortless.
          </motion.p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
          
          {/* Card 1: AI Chat (Tall - spans 2 rows) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
            className="md:col-span-1 lg:row-span-2 bg-card border border-white/10 rounded-3xl p-6 flex flex-col relative overflow-hidden group hover:border-primary/50 transition-colors shadow-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare size={20} className="text-primary" />
              <h3 className="text-white font-bold tracking-wide">AI Chat</h3>
            </div>
            
            <div className="flex-1 flex flex-col gap-4 mt-auto">
              <div className="bg-background border border-white/5 rounded-2xl rounded-tr-sm p-4 w-[85%] self-start transform transition-transform group-hover:translate-x-2">
                <p className="text-sm text-foreground">How do I get more $GHOST?</p>
              </div>
              
              <div className="bg-primary/10 border border-primary/20 rounded-2xl rounded-tl-sm p-4 w-[90%] self-end relative transform transition-transform group-hover:-translate-x-2">
                <div className="absolute -left-3 top-0 w-8 h-8 rounded-full bg-background border border-primary/30 flex items-center justify-center p-1 overflow-hidden">
                  <img src={mascotImg} alt="Ghost Bot" className="w-full h-full object-cover mix-blend-lighten scale-150" />
                </div>
                <p className="text-sm text-primary-foreground leading-relaxed">
                  Stake your tokens and participate in community missions to earn more $GHOST...
                </p>
              </div>
            </div>
            
            {/* Input mock */}
            <div className="mt-6 bg-background rounded-full border border-white/10 px-4 py-3 flex items-center gap-3">
              <div className="flex-1 bg-white/5 h-2 rounded-full" />
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
            </div>
          </motion.div>

          {/* Card 2: Ghost Score */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-white/10 rounded-3xl p-6 relative overflow-hidden group hover:border-primary/50 transition-colors shadow-xl flex flex-col justify-center items-center"
          >
            <h3 className="absolute top-6 left-6 text-white font-bold tracking-wide flex items-center gap-2">
              <Flame size={18} className="text-primary" /> Ghost Score
            </h3>
            
            <div className="relative w-36 h-36 flex items-center justify-center mt-6">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="72" cy="72" r="60" className="stroke-background" strokeWidth="8" fill="transparent" />
                <circle cx="72" cy="72" r="60" className="stroke-primary" strokeWidth="8" fill="transparent" strokeDasharray="377" strokeDashoffset="50" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-black text-white">9,200</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded-full mt-1">Legendary</span>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Token Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-white/10 rounded-3xl p-6 relative overflow-hidden group hover:border-primary/50 transition-colors shadow-xl flex flex-col"
          >
            <h3 className="text-white font-bold tracking-wide flex items-center gap-2 mb-6">
              <LineChart size={18} className="text-primary" /> Token Stats
            </h3>
            
            <div className="mb-6">
              <span className="text-3xl font-black text-white">2,450</span>
              <span className="text-primary font-bold ml-2">$GHOST</span>
            </div>
            
            <div className="flex flex-col gap-4">
              {[
                { label: "Staked", percent: "65%", color: "bg-primary" },
                { label: "Earned", percent: "25%", color: "bg-white" },
                { label: "Burned", percent: "10%", color: "bg-muted-foreground" }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-muted-foreground">{stat.label}</span>
                    <span className="text-white">{stat.percent}</span>
                  </div>
                  <div className="h-1.5 w-full bg-background rounded-full overflow-hidden">
                    <div className={`h-full ${stat.color} rounded-full`} style={{ width: stat.percent }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 4: Daily Missions */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 lg:col-span-1 bg-card border border-white/10 rounded-3xl p-6 relative overflow-hidden group hover:border-primary/50 transition-colors shadow-xl flex flex-col"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white font-bold tracking-wide flex items-center gap-2">
                <CheckCircle2 size={18} className="text-primary" /> Daily Missions
              </h3>
              <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-md">
                +50 $GHOST earned today
              </span>
            </div>
            
            <div className="flex flex-col gap-3 flex-1">
              {[
                { task: "Share a post", done: true },
                { task: "Stake tokens", done: true },
                { task: "Vote on proposal", done: false }
              ].map((mission, i) => (
                <div key={i} className={`flex items-center gap-4 p-3 rounded-xl border ${mission.done ? 'bg-primary/5 border-primary/20' : 'bg-background border-white/5'} transition-colors`}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${mission.done ? 'bg-primary border-primary' : 'border-white/20'}`}>
                    {mission.done && <CheckCircle2 size={12} className="text-background" />}
                  </div>
                  <span className={`text-sm font-semibold ${mission.done ? 'text-white' : 'text-muted-foreground'}`}>
                    {mission.task}
                  </span>
                  <span className="ml-auto text-xs font-bold text-primary">+10</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 5: And much more... */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="md:col-span-2 lg:col-span-1 bg-gradient-to-br from-card to-primary/10 border border-primary/20 rounded-3xl p-6 relative overflow-hidden group hover:shadow-[0_0_30px_rgba(204,255,0,0.15)] transition-all flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(204,255,0,0.2)_0%,transparent_70%)]" />
            
            <div className="z-10 flex flex-col items-center text-center">
              <h3 className="text-2xl font-black text-white mb-2 drop-shadow-lg">And much more...</h3>
              <p className="text-primary font-bold text-sm">Join the community to unlock</p>
            </div>
            
            <img 
              src={mascotImg} 
              alt="Magic Ghost" 
              className="absolute -right-10 -bottom-10 w-64 h-64 object-contain mix-blend-lighten opacity-50 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-700" 
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
