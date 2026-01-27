import { LayoutDashboard, HelpCircle, LogOut } from "lucide-react";
import sirenScanLogo from "@/assets/SirenScanLogo.png";
import virustotalLogo from "@/assets/VirusTotalLogo.png";
import haveibeenpwnedLogo from "@/assets/HaveIBeenPwnedLogo.png";
import openaiLogo from "@/assets/OpenAILogo.png";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/components/ui/alert-dialog";

interface SidebarProps {
  onLogout: () => void;
  onNavigateToHelp?: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToVirusTotal?: () => void;
  onNavigateToHaveIBeenPwned?: () => void;
  onNavigateToOpenAI?: () => void;
  currentView?: string;
}

export function Sidebar({ onLogout, onNavigateToHelp, onNavigateToDashboard, onNavigateToVirusTotal, onNavigateToHaveIBeenPwned, onNavigateToOpenAI, currentView = "dashboard" }: SidebarProps) {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  
  console.log("Sidebar rendered with:", { onLogout, onNavigateToHelp, onNavigateToDashboard, currentView });

  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutDialog(false);
    onLogout();
  };
  
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: currentView === "dashboard", onClick: onNavigateToDashboard },
    { 
      logo: virustotalLogo,
      label: "VirusTotal", 
      active: currentView === "virusTotal", 
      onClick: onNavigateToVirusTotal 
    },
    { 
      logo: haveibeenpwnedLogo,
      label: "HaveIBeenPwned", 
      active: currentView === "haveIBeenPwned", 
      onClick: onNavigateToHaveIBeenPwned 
    },
    { 
      icon: null, 
      logo: openaiLogo,
      label: "OpenAI", 
      active: currentView === "openAI", 
      onClick: onNavigateToOpenAI,
    },
  ];


  const generalItems = [
    { icon: HelpCircle, label: "Help", active: currentView === "help" },
    { icon: LogOut, label: "Logout", active: false },
  ];

  return (
    <div className="w-70 h-screen bg-[#121212] flex flex-col">
      {/* Logo Section */}
      <div className="p-6 flex items-center">
        <img 
          src={sirenScanLogo} 
          alt="SirenScan Logo" 
          className="w-12 h-12 object-contain"
        />
        <h1 className="text-white text-2xl font-normal -mt-3">SirenScan</h1>
      </div>

      {/* Menu Section */}
      <div className="px-4 mt-4">
        <p className="text-white/60 text-sm font-normal mb-3 px-3">MENU</p>
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                item.active
                  ? "bg-linear-to-r from-[#ff4d2e] to-[#ff4d2e]/90 text-white"
                  : "text-white/80 hover:bg-white/5"
              }`}
              onClick={item.onClick}
            >
              {item.logo ? (
                <img
                  src={item.logo}
                  alt={`${item.label} Logo`}
                  className={`object-contain ${item.label === "OpenAI" ? "w-8 h-8 self-center -ml-1.5" : "w-5 h-5"}`}
                />
              ) : item.icon ? (
                <item.icon className="w-5 h-5" />
              ) : null}
              <span 
                className={`text-base ${
                  item.label === "OpenAI" ? "-ml-1" : "" // move text closer to the logo
                }`}
              >{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* General Section */}
      <div className="px-4 mt-auto mb-6">
        <p className="text-white/60 text-sm font-normal mb-3 px-3">GENERAL</p>
        <nav className="space-y-1">
          {generalItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                item.active
                  ? "bg-linear-to-r from-[#ff4d2e] to-[#ff4d2e]/90 text-white"
                  : "text-white/80 hover:bg-white/5"
              }`}
              onClick={
                item.label === "Logout" 
                  ? handleLogoutClick 
                  : item.label === "Help" 
                  ? () => {
                      console.log("Help clicked, onNavigateToHelp:", onNavigateToHelp);
                      if (onNavigateToHelp) onNavigateToHelp();
                    }
                  : undefined
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="text-base">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent className="bg-[#1a1a1c] border border-white/10 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-normal">Confirm Logout</AlertDialogTitle>
            <AlertDialogDescription className="text-white/60">
              Are you sure you want to log out? You'll need to sign in again to access your dashboard.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-[#232323] border-white/10 text-white hover:bg-[#2a2a2a] hover:text-white">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmLogout}
              className="bg-[#ff4d2e] text-white hover:bg-[#ff4d2e]/90"
            >
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}