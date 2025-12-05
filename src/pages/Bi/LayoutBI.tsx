import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Bi from "./Bi";

export default function LayoutBI({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <Bi />
            <SidebarTrigger />
            {children}
        </SidebarProvider>
    )
}
