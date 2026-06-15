import {
  Eye, BarChart3, FileText, Wand2, Activity, Compass, Zap, Globe, Search,
  ShoppingBag, GitCompare, Layers, BookOpen, LifeBuoy, DollarSign, Library,
  PlayCircle, Building2, Linkedin, Twitter, Facebook, Instagram, Youtube,
  Mail, Phone, MapPin, Home, Settings, User, Users, FileQuestion, Lightbulb,
  Sparkles, Rocket, Target,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const ICON_MAP: Record<string, LucideIcon> = {
  Eye, BarChart3, FileText, Wand2, Activity, Compass, Zap, Globe, Search,
  ShoppingBag, GitCompare, Layers, BookOpen, LifeBuoy, DollarSign, Library,
  PlayCircle, Building2, Linkedin, Twitter, Facebook, Instagram, Youtube,
  Mail, Phone, MapPin, Home, Settings, User, Users, FileQuestion, Lightbulb,
  Sparkles, Rocket, Target,
};

export const ICON_NAMES = Object.keys(ICON_MAP).sort();

export function getIcon(name: string | null | undefined): LucideIcon | null {
  if (!name) return null;
  return ICON_MAP[name] ?? null;
}