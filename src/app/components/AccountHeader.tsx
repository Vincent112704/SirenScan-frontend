import { User, LogOut, Menu } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
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

interface AccountHeaderProps {
  onLogout: () => void;
  onOpenMobileMenu?: () => void;
}

export function AccountHeader({
  onLogout,
  onOpenMobileMenu,
}: AccountHeaderProps) {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutDialog(false);
    onLogout();
  };

  return (
    <>
      <div className="absolute top-4 sm:top-6 right-4 sm:right-8 left-4 sm:left-auto z-10 flex items-center justify-between sm:justify-end gap-3">
        {/* Mobile Menu Button - Only visible on mobile */}
        {onOpenMobileMenu && (
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden flex items-center gap-2 bg-[#232323] hover:bg-[#2a2a2a] transition-all rounded-full px-4 py-2 border border-white/5"
          >
            <Menu className="w-5 h-5 text-white" />
            <span className="text-white text-sm font-normal">Menu</span>
          </button>
        )}

        {/* Account Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 bg-[#232323] hover:bg-[#2a2a2a] transition-all rounded-full px-3 sm:px-4 py-2 border border-white/5">
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#ff4d2e] to-[#ff4d2e]/70 flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-white text-sm font-normal hidden sm:inline">
                Account
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 bg-[#1a1a1c] border border-white/10 text-white"
          >
            <DropdownMenuLabel className="text-white/60">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem className="focus:bg-white/5 focus:text-white cursor-default">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Demo User</span>
                <span className="text-xs text-white/50">
                  demo@sirenscan.com
                </span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem
              className="focus:bg-[#ff4d2e]/10 focus:text-[#ff4d2e] cursor-pointer"
              onClick={handleLogoutClick}
            >
              <LogOut className="w-4 h-4 mr-2" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent className="bg-[#1a1a1c] border border-white/10 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-normal">
              Confirm Logout
            </AlertDialogTitle>
            <AlertDialogDescription className="text-white/60">
              Are you sure you want to log out? You'll need to sign in again to
              access your dashboard.
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
    </>
  );
}
