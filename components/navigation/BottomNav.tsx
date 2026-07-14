import { House, Newspaper, Map, Settings } from "lucide-react";

export default function BottomNav(){
  return (
    <nav className="glass fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-8 rounded-full px-6 py-4">
      <House size={20}/>
      <Newspaper size={20}/>
      <Map size={20}/>
      <Settings size={20}/>
    </nav>
  );
}
