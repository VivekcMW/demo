"use client";

import { useState } from "react";
import {
  Eye,
  MessageSquare,
  Ruler,
  Scissors,
  CalendarCheck,
  TrendingUp,
  Focus,
  GitCompare,
  FileText,
  ShoppingBag,
  MapPin,
  Search,
  WifiOff,
  RefreshCw,
  Activity,
  ChevronDown,
  Clock,
  CheckCircle2,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Eye,
  MessageSquare,
  Ruler,
  Scissors,
  CalendarCheck,
  TrendingUp,
  Focus,
  GitCompare,
  FileText,
  ShoppingBag,
  MapPin,
  Search,
  WifiOff,
  RefreshCw,
  Activity,
};

interface WorkflowStep {
  id: number;
  title: string;
  icon: string;
  description: string;
  dataPoints: string[];
  avgTime: string;
}

interface WorkflowDiagramProps {
  title: string;
  description: string;
  steps: WorkflowStep[];
  variant?: "horizontal" | "vertical";
}

export function WorkflowDiagram({
  title,
  description,
  steps,
  variant = "horizontal",
}: WorkflowDiagramProps) {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  if (variant === "vertical") {
    return (
      <div className="p-5 rounded-xl bg-white border border-[var(--border-default)]">
        <h4 className="text-sm font-semibold text-foreground mb-1">{title}</h4>
        <p className="text-xs text-[var(--text-secondary)] mb-4">{description}</p>
        
        <div className="space-y-0">
          {steps.map((step, idx) => {
            const Icon = iconMap[step.icon] || Eye;
            const isExpanded = expandedStep === step.id;
            const isLast = idx === steps.length - 1;
            
            return (
              <div key={step.id} className="relative">
                {/* Connector line */}
                {!isLast && (
                  <div className="absolute left-4 top-10 w-0.5 h-full bg-[var(--border-default)] -z-10" />
                )}
                
                <button
                  type="button"
                  onClick={() => setExpandedStep(isExpanded ? null : step.id)}
                  className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-[var(--bg-subtle)] transition-colors text-left"
                >
                  <div className="w-8 h-8 rounded-full bg-[var(--action-primary)]/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-[var(--action-primary)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{step.title}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[var(--text-secondary)] flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {step.avgTime}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-[var(--text-secondary)] transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                      </div>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5 line-clamp-1">
                      {step.description}
                    </p>
                  </div>
                </button>
                
                {isExpanded && (
                  <div className="ml-11 pb-4 pr-3 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-3 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-default)]">
                      <p className="text-xs text-[var(--text-secondary)] mb-2">{step.description}</p>
                      <div className="space-y-1">
                        {step.dataPoints.map((point, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs">
                            <CheckCircle2 className="w-3 h-3 text-green-600" />
                            <span className="text-foreground">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Horizontal variant
  return (
    <div className="p-5 rounded-xl bg-white border border-[var(--border-default)]">
      <h4 className="text-sm font-semibold text-foreground mb-1">{title}</h4>
      <p className="text-xs text-[var(--text-secondary)] mb-6">{description}</p>
      
      {/* Steps */}
      <div className="relative">
        {/* Connection line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-[var(--border-default)]" />
        
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 relative">
          {steps.map((step) => {
            const Icon = iconMap[step.icon] || Eye;
            const isActive = activeStep === step.id;
            
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveStep(isActive ? null : step.id)}
                onMouseEnter={() => setActiveStep(step.id)}
                onMouseLeave={() => setActiveStep(null)}
                className="flex flex-col items-center text-center group"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all z-10 ${
                  isActive 
                    ? "bg-[var(--action-primary)] text-white scale-110 shadow-lg" 
                    : "bg-white border-2 border-[var(--action-primary)] text-[var(--action-primary)] group-hover:bg-[var(--action-primary)]/10"
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className={`text-xs mt-2 font-medium transition-colors ${
                  isActive ? "text-[var(--action-primary)]" : "text-[var(--text-secondary)]"
                }`}>
                  {step.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Active step details */}
      {activeStep && (
        <div className="mt-6 p-4 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-default)] animate-in fade-in slide-in-from-top-2 duration-200">
          {(() => {
            const step = steps.find((s) => s.id === activeStep);
            if (!step) return null;
            return (
              <>
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-foreground">{step.title}</h5>
                  <span className="text-xs text-[var(--text-secondary)] flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {step.avgTime}
                  </span>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-3">{step.description}</p>
                <div className="flex flex-wrap gap-2">
                  {step.dataPoints.map((point, i) => (
                    <span key={i} className="px-2 py-1 text-xs rounded-full bg-white border border-[var(--border-default)] text-foreground">
                      {point}
                    </span>
                  ))}
                </div>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}
