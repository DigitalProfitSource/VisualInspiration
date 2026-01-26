import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { ViteReactSSG } from "vite-react-ssg/single-page";
import { Link, useParams, useLocation, Switch, Route as Route$1 } from "wouter";
import { QueryClient, useMutation, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import { useRef, useState, useEffect } from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva } from "class-variance-authority";
import { X, AlertCircle, ChevronDown, Smile, Calculator, Home as Home$1, HardHat, Scale, Sparkles, ArrowRight, LayoutTemplate, Layers, Zap, Brain, ArrowUpRight, FileText, Activity, TrendingUp, Quote, Route, RefreshCw, Globe, Handshake, Bot, Database, Cog, MessageSquare, Star, Shield, CheckCircle2, Building2, Search, Wrench, Microscope, Target, Clock, Check, Calendar, ArrowLeft, ExternalLink, Loader2, BarChart3, ChevronUp, CheckCircle } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { useInView, useSpring, motion, useTransform, useScroll, AnimatePresence } from "framer-motion";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Slot } from "@radix-ui/react-slot";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as LabelPrimitive from "@radix-ui/react-label";
import { useForm, useWatch, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import * as SliderPrimitive from "@radix-ui/react-slider";
import * as SelectPrimitive from "@radix-ui/react-select";
async function throwIfResNotOk(res) {
  if (!res.ok) {
    const text = await res.text() || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}
const getQueryFn = ({ on401: unauthorizedBehavior }) => async ({ queryKey }) => {
  const res = await fetch(queryKey.join("/"), {
    credentials: "include"
  });
  await throwIfResNotOk(res);
  return await res.json();
};
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false
    },
    mutations: {
      retry: false
    }
  }
});
const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1e6;
let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}
const toastTimeouts = /* @__PURE__ */ new Map();
const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId
    });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      };
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === action.toast.id ? { ...t, ...action.toast } : t
        )
      };
    case "DISMISS_TOAST": {
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast2) => {
          addToRemoveQueue(toast2.id);
        });
      }
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === toastId || toastId === void 0 ? {
            ...t,
            open: false
          } : t
        )
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === void 0) {
        return {
          ...state,
          toasts: []
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId)
      };
  }
};
const listeners = [];
let memoryState = { toasts: [] };
function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}
function toast({ ...props }) {
  const id = genId();
  const update = (props2) => dispatch({
    type: "UPDATE_TOAST",
    toast: { ...props2, id }
  });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      }
    }
  });
  return {
    id,
    dismiss,
    update
  };
}
function useToast() {
  const [state, setState] = React.useState(memoryState);
  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);
  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId })
  };
}
function cn(...inputs2) {
  return twMerge(clsx(inputs2));
}
const ToastProvider = ToastPrimitives.Provider;
const ToastViewport = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Viewport,
  {
    ref,
    className: cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    ),
    ...props
  }
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Toast = React.forwardRef(({ className, variant, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    ToastPrimitives.Root,
    {
      ref,
      className: cn(toastVariants({ variant }), className),
      ...props
    }
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;
const ToastAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Action,
  {
    ref,
    className: cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    ),
    ...props
  }
));
ToastAction.displayName = ToastPrimitives.Action.displayName;
const ToastClose = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Close,
  {
    ref,
    className: cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    ),
    "toast-close": "",
    ...props,
    children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
  }
));
ToastClose.displayName = ToastPrimitives.Close.displayName;
const ToastTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Title,
  {
    ref,
    className: cn("text-sm font-semibold", className),
    ...props
  }
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;
const ToastDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Description,
  {
    ref,
    className: cn("text-sm opacity-90", className),
    ...props
  }
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;
function Toaster() {
  const { toasts } = useToast();
  return /* @__PURE__ */ jsxs(ToastProvider, { children: [
    toasts.map(function({ id, title, description, action, ...props }) {
      return /* @__PURE__ */ jsxs(Toast, { ...props, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1", children: [
          title && /* @__PURE__ */ jsx(ToastTitle, { children: title }),
          description && /* @__PURE__ */ jsx(ToastDescription, { children: description })
        ] }),
        action,
        /* @__PURE__ */ jsx(ToastClose, {})
      ] }, id);
    }),
    /* @__PURE__ */ jsx(ToastViewport, {})
  ] });
}
const TooltipProvider = TooltipPrimitive.Provider;
const TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  TooltipPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-tooltip-content-transform-origin]",
      className
    ),
    ...props
  }
) }));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
const Card = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className
    ),
    ...props
  }
));
Card.displayName = "Card";
const CardHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex flex-col space-y-1.5 p-6", className),
    ...props
  }
));
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("font-semibold leading-none tracking-tight", className),
    ...props
  }
));
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
const CardContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("p-6 pt-0", className), ...props }));
CardContent.displayName = "CardContent";
const CardFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex items-center p-6 pt-0", className),
    ...props
  }
));
CardFooter.displayName = "CardFooter";
function NotFound() {
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen w-full flex items-center justify-center bg-gray-50", children: /* @__PURE__ */ jsx(Card, { className: "w-full max-w-md mx-4", children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex mb-4 gap-2", children: [
      /* @__PURE__ */ jsx(AlertCircle, { className: "h-8 w-8 text-red-500" }),
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "404 Page Not Found" })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm text-gray-600", children: "Did you forget to add the page to the router?" })
  ] }) }) });
}
const Accordion = AccordionPrimitive.Root;
const AccordionItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AccordionPrimitive.Item,
  {
    ref,
    className: cn("border-b", className),
    ...props
  }
));
AccordionItem.displayName = "AccordionItem";
const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Header, { className: "flex", children: /* @__PURE__ */ jsxs(
  AccordionPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })
    ]
  }
) }));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;
const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(
  AccordionPrimitive.Content,
  {
    ref,
    className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...props,
    children: /* @__PURE__ */ jsx("div", { className: cn("pb-4 pt-0", className), children })
  }
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;
const technologies = [
  { name: "OpenAI", slug: "openai" },
  { name: "Anthropic", slug: "anthropic" },
  { name: "Perplexity", slug: "perplexity" },
  { name: "Gemini", slug: "googlegemini" },
  // Simple Icons uses googlegemini
  { name: "Notion", slug: "notion" },
  { name: "n8n", slug: "n8n" },
  { name: "Slack", slug: "slack" },
  { name: "GitHub", slug: "github" },
  { name: "ElevenLabs", slug: "elevenlabs" },
  { name: "Runway", slug: "runway" },
  // Might need checking, if not found will fallback to text
  { name: "HubSpot", slug: "hubspot" },
  { name: "Make", slug: "make" },
  { name: "Supabase", slug: "supabase" }
];
function TechTicker({ className }) {
  return /* @__PURE__ */ jsx("div", { className: cn("w-full overflow-hidden bg-background/50 border-y border-white/5 py-8 backdrop-blur-sm", className), children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 flex items-center gap-4", children: [
    /* @__PURE__ */ jsx("div", { className: "text-xs font-mono text-slate-500 uppercase tracking-widest shrink-0 mr-8 border-r border-white/10 pr-8 hidden md:block", children: "Operational Stack" }),
    /* @__PURE__ */ jsxs("div", { className: "relative flex-1 overflow-hidden group", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" }),
      /* @__PURE__ */ jsx("div", { className: "absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-20 animate-ticker hover:[animation-play-state:paused] w-max", children: [...technologies, ...technologies].map((tech, i) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "flex items-center gap-3 shrink-0 group/item opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0",
          children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: `https://cdn.simpleicons.org/${tech.slug}/94a3b8`,
                alt: tech.name,
                className: "h-6 w-auto object-contain",
                onError: (e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextElementSibling?.classList.remove("hidden");
                }
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "hidden text-lg font-medium text-slate-400 font-display whitespace-nowrap", children: tech.name })
          ]
        },
        `${tech.slug}-${i}`
      )) })
    ] })
  ] }) });
}
function GridBeam({ className, showCenterBeam = true, gridOpacity = 0.15 }) {
  return /* @__PURE__ */ jsxs("div", { className: cn("absolute inset-0 w-full h-full overflow-hidden pointer-events-none", className), children: [
    /* @__PURE__ */ jsx("style", { children: `
          @keyframes beamV {
            0% {
              top: -150px;
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              top: 100%;
              opacity: 0;
            }
          }

          @keyframes beamH {
            0% {
              left: -150px;
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              left: 100%;
              opacity: 0;
            }
          }

          @keyframes beamHRev {
            0% {
              right: -150px;
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              right: 100%;
              opacity: 0;
            }
          }

          .animate-beam-v {
            animation: beamV 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }

          .animate-beam-h {
            animation: beamH 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }

          .animate-beam-h-rev {
            animation: beamHRev 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }
        ` }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0",
        style: {
          opacity: gridOpacity,
          backgroundImage: "linear-gradient(to right, rgba(128, 128, 128, 0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(128, 128, 128, 0.25) 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 w-full h-full", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute left-[10%] top-0 h-full w-px bg-gradient-to-b from-transparent via-white/5 to-transparent overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-transparent via-primary/50 to-transparent animate-beam-v", style: { animationDelay: "0s" } }) }),
      /* @__PURE__ */ jsx("div", { className: "absolute right-[10%] top-0 h-full w-px bg-gradient-to-b from-transparent via-white/5 to-transparent overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-transparent via-primary/50 to-transparent animate-beam-v", style: { animationDelay: "4s" } }) }),
      showCenterBeam && /* @__PURE__ */ jsx("div", { className: "absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/5 to-transparent overflow-hidden hidden md:block", children: /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-transparent via-primary/30 to-transparent animate-beam-v", style: { animationDelay: "2s" } }) }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-[20%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 h-full w-40 bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-beam-h", style: { animationDelay: "1s" } }) }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-[50%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 h-full w-40 bg-gradient-to-l from-transparent via-primary/50 to-transparent animate-beam-h-rev", style: { animationDelay: "3s" } }) }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-[80%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 h-full w-40 bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-beam-h", style: { animationDelay: "5s" } }) })
    ] })
  ] });
}
function CircuitBeams({ className }) {
  return /* @__PURE__ */ jsxs("div", { className: cn("absolute inset-0 w-full h-full overflow-hidden pointer-events-none", className), children: [
    /* @__PURE__ */ jsx("style", { children: `
          @keyframes currentFlow {
            0% {
              transform: translateX(-100%);
              opacity: 0;
            }
            10% {
              opacity: 0.6;
            }
            90% {
              opacity: 0.6;
            }
            100% {
              transform: translateX(200%);
              opacity: 0;
            }
          }

          @keyframes currentFlowReverse {
            0% {
              transform: translateX(200%);
              opacity: 0;
            }
            10% {
              opacity: 0.5;
            }
            90% {
              opacity: 0.5;
            }
            100% {
              transform: translateX(-100%);
              opacity: 0;
            }
          }

          @keyframes pulseNode {
            0%, 100% {
              opacity: 0.1;
              box-shadow: 0 0 0 0 rgba(103, 232, 249, 0);
            }
            50% {
              opacity: 0.4;
              box-shadow: 0 0 8px 2px rgba(103, 232, 249, 0.3);
            }
          }

          .circuit-current {
            animation: currentFlow 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }

          .circuit-current-rev {
            animation: currentFlowReverse 7s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }

          .circuit-node {
            animation: pulseNode 4s ease-in-out infinite;
          }
        ` }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[15%] left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-white/[0.03] to-white/[0.03]", children: /* @__PURE__ */ jsx("div", { className: "circuit-current absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-transparent via-primary/40 to-transparent", style: { animationDelay: "0s" } }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[15%] left-1/3 w-px h-16 bg-white/[0.03]", children: /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary/20 circuit-node", style: { animationDelay: "0.5s" } }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[20%] right-0 w-2/5 h-px bg-gradient-to-l from-transparent via-white/[0.03] to-white/[0.03]", children: /* @__PURE__ */ jsx("div", { className: "circuit-current-rev absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-transparent via-primary/30 to-transparent", style: { animationDelay: "2s" } }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[20%] right-[40%] w-px h-12 bg-white/[0.03]", children: /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary/20 circuit-node", style: { animationDelay: "2.5s" } }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[45%] left-0 w-1/4 h-px bg-gradient-to-r from-transparent via-white/[0.03] to-white/[0.03]", children: /* @__PURE__ */ jsx("div", { className: "circuit-current absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-transparent via-primary/35 to-transparent", style: { animationDelay: "1s" } }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[50%] right-0 w-1/3 h-px bg-gradient-to-l from-transparent via-white/[0.03] to-white/[0.03]", children: /* @__PURE__ */ jsx("div", { className: "circuit-current-rev absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-transparent via-primary/30 to-transparent", style: { animationDelay: "3.5s" } }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[25%] left-0 w-2/5 h-px bg-gradient-to-r from-transparent via-white/[0.03] to-white/[0.03]", children: /* @__PURE__ */ jsx("div", { className: "circuit-current absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-transparent via-primary/35 to-transparent", style: { animationDelay: "4s" } }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[25%] left-[40%] w-px h-20 bg-white/[0.03]", children: /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary/15 circuit-node", style: { animationDelay: "4.5s" } }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[5%] left-[40%] w-1/4 h-px bg-gradient-to-r from-white/[0.03] via-white/[0.03] to-transparent", children: /* @__PURE__ */ jsx("div", { className: "circuit-current absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-transparent via-primary/30 to-transparent", style: { animationDelay: "5s" } }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[30%] right-0 w-1/4 h-px bg-gradient-to-l from-transparent via-white/[0.03] to-white/[0.03]", children: /* @__PURE__ */ jsx("div", { className: "circuit-current-rev absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-transparent via-primary/30 to-transparent", style: { animationDelay: "1.5s" } }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[30%] right-1/4 w-px h-24 bg-white/[0.03]", children: /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary/20 circuit-node", style: { animationDelay: "2s" } }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[35%] left-[10%] w-16 h-px bg-white/[0.02]", children: /* @__PURE__ */ jsx("div", { className: "circuit-current absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-transparent via-primary/25 to-transparent", style: { animationDelay: "2.5s" } }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[60%] right-[15%] w-20 h-px bg-white/[0.02]", children: /* @__PURE__ */ jsx("div", { className: "circuit-current-rev absolute top-0 right-0 h-full w-10 bg-gradient-to-l from-transparent via-primary/25 to-transparent", style: { animationDelay: "5.5s" } }) })
  ] });
}
function SlotDigit({ digit, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px", amount: 0.5 });
  const springValue = useSpring(0, {
    stiffness: 100,
    damping: 30,
    mass: 1
  });
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        springValue.set(1);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      springValue.set(0);
    }
  }, [isInView, springValue, delay]);
  const isNumber = !isNaN(parseInt(digit));
  if (!isNumber) {
    return /* @__PURE__ */ jsx(
      motion.span,
      {
        ref,
        initial: { opacity: 0, y: 20 },
        animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
        transition: { duration: 0.5, delay: delay / 1e3 },
        className: "inline-block",
        children: digit
      }
    );
  }
  const targetNum = parseInt(digit);
  const displayValue = useTransform(springValue, [0, 1], [0, targetNum]);
  return /* @__PURE__ */ jsx("div", { ref, className: "inline-block relative h-[1.2em] overflow-hidden", children: /* @__PURE__ */ jsx(
    motion.div,
    {
      className: "flex flex-col items-center",
      style: {
        y: useTransform(displayValue, (v) => {
          const current = Math.round(v);
          return `-${current * 1.2}em`;
        })
      },
      children: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => /* @__PURE__ */ jsx("span", { className: "h-[1.2em] flex items-center justify-center", children: num }, num))
    }
  ) });
}
function SlotCounter({ value, className = "" }) {
  const characters = value.split("");
  return /* @__PURE__ */ jsx("span", { className: `inline-flex items-baseline ${className}`, children: characters.map((char, index) => /* @__PURE__ */ jsx(SlotDigit, { digit: char, delay: index * 80 }, index)) });
}
function AnimatedMetric({ value, suffix, description }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50px", amount: 0.3 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const springProgress = useSpring(0, {
    stiffness: 50,
    damping: 20
  });
  useEffect(() => {
    if (isInView) {
      springProgress.set(1);
      setHasAnimated(true);
    } else {
      springProgress.set(0);
    }
  }, [isInView, springProgress]);
  return /* @__PURE__ */ jsxs("div", { ref, className: "text-center p-6 rounded-xl bg-white/[0.02] border border-white/5", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-4xl md:text-5xl font-display font-bold text-white mb-2 overflow-hidden", children: [
      /* @__PURE__ */ jsx(SlotCounter, { value }),
      /* @__PURE__ */ jsx(
        motion.span,
        {
          className: "text-primary text-2xl ml-1",
          initial: { opacity: 0, x: -10 },
          animate: isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 },
          transition: { duration: 0.4, delay: 0.5 },
          children: suffix
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      motion.p,
      {
        className: "text-slate-500 text-sm",
        initial: { opacity: 0, y: 10 },
        animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 },
        transition: { duration: 0.4, delay: 0.6 },
        children: description
      }
    )
  ] });
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2",
  {
    variants: {
      variant: {
        default: (
          // @replit: no hover, and add primary border
          "bg-primary text-primary-foreground border border-primary-border"
        ),
        destructive: "bg-destructive text-destructive-foreground shadow-sm border-destructive-border",
        outline: (
          // @replit Shows the background color of whatever card / sidebar / accent background it is inside of.
          // Inherits the current text color. Uses shadow-xs. no shadow on active
          // No hover state
          " border [border-color:var(--button-outline)] shadow-xs active:shadow-none "
        ),
        secondary: (
          // @replit border, no hover, no shadow, secondary border.
          "border bg-secondary text-secondary-foreground border border-secondary-border "
        ),
        // @replit no hover, transparent border
        ghost: "border border-transparent",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        // @replit changed sizes
        default: "min-h-9 px-4 py-2",
        sm: "min-h-8 rounded-md px-3 text-xs",
        lg: "min-h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";
const industries$1 = [
  {
    icon: Smile,
    title: "Dental Practices",
    subtext: "Appointment reminders, insurance verification, and patient follow-up automation.",
    metrics: [
      { label: "Missed Call Rate", before: "35%", after: "<2% (Auto-Text Back)" },
      { label: "Recall Scheduling", before: "Manual Phone Calls", after: "+45% Automation Rate" },
      { label: "New Patient Intake", before: "Business Hours Only", after: "24/7 Booking" }
    ]
  },
  {
    icon: Calculator,
    title: "Accounting & CPAs",
    subtext: "Client onboarding, document collection, and tax deadline reminders.",
    metrics: [
      { label: "Doc Collection Time", before: "3-5 Days avg", after: "<4 Hours (Auto-Nudge)" },
      { label: "Tax Season Response", before: "24+ Hours", after: "Instant (AI Agent)" },
      { label: "Appointment Shows", before: "Baseline", after: "+22% Improvement" }
    ]
  },
  {
    icon: Home$1,
    title: "Real Estate",
    subtext: "Lead qualification, showing coordination, and transaction milestone tracking.",
    metrics: [
      { label: "Speed-to-Lead", before: "1-2 Hours", after: "<1 Minute (Instant)" },
      { label: "Portal Lead Conv", before: "2%", after: "8% (+300% ↑)" },
      { label: "Showing Requests", before: "Manual Coordination", after: "Auto-Calibrated Booking" }
    ]
  },
  {
    icon: HardHat,
    title: "Home Services",
    subtext: "Roofing Company",
    metrics: [
      { label: "Lead Follow-Up Rate", before: "31%", after: "89% (+187% ↑)" },
      { label: "Response Time", before: "12+ hours", after: "<5 minutes" },
      { label: "Estimate Bookings", before: "Baseline", after: "+47% ↑" }
    ]
  },
  {
    icon: Scale,
    title: "Law Firms",
    subtext: "Personal Injury Firm",
    metrics: [
      { label: "Consultation Avail", before: "Business hours only", after: "24/7" },
      { label: "Qualified Case Intakes", before: "Baseline", after: "+67% ↑" },
      { label: "ROI", before: "Baseline", after: "4.5x (6 months) ↑" }
    ]
  },
  {
    icon: Sparkles,
    title: "MedSpas",
    subtext: "Premier MedSpa",
    metrics: [
      { label: "Consultation Bookings", before: "Baseline", after: "+127% ↑" },
      { label: "No-Show Rate", before: "High", after: "-64% (Decrease)" },
      { label: "Treatment Packages", before: "Baseline", after: "+203% ↑" }
    ]
  }
];
function IndustryCardComponent({ card }) {
  const Icon = card.icon;
  return /* @__PURE__ */ jsxs("div", { className: "w-[360px] h-[320px] flex-shrink-0 p-6 rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-900/80 to-zinc-950 shadow-xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-5", children: [
      /* @__PURE__ */ jsx("div", { className: "w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5 text-primary" }) }),
      /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-display font-semibold text-white truncate", children: card.title }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-500 text-xs leading-relaxed line-clamp-2", children: card.subtext })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-2 pb-2 border-b border-white/5", children: [
        /* @__PURE__ */ jsx("div", { className: "text-[10px] font-mono text-slate-600 uppercase tracking-wider" }),
        /* @__PURE__ */ jsx("div", { className: "text-[10px] font-mono text-slate-600 uppercase tracking-wider text-center", children: "Before" }),
        /* @__PURE__ */ jsx("div", { className: "text-[10px] font-mono text-primary/70 uppercase tracking-wider text-center", children: "After" })
      ] }),
      card.metrics.map((metric, index) => /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-2 py-2.5 border-b border-white/5 last:border-b-0", children: [
        /* @__PURE__ */ jsx("div", { className: "text-[11px] text-slate-400 font-medium", children: metric.label }),
        /* @__PURE__ */ jsx("div", { className: "text-[11px] text-slate-500 text-center", children: metric.before }),
        /* @__PURE__ */ jsx("div", { className: "text-[11px] text-primary font-semibold text-center", children: metric.after })
      ] }, index))
    ] })
  ] });
}
function IndustryCarousel() {
  const duplicatedCards = [...industries$1, ...industries$1];
  return /* @__PURE__ */ jsxs("section", { className: "py-32 relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        className: "text-center mb-16",
        children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-4xl md:text-5xl font-display font-medium mb-4", children: [
            "Tailored for ",
            /* @__PURE__ */ jsx("span", { className: "text-primary", children: "High-Impact" }),
            " Results"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-lg", children: "Real metrics from real businesses." })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" }),
      /* @__PURE__ */ jsx("div", { className: "absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" }),
      /* @__PURE__ */ jsx("div", { className: "flex overflow-hidden", children: /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "flex gap-6",
          animate: {
            x: [0, -2280]
          },
          transition: {
            x: {
              duration: 40,
              repeat: Infinity,
              ease: "linear"
            }
          },
          children: duplicatedCards.map((card, index) => /* @__PURE__ */ jsx(IndustryCardComponent, { card }, index))
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6", children: /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        className: "text-center mt-12",
        children: /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "outline",
            className: "border-white/10 hover:border-primary/30 hover:bg-white/5 text-white px-8 h-12 rounded-full font-medium",
            children: [
              "View All Case Studies ",
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 ml-2" })
            ]
          }
        )
      }
    ) })
  ] });
}
function SEO({
  title,
  description,
  canonicalUrl,
  ogImage = "https://replit.com/public/images/opengraph.png",
  ogType = "website",
  twitterCard = "summary_large_image",
  jsonLd
}) {
  useEffect(() => {
    document.title = title;
    const updateMeta = (property, content, isName = false) => {
      const attr = isName ? "name" : "property";
      let element = document.querySelector(`meta[${attr}="${property}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, property);
        document.head.appendChild(element);
      }
      element.content = content;
    };
    updateMeta("description", description, true);
    updateMeta("og:title", title);
    updateMeta("og:description", description);
    updateMeta("og:type", ogType);
    updateMeta("og:image", ogImage);
    updateMeta("twitter:title", title);
    updateMeta("twitter:description", description);
    updateMeta("twitter:card", twitterCard);
    updateMeta("twitter:image", ogImage);
    if (canonicalUrl) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = canonicalUrl;
    }
    if (jsonLd) {
      const existingScript = document.querySelector("script[data-seo-jsonld]");
      if (existingScript) {
        existingScript.remove();
      }
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo-jsonld", "true");
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
    return () => {
      const jsonLdScript = document.querySelector("script[data-seo-jsonld]");
      if (jsonLdScript) {
        jsonLdScript.remove();
      }
    };
  }, [title, description, canonicalUrl, ogImage, ogType, twitterCard, jsonLd]);
  return null;
}
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SimpleSequence",
  description: "Operational AI Advisor helping service businesses adopt AI with clarity, precision, and real-world leverage.",
  url: "https://simplesequence.com",
  logo: "https://simplesequence.com/favicon.png",
  sameAs: [],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    availableLanguage: "English"
  }
};
const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "SimpleSequence",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: "AI-powered front desk and follow-up system for service businesses. Handles phone, SMS, chat, and forms automatically.",
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "297",
    highPrice: "997",
    priceCurrency: "USD",
    offerCount: "3"
  }
};
function createOfferSchema(tier) {
  return {
    "@context": "https://schema.org",
    "@type": "Offer",
    name: tier.name,
    description: tier.description,
    price: tier.price,
    priceCurrency: "USD",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: tier.price,
      priceCurrency: "USD",
      unitText: "month"
    }
  };
}
function createFAQSchema(faqs2) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs2.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}
function MobileAccordion({
  title,
  children,
  defaultOpen = false
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return /* @__PURE__ */ jsxs("div", { className: "border-b border-white/5 md:border-none", children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => setIsOpen(!isOpen),
        className: "flex items-center justify-between w-full py-3 md:hidden text-left",
        "data-testid": `footer-accordion-${title.toLowerCase().replace(/\s+/g, "-")}`,
        children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold text-white uppercase tracking-wider", children: title }),
          /* @__PURE__ */ jsx(
            ChevronDown,
            {
              className: `w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: `${isOpen ? "block" : "hidden"} md:block pb-3 md:pb-0`, children: [
      /* @__PURE__ */ jsx("h4", { className: "hidden md:block text-xs font-semibold text-white uppercase tracking-wider mb-3", children: title }),
      children
    ] })
  ] });
}
function Footer() {
  return /* @__PURE__ */ jsxs("footer", { className: "bg-zinc-950 border-t border-white/5 relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(var(--primary),0.03),transparent_50%)]" }),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 relative z-10", children: [
      /* @__PURE__ */ jsx("div", { className: "py-8 md:py-10", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-5 lg:col-span-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsx("div", { className: "w-2.5 h-2.5 bg-primary rounded-sm shadow-[0_0_8px_var(--color-primary)]" }),
            /* @__PURE__ */ jsx("span", { className: "font-mono font-bold text-base tracking-tighter text-white", children: "SimpleSequence" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-primary/80 font-medium text-xs mb-1", children: "Practical AI for Service Businesses" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-xs leading-relaxed", children: "Clarity-first systems. Smarter workflows. Better decisions." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "md:col-span-4 lg:col-span-4", children: /* @__PURE__ */ jsx(MobileAccordion, { title: "Navigation", children: /* @__PURE__ */ jsx("ul", { className: "flex flex-wrap gap-x-4 gap-y-1.5 md:gap-x-5", children: [
          { name: "Home", href: "/" },
          { name: "Solutions", href: "/solutions" },
          { name: "Industries", href: "/industries" },
          { name: "Process", href: "/process" },
          { name: "Offers", href: "/offers" },
          { name: "Blog", href: "/blog" }
        ].map((link) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
          "a",
          {
            href: link.href,
            className: "text-slate-400 hover:text-primary transition-colors text-xs",
            "data-testid": `footer-link-${link.name.toLowerCase()}`,
            children: link.name
          }
        ) }, link.name)) }) }) }),
        /* @__PURE__ */ jsx("div", { className: "md:col-span-3 lg:col-span-3", children: /* @__PURE__ */ jsx(MobileAccordion, { title: "Company", children: /* @__PURE__ */ jsx("ul", { className: "flex flex-wrap gap-x-4 gap-y-1.5 md:gap-x-5", children: [
          { name: "Contact", href: "/contact" },
          { name: "Privacy", href: "/privacy" },
          { name: "Terms", href: "/terms" }
        ].map((link) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
          "a",
          {
            href: link.href,
            className: "text-slate-400 hover:text-primary transition-colors text-xs",
            "data-testid": `footer-link-${link.name.toLowerCase().replace(/\s+/g, "-")}`,
            children: link.name
          }
        ) }, link.name)) }) }) })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "py-4 border-t border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsx("p", { className: "text-slate-500 text-xs", children: "© SimpleSequence.ai  Practical AI, thoughtfully applied." }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-primary/50" }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-600 font-mono", children: "Operational AI Advisor™" })
        ] })
      ] }) })
    ] })
  ] });
}
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background text-foreground selection:bg-cyan-500/30 selection:text-cyan-100 font-sans overflow-x-hidden", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("main", { role: "main", children }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
function Header() {
  return /* @__PURE__ */ jsx(
    motion.header,
    {
      initial: { y: -100 },
      animate: { y: 0 },
      transition: { duration: 0.6, delay: 0.2 },
      className: "fixed top-0 w-full z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl",
      role: "banner",
      children: /* @__PURE__ */ jsxs("nav", { className: "container mx-auto px-6 h-20 flex items-center justify-between", role: "navigation", "aria-label": "Main navigation", children: [
        /* @__PURE__ */ jsxs("a", { href: "/", className: "font-mono font-bold text-lg tracking-tighter flex items-center gap-2", "aria-label": "SimpleSequence Home", children: [
          /* @__PURE__ */ jsx("div", { className: "w-3 h-3 bg-primary rounded-sm shadow-[0_0_10px_var(--color-primary)]", "aria-hidden": "true" }),
          "SimpleSequence"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "hidden md:flex gap-10 text-sm font-medium text-muted-foreground", children: [
          /* @__PURE__ */ jsx("a", { href: "/solutions", className: "hover:text-primary transition-colors duration-300", children: "Solutions" }),
          /* @__PURE__ */ jsx("a", { href: "/industries", className: "hover:text-primary transition-colors duration-300", children: "Industries" }),
          /* @__PURE__ */ jsx("a", { href: "/process", className: "hover:text-primary transition-colors duration-300", children: "Process" }),
          /* @__PURE__ */ jsx("a", { href: "/offers", className: "hover:text-primary transition-colors duration-300", children: "Offers" })
        ] })
      ] })
    }
  );
}
const founderPhoto = "/assets/Untitled_design_1764887004065-C4jsJaxv.png";
const inputs = [
  { id: 1, label: "PHONE", y: 40, icon: "M12 18.5c-4.1 0-7.5-3.4-7.5-7.5S7.9 3.5 12 3.5s7.5 3.4 7.5 7.5-3.4 7.5-7.5 7.5zm0-13c-3 0-5.5 2.5-5.5 5.5s2.5 5.5 5.5 5.5 5.5-2.5 5.5-5.5-2.5-5.5-5.5-5.5z M15 11h-2V9c0-.6-.4-1-1-1s-1 .4-1 1v3c0 .6.4 1 1 1h3c.6 0 1-.4 1-1s-.4-1-1-1z" },
  { id: 2, label: "EMAIL", y: 90, icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm16 2l-8 5-8-5v12h16V6zm-8 3.5L20 4H4l8 5.5z" },
  { id: 3, label: "CHAT", y: 140, icon: "M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5z" },
  { id: 4, label: "FORMS", y: 190, icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4zM8 13h8v2H8v-2zm0 4h8v2H8v-2z" }
];
const coreNodes = [
  { id: 1, label: "INTELLIGENT ROUTING", y: 70 },
  { id: 2, label: "AUTOMATED PROCESSING", y: 120 },
  { id: 3, label: "DATA ENRICHMENT", y: 170 }
];
const outputs = [
  { id: 1, label: "CRM RECORD", y: 55, icon: "M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7C5 4 4 5 4 7zm2 0c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v10c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V7z M8 9h8v2H8V9zm0 4h5v2H8v-2z" },
  { id: 2, label: "REVENUE PIPELINE", y: 115, icon: "M3 17l6-6 4 4 8-8v3h2V4h-6v2h3l-7 7-4-4-7 7 1.5 1z" },
  { id: 3, label: "STRATEGIC INSIGHTS", y: 175, icon: "M12 2a7 7 0 0 0-7 7c0 2.4 1.2 4.5 3 5.7V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.3c1.8-1.3 3-3.4 3-5.7a7 7 0 0 0-7-7zm2 14h-4v-1h4v1zm1-3H9v-1h6v1zm.3-3.3l-1.4 1.4-.9-.9-1 1-.9-.9 1-1-.9-.9 1.4-1.4.9.9 1-1 .9.9-1 1 .9.9z" }
];
function ArchitectFlowDiagram() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: "relative w-full max-w-lg aspect-[16/10]",
      "data-testid": "architect-flow-diagram",
      children: /* @__PURE__ */ jsxs(
        "svg",
        {
          viewBox: "0 0 500 240",
          className: "w-full h-full",
          style: { filter: "drop-shadow(0 0 20px rgba(103,232,249,0.15))" },
          children: [
            /* @__PURE__ */ jsxs("defs", { children: [
              /* @__PURE__ */ jsxs("linearGradient", { id: "flowGradient", x1: "0%", y1: "0%", x2: "100%", y2: "0%", children: [
                /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "rgba(103,232,249,0.3)" }),
                /* @__PURE__ */ jsx("stop", { offset: "50%", stopColor: "rgba(103,232,249,0.8)" }),
                /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "rgba(103,232,249,0.3)" })
              ] }),
              /* @__PURE__ */ jsxs("linearGradient", { id: "coreGradient", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
                /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "rgba(103,232,249,0.15)" }),
                /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "rgba(103,232,249,0.05)" })
              ] }),
              /* @__PURE__ */ jsxs("filter", { id: "glow", children: [
                /* @__PURE__ */ jsx("feGaussianBlur", { stdDeviation: "3", result: "coloredBlur" }),
                /* @__PURE__ */ jsxs("feMerge", { children: [
                  /* @__PURE__ */ jsx("feMergeNode", { in: "coloredBlur" }),
                  /* @__PURE__ */ jsx("feMergeNode", { in: "SourceGraphic" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("filter", { id: "strongGlow", children: [
                /* @__PURE__ */ jsx("feGaussianBlur", { stdDeviation: "4", result: "coloredBlur" }),
                /* @__PURE__ */ jsxs("feMerge", { children: [
                  /* @__PURE__ */ jsx("feMergeNode", { in: "coloredBlur" }),
                  /* @__PURE__ */ jsx("feMergeNode", { in: "coloredBlur" }),
                  /* @__PURE__ */ jsx("feMergeNode", { in: "SourceGraphic" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("filter", { id: "iconGlow", children: [
                /* @__PURE__ */ jsx("feGaussianBlur", { stdDeviation: "1.5", result: "coloredBlur" }),
                /* @__PURE__ */ jsxs("feMerge", { children: [
                  /* @__PURE__ */ jsx("feMergeNode", { in: "coloredBlur" }),
                  /* @__PURE__ */ jsx("feMergeNode", { in: "SourceGraphic" })
                ] })
              ] })
            ] }),
            inputs.map((input, i) => /* @__PURE__ */ jsxs(motion.g, { children: [
              /* @__PURE__ */ jsx(
                motion.rect,
                {
                  x: "10",
                  y: input.y,
                  width: "75",
                  height: "36",
                  rx: "5",
                  fill: "rgba(24,24,27,0.95)",
                  stroke: "rgba(103,232,249,0.6)",
                  strokeWidth: "1.5",
                  initial: { opacity: 0, x: -20 },
                  animate: isInView ? { opacity: 1, x: 0 } : {},
                  transition: { duration: 0.5, delay: 0.2 + i * 0.1 }
                }
              ),
              /* @__PURE__ */ jsx(
                motion.g,
                {
                  initial: { opacity: 0 },
                  animate: isInView ? { opacity: 1 } : {},
                  transition: { delay: 0.35 + i * 0.1 },
                  children: /* @__PURE__ */ jsx("g", { transform: `translate(${18}, ${input.y + 8}) scale(0.7)`, children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      d: input.icon,
                      fill: "rgba(103,232,249,0.9)",
                      filter: "url(#iconGlow)"
                    }
                  ) })
                }
              ),
              /* @__PURE__ */ jsx(
                motion.text,
                {
                  x: "55",
                  y: input.y + 23,
                  textAnchor: "middle",
                  fill: "rgba(103,232,249,0.95)",
                  className: "text-[7px] font-semibold tracking-wider",
                  initial: { opacity: 0 },
                  animate: isInView ? { opacity: 1 } : {},
                  transition: { delay: 0.4 + i * 0.1 },
                  children: input.label
                }
              )
            ] }, input.id)),
            /* @__PURE__ */ jsx(
              motion.text,
              {
                x: "47",
                y: "28",
                textAnchor: "middle",
                fill: "rgba(103,232,249,0.5)",
                className: "text-[6px] font-mono uppercase tracking-widest",
                initial: { opacity: 0 },
                animate: isInView ? { opacity: 1 } : {},
                transition: { delay: 0.8 },
                children: "Raw Inputs"
              }
            ),
            inputs.map((input, i) => /* @__PURE__ */ jsx(
              motion.path,
              {
                d: `M 85 ${input.y + 18} Q 115 ${input.y + 18} 140 120`,
                fill: "none",
                stroke: "rgba(103,232,249,0.4)",
                strokeWidth: "1.5",
                initial: { pathLength: 0, opacity: 0 },
                animate: isInView ? { pathLength: 1, opacity: 1 } : {},
                transition: { duration: 0.8, delay: 0.6 + i * 0.1 }
              },
              `path-in-${input.id}`
            )),
            /* @__PURE__ */ jsxs(
              motion.g,
              {
                initial: { opacity: 0, scale: 0.9 },
                animate: isInView ? { opacity: 1, scale: 1 } : {},
                transition: { duration: 0.6, delay: 0.8 },
                children: [
                  /* @__PURE__ */ jsx(
                    motion.rect,
                    {
                      x: "150",
                      y: "35",
                      width: "200",
                      height: "175",
                      rx: "10",
                      fill: "url(#coreGradient)",
                      stroke: "rgba(103,232,249,0.7)",
                      strokeWidth: "2",
                      filter: "url(#glow)"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    motion.text,
                    {
                      x: "250",
                      y: "55",
                      textAnchor: "middle",
                      fill: "rgba(103,232,249,1)",
                      className: "text-[8px] font-bold tracking-widest",
                      initial: { opacity: 0 },
                      animate: isInView ? { opacity: 1 } : {},
                      transition: { delay: 1 },
                      children: "ENGINEERED CORE"
                    }
                  ),
                  coreNodes.map((node, i) => /* @__PURE__ */ jsxs(motion.g, { children: [
                    /* @__PURE__ */ jsx(
                      motion.rect,
                      {
                        x: "170",
                        y: node.y,
                        width: "160",
                        height: "34",
                        rx: "6",
                        fill: "rgba(24,24,27,0.9)",
                        stroke: "rgba(103,232,249,0.5)",
                        strokeWidth: "1",
                        initial: { opacity: 0, x: 10 },
                        animate: isInView ? { opacity: 1, x: 0 } : {},
                        transition: { duration: 0.4, delay: 1.1 + i * 0.15 }
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      motion.text,
                      {
                        x: "250",
                        y: node.y + 21,
                        textAnchor: "middle",
                        fill: "rgba(255,255,255,0.9)",
                        className: "text-[7px] font-medium tracking-wide",
                        initial: { opacity: 0 },
                        animate: isInView ? { opacity: 1 } : {},
                        transition: { delay: 1.2 + i * 0.15 },
                        children: node.label
                      }
                    )
                  ] }, node.id)),
                  /* @__PURE__ */ jsx(
                    motion.path,
                    {
                      d: "M 340 87 Q 355 87 355 120 Q 355 153 340 153",
                      fill: "none",
                      stroke: "rgba(103,232,249,0.4)",
                      strokeWidth: "1.5",
                      strokeDasharray: "4 2",
                      initial: { pathLength: 0 },
                      animate: isInView ? { pathLength: 1 } : {},
                      transition: { duration: 1, delay: 1.5 }
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    motion.path,
                    {
                      d: "M 160 153 Q 145 153 145 120 Q 145 87 160 87",
                      fill: "none",
                      stroke: "rgba(103,232,249,0.4)",
                      strokeWidth: "1.5",
                      strokeDasharray: "4 2",
                      initial: { pathLength: 0 },
                      animate: isInView ? { pathLength: 1 } : {},
                      transition: { duration: 1, delay: 1.6 }
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    motion.circle,
                    {
                      cx: "355",
                      cy: "120",
                      r: "0",
                      fill: "rgba(103,232,249,0.9)",
                      animate: isInView ? {
                        r: [0, 4, 0],
                        cy: [87, 153, 87]
                      } : {},
                      transition: {
                        duration: 2.5,
                        repeat: Infinity,
                        delay: 2,
                        ease: "easeInOut"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    motion.circle,
                    {
                      cx: "145",
                      cy: "120",
                      r: "0",
                      fill: "rgba(103,232,249,0.9)",
                      animate: isInView ? {
                        r: [0, 4, 0],
                        cy: [153, 87, 153]
                      } : {},
                      transition: {
                        duration: 2.5,
                        repeat: Infinity,
                        delay: 2.3,
                        ease: "easeInOut"
                      }
                    }
                  )
                ]
              }
            ),
            outputs.map((output, i) => /* @__PURE__ */ jsx(
              motion.path,
              {
                d: `M 350 120 Q 380 120 400 ${output.y + 22}`,
                fill: "none",
                stroke: "rgba(103,232,249,0.5)",
                strokeWidth: "2",
                initial: { pathLength: 0, opacity: 0 },
                animate: isInView ? { pathLength: 1, opacity: 1 } : {},
                transition: { duration: 0.8, delay: 1.8 + i * 0.1 }
              },
              `path-out-${output.id}`
            )),
            outputs.map((output, i) => /* @__PURE__ */ jsxs(motion.g, { children: [
              /* @__PURE__ */ jsx(
                motion.rect,
                {
                  x: "405",
                  y: output.y,
                  width: "88",
                  height: "44",
                  rx: "5",
                  fill: "rgba(24,24,27,0.95)",
                  stroke: "rgba(103,232,249,0.8)",
                  strokeWidth: "2",
                  filter: "url(#glow)",
                  initial: { opacity: 0, x: 20 },
                  animate: isInView ? { opacity: 1, x: 0 } : {},
                  transition: { duration: 0.5, delay: 2 + i * 0.15 }
                }
              ),
              /* @__PURE__ */ jsx(
                motion.g,
                {
                  initial: { opacity: 0 },
                  animate: isInView ? { opacity: 1 } : {},
                  transition: { delay: 2.15 + i * 0.15 },
                  children: /* @__PURE__ */ jsx("g", { transform: `translate(${413}, ${output.y + 12}) scale(0.8)`, children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      d: output.icon,
                      fill: "rgba(103,232,249,0.9)",
                      filter: "url(#iconGlow)"
                    }
                  ) })
                }
              ),
              /* @__PURE__ */ jsx(
                motion.text,
                {
                  x: "458",
                  y: output.y + 18,
                  textAnchor: "middle",
                  fill: "rgba(103,232,249,1)",
                  className: "text-[5px] font-bold tracking-wider",
                  initial: { opacity: 0 },
                  animate: isInView ? { opacity: 1 } : {},
                  transition: { delay: 2.2 + i * 0.15 },
                  children: output.label.split(" ")[0]
                }
              ),
              /* @__PURE__ */ jsx(
                motion.text,
                {
                  x: "458",
                  y: output.y + 30,
                  textAnchor: "middle",
                  fill: "rgba(103,232,249,0.8)",
                  className: "text-[5px] font-bold tracking-wider",
                  initial: { opacity: 0 },
                  animate: isInView ? { opacity: 1 } : {},
                  transition: { delay: 2.2 + i * 0.15 },
                  children: output.label.split(" ").slice(1).join(" ")
                }
              )
            ] }, output.id)),
            /* @__PURE__ */ jsx(
              motion.text,
              {
                x: "449",
                y: "232",
                textAnchor: "middle",
                fill: "rgba(103,232,249,0.5)",
                className: "text-[6px] font-mono uppercase tracking-widest",
                initial: { opacity: 0 },
                animate: isInView ? { opacity: 1 } : {},
                transition: { delay: 2.5 },
                children: "Reliable Outputs"
              }
            ),
            [0, 1, 2].map((i) => /* @__PURE__ */ jsx(
              motion.circle,
              {
                r: "3",
                fill: "rgba(103,232,249,0.95)",
                filter: "url(#strongGlow)",
                initial: { opacity: 0 },
                animate: isInView ? {
                  opacity: [0, 1, 1, 1, 0],
                  cx: [47, 115, 250, 380, 449],
                  cy: [90 + i * 30, 120, 120, 120, 77 + i * 60]
                } : {},
                transition: {
                  duration: 4,
                  repeat: Infinity,
                  delay: 2.5 + i * 1.2,
                  ease: "easeInOut"
                }
              },
              `packet-${i}`
            ))
          ]
        }
      )
    }
  );
}
const systemNodes = [
  { id: 1, label: "Intake", x: 60, y: 80, hasFriction: false },
  { id: 2, label: "CRM", x: 180, y: 60, hasFriction: true },
  { id: 3, label: "Scheduling", x: 300, y: 90, hasFriction: false },
  { id: 4, label: "Follow-up", x: 120, y: 180, hasFriction: true },
  { id: 5, label: "Billing", x: 240, y: 200, hasFriction: false },
  { id: 6, label: "Reporting", x: 340, y: 170, hasFriction: true }
];
const connections = [
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 2, to: 4 },
  { from: 3, to: 5 },
  { from: 4, to: 5 },
  { from: 5, to: 6 }
];
function DiagnoseFrictionDiagram() {
  const getNode = (id) => systemNodes.find((n) => n.id === id);
  return /* @__PURE__ */ jsx("div", { className: "relative w-full max-w-md aspect-[4/3]", "data-testid": "diagnose-friction-diagram", children: /* @__PURE__ */ jsxs(
    "svg",
    {
      viewBox: "0 0 400 280",
      className: "w-full h-full",
      style: { filter: "drop-shadow(0 0 15px rgba(103,232,249,0.1))" },
      children: [
        /* @__PURE__ */ jsxs("defs", { children: [
          /* @__PURE__ */ jsxs("filter", { id: "scanGlow", children: [
            /* @__PURE__ */ jsx("feGaussianBlur", { stdDeviation: "4", result: "coloredBlur" }),
            /* @__PURE__ */ jsxs("feMerge", { children: [
              /* @__PURE__ */ jsx("feMergeNode", { in: "coloredBlur" }),
              /* @__PURE__ */ jsx("feMergeNode", { in: "SourceGraphic" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("linearGradient", { id: "scanLine", x1: "0%", y1: "0%", x2: "0%", y2: "100%", children: [
            /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "rgba(103,232,249,0)" }),
            /* @__PURE__ */ jsx("stop", { offset: "50%", stopColor: "rgba(103,232,249,0.8)" }),
            /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "rgba(103,232,249,0)" })
          ] })
        ] }),
        connections.map((conn, i) => {
          const from = getNode(conn.from);
          const to = getNode(conn.to);
          return /* @__PURE__ */ jsx(
            motion.line,
            {
              x1: from.x,
              y1: from.y,
              x2: to.x,
              y2: to.y,
              stroke: "rgba(103,232,249,0.25)",
              strokeWidth: "1.5",
              strokeDasharray: "4 4",
              initial: { pathLength: 0 },
              animate: { pathLength: 1 },
              transition: { duration: 1, delay: i * 0.1 }
            },
            `conn-${i}`
          );
        }),
        /* @__PURE__ */ jsx(
          motion.rect,
          {
            x: "0",
            y: "0",
            width: "400",
            height: "40",
            fill: "url(#scanLine)",
            initial: { y: -40 },
            animate: { y: 280 },
            transition: {
              duration: 3,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 1
            }
          }
        ),
        systemNodes.map((node, i) => /* @__PURE__ */ jsxs(
          motion.g,
          {
            initial: { opacity: 0, scale: 0.8 },
            animate: { opacity: 1, scale: 1 },
            transition: { duration: 0.4, delay: i * 0.1 },
            children: [
              /* @__PURE__ */ jsx(
                motion.rect,
                {
                  x: node.x - 35,
                  y: node.y - 18,
                  width: "70",
                  height: "36",
                  rx: "6",
                  fill: "rgba(24,24,27,0.95)",
                  stroke: node.hasFriction ? "rgba(103,232,249,0.9)" : "rgba(103,232,249,0.35)",
                  strokeWidth: "1.5",
                  animate: node.hasFriction ? {
                    stroke: ["rgba(103,232,249,0.7)", "rgba(103,232,249,1)", "rgba(103,232,249,0.7)"],
                    filter: [
                      "drop-shadow(0 0 4px rgba(103,232,249,0.3))",
                      "drop-shadow(0 0 12px rgba(103,232,249,0.8))",
                      "drop-shadow(0 0 4px rgba(103,232,249,0.3))"
                    ]
                  } : {},
                  transition: { duration: 2, repeat: Infinity, delay: i * 0.3 }
                }
              ),
              /* @__PURE__ */ jsx(
                "text",
                {
                  x: node.x,
                  y: node.y + 4,
                  textAnchor: "middle",
                  className: "fill-white text-[10px] font-medium",
                  children: node.label
                }
              ),
              node.hasFriction && /* @__PURE__ */ jsxs(
                motion.g,
                {
                  initial: { opacity: 0, scale: 0 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { duration: 0.3, delay: 1.5 + i * 0.2 },
                  children: [
                    /* @__PURE__ */ jsx(
                      "circle",
                      {
                        cx: node.x + 30,
                        cy: node.y - 12,
                        r: "8",
                        fill: "rgba(103,232,249,0.95)"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "text",
                      {
                        x: node.x + 30,
                        y: node.y - 8,
                        textAnchor: "middle",
                        className: "fill-zinc-900 text-[8px] font-bold",
                        children: "!"
                      }
                    )
                  ]
                }
              )
            ]
          },
          node.id
        )),
        /* @__PURE__ */ jsx(
          motion.text,
          {
            x: "200",
            y: "260",
            textAnchor: "middle",
            fill: "rgba(103,232,249,0.7)",
            className: "text-[9px] font-mono uppercase tracking-wider",
            initial: { opacity: 0 },
            animate: { opacity: [0.5, 1, 0.5] },
            transition: { duration: 2, repeat: Infinity },
            children: "Scanning for friction points..."
          }
        )
      ]
    }
  ) });
}
const milestones = [
  { id: 1, label: "LEAD IN", x: 60, y: 190 },
  { id: 2, label: "QUALIFY", x: 140, y: 155 },
  { id: 3, label: "CONSULT", x: 220, y: 115 },
  { id: 4, label: "PROPOSE", x: 300, y: 75 },
  { id: 5, label: "CLOSE", x: 380, y: 35, isWin: true }
];
const curvePath = "M 60 190 Q 100 175 140 155 Q 180 130 220 115 Q 260 95 300 75 Q 340 55 380 35";
function MapSequencesDiagram() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const totalMilestones = milestones.length;
  const sequenceDuration = 1.2;
  const sequenceDelay = 0.6;
  const totalSequenceTime = (totalMilestones - 1) * sequenceDelay + sequenceDuration;
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: "relative w-full max-w-md aspect-[4/3]",
      "data-testid": "map-sequences-diagram",
      children: /* @__PURE__ */ jsxs(
        "svg",
        {
          viewBox: "0 0 440 240",
          className: "w-full h-full",
          style: { filter: "drop-shadow(0 0 25px rgba(103,232,249,0.2))" },
          children: [
            /* @__PURE__ */ jsxs("defs", { children: [
              /* @__PURE__ */ jsxs("linearGradient", { id: "curveGradient", x1: "0%", y1: "100%", x2: "100%", y2: "0%", children: [
                /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "rgba(103,232,249,0.5)" }),
                /* @__PURE__ */ jsx("stop", { offset: "50%", stopColor: "rgba(103,232,249,0.9)" }),
                /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "rgba(147,197,253,1)" })
              ] }),
              /* @__PURE__ */ jsxs("filter", { id: "glow", children: [
                /* @__PURE__ */ jsx("feGaussianBlur", { stdDeviation: "4", result: "coloredBlur" }),
                /* @__PURE__ */ jsxs("feMerge", { children: [
                  /* @__PURE__ */ jsx("feMergeNode", { in: "coloredBlur" }),
                  /* @__PURE__ */ jsx("feMergeNode", { in: "SourceGraphic" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("filter", { id: "strongGlow", children: [
                /* @__PURE__ */ jsx("feGaussianBlur", { stdDeviation: "6", result: "coloredBlur" }),
                /* @__PURE__ */ jsxs("feMerge", { children: [
                  /* @__PURE__ */ jsx("feMergeNode", { in: "coloredBlur" }),
                  /* @__PURE__ */ jsx("feMergeNode", { in: "coloredBlur" }),
                  /* @__PURE__ */ jsx("feMergeNode", { in: "SourceGraphic" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("radialGradient", { id: "dotFill", cx: "30%", cy: "30%", r: "70%", children: [
                /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "rgba(255,255,255,1)" }),
                /* @__PURE__ */ jsx("stop", { offset: "40%", stopColor: "rgba(147,197,253,1)" }),
                /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "rgba(103,232,249,1)" })
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              motion.path,
              {
                d: curvePath,
                fill: "none",
                stroke: "rgba(103,232,249,0.15)",
                strokeWidth: "14",
                strokeLinecap: "round",
                initial: { pathLength: 0, opacity: 0 },
                animate: isInView ? { pathLength: 1, opacity: 0.4 } : {},
                transition: { duration: 3.5, ease: "easeOut", delay: 0.3 }
              }
            ),
            /* @__PURE__ */ jsx(
              motion.path,
              {
                d: curvePath,
                fill: "none",
                stroke: "url(#curveGradient)",
                strokeWidth: "3.5",
                strokeLinecap: "round",
                filter: "url(#glow)",
                initial: { pathLength: 0, opacity: 0 },
                animate: isInView ? { pathLength: 1, opacity: 1 } : {},
                transition: { duration: 3.5, ease: "easeOut", delay: 0.3 }
              }
            ),
            milestones.map((milestone, i) => {
              const isWin = milestone.isWin;
              const dotSize = isWin ? 14 : 11;
              const glowSize = isWin ? 32 : 26;
              const pulseStartDelay = 4 + i * sequenceDelay;
              return /* @__PURE__ */ jsxs(motion.g, { children: [
                /* @__PURE__ */ jsx(
                  motion.circle,
                  {
                    cx: milestone.x,
                    cy: milestone.y,
                    r: glowSize,
                    fill: "rgba(103,232,249,0.1)",
                    initial: { scale: 0, opacity: 0 },
                    animate: isInView ? { scale: 1, opacity: 0.6 } : {},
                    transition: { duration: 0.8, delay: 1.2 + i * 0.5, ease: "easeOut" }
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.circle,
                  {
                    cx: milestone.x,
                    cy: milestone.y,
                    r: dotSize,
                    fill: "url(#dotFill)",
                    filter: isWin ? "url(#strongGlow)" : "url(#glow)",
                    initial: { scale: 0, opacity: 0 },
                    animate: isInView ? { scale: 1, opacity: 1 } : {},
                    transition: { duration: 0.6, delay: 1.4 + i * 0.5, ease: "backOut" }
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.circle,
                  {
                    cx: milestone.x,
                    cy: milestone.y,
                    r: dotSize,
                    fill: "transparent",
                    stroke: "rgba(147,197,253,0.7)",
                    strokeWidth: isWin ? 3 : 2,
                    initial: { scale: 1, opacity: 0 },
                    animate: isInView ? {
                      scale: [1, isWin ? 2.5 : 2, 1],
                      opacity: [0.8, 0, 0]
                    } : {},
                    transition: {
                      duration: sequenceDuration,
                      repeat: Infinity,
                      repeatDelay: totalSequenceTime - sequenceDuration,
                      delay: pulseStartDelay,
                      ease: "easeOut"
                    }
                  }
                ),
                isWin && /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx(
                    motion.circle,
                    {
                      cx: milestone.x,
                      cy: milestone.y,
                      r: dotSize,
                      fill: "transparent",
                      stroke: "rgba(103,232,249,0.6)",
                      strokeWidth: 2,
                      initial: { scale: 1, opacity: 0 },
                      animate: isInView ? {
                        scale: [1, 3.5, 1],
                        opacity: [0.6, 0, 0]
                      } : {},
                      transition: {
                        duration: 1.6,
                        repeat: Infinity,
                        repeatDelay: totalSequenceTime - 1.6,
                        delay: pulseStartDelay + 0.15,
                        ease: "easeOut"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    motion.circle,
                    {
                      cx: milestone.x,
                      cy: milestone.y,
                      r: 18,
                      fill: "transparent",
                      stroke: "rgba(103,232,249,0.4)",
                      strokeWidth: 1,
                      strokeDasharray: "4 4",
                      initial: { opacity: 0, rotate: 0 },
                      animate: isInView ? {
                        opacity: [0, 0.8, 0],
                        rotate: 360
                      } : {},
                      transition: {
                        duration: 3,
                        repeat: Infinity,
                        delay: pulseStartDelay,
                        ease: "linear"
                      }
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx(
                  motion.text,
                  {
                    x: milestone.x,
                    y: milestone.y - (isWin ? 24 : 20),
                    textAnchor: "middle",
                    fill: "rgba(103,232,249,0.95)",
                    className: `font-semibold uppercase tracking-wider ${isWin ? "text-[10px]" : "text-[9px]"}`,
                    initial: { opacity: 0, y: 5 },
                    animate: isInView ? { opacity: 1, y: 0 } : {},
                    transition: { duration: 0.6, delay: 1.6 + i * 0.5 },
                    children: milestone.label
                  }
                )
              ] }, milestone.id);
            })
          ]
        }
      )
    }
  );
}
const aiTasks = [
  { id: 1, label: "Triage", x: 70, y: 80 },
  { id: 2, label: "Routing", x: 40, y: 135 },
  { id: 3, label: "Follow-up", x: 100, y: 135 }
];
const humanTasks = [
  { id: 4, label: "Strategy", x: 330, y: 80 },
  { id: 5, label: "Negotiation", x: 300, y: 135 },
  { id: 6, label: "Relationships", x: 360, y: 135 }
];
function LocateLeverageDiagram() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: "relative w-full max-w-md aspect-[4/3]",
      "data-testid": "locate-leverage-diagram",
      children: /* @__PURE__ */ jsxs(
        "svg",
        {
          viewBox: "0 0 400 240",
          className: "w-full h-full",
          style: { filter: "drop-shadow(0 0 15px rgba(103,232,249,0.1))" },
          children: [
            /* @__PURE__ */ jsxs("defs", { children: [
              /* @__PURE__ */ jsxs("linearGradient", { id: "beamGradient", x1: "0%", y1: "0%", x2: "100%", y2: "0%", children: [
                /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "rgba(103,232,249,0.7)" }),
                /* @__PURE__ */ jsx("stop", { offset: "50%", stopColor: "rgba(103,232,249,0.9)" }),
                /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "rgba(103,232,249,0.7)" })
              ] }),
              /* @__PURE__ */ jsxs("filter", { id: "softGlow", children: [
                /* @__PURE__ */ jsx("feGaussianBlur", { stdDeviation: "2", result: "coloredBlur" }),
                /* @__PURE__ */ jsxs("feMerge", { children: [
                  /* @__PURE__ */ jsx("feMergeNode", { in: "coloredBlur" }),
                  /* @__PURE__ */ jsx("feMergeNode", { in: "SourceGraphic" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("radialGradient", { id: "aiTaskGlow", cx: "50%", cy: "50%", r: "50%", children: [
                /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "rgba(103,232,249,0.3)" }),
                /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "rgba(103,232,249,0)" })
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              motion.polygon,
              {
                points: "200,175 185,205 215,205",
                fill: "rgba(103,232,249,0.6)",
                initial: { opacity: 0, scale: 0 },
                animate: isInView ? { opacity: 1, scale: 1 } : {},
                transition: { duration: 0.8, delay: 0.2 }
              }
            ),
            /* @__PURE__ */ jsxs(
              motion.g,
              {
                initial: { rotate: 0 },
                animate: isInView ? { rotate: [-5, -1, -5] } : {},
                transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                style: { transformOrigin: "200px 175px" },
                children: [
                  /* @__PURE__ */ jsx(
                    motion.rect,
                    {
                      x: "35",
                      y: "170",
                      width: "330",
                      height: "10",
                      rx: "5",
                      fill: "url(#beamGradient)",
                      initial: { opacity: 0, scaleX: 0 },
                      animate: isInView ? { opacity: 1, scaleX: 1 } : {},
                      transition: { duration: 0.8, delay: 0.5 },
                      style: { transformOrigin: "200px 175px" }
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    motion.g,
                    {
                      initial: { opacity: 0 },
                      animate: isInView ? { opacity: 1 } : {},
                      transition: { delay: 0.8 },
                      children: aiTasks.map((task, i) => {
                        return /* @__PURE__ */ jsxs(motion.g, { children: [
                          /* @__PURE__ */ jsx(
                            motion.circle,
                            {
                              cx: task.x,
                              cy: task.y,
                              r: "32",
                              fill: "url(#aiTaskGlow)",
                              initial: { scale: 0, opacity: 0 },
                              animate: isInView ? {
                                scale: [1, 1.15, 1],
                                opacity: [0.3, 0.5, 0.3]
                              } : {},
                              transition: { duration: 3, repeat: Infinity, delay: 1.2 + i * 0.2 }
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            motion.circle,
                            {
                              cx: task.x,
                              cy: task.y,
                              r: "26",
                              fill: "rgba(24,24,27,0.95)",
                              stroke: "rgba(103,232,249,0.8)",
                              strokeWidth: "2",
                              filter: "url(#softGlow)",
                              initial: { scale: 0 },
                              animate: isInView ? { scale: 1 } : {},
                              transition: { duration: 0.5, delay: 1 + i * 0.1, type: "spring" }
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            motion.text,
                            {
                              x: task.x,
                              y: task.y + 4,
                              textAnchor: "middle",
                              className: "fill-white text-[9px] font-medium",
                              initial: { opacity: 0 },
                              animate: isInView ? { opacity: 1 } : {},
                              transition: { delay: 1.2 + i * 0.1 },
                              children: task.label
                            }
                          ),
                          /* @__PURE__ */ jsxs(
                            motion.g,
                            {
                              initial: { opacity: 0, y: 3 },
                              animate: isInView ? { opacity: 1, y: 0 } : {},
                              transition: { delay: 1.4 + i * 0.1 },
                              children: [
                                /* @__PURE__ */ jsx(
                                  "rect",
                                  {
                                    x: task.x - 10,
                                    y: task.y + 12,
                                    width: "20",
                                    height: "10",
                                    rx: "2",
                                    fill: "rgba(103,232,249,1)"
                                  }
                                ),
                                /* @__PURE__ */ jsx(
                                  "text",
                                  {
                                    x: task.x,
                                    y: task.y + 20,
                                    textAnchor: "middle",
                                    className: "fill-zinc-900 text-[6px] font-bold",
                                    children: "AI"
                                  }
                                )
                              ]
                            }
                          )
                        ] }, task.id);
                      })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    motion.g,
                    {
                      initial: { opacity: 0 },
                      animate: isInView ? { opacity: 1 } : {},
                      transition: { delay: 1.2 },
                      children: humanTasks.map((task, i) => {
                        return /* @__PURE__ */ jsxs(motion.g, { children: [
                          /* @__PURE__ */ jsx(
                            motion.circle,
                            {
                              cx: task.x,
                              cy: task.y,
                              r: "26",
                              fill: "rgba(24,24,27,0.95)",
                              stroke: "rgba(103,232,249,0.3)",
                              strokeWidth: "2",
                              initial: { scale: 0 },
                              animate: isInView ? { scale: 1 } : {},
                              transition: { duration: 0.5, delay: 1.4 + i * 0.1, type: "spring" }
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            motion.text,
                            {
                              x: task.x,
                              y: task.y + 4,
                              textAnchor: "middle",
                              className: "fill-white/60 text-[8px] font-medium",
                              initial: { opacity: 0 },
                              animate: isInView ? { opacity: 1 } : {},
                              transition: { delay: 1.6 + i * 0.1 },
                              children: task.label
                            }
                          )
                        ] }, task.id);
                      })
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              motion.text,
              {
                x: "70",
                y: "35",
                textAnchor: "middle",
                className: "text-[9px] font-mono uppercase tracking-wider",
                fill: "rgba(103,232,249,0.9)",
                initial: { opacity: 0, y: 10 },
                animate: isInView ? { opacity: 1, y: 0 } : {},
                transition: { delay: 1.8 },
                children: "AI Lifts"
              }
            ),
            /* @__PURE__ */ jsx(
              motion.text,
              {
                x: "330",
                y: "35",
                textAnchor: "middle",
                className: "text-[9px] font-mono uppercase tracking-wider",
                fill: "rgba(103,232,249,0.5)",
                initial: { opacity: 0, y: 10 },
                animate: isInView ? { opacity: 1, y: 0 } : {},
                transition: { delay: 1.9 },
                children: "Human Grounds"
              }
            )
          ]
        }
      )
    }
  );
}
const triageRoutingDiagram = "/assets/intelligent_triage_routing_workflow_diagram-ChMn2ANN.png";
const followUpDiagram = "/assets/follow-up_automation_sequence_diagram-C_5sRyvR.png";
const educationFaqDiagram = "/assets/education_faq_knowledge_base_diagram-L_A3OY-i.png";
const integrationRoiDiagram = "/assets/integration_roi_dashboard_diagram-CERKZCGh.png";
const fadeIn$1 = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};
const stagger$1 = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};
const fadeInUpViewport$1 = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7 }
};
const revenueFeatures = [
  {
    icon: Route,
    title: "Intelligent Triage & Routing",
    image: triageRoutingDiagram,
    frontDescription: "Automatically classifies every inbound touchpoint—from phone calls and texts to web forms, funnels, and social DMs—and routes urgency so humans only handle high-value conversations.",
    impact: "Every lead and call triaged before it hits your team",
    backIntro: "Simple Sequence listens first, then decides what should happen next. Every call, message, or form fill is classified and routed through rules tuned to your business.",
    backBullets: [
      "Intake from phone, SMS, web chat, GHL funnels/forms, and social DMs",
      "Detects new leads vs existing clients vs junk in real time",
      "Flags urgent issues (same-day requests, emergencies, escalations)",
      "Sends routine questions to AI and only escalates what truly needs a human",
      "Logs every interaction back into your CRM/EMR or GoHighLevel so nothing slips through"
    ],
    backOutcome: "Fewer interruptions, faster response times, therefore a calmer front desk that still captures every opportunity across all channels."
  },
  {
    icon: RefreshCw,
    title: "Follow-Up & Rebooking Engine",
    image: followUpDiagram,
    frontDescription: "Your team means well—but follow-up depends on memory and mood. No-shows vanish. Estimates expire. Old leads rot.",
    impact: "Every no-show, stale quote, and missed opportunity re-engaged automatically",
    backIntro: "Simple Sequence keeps chasing—politely, automatically, and on your behalf—until they book or say no.",
    backBullets: [
      "Multi-step SMS and email sequences for every lead stage",
      "Win-back campaigns for 'never booked' and no-show leads",
      "Automatic estimate follow-up before they go cold",
      "Personalized timing based on behavior and engagement",
      "Logs every interaction back into your CRM"
    ],
    backOutcome: "Predictable cash flow, silent churn eliminated, and revenue recovered without adding headcount."
  },
  {
    icon: Globe,
    title: "AI-Ready Web Conversion Layer",
    image: educationFaqDiagram,
    frontDescription: "Your site looks fine—but it doesn't respond, qualify, or convert. Visitors leave without ever raising their hand.",
    impact: "Your website becomes a 24/7 sales assistant",
    backIntro: "Simple Sequence turns passive traffic into active conversations and booked appointments—even when you're offline.",
    backBullets: [
      "AI chat that qualifies and books appointments instantly",
      "Captures intent from visitors who would otherwise bounce",
      "Answers common questions without human involvement",
      "Routes complex inquiries to the right team member",
      "Works after hours when competitors are offline"
    ],
    backOutcome: "More conversions from existing traffic, paid ad ROI that actually compounds, and zero missed after-hours opportunities."
  },
  {
    icon: Handshake,
    title: "White-Glove Integration & ROI",
    image: integrationRoiDiagram,
    frontDescription: "We handle the plumbing—phones, calendars, CRM/EMR, and automation—so critical workflows run in the background, held together by your people, not duct tape.",
    impact: "Critical workflows running consistently with human oversight maintained",
    backIntro: "You don't need another disconnected tool. You need a system that reduces manual load while keeping human judgment where it matters most.",
    backBullets: [
      "Done-for-you setup across phone systems, chat widgets, GHL pipelines, calendars, and EMR/CRMs",
      "Critical workflows running consistently in the background with zero intervention",
      "Reduced manual load so your team focuses on judgment calls, not data entry",
      "Dashboards that track calls handled, leads captured, show-rate, and projected revenue",
      "System oversight preserved—humans stay in control of what matters"
    ],
    backOutcome: "A front desk you can actually measure and improve, with workflows that don't break when you step away—and real-time visibility into what's working."
  }
];
function RevenueFeatureRow({ feature, index }) {
  const isReversed = index % 2 === 1;
  return /* @__PURE__ */ jsxs(
    "section",
    {
      className: "w-full relative",
      "data-testid": `feature-section-${index}`,
      children: [
        /* @__PURE__ */ jsxs("div", { className: `hidden md:flex items-start gap-12 lg:gap-20 ${isReversed ? "flex-row-reverse" : ""}`, children: [
          /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  className: "w-14 h-14 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center border border-primary/30",
                  animate: {
                    boxShadow: [
                      "0 0 20px rgba(103,232,249,0.2)",
                      "0 0 35px rgba(103,232,249,0.4)",
                      "0 0 20px rgba(103,232,249,0.2)"
                    ]
                  },
                  transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  children: /* @__PURE__ */ jsx(feature.icon, { className: "w-7 h-7 text-primary" })
                }
              ),
              /* @__PURE__ */ jsx("h3", { className: "text-2xl lg:text-3xl font-display font-semibold text-white", children: feature.title })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground leading-relaxed", children: feature.frontDescription }),
            /* @__PURE__ */ jsxs("div", { className: "pt-4 border-t border-white/10", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    className: "w-2.5 h-2.5 rounded-full bg-primary",
                    animate: {
                      scale: [1, 1.5, 1],
                      boxShadow: [
                        "0 0 5px rgba(103,232,249,0.5)",
                        "0 0 15px rgba(103,232,249,1)",
                        "0 0 5px rgba(103,232,249,0.5)"
                      ]
                    },
                    transition: { duration: 1.5, repeat: Infinity }
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "text-xs font-mono text-primary uppercase tracking-wider", children: "Impact" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-primary font-medium text-lg", children: feature.impact })
            ] }),
            /* @__PURE__ */ jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true, amount: 0.8 },
                transition: { duration: 0.5 },
                children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: feature.backIntro })
              }
            ),
            /* @__PURE__ */ jsx(
              motion.ul,
              {
                className: "space-y-2",
                initial: "hidden",
                whileInView: "visible",
                viewport: { once: true, amount: 0.3 },
                children: feature.backBullets.map((bullet, i) => /* @__PURE__ */ jsxs(
                  motion.li,
                  {
                    className: "flex items-start gap-2 text-sm text-slate-300",
                    variants: {
                      hidden: { opacity: 0, x: -15 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: { delay: i * 0.1, duration: 0.4 }
                      }
                    },
                    children: [
                      /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0 shadow-[0_0_6px_rgba(103,232,249,0.8)]" }),
                      /* @__PURE__ */ jsx("span", { children: bullet })
                    ]
                  },
                  i
                ))
              }
            ),
            /* @__PURE__ */ jsx(
              motion.div,
              {
                className: "pt-3 border-t border-primary/20",
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true, amount: 0.8 },
                transition: { duration: 0.5, delay: 0.2 },
                children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-primary/90 font-medium leading-relaxed", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-primary font-semibold", children: "Outcome:" }),
                  " ",
                  feature.backOutcome
                ] })
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex-1 relative", children: /* @__PURE__ */ jsx("div", { className: "sticky top-24", children: /* @__PURE__ */ jsxs("div", { className: "relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-900/50", children: [
            /* @__PURE__ */ jsx(
              motion.div,
              {
                className: "absolute inset-0 bg-primary/10 blur-[40px] rounded-full",
                animate: {
                  opacity: [0.3, 0.6, 0.3],
                  scale: [0.9, 1.05, 0.9]
                },
                transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }
            ),
            /* @__PURE__ */ jsx(
              "img",
              {
                src: feature.image,
                alt: feature.title,
                className: "relative z-10 w-full h-auto object-cover"
              }
            )
          ] }) }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "md:hidden", children: /* @__PURE__ */ jsxs("div", { className: "w-full p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900/90 via-zinc-900/70 to-zinc-950/90 relative overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-40 h-40 bg-primary/10 blur-[60px] rounded-full pointer-events-none" }),
          /* @__PURE__ */ jsx("div", { className: "relative mb-5 rounded-xl overflow-hidden border border-white/10", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: feature.image,
              alt: feature.title,
              className: "w-full h-auto"
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center border border-primary/30", children: /* @__PURE__ */ jsx(feature.icon, { className: "w-6 h-6 text-primary" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-display font-semibold mb-3 text-white relative z-10", children: feature.title }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed mb-4 relative z-10 text-sm", children: feature.frontDescription }),
          /* @__PURE__ */ jsxs("div", { className: "pt-3 border-t border-white/10 relative z-10 mb-5", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
              /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(103,232,249,0.8)]" }),
              /* @__PURE__ */ jsx("span", { className: "text-xs font-mono text-primary uppercase tracking-wider", children: "Impact" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-primary font-medium text-sm", children: feature.impact })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-4 relative z-10", children: feature.backIntro }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-2 mb-4 relative z-10", children: feature.backBullets.map((bullet, i) => /* @__PURE__ */ jsxs(
            "li",
            {
              className: "flex items-start gap-2 text-sm text-slate-300",
              children: [
                /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" }),
                /* @__PURE__ */ jsx("span", { children: bullet })
              ]
            },
            i
          )) }),
          /* @__PURE__ */ jsx("div", { className: "pt-3 border-t border-primary/20 relative z-10", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-primary/90 font-medium leading-relaxed", children: [
            /* @__PURE__ */ jsx("span", { className: "text-primary font-semibold", children: "Outcome:" }),
            " ",
            feature.backOutcome
          ] }) })
        ] }) })
      ]
    }
  );
}
function JourneyCard({ icon: Icon, title, frontDescription, backIntro, backBullets, backOutcome, index, tags }) {
  const [isHovered, setIsHovered] = useState(false);
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { delay: index * 0.1 },
      className: "relative group",
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "hidden md:block relative min-h-[280px] rounded-2xl overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 p-8 rounded-2xl border border-white/10 bg-zinc-900/95", children: /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsxs(
              motion.div,
              {
                className: "flex items-center gap-3 mb-4",
                initial: { opacity: 0, x: -15 },
                animate: { opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -15 },
                transition: { duration: 0.4, delay: 0.25 },
                children: [
                  /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20", children: /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5 text-primary" }) }),
                  /* @__PURE__ */ jsx("h4", { className: "text-lg font-display font-semibold text-white", children: title })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              motion.p,
              {
                className: "text-muted-foreground text-sm leading-relaxed mb-4",
                initial: { opacity: 0, x: -15 },
                animate: { opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -15 },
                transition: { duration: 0.4, delay: 0.35 },
                children: backIntro
              }
            ),
            /* @__PURE__ */ jsx("ul", { className: "space-y-2 mb-4", children: backBullets.map((bullet, i) => /* @__PURE__ */ jsxs(
              motion.li,
              {
                className: "flex items-start gap-2 text-sm text-slate-300",
                initial: { opacity: 0, x: -10 },
                animate: { opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 },
                transition: { duration: 0.35, delay: 0.45 + i * 0.06 },
                children: [
                  /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" }),
                  /* @__PURE__ */ jsx("span", { children: bullet })
                ]
              },
              i
            )) }),
            /* @__PURE__ */ jsx(
              motion.div,
              {
                className: "pt-3 border-t border-white/10",
                initial: { opacity: 0, y: 10 },
                animate: { opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 },
                transition: { duration: 0.4, delay: 0.7 },
                children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-primary/90 font-medium leading-relaxed", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-primary font-semibold", children: "Outcome:" }),
                  " ",
                  backOutcome
                ] })
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              className: "absolute inset-0 p-8 rounded-2xl border border-white/10 bg-zinc-900/80 overflow-hidden",
              initial: false,
              animate: {
                x: isHovered ? "102%" : "0%",
                opacity: isHovered ? 0.95 : 1
              },
              transition: {
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1]
              },
              children: [
                /* @__PURE__ */ jsx("div", { className: "w-12 h-12 mb-6 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center transition-all duration-300", children: /* @__PURE__ */ jsx(Icon, { className: "w-6 h-6 text-primary" }) }),
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-display font-medium mb-3 text-white", children: title }),
                /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-sm leading-relaxed mb-6", children: frontDescription }),
                tags && tags.length > 0 && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mt-auto", children: tags.map((tag, i) => /* @__PURE__ */ jsx("span", { className: "px-3 py-1.5 text-xs font-medium text-slate-300 border border-white/10 rounded-full bg-white/5", children: tag }, i)) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "md:hidden p-8 rounded-2xl border border-white/10 bg-zinc-900/80 min-h-[240px]", children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 mb-6 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center", children: /* @__PURE__ */ jsx(Icon, { className: "w-6 h-6 text-primary" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-display font-medium mb-3 text-white", children: title }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-sm leading-relaxed", children: frontDescription }),
          tags && tags.length > 0 && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mt-6", children: tags.map((tag, i) => /* @__PURE__ */ jsx("span", { className: "px-3 py-1.5 text-xs font-medium text-slate-300 border border-white/10 rounded-full bg-white/5", children: tag }, i)) })
        ] })
      ]
    }
  );
}
function StickyFeatureCard({ feature, index }) {
  const isReversed = index % 2 === 1;
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "relative py-16 lg:py-24",
      "data-testid": `sticky-feature-${index}`,
      children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 lg:px-12", children: /* @__PURE__ */ jsxs("div", { className: `flex gap-8 lg:gap-16 items-start ${isReversed ? "flex-row-reverse" : ""}`, children: [
        /* @__PURE__ */ jsx("div", { className: "flex-1 py-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-xl space-y-6", children: [
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, margin: "-50px" },
              transition: { duration: 0.5 },
              className: "flex items-center gap-4",
              children: [
                /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    className: "w-14 h-14 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center border border-primary/30",
                    animate: {
                      boxShadow: [
                        "0 0 20px rgba(103,232,249,0.2)",
                        "0 0 35px rgba(103,232,249,0.4)",
                        "0 0 20px rgba(103,232,249,0.2)"
                      ]
                    },
                    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                    children: /* @__PURE__ */ jsx(feature.icon, { className: "w-7 h-7 text-primary" })
                  }
                ),
                /* @__PURE__ */ jsx("h3", { className: "text-2xl lg:text-3xl font-display font-semibold text-white", children: feature.title })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            motion.p,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, margin: "-50px" },
              transition: { duration: 0.5, delay: 0.1 },
              className: "text-lg text-muted-foreground leading-relaxed",
              children: feature.frontDescription
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, margin: "-50px" },
              transition: { duration: 0.5, delay: 0.15 },
              className: "pt-4 border-t border-white/10",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                  /* @__PURE__ */ jsx(
                    motion.div,
                    {
                      className: "w-2.5 h-2.5 rounded-full bg-primary",
                      animate: {
                        scale: [1, 1.5, 1],
                        boxShadow: [
                          "0 0 5px rgba(103,232,249,0.5)",
                          "0 0 15px rgba(103,232,249,1)",
                          "0 0 5px rgba(103,232,249,0.5)"
                        ]
                      },
                      transition: { duration: 1.5, repeat: Infinity }
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: "text-xs font-mono text-primary uppercase tracking-wider", children: "Impact" })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-primary font-medium text-lg", children: feature.impact })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            motion.p,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, margin: "-50px" },
              transition: { duration: 0.5, delay: 0.2 },
              className: "text-muted-foreground text-sm leading-relaxed",
              children: feature.backIntro
            }
          ),
          /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: feature.backBullets.map((bullet, i) => /* @__PURE__ */ jsxs(
            motion.li,
            {
              className: "flex items-start gap-2 text-sm text-slate-300",
              initial: { opacity: 0, x: -15 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true, margin: "-30px" },
              transition: { delay: 0.25 + i * 0.08, duration: 0.4 },
              children: [
                /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0 shadow-[0_0_6px_rgba(103,232,249,0.8)]" }),
                /* @__PURE__ */ jsx("span", { children: bullet })
              ]
            },
            i
          )) }),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, margin: "-50px" },
              transition: { duration: 0.5, delay: 0.5 },
              className: "pt-3 border-t border-primary/20",
              children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-primary/90 font-medium leading-relaxed", children: [
                /* @__PURE__ */ jsx("span", { className: "text-primary font-semibold", children: "Outcome:" }),
                " ",
                feature.backOutcome
              ] })
            }
          )
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "flex-1 relative", children: /* @__PURE__ */ jsx("div", { className: "sticky top-32 pt-8", children: /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.95 },
            whileInView: { opacity: 1, scale: 1 },
            viewport: { once: true, margin: "-100px" },
            transition: { duration: 0.6 },
            className: "relative",
            children: [
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  className: "absolute inset-0 bg-primary/20 blur-[60px] rounded-full",
                  animate: {
                    opacity: [0.3, 0.6, 0.3],
                    scale: [0.95, 1.05, 0.95]
                  },
                  transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-900/50", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: feature.image,
                  alt: feature.title,
                  className: "relative z-10 w-full h-auto object-cover"
                }
              ) })
            ]
          }
        ) }) })
      ] }) })
    }
  );
}
function RevenueSystemSection() {
  const sectionRef = useRef(null);
  return /* @__PURE__ */ jsxs("section", { ref: sectionRef, className: "relative py-20 lg:py-32", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 overflow-hidden pointer-events-none", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-[0.04]", children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[linear-gradient(rgba(103,232,249,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(103,232,249,0.4)_1px,transparent_1px)] bg-[size:24px_24px]" }) }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(103,232,249,0.04),transparent_50%)]" }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]", children: /* @__PURE__ */ jsx("div", { className: "w-full h-full bg-primary/[0.03] blur-[150px] rounded-full" }) }),
      /* @__PURE__ */ jsx(CircuitBeams, { className: "opacity-20" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "hidden md:block relative z-10", children: [
      /* @__PURE__ */ jsx("div", { className: "py-20 lg:py-32", children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 60, scale: 0.95 },
          whileInView: { opacity: 1, y: 0, scale: 1 },
          viewport: { once: true, margin: "-100px" },
          transition: { duration: 1, type: "spring", stiffness: 80 },
          className: "text-center max-w-5xl mx-auto px-6",
          children: [
            /* @__PURE__ */ jsxs(
              motion.div,
              {
                className: "inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/30 bg-primary/10 text-xs font-mono text-primary mb-10",
                animate: {
                  boxShadow: [
                    "0 0 20px rgba(103,232,249,0.2)",
                    "0 0 40px rgba(103,232,249,0.4)",
                    "0 0 20px rgba(103,232,249,0.2)"
                  ]
                },
                transition: { duration: 2, repeat: Infinity },
                children: [
                  /* @__PURE__ */ jsx(
                    motion.span,
                    {
                      className: "w-2 h-2 rounded-full bg-primary",
                      animate: { scale: [1, 1.5, 1], opacity: [1, 0.5, 1] },
                      transition: { duration: 1.5, repeat: Infinity }
                    }
                  ),
                  "Beyond Basic Automation"
                ]
              }
            ),
            /* @__PURE__ */ jsxs("h2", { className: "text-4xl md:text-5xl lg:text-7xl font-display font-semibold tracking-tight mb-8 leading-[1.05]", children: [
              /* @__PURE__ */ jsx(
                motion.span,
                {
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { delay: 0.2 },
                  children: "Not Just an AI Receptionist."
                }
              ),
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx(
                motion.span,
                {
                  className: "bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-300 bg-[length:200%_auto]",
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { delay: 0.4 },
                  animate: { backgroundPosition: ["0% center", "200% center"] },
                  style: { backgroundSize: "200% auto" },
                  children: "A Revenue-Focused System."
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              motion.p,
              {
                className: "text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto",
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { delay: 0.6 },
                children: 'Most tools just "pick up." Simple Sequence decides what to do with every interaction—whether it starts as a call, text, web form, chat, or DM—therefore maximizing booking value and protecting your front-desk time.'
              }
            ),
            /* @__PURE__ */ jsxs(
              motion.div,
              {
                className: "mt-12 flex items-center justify-center gap-2 text-sm text-primary/70",
                initial: { opacity: 0 },
                whileInView: { opacity: 1 },
                viewport: { once: true },
                transition: { delay: 0.8 },
                children: [
                  /* @__PURE__ */ jsx(ChevronDown, { className: "w-5 h-5 animate-bounce" }),
                  /* @__PURE__ */ jsx("span", { children: "Scroll to explore our four core capabilities" })
                ]
              }
            )
          ]
        }
      ) }),
      revenueFeatures.map((feature, index) => /* @__PURE__ */ jsx(StickyFeatureCard, { feature, index }, index))
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "md:hidden py-20 px-6", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 40 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "text-center mb-12",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-xs font-mono text-primary mb-6", children: [
              /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-primary animate-pulse" }),
              "Beyond Basic Automation"
            ] }),
            /* @__PURE__ */ jsxs("h2", { className: "text-3xl font-display font-semibold tracking-tight mb-4 leading-tight", children: [
              "Not Just an AI Receptionist.",
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("span", { className: "bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-300", children: "A Revenue-Focused System." })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-base text-muted-foreground leading-relaxed", children: "Simple Sequence decides what to do with every interaction—maximizing booking value and protecting your front-desk time." })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "space-y-8", children: revenueFeatures.map((feature, index) => /* @__PURE__ */ jsx(RevenueFeatureRow, { feature, index }, index)) })
    ] })
  ] });
}
const consolidatedCardsData = [
  {
    id: "growth-engine",
    theme: "Speed, Acquisition, & Cash Flow",
    headline: "Stop Losing Leads to Speed and Silence",
    subhead: 'Your marketing works, but your capture system is leaking. We install an "Always-On" sales layer that engages every opportunity instantly.',
    capabilities: [
      {
        title: "Speed-to-Lead Capture",
        description: "Instant SMS/Voice response in <60 seconds. No lead goes cold."
      },
      {
        title: "AI Web Conversion",
        description: "24/7 chat agents that qualify visitors and book appointments while you sleep."
      },
      {
        title: "Database Mining",
        description: "Automatically re-engages past lists to generate immediate cash flow."
      }
    ],
    outcome: "Maximum ROI on every ad dollar and a calendar full of qualified appointments—zero manual effort required.",
    imageWebp: "/images/automated-growth-engine.webp",
    imageJpg: "/images/automated-growth-engine.jpg",
    imageAlt: "Automated growth engine capturing leads and converting opportunities"
  },
  {
    id: "operational-ecosystem",
    theme: "Efficiency, Retention, & Stability",
    headline: "Scale Your Operations, Not Your Headcount",
    subhead: 'Eliminate the manual busywork and "human bottlenecks" that cause burnout. We build the backend infrastructure that runs your business on autopilot.',
    capabilities: [
      {
        title: "Ops & Workflow Automation",
        description: "Connects your CRM and tools to eliminate data entry and admin chaos."
      },
      {
        title: "The Follow-Up Engine",
        description: "Relentlessly chases no-shows and stale quotes until they convert."
      },
      {
        title: "Reputation Flywheel",
        description: "Automates review requests and intercepts negative feedback to bulletproof your brand."
      }
    ],
    outcome: "A business that runs smoothly whether your team is at full capacity or on vacation. Reclaim your time and sanity.",
    imageWebp: "/images/operational-ecosystem.webp",
    imageJpg: "/images/operational-ecosystem.jpg",
    imageAlt: "Operational ecosystem automating backend processes and workflows"
  }
];
function ConsolidatedCard({ card, index }) {
  const isFirstCard = index === 0;
  const textReveal = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" }
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center py-20 md:py-28`,
      "data-testid": `card-consolidated-${card.id}`,
      children: [
        /* @__PURE__ */ jsxs("div", { className: `space-y-6 ${isFirstCard ? "md:order-2" : ""}`, children: [
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              ...textReveal,
              transition: { duration: 0.5, delay: 0 },
              children: [
                /* @__PURE__ */ jsx("span", { className: "text-xs font-mono text-primary/70 uppercase tracking-wider mb-3 block", children: card.theme }),
                /* @__PURE__ */ jsx("h3", { className: "text-3xl md:text-4xl font-display font-medium text-[#f8fcfc] mb-4", children: card.headline }),
                /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-lg leading-relaxed", children: card.subhead })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              ...textReveal,
              transition: { duration: 0.5, delay: 0.15 },
              children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
                /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-primary animate-pulse" }),
                /* @__PURE__ */ jsx("span", { className: "text-xs font-mono text-primary uppercase tracking-wider", children: "Core Capabilities" })
              ] })
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "space-y-4", children: card.capabilities.map((capability, capIndex) => /* @__PURE__ */ jsxs(
            motion.div,
            {
              ...textReveal,
              transition: { duration: 0.4, delay: 0.2 + capIndex * 0.1 },
              className: "rounded-xl border-l-2 border-l-primary/40 border border-white/10 bg-zinc-800/50 p-4",
              children: [
                /* @__PURE__ */ jsx("h4", { className: "text-primary font-medium mb-1", children: capability.title }),
                /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: capability.description })
              ]
            },
            capIndex
          )) }),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              ...textReveal,
              transition: { duration: 0.5, delay: 0.55 },
              className: "pt-4 border-l-2 border-primary/30 pl-4",
              children: [
                /* @__PURE__ */ jsx("span", { className: "text-xs font-mono text-muted-foreground uppercase tracking-wider block mb-2", children: "The Outcome:" }),
                /* @__PURE__ */ jsx("p", { className: "text-primary leading-relaxed font-medium", children: card.outcome })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            ...textReveal,
            transition: { duration: 0.6, delay: 0.1 },
            className: `relative ${isFirstCard ? "md:order-1" : ""}`,
            children: /* @__PURE__ */ jsx("div", { className: "rounded-2xl border border-primary/20 overflow-hidden shadow-2xl shadow-primary/10 bg-zinc-900/50", children: /* @__PURE__ */ jsxs("picture", { children: [
              /* @__PURE__ */ jsx("source", { srcSet: card.imageWebp, type: "image/webp" }),
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: card.imageJpg,
                  alt: card.imageAlt,
                  width: "960",
                  height: "1200",
                  loading: "lazy",
                  decoding: "async",
                  className: "w-full h-auto object-cover",
                  "data-testid": `image-consolidated-${card.id}`
                }
              )
            ] }) })
          }
        )
      ]
    }
  );
}
function PainReliefNarrativeSection() {
  return /* @__PURE__ */ jsxs("section", { className: "relative border-t border-white/5 bg-zinc-950/30", children: [
    /* @__PURE__ */ jsx(GridBeam, { showCenterBeam: false, gridOpacity: 0.15 }),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 relative z-10", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: fadeInUpViewport$1.initial,
          whileInView: fadeInUpViewport$1.whileInView,
          viewport: { once: true },
          transition: fadeInUpViewport$1.transition,
          className: "text-center max-w-3xl mx-auto pt-20 pb-12",
          children: [
            /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-5xl font-display font-medium mb-4 text-[#f8fcfc]", children: "What's really costing you time, revenue, and sanity" }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-lg", children: "These aren't isolated problems. They're what happens when core operational systems are missing." })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto divide-y divide-white/5", children: consolidatedCardsData.map((card, index) => /* @__PURE__ */ jsx(ConsolidatedCard, { card, index }, card.id)) })
    ] })
  ] });
}
function PainReliefTabs() {
  return /* @__PURE__ */ jsx(PainReliefNarrativeSection, {});
}
function Home() {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const heroBgY = useTransform(scrollY, [0, 600], [0, 150]);
  const heroBgScale = useTransform(scrollY, [0, 600], [1, 1.1]);
  const circuitY = useTransform(scrollY, [0, 600], [0, 80]);
  const contentY = useTransform(scrollY, [0, 600], [0, 50]);
  const [showFloatingCta, setShowFloatingCta] = useState(false);
  const [floatingCtaDismissed, setFloatingCtaDismissed] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = window.innerHeight * 4;
      if (window.scrollY > scrollThreshold && !floatingCtaDismissed) {
        setShowFloatingCta(true);
      } else if (window.scrollY <= scrollThreshold) {
        setShowFloatingCta(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [floatingCtaDismissed]);
  const handleFloatingCtaClick = () => {
    const w = window;
    if (w.openLeadConnectorChat) {
      w.openLeadConnectorChat();
    }
  };
  const handleDismissFloatingCta = (e) => {
    e.stopPropagation();
    setFloatingCtaDismissed(true);
    setShowFloatingCta(false);
  };
  return /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "SimpleSequence | Practical AI for Service Businesses",
        description: "Operational AI Advisor helping service businesses adopt AI with clarity, precision, and real-world leverage. AI-powered front desk and follow-up systems.",
        jsonLd: {
          "@context": "https://schema.org",
          "@graph": [organizationSchema, softwareApplicationSchema]
        }
      }
    ),
    /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen flex items-start md:items-center pt-24 md:pt-20 overflow-hidden", children: [
      /* @__PURE__ */ jsxs(motion.div, { style: { opacity: heroOpacity }, className: "absolute inset-0 z-0 pointer-events-none", children: [
        /* @__PURE__ */ jsxs(
          motion.picture,
          {
            style: { y: heroBgY, scale: heroBgScale },
            className: "absolute inset-0 w-full h-full",
            children: [
              /* @__PURE__ */ jsx("source", { media: "(min-width: 768px)", srcSet: "/images/hero-ai-assistant.webp", type: "image/webp" }),
              /* @__PURE__ */ jsx("source", { media: "(min-width: 768px)", srcSet: "/images/hero-ai-assistant.jpg", type: "image/jpeg" }),
              /* @__PURE__ */ jsx("source", { srcSet: "/images/hero-mobile.webp", type: "image/webp" }),
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: "/images/hero-mobile.jpg",
                  alt: "AI-powered assistant connecting voice, chatbot, and scheduling",
                  className: "absolute inset-0 w-full h-full object-cover object-top md:object-[70%_center]",
                  "data-testid": "image-hero-background"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "hidden md:block absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" }),
        /* @__PURE__ */ jsx("div", { className: "md:hidden absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" }),
        /* @__PURE__ */ jsx(motion.div, { style: { y: circuitY }, className: "absolute inset-0 hidden md:block", children: /* @__PURE__ */ jsx(CircuitBeams, { className: "opacity-30" }) })
      ] }),
      /* @__PURE__ */ jsx(motion.div, { style: { y: contentY }, className: "container mx-auto px-6 relative z-10", children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: "initial",
          animate: "animate",
          variants: stagger$1,
          className: "max-w-2xl mx-auto md:mx-0 text-center md:text-left",
          children: [
            /* @__PURE__ */ jsxs(motion.div, { variants: fadeIn$1, className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-primary mb-6 md:mb-8 backdrop-blur-md shadow-[0_0_20px_-5px_rgba(var(--primary),0.3)]", children: [
              /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_var(--color-primary)]" }),
              "Operational AI Advisor™"
            ] }),
            /* @__PURE__ */ jsxs(motion.h1, { variants: fadeIn$1, className: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-medium tracking-tight mb-4 md:mb-6 leading-[1.1] text-balance", children: [
              "Practical AI for ",
              /* @__PURE__ */ jsx("span", { className: "bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/50", children: "Service Businesses" })
            ] }),
            /* @__PURE__ */ jsx(motion.p, { variants: fadeIn$1, className: "text-base md:text-lg text-primary/80 mb-3 md:mb-4 font-medium", children: "Empowering Human Teams with Intelligent Automation" }),
            /* @__PURE__ */ jsx(motion.p, { variants: fadeIn$1, className: "hidden md:block text-lg md:text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed", children: "Seamlessly integrate AI to boost productivity, not replace your people. Experience the future of collaborative work." })
          ]
        }
      ) }),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          style: { y: contentY },
          initial: "initial",
          animate: "animate",
          variants: stagger$1,
          className: "hidden md:block container mx-auto px-6 absolute bottom-32 left-0 right-0 z-10",
          children: /* @__PURE__ */ jsxs(motion.div, { variants: fadeIn$1, className: "flex flex-row gap-6 items-center max-w-3xl", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute -inset-1 bg-gradient-to-r from-primary to-cyan-400 rounded-full blur opacity-20 group-hover:opacity-50 transition duration-500" }),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  "data-testid": "button-hero-cta",
                  onClick: () => {
                    const w = window;
                    if (w.openLeadConnectorChat) {
                      w.openLeadConnectorChat();
                    }
                  },
                  className: "group hover:shadow-sky-500/30 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 active:scale-95 transition-all duration-500 ease-out cursor-pointer hover:border-sky-400/60 overflow-hidden bg-gradient-to-br from-sky-900/40 via-black-900/60 to-black/80 border-sky-500/30 border-2 rounded-full py-3.5 px-8 relative shadow-2xl backdrop-blur-xl",
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-transparent via-sky-400/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" }),
                    /* @__PURE__ */ jsx("div", { className: "group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-sky-500/10 via-sky-400/20 to-sky-500/10 opacity-0 rounded-2xl absolute top-0 right-0 bottom-0 left-0" }),
                    /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex items-center justify-center gap-3", children: [
                      /* @__PURE__ */ jsx("p", { className: "group-hover:text-white transition-colors duration-300 text-base font-bold text-white font-sans drop-shadow-sm whitespace-nowrap", children: "Talk to Samantha (Live Demo)" }),
                      /* @__PURE__ */ jsx("div", { className: "opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300", children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", stroke: "currentColor", fill: "none", className: "w-5 h-5 text-white", children: /* @__PURE__ */ jsx("path", { d: "M9 5l7 7-7 7", strokeWidth: "2", strokeLinejoin: "round", strokeLinecap: "round" }) }) })
                    ] })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground font-medium", children: "Don't just guess. Hear exactly how we handle your missed calls and capture revenue." })
          ] })
        }
      ),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 1.5, duration: 1 },
          className: "absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground/50 animate-bounce",
          children: /* @__PURE__ */ jsx(ChevronDown, { className: "w-6 h-6" })
        }
      )
    ] }),
    /* @__PURE__ */ jsx(TechTicker, {}),
    /* @__PURE__ */ jsx(PainReliefTabs, {}),
    /* @__PURE__ */ jsx("section", { className: "py-32 relative", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: fadeInUpViewport$1.initial,
        whileInView: fadeInUpViewport$1.whileInView,
        viewport: fadeInUpViewport$1.viewport,
        transition: fadeInUpViewport$1.transition,
        className: "rounded-3xl border border-white/10 bg-zinc-900/40 p-10 md:p-16 relative overflow-hidden",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "text-center max-w-4xl mx-auto mb-16 relative z-10", children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-4xl lg:text-5xl font-display font-medium mb-6 leading-tight", children: [
              "We Align Your Entire Customer Journey Into One ",
              /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Intelligent Flow." })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-lg leading-relaxed", children: "Instead of scattered tools and manual workarounds, you get a clear map of how people, systems, and AI should work together from first touch to repeat business—therefore your operations run smoother and scale without extra headcount." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6 mb-12 relative z-10", children: [
            /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-12 gap-6", children: [
              /* @__PURE__ */ jsx("div", { className: "md:col-span-5", children: /* @__PURE__ */ jsx(
                JourneyCard,
                {
                  icon: LayoutTemplate,
                  title: "Lead Capture Architecture",
                  frontDescription: "Stop losing visitors. Turn traffic into captured leads without rebuilding your entire website.",
                  backIntro: "We map every entry point a lead can take, then design a capture flow that doesn't leak.",
                  backBullets: [
                    "Consolidates forms, chats, calls, and DMs into a single intake path",
                    "Standardizes what you collect (contact info, intent, timing, qualification)",
                    "Fixes 'dead ends' where people click but never become leads",
                    "Works on top of your existing site and tools, therefore no risky full redesign"
                  ],
                  backOutcome: "More of your existing traffic becomes trackable leads you can actually follow up with.",
                  index: 0
                }
              ) }),
              /* @__PURE__ */ jsx("div", { className: "md:col-span-7", children: /* @__PURE__ */ jsx(
                JourneyCard,
                {
                  icon: Layers,
                  title: "Operational Backbone Design",
                  frontDescription: "Get a clear blueprint of how your systems should connect — so your team stops being the glue.",
                  backIntro: "We untangle the mess of tools and manual handoffs so your operation has a real spine.",
                  backBullets: [
                    "Maps how leads move from capture → qualification → booking → work done",
                    "Defines which system owns each step (calendar, CRM, ticketing, billing, etc.)",
                    "Removes duplicate tools and redundant steps that slow everyone down",
                    "Documents the new flow so onboarding and training stop living in one person's head"
                  ],
                  backOutcome: "Your business finally runs on a predictable backbone, therefore daily chaos drops and scaling becomes possible.",
                  index: 1
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-12 gap-6", children: [
              /* @__PURE__ */ jsx("div", { className: "md:col-span-7", children: /* @__PURE__ */ jsx(
                JourneyCard,
                {
                  icon: Zap,
                  title: "Follow-Up Clarity Engine",
                  frontDescription: "No more leads going cold because someone forgot. Consistent follow-up that actually happens.",
                  backIntro: "We turn 'someone should follow up' into a concrete, automated plan.",
                  backBullets: [
                    "Defines who gets followed up, how often, and on which channels",
                    "Builds sequences for new leads, no-shows, canceled jobs, and inactive clients",
                    "Aligns human touchpoints with automated messages so they work together",
                    "Makes follow-up visible in dashboards, therefore nothing depends on memory"
                  ],
                  backOutcome: "Every qualified lead has a path from first contact to decision, not just a single reply that dies in the inbox.",
                  index: 2
                }
              ) }),
              /* @__PURE__ */ jsx("div", { className: "md:col-span-5", children: /* @__PURE__ */ jsx(
                JourneyCard,
                {
                  icon: Brain,
                  title: "AI-Ready Front Desk Layer",
                  frontDescription: "Know exactly where AI can help with calls, routing, and qualification — and where your team still needs to lead.",
                  backIntro: "We design a front-desk layer that's ready for AI without losing the human touch.",
                  backBullets: [
                    "Separates repeatable, scriptable tasks from conversations that need judgment",
                    "Defines rules for triage, routing, scheduling, and escalation",
                    "Shows which parts can be automated now and which stay with humans (for safety, nuance, or sales)",
                    "Sets you up to plug in AI reception and follow-up confidently, therefore you don't 'experiment' on live customers"
                  ],
                  backOutcome: "A front desk that's built for AI from the ground up, not a patchwork of bots bolted onto broken processes.",
                  index: 3,
                  tags: ["Strategic Clarity", "AI Readiness"]
                }
              ) })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "border-t border-white/5 my-12" }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsx(
              motion.h3,
              {
                initial: { opacity: 0, y: 10 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                className: "text-center text-sm font-mono text-primary mb-10 tracking-wider",
                children: "CLARITY DELIVERED. EFFICIENCY UNLOCKED."
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-8", children: [
              /* @__PURE__ */ jsx(
                AnimatedMetric,
                {
                  value: "40-90",
                  suffix: "hrs/mo",
                  description: "Time typically regained once lead, follow-up, and front-desk loops are clarified."
                }
              ),
              /* @__PURE__ */ jsx(
                AnimatedMetric,
                {
                  value: "82",
                  suffix: "%",
                  description: "Average perceived reduction in friction across lead handling and ops sequences reported by clients."
                }
              ),
              /* @__PURE__ */ jsx(
                AnimatedMetric,
                {
                  value: "3",
                  suffix: "× faster",
                  description: "How much faster teams gain adoption clarity and make confident system decisions once the new flow is mapped."
                }
              )
            ] })
          ] })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsx(RevenueSystemSection, {}),
    /* @__PURE__ */ jsx(IndustryCarousel, {}),
    /* @__PURE__ */ jsxs("section", { id: "method", className: "py-40 relative overflow-hidden bg-background pl-[0px] pr-[0px] mt-[0px] mb-[0px] pt-[60px] pb-[60px]", children: [
      /* @__PURE__ */ jsx(GridBeam, {}),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(var(--primary),0.03),transparent)] pointer-events-none" }),
      /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: fadeInUpViewport$1.initial,
            whileInView: fadeInUpViewport$1.whileInView,
            viewport: fadeInUpViewport$1.viewport,
            transition: fadeInUpViewport$1.transition,
            className: "text-center max-w-2xl mx-auto mb-24",
            children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm font-mono text-primary uppercase tracking-widest mb-4 block", children: "How We Deploy" }),
              /* @__PURE__ */ jsx("h2", { className: "text-4xl md:text-5xl font-medium mb-6", children: "The SimpleSequence Method" }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-lg", children: "A clear, structured process that moves you from confusion to a predictable, AI-ready flow — in weeks, not months." })
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "relative max-w-6xl mx-auto", children: /* @__PURE__ */ jsx("div", { className: "space-y-16 md:space-y-20 relative z-10", children: [
          { step: "01", title: "Diagnose Friction", desc: "We find exactly where things break down — the hidden drag you've been feeling but couldn't name.", component: DiagnoseFrictionDiagram },
          { step: "02", title: "Map Sequences", desc: "We document the workflows that actually drive revenue and expose what's unclear or broken.", component: MapSequencesDiagram },
          { step: "03", title: "Locate Leverage", desc: "We identify where AI creates real lift — triage, routing, and follow-up — and where your team's judgment still matters most, not shiny distractions.", component: LocateLeverageDiagram },
          { step: "04", title: "Architect the Flow", desc: "We don't just stack tools; we engineer a unified operating system. We take fragmented channels and forge them into a single, intelligent core that processes every interaction with precision.", component: ArchitectFlowDiagram }
        ].map((item, i) => {
          const VisualComponent = item.component;
          const isReversed = i % 2 === 1;
          return /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 40 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, margin: "-100px" },
              transition: { duration: 0.7 },
              className: "group",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "md:hidden", children: [
                  /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 text-primary/50 font-mono mb-3", children: [
                    /* @__PURE__ */ jsx("span", { children: "STEP" }),
                    /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-primary", children: item.step })
                  ] }),
                  /* @__PURE__ */ jsx("h3", { className: "text-2xl font-medium mb-3 group-hover:text-primary transition-colors duration-300", children: item.title }),
                  /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-base leading-relaxed mb-6", children: item.desc }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("div", { className: "absolute -inset-4 bg-gradient-to-r from-primary/10 to-cyan-500/10 rounded-2xl blur-xl opacity-40" }),
                    /* @__PURE__ */ jsx("div", { className: "relative w-full max-w-sm", "data-testid": `component-step-${item.step}`, children: /* @__PURE__ */ jsx(VisualComponent, {}) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "hidden md:grid md:grid-cols-[1fr_80px_1fr] md:items-center md:gap-4", children: [
                  /* @__PURE__ */ jsx("div", { className: isReversed ? "order-3" : "order-1", children: !isReversed ? /* @__PURE__ */ jsxs("div", { className: "text-right pr-6", children: [
                    /* @__PURE__ */ jsx("h3", { className: "text-2xl lg:text-3xl font-medium mb-3 group-hover:text-primary transition-colors duration-300", children: item.title }),
                    /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-base lg:text-lg leading-relaxed", children: item.desc })
                  ] }) : /* @__PURE__ */ jsxs(
                    motion.div,
                    {
                      initial: { opacity: 0, scale: 0.95 },
                      whileInView: { opacity: 1, scale: 1 },
                      viewport: { once: true, margin: "-50px" },
                      transition: { duration: 0.8, ease: "easeOut" },
                      className: "relative flex justify-end",
                      children: [
                        /* @__PURE__ */ jsx("div", { className: "absolute -inset-4 bg-gradient-to-r from-primary/10 to-cyan-500/10 rounded-2xl blur-xl opacity-40" }),
                        /* @__PURE__ */ jsx("div", { className: "relative w-full max-w-md", "data-testid": `component-step-${item.step}`, children: /* @__PURE__ */ jsx(VisualComponent, {}) })
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxs("div", { className: "order-2 flex flex-col items-center justify-center relative", children: [
                    /* @__PURE__ */ jsx("div", { className: "absolute top-0 bottom-0 w-px bg-gradient-to-b from-primary/10 via-primary/30 to-primary/10" }),
                    /* @__PURE__ */ jsx("div", { className: "relative z-10 w-14 h-14 rounded-full bg-zinc-900 border-2 border-primary/50 flex items-center justify-center shadow-[0_0_25px_rgba(103,232,249,0.4)]", children: /* @__PURE__ */ jsx("span", { className: "text-base font-bold text-primary", children: item.step }) })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: isReversed ? "order-1" : "order-3", children: isReversed ? /* @__PURE__ */ jsxs("div", { className: "text-left pl-6", children: [
                    /* @__PURE__ */ jsx("h3", { className: "text-2xl lg:text-3xl font-medium mb-3 group-hover:text-primary transition-colors duration-300", children: item.title }),
                    /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-base lg:text-lg leading-relaxed", children: item.desc })
                  ] }) : /* @__PURE__ */ jsxs(
                    motion.div,
                    {
                      initial: { opacity: 0, scale: 0.95 },
                      whileInView: { opacity: 1, scale: 1 },
                      viewport: { once: true, margin: "-50px" },
                      transition: { duration: 0.8, ease: "easeOut" },
                      className: "relative",
                      children: [
                        /* @__PURE__ */ jsx("div", { className: "absolute -inset-4 bg-gradient-to-r from-primary/10 to-cyan-500/10 rounded-2xl blur-xl opacity-40" }),
                        /* @__PURE__ */ jsx("div", { className: "relative w-full max-w-md", "data-testid": `component-step-${item.step}`, children: /* @__PURE__ */ jsx(VisualComponent, {}) })
                      ]
                    }
                  ) })
                ] })
              ]
            },
            i
          );
        }) }) }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: fadeInUpViewport$1.initial,
            whileInView: fadeInUpViewport$1.whileInView,
            viewport: fadeInUpViewport$1.viewport,
            transition: fadeInUpViewport$1.transition,
            className: "mt-24 pt-20 border-t border-white/10 max-w-3xl mx-auto",
            children: [
              /* @__PURE__ */ jsx("p", { className: "text-center text-sm text-slate-400 leading-relaxed mb-4", children: "Under the hood, SimpleSequence deploys six interconnected systems — Speed-to-Lead, AI Web Conversion, Database Reactivation, Ops Automation, Follow-Up Engine, and Reputation Flywheel — that transform how you capture, convert, and retain customers." }),
              /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxs(
                "a",
                {
                  href: "/solutions",
                  className: "inline-flex items-center gap-2 text-primary hover:text-cyan-300 text-sm font-medium transition-colors duration-300 group",
                  "data-testid": "link-six-pillars",
                  children: [
                    "Explore the Six Pillars",
                    /* @__PURE__ */ jsx(
                      motion.span,
                      {
                        animate: { x: [0, 4, 0] },
                        transition: { duration: 1.5, repeat: Infinity },
                        className: "group-hover:translate-x-1 transition-transform",
                        children: "→"
                      }
                    )
                  ]
                }
              ) })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "py-32 bg-white/[0.02] border-y border-white/5 relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" }),
      /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row items-center justify-between gap-16", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: fadeInUpViewport$1.initial,
            whileInView: fadeInUpViewport$1.whileInView,
            viewport: fadeInUpViewport$1.viewport,
            transition: fadeInUpViewport$1.transition,
            className: "max-w-2xl",
            children: [
              /* @__PURE__ */ jsx("div", { className: "inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-8 tracking-wide", children: "START HERE" }),
              /* @__PURE__ */ jsx("h2", { className: "text-4xl md:text-6xl font-medium mb-8 tracking-tight", children: "The Revenue Friction Analysis" }),
              /* @__PURE__ */ jsxs("p", { className: "text-xl text-muted-foreground mb-6 leading-relaxed", children: [
                "Your growth isn't stalling due to lack of effort; it's stalling due to hidden operational drag. Leads go cold in the invisible gaps between manual tasks and handoffs that your CRM isn't tracking. This AI-powered analysis pinpoints exactly where friction is choking your pipeline and uncovers the single biggest operational gap ",
                /* @__PURE__ */ jsx("span", { className: "text-white font-medium", children: "costing you deals right now." })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-white font-semibold mb-10", children: "Move from guessing to knowing. Stop letting invisible inefficiencies dictate your revenue." }),
              /* @__PURE__ */ jsxs(
                Link,
                {
                  href: "/assessment",
                  "data-testid": "button-assessment-cta",
                  className: "inline-flex items-center justify-center bg-[#1ab1d9] text-primary-foreground hover:bg-cyan-300 rounded-full px-10 h-14 text-lg font-semibold shadow-[0_0_20px_-5px_var(--color-primary)] group transition-colors",
                  children: [
                    "Get My Executive Analysis",
                    /* @__PURE__ */ jsx(ArrowUpRight, { className: "ml-2 w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" })
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: 50 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            transition: { duration: 0.8 },
            className: "w-full max-w-md relative",
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute -inset-1 bg-gradient-to-r from-primary/20 to-cyan-500/20 rounded-2xl blur-lg opacity-50" }),
              /* @__PURE__ */ jsxs("div", { className: "relative bg-zinc-900 p-8 rounded-2xl border border-white/10 shadow-2xl", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-6", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-xs font-mono text-zinc-400 tracking-wider", children: "EXECUTIVE AI ANALYSIS" }),
                  /* @__PURE__ */ jsx(FileText, { className: "w-4 h-4 text-primary" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2 mb-6", children: [
                  /* @__PURE__ */ jsx("div", { className: "h-1.5 bg-primary/60 rounded-full w-full" }),
                  /* @__PURE__ */ jsx("div", { className: "h-1.5 bg-primary/40 rounded-full w-4/5" }),
                  /* @__PURE__ */ jsx("div", { className: "h-1.5 bg-primary/20 rounded-full w-3/5" })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "text-xs font-mono text-zinc-500 mb-4 tracking-wider", children: "FRICTION POINT IDENTIFICATION" }),
                /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-lg bg-zinc-800/50 border border-white/5 mb-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                    /* @__PURE__ */ jsx(Activity, { className: "w-4 h-4 text-primary" }),
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-zinc-400", children: "Operational Efficiency Score" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-4xl font-mono font-bold text-white", children: "76" }),
                    /* @__PURE__ */ jsx("span", { className: "text-2xl font-mono text-zinc-600", children: "/100" }),
                    /* @__PURE__ */ jsx(TrendingUp, { className: "w-5 h-5 text-primary ml-auto" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-lg bg-zinc-800/50 border border-white/5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                    /* @__PURE__ */ jsx(Sparkles, { className: "w-4 h-4 text-primary" }),
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-zinc-400", children: "Potential Revenue Impact" })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "text-3xl font-mono font-bold text-white", children: "$35,000" })
                ] })
              ] })
            ]
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("section", { id: "faq", className: "py-32 relative", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 max-w-4xl", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: fadeInUpViewport$1.initial,
          whileInView: fadeInUpViewport$1.whileInView,
          viewport: fadeInUpViewport$1.viewport,
          transition: fadeInUpViewport$1.transition,
          className: "text-center mb-16",
          children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm font-mono text-primary mb-4 block", children: "FAQ" }),
            /* @__PURE__ */ jsx("h2", { className: "text-4xl md:text-5xl font-display font-medium", children: "Common Questions" })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.7 },
          children: /* @__PURE__ */ jsxs(Accordion, { type: "single", collapsible: true, className: "space-y-4", children: [
            /* @__PURE__ */ jsxs(AccordionItem, { value: "item-1", className: "border border-white/10 rounded-xl px-6 bg-white/[0.02] hover:bg-white/[0.04] transition-colors data-[state=open]:border-primary/30", children: [
              /* @__PURE__ */ jsx(AccordionTrigger, { className: "text-left text-lg font-medium py-6 hover:no-underline text-white hover:text-primary transition-colors", "data-testid": "faq-trigger-1", children: "What does SimpleSequence actually do?" }),
              /* @__PURE__ */ jsxs(AccordionContent, { className: "text-slate-400 pb-6 leading-relaxed", children: [
                /* @__PURE__ */ jsx("p", { className: "mb-4", children: "SimpleSequence helps you understand exactly how your business should operate across lead flow, follow-up, internal communication, and customer workflows — and where AI can create real leverage without adding complexity." }),
                /* @__PURE__ */ jsx("p", { className: "mb-4", children: "You get a clear operational map, tailored to your business, showing which processes should stay human, which can be streamlined, and which are strong candidates for AI support." }),
                /* @__PURE__ */ jsx("p", { className: "text-primary/80 font-medium", children: "No software pitches. No implementation traps. Just clarity." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs(AccordionItem, { value: "item-2", className: "border border-white/10 rounded-xl px-6 bg-white/[0.02] hover:bg-white/[0.04] transition-colors data-[state=open]:border-primary/30", children: [
              /* @__PURE__ */ jsx(AccordionTrigger, { className: "text-left text-lg font-medium py-6 hover:no-underline text-white hover:text-primary transition-colors", "data-testid": "faq-trigger-2", children: "How is this different from hiring a web agency?" }),
              /* @__PURE__ */ jsxs(AccordionContent, { className: "text-slate-400 pb-6 leading-relaxed", children: [
                /* @__PURE__ */ jsxs("p", { className: "mb-4", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-white", children: "Agencies build things." }),
                  " SimpleSequence clarifies what should be built in the first place — and why."
                ] }),
                /* @__PURE__ */ jsx("p", { className: "mb-4", children: "A web agency will redesign your site. An automation shop will install tools. But neither will diagnose the root operational friction or the AI opportunities unique to your workflow." }),
                /* @__PURE__ */ jsx("p", { children: "I help you avoid unnecessary spending, avoid shiny-object traps, and avoid building systems that don't align with how your business truly works." }),
                /* @__PURE__ */ jsx("p", { className: "text-primary/80 font-medium mt-4", children: "This is strategic architecture — not execution." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs(AccordionItem, { value: "item-3", className: "border border-white/10 rounded-xl px-6 bg-white/[0.02] hover:bg-white/[0.04] transition-colors data-[state=open]:border-primary/30", children: [
              /* @__PURE__ */ jsx(AccordionTrigger, { className: "text-left text-lg font-medium py-6 hover:no-underline text-white hover:text-primary transition-colors", "data-testid": "faq-trigger-3", children: "Do I need to replace my current tools?" }),
              /* @__PURE__ */ jsxs(AccordionContent, { className: "text-slate-400 pb-6 leading-relaxed", children: [
                /* @__PURE__ */ jsx("p", { className: "mb-4", children: /* @__PURE__ */ jsx("span", { className: "text-primary font-medium", children: "Usually, no." }) }),
                /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Most businesses don't need more tools — they need a clearer understanding of how the tools they already have should work together." }),
                /* @__PURE__ */ jsx("p", { className: "mb-2", children: "Part of the diagnostic includes:" }),
                /* @__PURE__ */ jsxs("ul", { className: "space-y-2 mb-4 ml-4", children: [
                  /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-primary", children: "•" }),
                    " Identifying where your tools are creating friction"
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-primary", children: "•" }),
                    " Uncovering gaps in handoffs or follow-up"
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-primary", children: "•" }),
                    " Showing where AI could support the workflow without replacing your systems"
                  ] })
                ] }),
                /* @__PURE__ */ jsx("p", { children: "If a replacement is genuinely necessary, you'll get a clear rationale — not a sales pitch." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs(AccordionItem, { value: "item-4", className: "border border-white/10 rounded-xl px-6 bg-white/[0.02] hover:bg-white/[0.04] transition-colors data-[state=open]:border-primary/30", children: [
              /* @__PURE__ */ jsx(AccordionTrigger, { className: "text-left text-lg font-medium py-6 hover:no-underline text-white hover:text-primary transition-colors", "data-testid": "faq-trigger-4", children: "How long until I see results?" }),
              /* @__PURE__ */ jsxs(AccordionContent, { className: "text-slate-400 pb-6 leading-relaxed", children: [
                /* @__PURE__ */ jsx("p", { className: "mb-4", children: /* @__PURE__ */ jsx("span", { className: "text-white", children: "Most clients experience clarity within the first session." }) }),
                /* @__PURE__ */ jsx("p", { className: "mb-2", children: "The Operational Diagnostic typically reveals:" }),
                /* @__PURE__ */ jsxs("ul", { className: "space-y-2 mb-4 ml-4", children: [
                  /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-primary", children: "•" }),
                    " Where time is being lost"
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-primary", children: "•" }),
                    " Which workflows are causing drag"
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-primary", children: "•" }),
                    " Which AI opportunities will produce immediate leverage"
                  ] })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "mb-4", children: "From there, businesses often see faster decisions, smoother coordination, and better follow-up rhythm within 30 days — even before implementing larger changes." }),
                /* @__PURE__ */ jsx("p", { className: "text-primary/80 font-medium", children: "Clarity is an accelerant." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs(AccordionItem, { value: "item-5", className: "border border-white/10 rounded-xl px-6 bg-white/[0.02] hover:bg-white/[0.04] transition-colors data-[state=open]:border-primary/30", children: [
              /* @__PURE__ */ jsx(AccordionTrigger, { className: "text-left text-lg font-medium py-6 hover:no-underline text-white hover:text-primary transition-colors", "data-testid": "faq-trigger-5", children: "What's the best way to get started?" }),
              /* @__PURE__ */ jsxs(AccordionContent, { className: "text-slate-400 pb-6 leading-relaxed", children: [
                /* @__PURE__ */ jsxs("p", { className: "mb-4", children: [
                  "Start with the free ",
                  /* @__PURE__ */ jsx("span", { className: "text-primary font-medium", children: "Operational Clarity Score™" }),
                  "."
                ] }),
                /* @__PURE__ */ jsx("p", { className: "mb-2", children: "It gives you:" }),
                /* @__PURE__ */ jsxs("ul", { className: "space-y-2 mb-4 ml-4", children: [
                  /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-primary", children: "•" }),
                    " A high-level look at your lead flow, follow-up, operations, and AI readiness"
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-primary", children: "•" }),
                    " Estimated time lost each month"
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-primary", children: "•" }),
                    " Early friction patterns"
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("p", { children: [
                  "If the diagnostic uncovers deeper issues, the next step is the ",
                  /* @__PURE__ */ jsx("span", { className: "text-white", children: "Operational Diagnostic + AI-Clarity Blueprint" }),
                  ", which maps your architecture and identifies the highest-leverage improvements."
                ] })
              ] })
            ] })
          ] })
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "py-32 bg-zinc-950/50 relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--primary),0.05),transparent_50%)]" }),
      /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 max-w-6xl relative z-10", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: fadeInUpViewport$1.initial,
            whileInView: fadeInUpViewport$1.whileInView,
            viewport: fadeInUpViewport$1.viewport,
            transition: fadeInUpViewport$1.transition,
            className: "text-center mb-16",
            children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm font-mono text-primary mb-4 block", children: "RESULTS" }),
              /* @__PURE__ */ jsx("h2", { className: "text-4xl md:text-5xl font-display font-medium", children: "What Business Owners Say" })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: "initial",
            whileInView: "animate",
            viewport: { once: true, margin: "-100px" },
            variants: stagger$1,
            className: "grid md:grid-cols-3 gap-6",
            children: [
              {
                quote: "We stopped losing leads. The system captures every inquiry, responds instantly, and the automated follow-up means nothing falls through the cracks anymore.",
                name: "Jake Martinez",
                role: "Roofing Company Owner",
                initials: "JM"
              },
              {
                quote: "Our operations finally work together. Everything is connected — website, CRM, follow-up. We're converting more with less effort.",
                name: "Sarah Chen",
                role: "MedSpa Director",
                initials: "SC"
              },
              {
                quote: "The optimization work is ongoing and measurable. Every month we see improvements in how leads are qualified and moved through our intake process.",
                name: "David Walsh",
                role: "Managing Partner, Law Firm",
                initials: "DW"
              }
            ].map((testimonial, i) => /* @__PURE__ */ jsxs(
              motion.div,
              {
                variants: fadeIn$1,
                className: "group relative p-8 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent hover:border-primary/30 transition-all duration-500",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity", children: /* @__PURE__ */ jsx(Quote, { className: "w-12 h-12 text-primary" }) }),
                  /* @__PURE__ */ jsxs("p", { className: "text-slate-300 leading-relaxed mb-8 italic relative z-10", children: [
                    '"',
                    testimonial.quote,
                    '"'
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold text-sm", children: testimonial.initials }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("p", { className: "font-medium text-white", children: testimonial.name }),
                      /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500", children: testimonial.role })
                    ] })
                  ] })
                ]
              },
              i
            ))
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { id: "about", className: "py-32 border-t border-white/5 relative", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 max-w-6xl relative z-10", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8 },
        className: "grid lg:grid-cols-2 gap-16 items-center",
        children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-display font-medium mb-8 text-white", children: "Why SimpleSequence?" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-6 text-lg text-slate-400 leading-relaxed", children: [
              /* @__PURE__ */ jsxs("p", { children: [
                "In a world full of AI hype, tool-chasing, and unrealistic promises, we offer something different: ",
                /* @__PURE__ */ jsx("span", { className: "text-white", children: "operational intelligence grounded in real-world constraints" }),
                "."
              ] }),
              /* @__PURE__ */ jsxs("p", { children: [
                `We understand service businesses from the inside. We don't just "add AI" — we fix the `,
                /* @__PURE__ */ jsx("span", { className: "text-primary", children: "operational behavior" }),
                " that makes AI effective."
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: 30 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true },
              transition: { duration: 0.8, delay: 0.2 },
              className: "p-8 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-5 mb-6", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-full overflow-hidden border-2 border-primary/40 flex-shrink-0 shadow-[0_0_15px_-3px_rgba(var(--primary),0.4)]", children: /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: founderPhoto,
                      alt: "The Founder",
                      className: "w-full h-full object-cover object-[center_20%]"
                    }
                  ) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h3", { className: "text-xl font-display font-semibold text-white", children: "The Founder" }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm font-mono text-primary", children: "OPERATIONAL AI ADVISOR™" })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-slate-400 leading-relaxed mb-6", children: "Operational AI Advisor™ with a background in operations, performance, and AI adoption." }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-slate-300", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-primary", children: "✓" }),
                    " Calm"
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "text-slate-600", children: "•" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-slate-300", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-primary", children: "✓" }),
                    " Analytical"
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "text-slate-600", children: "•" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-slate-300", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-primary", children: "✓" }),
                    " Systems-Driven"
                  ] })
                ] })
              ]
            }
          )
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxs("section", { className: "py-16 md:py-24 text-center relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.1),transparent_50%)]" }),
      /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 relative z-10", children: [
        /* @__PURE__ */ jsxs(
          motion.h2,
          {
            initial: fadeInUpViewport$1.initial,
            whileInView: fadeInUpViewport$1.whileInView,
            viewport: fadeInUpViewport$1.viewport,
            transition: fadeInUpViewport$1.transition,
            className: "text-4xl md:text-7xl font-medium mb-8 md:mb-12 tracking-tight",
            children: [
              "Hear it ",
              /* @__PURE__ */ jsx("span", { className: "text-primary", children: "for yourself." })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: 0.2, duration: 0.6 },
            children: /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => {
                  const w = window;
                  if (w.openLeadConnectorChat) {
                    w.openLeadConnectorChat();
                  }
                },
                "data-testid": "button-bottom-cta",
                className: "group hover:shadow-sky-500/30 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 active:scale-95 transition-all duration-500 ease-out cursor-pointer hover:border-sky-400/60 overflow-hidden bg-gradient-to-br from-sky-900/40 via-black-900/60 to-black/80 border-sky-500/30 border-2 rounded-2xl py-4 px-6 md:rounded-full md:pt-4 md:pr-8 md:pb-4 md:pl-9 relative shadow-2xl backdrop-blur-xl inline-block max-w-sm md:max-w-none",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-transparent via-sky-400/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" }),
                  /* @__PURE__ */ jsx("div", { className: "group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-sky-500/10 via-sky-400/20 to-sky-500/10 opacity-0 rounded-2xl absolute top-0 right-0 bottom-0 left-0" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex items-center justify-between md:justify-center gap-3", children: [
                    /* @__PURE__ */ jsxs("div", { className: "text-left", children: [
                      /* @__PURE__ */ jsx("p", { className: "group-hover:text-white transition-colors duration-300 text-base md:text-xl font-bold text-white font-sans drop-shadow-sm", children: "Talk to Samantha" }),
                      /* @__PURE__ */ jsx("p", { className: "text-xs md:text-sm text-zinc-400 mt-0.5 md:mt-1", children: "Live demo of our AI voice assistant" })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300", children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", stroke: "currentColor", fill: "none", className: "w-5 h-5 text-white", children: /* @__PURE__ */ jsx("path", { d: "M9 5l7 7-7 7", strokeWidth: "2", strokeLinejoin: "round", strokeLinecap: "round" }) }) })
                  ] })
                ]
              }
            )
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: showFloatingCta && !floatingCtaDismissed && /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 100, scale: 0.8 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 100, scale: 0.8 },
        transition: { type: "spring", stiffness: 300, damping: 25 },
        className: "fixed bottom-6 left-4 right-4 z-50 md:hidden",
        children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleDismissFloatingCta,
              className: "absolute -top-2 -right-2 z-10 w-8 h-8 bg-zinc-800 border border-zinc-600 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors shadow-lg",
              "aria-label": "Dismiss",
              "data-testid": "button-dismiss-floating-cta",
              children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: handleFloatingCtaClick,
              "data-testid": "button-floating-cta",
              className: "w-full group hover:shadow-sky-500/30 hover:shadow-2xl active:scale-[0.98] transition-all duration-300 cursor-pointer overflow-hidden bg-gradient-to-br from-sky-900/90 via-zinc-900/95 to-black/90 border-sky-500/40 border-2 rounded-2xl py-4 px-6 relative shadow-2xl backdrop-blur-xl",
              children: [
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-transparent via-sky-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" }),
                /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex items-center justify-between gap-3", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-base font-bold text-white", children: "Talk to Samantha (Live Demo)" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-zinc-400 mt-0.5", children: "Hear how we handle your missed calls" })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-10 h-10 rounded-full bg-sky-500/20 flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", stroke: "currentColor", fill: "none", className: "w-5 h-5 text-sky-400", children: /* @__PURE__ */ jsx("path", { d: "M9 5l7 7-7 7", strokeWidth: "2", strokeLinejoin: "round", strokeLinecap: "round" }) }) })
                ] })
              ]
            }
          )
        ] })
      }
    ) })
  ] });
}
const fadeInUp$2 = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7 }
};
const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};
const growthEnginePillars = [
  {
    number: "01",
    title: "Speed-to-Lead Capture",
    subtitle: "Every minute you wait costs you money. We install instant response systems that engage leads in under 60 seconds via SMS, voice, or chat — before they move on to your competitor.",
    icon: Zap,
    delivers: [
      "Instant SMS/voice response triggered the moment a lead comes in",
      "After-hours coverage so no inquiry goes cold overnight",
      "Multi-channel routing: phone, text, web forms, social DMs",
      "Escalation rules when AI can't handle it alone",
      "Response time tracking and accountability dashboards"
    ],
    outcomes: [
      { title: "Sub-60 Second Response", desc: "Leads engaged before they can click away" },
      { title: "24/7 Lead Coverage", desc: "No more missed opportunities after hours" },
      { title: "Higher Contact Rates", desc: "Reach leads when intent is highest" }
    ]
  },
  {
    number: "02",
    title: "AI Web Conversion",
    subtitle: "Your website generates traffic, but visitors disappear without a trace. We deploy AI assistants that qualify visitors, answer questions, and book appointments — while you sleep.",
    icon: Bot,
    delivers: [
      "AI chat agents trained on your services and FAQs",
      "Smart qualification flows that capture intent and urgency",
      "Appointment booking integrated with your calendar",
      "Lead enrichment with context before handoff to humans",
      "Guardrails so AI knows when to escalate to your team"
    ],
    outcomes: [
      { title: "Always-On Sales Layer", desc: "Convert visitors 24/7 without adding headcount" },
      { title: "Pre-Qualified Appointments", desc: "Your calendar fills with ready-to-buy leads" },
      { title: "Reduced Bounce Rate", desc: "Visitors get answers instead of leaving" }
    ]
  },
  {
    number: "03",
    title: "Database Reactivation",
    subtitle: "Your CRM is full of leads you've already paid for — sitting dormant. We mine your existing database to generate immediate cash flow from people who already know your name.",
    icon: Database,
    delivers: [
      "Dormancy segmentation to identify high-value reactivation targets",
      "Re-engagement sequences tailored to time since last contact",
      "Seasonal and event-triggered campaigns that feel natural",
      "Multi-touch outreach: email, SMS, and ringless voicemail",
      "Win-back offers and messaging frameworks that convert"
    ],
    outcomes: [
      { title: "Immediate Cash Flow", desc: "Revenue from leads you already own" },
      { title: "Lower CAC", desc: "Reactivated leads cost less than new acquisition" },
      { title: "Database Hygiene", desc: "Clean, organized, and actionable contact lists" }
    ]
  }
];
const operationalPillars = [
  {
    number: "04",
    title: "Ops & Workflow Automation",
    subtitle: "Your team is drowning in manual tasks: data entry, status updates, appointment reminders. We connect your tools and eliminate the busywork so your team can focus on revenue.",
    icon: Cog,
    delivers: [
      "CRM automation that updates records without manual entry",
      "Appointment reminders and confirmation sequences",
      "Task creation and assignment based on pipeline stage",
      "Cross-tool integrations: CRM, calendar, invoicing, comms",
      "Process visibility so you can see where work gets stuck"
    ],
    outcomes: [
      { title: "Hours Saved Weekly", desc: "Eliminate repetitive admin tasks" },
      { title: "Fewer Errors", desc: "Automation doesn't forget or mistype" },
      { title: "Team Focus", desc: "Your people do what only humans can do" }
    ]
  },
  {
    number: "05",
    title: "Follow-Up Engine",
    subtitle: "Leads go cold because follow-up is inconsistent. We build relentless, intelligent follow-up sequences that chase no-shows, nurture maybes, and convert stale quotes — without annoying anyone.",
    icon: MessageSquare,
    delivers: [
      "Stage-based follow-up sequences triggered automatically",
      "No-show and cancellation recovery campaigns",
      "Quote follow-up until they say yes, no, or not now",
      "Human vs AI decision points so escalation happens at the right time",
      "Cadence optimization to avoid spam while staying persistent"
    ],
    outcomes: [
      { title: "No Lead Left Behind", desc: "Every opportunity gets proper follow-up" },
      { title: "Recovered Revenue", desc: "Win back no-shows and stale quotes" },
      { title: "Consistent Execution", desc: "Follow-up happens whether you're busy or not" }
    ]
  },
  {
    number: "06",
    title: "Reputation Flywheel",
    subtitle: "Reviews drive decisions, but asking feels awkward and timing is everything. We automate review requests at the perfect moment and route negative feedback internally before it goes public.",
    icon: Star,
    delivers: [
      "Review requests triggered at optimal moments (post-service, post-payment)",
      "Multi-platform support: Google, Yelp, Facebook, industry-specific",
      "Sentiment detection that routes unhappy clients to resolution first",
      "Response templates for both positive and negative reviews",
      "Review velocity tracking and reputation scorecards"
    ],
    outcomes: [
      { title: "More 5-Star Reviews", desc: "Consistent asks = consistent results" },
      { title: "Damage Control", desc: "Intercept problems before they go public" },
      { title: "Trust Building", desc: "Social proof that drives new business" }
    ]
  }
];
function PillarCard({ pillar, index, isReversed }) {
  const Icon = pillar.icon;
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: "initial",
      whileInView: "animate",
      viewport: { once: true, margin: "-100px" },
      variants: stagger,
      className: "relative",
      "data-testid": `card-pillar-${pillar.number}`,
      children: [
        /* @__PURE__ */ jsxs("div", { className: `grid lg:grid-cols-12 gap-8 lg:gap-12 items-start ${isReversed ? "" : "lg:flex-row-reverse"}`, children: [
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              variants: fadeIn,
              className: `lg:col-span-7 ${isReversed ? "" : "lg:col-start-6"}`,
              children: [
                /* @__PURE__ */ jsx("div", { className: "group w-14 h-14 mb-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:scale-110 hover:border-primary/50 transition-all duration-300", children: /* @__PURE__ */ jsx(Icon, { className: "w-6 h-6 text-primary group-hover:drop-shadow-[0_0_8px_rgba(103,232,249,0.5)]" }) }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-4 mb-4", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-xs font-mono text-primary/60", children: pillar.number }),
                  /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-display font-medium text-white", children: pillar.title })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-lg text-slate-400 leading-relaxed mb-8", children: pillar.subtitle }),
                /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-sm font-mono text-primary mb-4", children: "WHAT WE DELIVER" }),
                  /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: pillar.delivers.map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-slate-300", children: [
                    /* @__PURE__ */ jsx(CheckCircle2, { className: "w-5 h-5 text-primary flex-shrink-0 mt-0.5" }),
                    /* @__PURE__ */ jsx("span", { children: item })
                  ] }, i)) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              variants: fadeIn,
              className: `lg:col-span-5 ${isReversed ? "" : "lg:col-start-1 lg:row-start-1"}`,
              children: /* @__PURE__ */ jsxs("div", { className: "p-8 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-sm font-mono text-primary mb-6", children: "YOUR OUTCOMES" }),
                /* @__PURE__ */ jsx("div", { className: "space-y-6", children: pillar.outcomes.map((outcome, i) => /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h4", { className: "font-medium text-white mb-1", children: outcome.title }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500", children: outcome.desc })
                ] }, i)) })
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-24 border-b border-white/5" })
      ]
    }
  );
}
function Solutions() {
  const solutionsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "SimpleSequence Six Pillars",
    description: "Six interconnected systems that transform how service businesses capture, convert, and retain customers",
    itemListElement: [...growthEnginePillars, ...operationalPillars].map((pillar, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: pillar.title,
        description: pillar.subtitle
      }
    }))
  };
  return /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "The Six Pillars | SimpleSequence",
        description: "Six operational systems for service businesses: Speed-to-Lead, AI Web Conversion, Database Reactivation, Ops Automation, Follow-Up Engine, and Reputation Flywheel.",
        jsonLd: solutionsSchema
      }
    ),
    /* @__PURE__ */ jsxs("section", { className: "pt-40 pb-24 relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--primary),0.08),transparent_50%)]" }),
      /* @__PURE__ */ jsx(CircuitBeams, { className: "opacity-50" }),
      /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 relative z-10", children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8 },
          className: "max-w-4xl mx-auto text-center",
          children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm font-mono text-primary mb-6 block", children: "WHAT WE DEPLOY" }),
            /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-6xl font-display font-medium mb-8 tracking-tight", children: [
              "The ",
              /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Six Pillars" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xl text-slate-400 leading-relaxed mb-8 max-w-3xl mx-auto", children: "Six interconnected systems that transform how you capture, convert, and retain customers — so you stop guessing and start scaling with confidence." }),
            /* @__PURE__ */ jsx("div", { className: "p-6 rounded-2xl border border-white/10 bg-white/[0.02] max-w-2xl mx-auto", children: /* @__PURE__ */ jsxs("p", { className: "text-slate-300 leading-relaxed", children: [
              /* @__PURE__ */ jsx("span", { className: "text-white font-medium", children: "This is not a menu — it's a system." }),
              /* @__PURE__ */ jsx("br", {}),
              "Each pillar reinforces the others. Speed-to-Lead feeds your pipeline. Follow-Up converts it. Reputation compounds the results. Together, they create an operational engine that runs whether you're there or not."
            ] }) })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "py-24 relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0", children: /* @__PURE__ */ jsx(GridBeam, { showCenterBeam: true, gridOpacity: 0.08 }) }),
      /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 relative z-10", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: fadeInUp$2.initial,
            whileInView: fadeInUp$2.whileInView,
            viewport: fadeInUp$2.viewport,
            transition: fadeInUp$2.transition,
            className: "max-w-3xl mb-20",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-6", children: [
                /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center", children: /* @__PURE__ */ jsx(TrendingUp, { className: "w-6 h-6 text-primary" }) }),
                /* @__PURE__ */ jsx("span", { className: "text-sm font-mono text-primary uppercase tracking-widest", children: "The Growth Engine" })
              ] }),
              /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-4xl font-display font-medium mb-4", children: [
                "Stop Losing Leads to ",
                /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Speed and Silence" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-slate-400 leading-relaxed", children: 'Your marketing works, but your capture system is leaking. These three pillars install an "Always-On" sales layer that engages every opportunity instantly — maximum ROI on every ad dollar and a calendar full of qualified appointments.' })
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "space-y-32", children: growthEnginePillars.map((pillar, index) => /* @__PURE__ */ jsx(
          PillarCard,
          {
            pillar,
            index,
            isReversed: index % 2 === 0
          },
          pillar.number
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "py-24 relative overflow-hidden border-t border-white/5", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0", children: /* @__PURE__ */ jsx(GridBeam, { showCenterBeam: false, gridOpacity: 0.06 }) }),
      /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 relative z-10", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: fadeInUp$2.initial,
            whileInView: fadeInUp$2.whileInView,
            viewport: fadeInUp$2.viewport,
            transition: fadeInUp$2.transition,
            className: "max-w-3xl mb-20",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-6", children: [
                /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center", children: /* @__PURE__ */ jsx(Shield, { className: "w-6 h-6 text-primary" }) }),
                /* @__PURE__ */ jsx("span", { className: "text-sm font-mono text-primary uppercase tracking-widest", children: "The Operational Ecosystem" })
              ] }),
              /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-4xl font-display font-medium mb-4", children: [
                "Scale Your Operations, ",
                /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Not Your Headcount" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-slate-400 leading-relaxed", children: 'Eliminate the manual busywork and "human bottlenecks" that cause burnout. These three pillars build the backend infrastructure that runs your business on autopilot — reclaim your time and sanity.' })
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "space-y-32", children: operationalPillars.map((pillar, index) => /* @__PURE__ */ jsx(
          PillarCard,
          {
            pillar,
            index,
            isReversed: index % 2 === 0
          },
          pillar.number
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "py-32 relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.1),transparent_50%)]" }),
      /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 max-w-4xl text-center relative z-10", children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: fadeInUp$2.initial,
          whileInView: fadeInUp$2.whileInView,
          viewport: fadeInUp$2.viewport,
          transition: fadeInUp$2.transition,
          children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-4xl md:text-5xl font-display font-medium mb-8", children: [
              "Ready to Install ",
              /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Your Six Pillars" }),
              "?"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xl text-slate-400 mb-12 max-w-2xl mx-auto", children: "Start with a free diagnostic to see which pillars need attention first — and what to fix to stop the leaks in your revenue and operations." }),
            /* @__PURE__ */ jsx(
              Link,
              {
                href: "/assessment",
                "data-testid": "button-solutions-cta",
                className: "inline-flex items-center justify-center bg-[#1ab1d9] text-primary-foreground hover:bg-cyan-300 rounded-full px-10 h-14 text-lg font-semibold shadow-[0_0_20px_-5px_var(--color-primary)] transition-colors",
                children: "Get Your Free Diagnostic"
              }
            )
          ]
        }
      ) })
    ] })
  ] });
}
const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxs(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
const DialogHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    ),
    ...props
  }
);
DialogHeader.displayName = "DialogHeader";
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  LabelPrimitive.Root,
  {
    ref,
    className: cn(labelVariants(), className),
    ...props
  }
));
Label.displayName = LabelPrimitive.Root.displayName;
const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      className: cn(
        "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ref,
      ...props
    }
  );
});
Textarea.displayName = "Textarea";
function ContactFormDialog({ trigger, source, title, description }) {
  const [open, setOpen] = useState(false);
  const { toast: toast2 } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  const submitLead = useMutation({
    mutationFn: async (data) => {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to submit");
      }
      return response.json();
    },
    onSuccess: () => {
      toast2({
        title: "Success!",
        description: "We'll be in touch soon."
      });
      setFormData({ name: "", email: "", company: "", message: "" });
      setOpen(false);
    },
    onError: (error) => {
      toast2({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit. Please try again.",
        variant: "destructive"
      });
    }
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    submitLead.mutate({
      ...formData,
      source
    });
  };
  return /* @__PURE__ */ jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: trigger }),
    /* @__PURE__ */ jsxs(DialogContent, { className: "sm:max-w-[500px] bg-zinc-950 border-white/10", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { className: "text-2xl font-bold text-white", children: title }),
        /* @__PURE__ */ jsx(DialogDescription, { className: "text-slate-400", children: description })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 mt-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "name", className: "text-white", children: "Name *" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "name",
              "data-testid": "input-name",
              required: true,
              value: formData.name,
              onChange: (e) => setFormData({ ...formData, name: e.target.value }),
              className: "bg-zinc-900 border-white/10 text-white placeholder:text-slate-600",
              placeholder: "Your name"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "email", className: "text-white", children: "Email *" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "email",
              "data-testid": "input-email",
              type: "email",
              required: true,
              value: formData.email,
              onChange: (e) => setFormData({ ...formData, email: e.target.value }),
              className: "bg-zinc-900 border-white/10 text-white placeholder:text-slate-600",
              placeholder: "your@email.com"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "company", className: "text-white", children: "Company" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "company",
              "data-testid": "input-company",
              value: formData.company,
              onChange: (e) => setFormData({ ...formData, company: e.target.value }),
              className: "bg-zinc-900 border-white/10 text-white placeholder:text-slate-600",
              placeholder: "Your company name"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "message", className: "text-white", children: "Message" }),
          /* @__PURE__ */ jsx(
            Textarea,
            {
              id: "message",
              "data-testid": "input-message",
              value: formData.message,
              onChange: (e) => setFormData({ ...formData, message: e.target.value }),
              className: "bg-zinc-900 border-white/10 text-white placeholder:text-slate-600 min-h-[100px]",
              placeholder: "Tell us about your needs..."
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "submit",
            "data-testid": "button-submit-form",
            disabled: submitLead.isPending,
            className: "w-full bg-gradient-to-r from-sky-400 to-primary hover:from-sky-500 hover:to-primary/90 text-zinc-950 font-semibold",
            children: submitLead.isPending ? "Submitting..." : "Submit"
          }
        )
      ] })
    ] })
  ] });
}
function AnimatedCounter({ value, className }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(value);
  useEffect(() => {
    if (!isInView) {
      setDisplayValue(value.replace(/[\d.]+/, "0"));
      return;
    }
    const match = value.match(/^([+-]?)(\d+\.?\d*)(.*)/);
    if (!match) {
      setDisplayValue(value);
      return;
    }
    const [, prefix, numStr, suffix] = match;
    const targetNum = parseFloat(numStr);
    const hasDecimal = numStr.includes(".");
    const decimalPlaces = hasDecimal ? numStr.split(".")[1]?.length || 0 : 0;
    const duration = 1500;
    const steps = 60;
    const stepDuration = duration / steps;
    let currentStep = 0;
    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
    const interval = setInterval(() => {
      currentStep++;
      const progress = easeOutQuart(currentStep / steps);
      const currentNum = targetNum * progress;
      if (currentStep >= steps) {
        setDisplayValue(value);
        clearInterval(interval);
      } else {
        const formatted = hasDecimal ? currentNum.toFixed(decimalPlaces) : Math.round(currentNum).toString();
        setDisplayValue(`${prefix}${formatted}${suffix}`);
      }
    }, stepDuration);
    return () => clearInterval(interval);
  }, [isInView, value]);
  return /* @__PURE__ */ jsx("span", { ref, className, children: displayValue });
}
const fadeInUp$1 = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7 }
};
const industries = [
  {
    label: "Home Services",
    title: "Home Services",
    description: "You know the frustration: leads come in while you're on a roof or under a house. By the time you call back, they've already booked someone else. We fix that.",
    icon: Home$1,
    deliverables: [
      { title: "Intake Flow Architecture", desc: "Never miss a lead — capture calls, texts, and web inquiries automatically" },
      { title: "Priority Routing Logic", desc: "Know instantly which leads are hot and need immediate attention" },
      { title: "Follow-Up Sequences", desc: "Stop forgetting callbacks — consistent follow-up that closes more estimates" },
      { title: "AI-Readiness Map", desc: "Where AI can respond for you — without customers feeling ignored" }
    ],
    caseStudy: {
      title: "Real Results",
      metrics: [
        { value: "47%", label: "Increase in estimate bookings for roofing company" },
        { value: "3.2×", label: "More emergency calls converted after hours" },
        { value: "89%", label: "Lead follow-up completion rate (vs. 31% before)" }
      ]
    },
    cardSize: "large"
  },
  {
    label: "Legal",
    title: "Law Firms",
    description: "Your front desk is overwhelmed. Leads call after hours. Prospects go cold before you can follow up. Good cases slip to competitors who answered faster.",
    icon: Scale,
    deliverables: [
      { title: "Case Intake Sequences", desc: "Capture and qualify cases 24/7 — even when your office is closed" },
      { title: "Nurture Campaign Clarity", desc: "Stay top-of-mind while prospects make their decision" },
      { title: "Referral Partner Workflows", desc: "Make it effortless for partners to send you qualified cases" },
      { title: "Client Communication Hub", desc: `Eliminate the constant "where's my case" calls draining your staff` }
    ],
    caseStudy: {
      title: "Case Study",
      subtitle: "Personal Injury Firm",
      metrics: [
        { value: "24/7", label: "Consultation availability" },
        { value: "67%", label: "More qualified case intakes" },
        { value: "4.5×", label: "ROI in first 6 months" }
      ]
    },
    cardSize: "medium"
  },
  {
    label: "MedSpa & Aesthetics",
    title: "MedSpas & Aesthetic Practices",
    description: "High no-show rates. Consultations that don't convert. Membership churn. Package buyers who never come back for their next treatment. Sound familiar?",
    icon: Sparkles,
    deliverables: [
      { title: "Consultation Booking Flow", desc: "Pre-qualify leads so your consults convert higher" },
      { title: "Treatment Series Logic", desc: "Automatic reminders that bring package buyers back in" },
      { title: "Membership Clarity", desc: "Stop losing recurring revenue to preventable churn" },
      { title: "Post-Treatment Check-Ins", desc: "Build loyalty and surface upsell opportunities naturally" }
    ],
    caseStudy: {
      title: "Client Success Story",
      metrics: [
        { value: "+127%", label: "Consultation bookings" },
        { value: "-64%", label: "No-show rate" },
        { value: "+203%", label: "Treatment packages sold" }
      ]
    },
    cardSize: "compact"
  },
  {
    label: "Real Estate",
    title: "Real Estate Teams & Brokerages",
    description: "Leads come in hot and go cold fast. Your agents respond inconsistently. Past clients forget you exist. You're leaving commissions on the table every month.",
    icon: Building2,
    deliverables: [
      { title: "Lead Response Sequences", desc: "Every agent responds the same way — fast, professional, consistent" },
      { title: "Nurture Cadences", desc: "Past clients think of you first when it's time to buy or sell again" },
      { title: "Pipeline Stage Clarity", desc: "See exactly where every deal stands without chasing agents" },
      { title: "Transaction Updates", desc: "Keep buyers informed automatically so you're not babysitting deals" }
    ],
    caseStudy: {
      title: "Real Results",
      metrics: [
        { value: "18%", label: "Faster average lead response" },
        { value: "2.1×", label: "Improvement in lead conversion" },
        { value: "34 hrs", label: "Agent time saved monthly" }
      ]
    },
    cardSize: "large"
  },
  {
    label: "Dental",
    title: "Dental Practices",
    description: "Missed appointments drain your schedule. Treatment plans sit unsigned. Recall reminders get ignored. Your front desk is buried in phone calls instead of helping patients.",
    icon: Smile,
    deliverables: [
      { title: "New Patient Onboarding", desc: "Smooth intake that makes a great first impression" },
      { title: "Recall Reminder Logic", desc: "Patients actually show up for their cleanings — automatically" },
      { title: "Treatment Acceptance Flow", desc: `Follow-up that turns "I'll think about it" into scheduled procedures` },
      { title: "Front Desk Efficiency", desc: "Free your team from phone tag so they can focus on patient care" }
    ],
    caseStudy: {
      title: "Practice Results",
      metrics: [
        { value: "-38%", label: "Reduction in missed appointments" },
        { value: "+24%", label: "Increase in treatment acceptance" },
        { value: "19 hrs", label: "Front desk time regained weekly" }
      ]
    },
    cardSize: "medium"
  }
];
const cardSizeClasses = {
  compact: "p-6 md:p-8",
  medium: "p-8 md:p-10",
  large: "p-10 md:p-12"
};
const metricSizeClasses = {
  compact: "text-3xl md:text-4xl",
  medium: "text-4xl md:text-5xl",
  large: "text-5xl md:text-6xl"
};
function IndustrySection({ industry, index }) {
  const Icon = industry.icon;
  const isReversed = index % 2 === 1;
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const contentX = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    isReversed ? [80, 0, 0, 80] : [-80, 0, 0, -80]
  );
  const contentOpacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
  const cardX = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    isReversed ? [-80, 0, 0, -80] : [80, 0, 0, 80]
  );
  const cardOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const cardScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.9]);
  return /* @__PURE__ */ jsxs("section", { ref: sectionRef, className: "py-28 md:py-36 relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6", children: /* @__PURE__ */ jsxs("div", { className: `grid lg:grid-cols-2 gap-20 lg:gap-28 items-center`, children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          style: { x: contentX, opacity: contentOpacity },
          className: `${isReversed ? "lg:order-2" : "lg:order-1"}`,
          children: [
            /* @__PURE__ */ jsx("div", { className: "w-16 h-16 mb-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:scale-105 hover:border-primary/50 transition-all duration-300", children: /* @__PURE__ */ jsx(Icon, { className: "w-7 h-7 text-primary" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-5xl font-display font-medium text-white mb-5", children: industry.title }),
            /* @__PURE__ */ jsx("p", { className: "text-lg md:text-xl text-slate-400 leading-relaxed mb-12 max-w-xl", children: industry.description }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold text-white mb-8", children: "The Clarity We Deliver:" }),
              /* @__PURE__ */ jsx("ul", { className: "space-y-6", children: industry.deliverables.map((item, i) => /* @__PURE__ */ jsxs(
                motion.li,
                {
                  className: "flex items-start gap-4",
                  initial: { opacity: 0, x: -20 },
                  whileInView: { opacity: 1, x: 0 },
                  viewport: { once: false, margin: "-50px" },
                  transition: { duration: 0.5, delay: i * 0.1 },
                  children: [
                    /* @__PURE__ */ jsx(CheckCircle2, { className: "w-5 h-5 text-primary flex-shrink-0 mt-1" }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsxs("span", { className: "font-medium text-white", children: [
                        item.title,
                        ":"
                      ] }),
                      " ",
                      /* @__PURE__ */ jsx("span", { className: "text-slate-400", children: item.desc })
                    ] })
                  ]
                },
                i
              )) })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          style: { x: cardX, opacity: cardOpacity, scale: cardScale },
          className: `${isReversed ? "lg:order-1" : "lg:order-2"} flex ${isReversed ? "lg:justify-start" : "lg:justify-end"}`,
          children: /* @__PURE__ */ jsxs("div", { className: `${cardSizeClasses[industry.cardSize]} rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent backdrop-blur-sm max-w-md w-full`, children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-10", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-xl font-semibold text-white", children: industry.caseStudy.title }),
              industry.caseStudy.subtitle && /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 mt-2", children: industry.caseStudy.subtitle })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "space-y-10", children: industry.caseStudy.metrics.map((metric, i) => /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: false, margin: "-30px" },
                transition: { duration: 0.5, delay: i * 0.15 },
                children: [
                  /* @__PURE__ */ jsx("div", { className: `${metricSizeClasses[industry.cardSize]} font-display font-semibold text-primary mb-2`, children: /* @__PURE__ */ jsx(AnimatedCounter, { value: metric.value }) }),
                  /* @__PURE__ */ jsx("div", { className: "text-sm text-slate-400 leading-relaxed", children: metric.label })
                ]
              },
              i
            )) })
          ] })
        }
      )
    ] }) }),
    index < industries.length - 1 && /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 mt-28 md:mt-36", children: /* @__PURE__ */ jsx("div", { className: "border-b border-white/5" }) })
  ] });
}
function Industries() {
  const industriesSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Industries We Serve",
    description: "AI-powered front desk and follow-up solutions for service businesses",
    hasPart: industries.map((industry) => ({
      "@type": "Service",
      name: `${industry.title} AI Solutions`,
      description: industry.description,
      serviceType: "AI Front Desk & Follow-Up"
    }))
  };
  return /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Industries We Serve | SimpleSequence",
        description: "AI-powered front desk and follow-up solutions for Home Services, Law Firms, Med Spas, Property Management, and Dental practices. Real results with measurable ROI.",
        jsonLd: industriesSchema
      }
    ),
    /* @__PURE__ */ jsxs("section", { className: "pt-44 pb-20 relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--primary),0.08),transparent_50%)]" }),
      /* @__PURE__ */ jsx(CircuitBeams, { className: "opacity-40" }),
      /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 relative z-10", children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8 },
          className: "max-w-4xl mx-auto text-center",
          children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm font-mono text-primary mb-6 block", children: "INDUSTRIES WE SUPPORT" }),
            /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-6xl lg:text-7xl font-display font-medium mb-8 tracking-tight", children: [
              "We Know ",
              /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Your Industry" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl text-slate-400 leading-relaxed max-w-3xl mx-auto mb-6", children: "You're losing leads. Follow-up is inconsistent. Your team is stretched thin. These aren't unique problems — they're industry-wide." }),
            /* @__PURE__ */ jsx("p", { className: "text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto", children: "We bring tailored operational clarity so you stop guessing, stop missing opportunities, and start running smoother." })
          ]
        }
      ) })
    ] }),
    industries.map((industry, index) => /* @__PURE__ */ jsx(IndustrySection, { industry, index }, industry.label)),
    /* @__PURE__ */ jsxs("section", { className: "py-36 relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.1),transparent_50%)]" }),
      /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 max-w-4xl text-center relative z-10", children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: fadeInUp$1.initial,
          whileInView: fadeInUp$1.whileInView,
          viewport: fadeInUp$1.viewport,
          transition: fadeInUp$1.transition,
          children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-4xl md:text-6xl font-display font-medium mb-10", children: [
              "Don't See ",
              /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Your Industry" }),
              "?"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl text-slate-400 mb-14 max-w-2xl mx-auto leading-relaxed", children: "If you're a service business losing leads, struggling with follow-up, or feeling like operations could be smoother — we can help." }),
            /* @__PURE__ */ jsx(
              ContactFormDialog,
              {
                source: "industries-cta",
                title: "Schedule a Discovery Call",
                description: "Tell us about your business and we'll help you understand where operational clarity can make the biggest impact.",
                trigger: /* @__PURE__ */ jsx(
                  Button,
                  {
                    size: "lg",
                    className: "bg-[#1ab1d9] text-primary-foreground hover:bg-cyan-300 rounded-full px-12 h-16 text-lg font-semibold shadow-[0_0_30px_-5px_var(--color-primary)]",
                    "data-testid": "button-industries-cta",
                    children: "Schedule a Discovery Call"
                  }
                )
              }
            )
          ]
        }
      ) })
    ] })
  ] });
}
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7 }
};
const phases = [
  {
    number: 1,
    icon: Search,
    title: "Diagnostic & Audit",
    description: "Before we fix anything, we find out what's actually broken. We map how leads move through your business today, identify where they slip away, and uncover the friction your team feels but can't quite name.",
    whatHappens: {
      title: "What Happens",
      items: [
        "You complete a short questionnaire about your current systems",
        "We get view-only access to your tools (CRM, forms, calendar)",
        "One 60-minute clarity session with you and/or your team",
        "We analyze your lead flow, response times, and follow-up patterns",
        "We identify which of the Six Pillars need attention first"
      ]
    },
    whatYouExperience: {
      title: "What You Experience",
      items: [
        "Minimal disruption — about 2 hours of your time total",
        "No judgment — we're here to help, not criticize",
        "Clear communication throughout the process",
        "A diagnostic report you can actually understand",
        "A prioritized roadmap with quick wins identified"
      ]
    },
    timeline: "5–7 business days from kickoff to final diagnostic report."
  },
  {
    number: 2,
    icon: Wrench,
    title: "Build & Deploy",
    description: "Once you have clarity, we build. We turn the diagnostic findings into working systems — installing the Six Pillars that matter most for your business, integrated with what you already use.",
    whatHappens: {
      title: "What Happens",
      items: [
        "We build in priority order — quick wins first, then bigger systems",
        "Your existing tools stay in place (no forced platform swaps)",
        "We configure and connect your Six Pillar systems",
        "Custom workflows that match how your team actually operates",
        "Training sessions so your team feels confident, not confused"
      ]
    },
    whatYouExperience: {
      title: "What You Experience",
      items: [
        "Weekly updates — you always know what's happening",
        "Milestone reviews where you provide input and approval",
        "Direct access to progress (nothing feels like a black box)",
        "Testing before go-live so we catch issues early",
        "Full walkthrough with recordings and documentation at handoff"
      ]
    },
    timeline: "3–6 weeks depending on which pillars you're implementing."
  },
  {
    number: 3,
    icon: TrendingUp,
    title: "Optimize & Scale",
    description: "Your business evolves — your systems should too. After launch, we monitor what's working, tune what isn't, and help you scale the results without adding chaos or headcount.",
    whatHappens: {
      title: "What Happens",
      items: [
        "Built-in review cycles at 30, 60, and 90 days post-launch",
        "Performance tracking against your baseline metrics",
        "Bottleneck fixes as new friction points emerge",
        "Workflow tuning based on real usage data",
        "Recommendations for what to tackle next, in order of impact"
      ]
    },
    whatYouExperience: {
      title: "What You Experience",
      items: [
        "Confidence that someone is watching the metrics for you",
        "Quick responses when something needs adjustment",
        "Clear reports showing what's improved (and what's next)",
        "Optional ongoing support if you want a long-term partner",
        "No surprises — proactive communication about any issues"
      ]
    },
    timeline: "Review cycles included. Ongoing optimization available as a monthly retainer."
  }
];
const sixPillars = [
  { icon: Zap, name: "Speed-to-Lead", desc: "Instant response systems" },
  { icon: Bot, name: "AI Web Conversion", desc: "24/7 chat qualification" },
  { icon: Database, name: "Database Reactivation", desc: "Mine dormant leads" },
  { icon: Cog, name: "Ops Automation", desc: "Eliminate manual busywork" },
  { icon: MessageSquare, name: "Follow-Up Engine", desc: "Relentless nurture sequences" },
  { icon: Star, name: "Reputation Flywheel", desc: "Automated review generation" }
];
const principles = [
  {
    icon: Microscope,
    title: "Evidence-Based",
    description: "We don't guess — we diagnose. Every recommendation comes from your actual data, conversations, and workflows. You're not betting your operations on theory."
  },
  {
    icon: Target,
    title: "Outcome-Focused",
    description: "We're not here to sell you tools. We're here to deliver results: more appointments, faster response times, and fewer leaks in your revenue paths."
  },
  {
    icon: RefreshCw,
    title: "Adaptive",
    description: "Your business changes. Your systems should too. Nothing we build locks you into rigid workflows — we design for iteration so you can evolve without starting over."
  }
];
const faqs = [
  {
    question: "How long until I see results?",
    answer: "Diagnostic: 5–7 business days. Build: 3–6 weeks. Many clients see quick wins within the first 30 days of implementation."
  },
  {
    question: "What do I need to provide to get started?",
    answer: "A short questionnaire, view-only access to your tools, and one 60-minute clarity session. We handle everything else."
  },
  {
    question: "Will this disrupt my day-to-day operations?",
    answer: "No. Everything happens alongside your current workflow. No downtime, no chaos. About 2 hours of your time for the diagnostic phase."
  },
  {
    question: "What if I need changes after the system is live?",
    answer: "That's expected. You get built-in review cycles at 30, 60, and 90 days — plus optional ongoing support."
  },
  {
    question: "Do I have to replace the tools I'm already using?",
    answer: "Almost never. We work with what you have — unless something truly can't support the systems we're building."
  },
  {
    question: "What if I'm not ready for a full build?",
    answer: "Start with just the Diagnostic. You'll get a clear roadmap you can implement yourself or bring us back when you're ready."
  },
  {
    question: "How do you measure success?",
    answer: "Faster response times, higher contact rates, better follow-up consistency, and measurable improvements in conversions and revenue."
  },
  {
    question: "Will my team be trained on the new systems?",
    answer: "Yes. Every Build engagement includes training sessions, documentation, and recordings so your team feels confident."
  }
];
function PhaseCard({ phase, index }) {
  const Icon = phase.icon;
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, margin: "-100px" });
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      ref: cardRef,
      initial: { opacity: 0, y: 60 },
      animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 },
      transition: { duration: 0.7, delay: index * 0.1 },
      className: "relative",
      "data-testid": `card-phase-${phase.number}`,
      children: /* @__PURE__ */ jsxs("div", { className: "p-8 md:p-12 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent backdrop-blur-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-start gap-6 mb-10", children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 hover:scale-105 hover:border-primary/50 transition-all duration-300", children: /* @__PURE__ */ jsx(Icon, { className: "w-7 h-7 text-primary" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("span", { className: "inline-block px-3 py-1 rounded-full text-xs font-mono text-primary bg-primary/10 border border-primary/20 mb-3", children: [
              "Phase ",
              phase.number
            ] }),
            /* @__PURE__ */ jsx("h3", { className: "text-2xl md:text-3xl font-display font-medium text-white mb-3", children: phase.title }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-lg leading-relaxed max-w-2xl", children: phase.description })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-10 mb-10", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "text-base font-semibold text-white mb-5", children: phase.whatHappens.title }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-4", children: phase.whatHappens.items.map((item, i) => /* @__PURE__ */ jsxs(
              motion.li,
              {
                initial: { opacity: 0, x: -15 },
                animate: isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 },
                transition: { duration: 0.4, delay: 0.3 + i * 0.08 },
                className: "flex items-start gap-3",
                children: [
                  /* @__PURE__ */ jsx(CheckCircle2, { className: "w-5 h-5 text-primary flex-shrink-0 mt-0.5" }),
                  /* @__PURE__ */ jsx("span", { className: "text-slate-300", children: item })
                ]
              },
              i
            )) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "text-base font-semibold text-white mb-5", children: phase.whatYouExperience.title }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-4", children: phase.whatYouExperience.items.map((item, i) => /* @__PURE__ */ jsxs(
              motion.li,
              {
                initial: { opacity: 0, x: -15 },
                animate: isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 },
                transition: { duration: 0.4, delay: 0.4 + i * 0.08 },
                className: "flex items-start gap-3",
                children: [
                  /* @__PURE__ */ jsx(CheckCircle2, { className: "w-5 h-5 text-primary flex-shrink-0 mt-0.5" }),
                  /* @__PURE__ */ jsx("span", { className: "text-slate-300", children: item })
                ]
              },
              i
            )) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 10 },
            animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 },
            transition: { duration: 0.5, delay: 0.6 },
            className: "p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20",
            "data-testid": `timeline-phase-${phase.number}`,
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
                /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center", children: /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4 text-primary" }) }),
                /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-white", children: "Timeline" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-slate-300 text-sm leading-relaxed", children: phase.timeline })
            ]
          }
        )
      ] })
    }
  );
}
function Process() {
  const faqSchema = createFAQSchema(faqs);
  return /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Our Process - How We Work With You | SimpleSequence",
        description: "Three-phase client journey: Diagnostic & Audit, Build & Deploy, and Optimize & Scale. Clear timelines, transparent communication, and no surprises.",
        jsonLd: faqSchema
      }
    ),
    /* @__PURE__ */ jsxs("section", { className: "pt-44 pb-24 relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--primary),0.08),transparent_50%)]" }),
      /* @__PURE__ */ jsx(CircuitBeams, { className: "opacity-40" }),
      /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 relative z-10", children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8 },
          className: "max-w-4xl mx-auto text-center",
          children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm font-mono text-primary mb-6 block", children: "YOUR JOURNEY" }),
            /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-6xl lg:text-7xl font-display font-medium mb-8 tracking-tight", children: [
              "How We ",
              /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Work With You" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl text-slate-400 leading-relaxed max-w-3xl mx-auto", children: "A structured process designed around your experience — not ours. Clear phases, honest timelines, and no surprises along the way." })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "py-16 relative", children: [
      /* @__PURE__ */ jsx(GridBeam, { showCenterBeam: false, gridOpacity: 0.15 }),
      /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 relative z-10", children: /* @__PURE__ */ jsx("div", { className: "space-y-12 max-w-5xl mx-auto", children: phases.map((phase, index) => /* @__PURE__ */ jsx(PhaseCard, { phase, index }, phase.number)) }) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-24 relative overflow-hidden border-t border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: fadeInUp.initial,
          whileInView: fadeInUp.whileInView,
          viewport: fadeInUp.viewport,
          transition: fadeInUp.transition,
          className: "text-center mb-12",
          children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm font-mono text-primary mb-4 block", children: "WHAT WE INSTALL" }),
            /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-4xl font-display font-medium mb-6", children: [
              "The ",
              /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Six Pillars" }),
              " We Deploy"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-lg text-slate-400 max-w-2xl mx-auto", children: "During the Build phase, we install the systems that matter most for your business. Each pillar is designed to work together as a unified operating engine." })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto mb-10", children: sixPillars.map((pillar, i) => {
        const Icon = pillar.icon;
        return /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.4, delay: i * 0.08 },
            className: "p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-primary/30 transition-all duration-300 text-center",
            children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-3", children: /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5 text-primary" }) }),
              /* @__PURE__ */ jsx("h4", { className: "text-sm font-medium text-white mb-1", children: pillar.name }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500", children: pillar.desc })
            ]
          },
          i
        );
      }) }),
      /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsx(Link, { href: "/solutions", children: /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "outline",
          className: "rounded-full border-white/20 hover:border-primary/50 hover:bg-primary/5",
          "data-testid": "link-view-solutions",
          children: [
            "Explore the Six Pillars in Detail",
            /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 ml-2" })
          ]
        }
      ) }) })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "py-28 relative overflow-hidden border-t border-white/5", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.05),transparent_50%)]" }),
      /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 relative z-10", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: fadeInUp.initial,
            whileInView: fadeInUp.whileInView,
            viewport: fadeInUp.viewport,
            transition: fadeInUp.transition,
            className: "text-center mb-16",
            children: [
              /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-5xl font-display font-medium mb-6", children: [
                "Why Clients ",
                /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Trust This Process" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xl text-slate-400 max-w-2xl mx-auto", children: "Because we focus on what actually matters: understanding your reality, fixing what's broken, and building systems that grow with you." })
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-8 max-w-5xl mx-auto", children: principles.map((principle, i) => {
          const Icon = principle.icon;
          return /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 30 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, margin: "-50px" },
              transition: { duration: 0.6, delay: i * 0.1 },
              className: "p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent hover:border-primary/30 transition-all duration-300",
              children: [
                /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6", children: /* @__PURE__ */ jsx(Icon, { className: "w-6 h-6 text-primary" }) }),
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-white mb-3", children: principle.title }),
                /* @__PURE__ */ jsx("p", { className: "text-slate-400 leading-relaxed", children: principle.description })
              ]
            },
            i
          );
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-28 relative border-t border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: fadeInUp.initial,
          whileInView: fadeInUp.whileInView,
          viewport: fadeInUp.viewport,
          transition: fadeInUp.transition,
          className: "text-center mb-16",
          children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-5xl font-display font-medium mb-6", children: [
              "Common ",
              /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Questions" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xl text-slate-400 max-w-2xl mx-auto", children: "Honest answers about what to expect when you work with us." })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsx(Accordion, { type: "single", collapsible: true, className: "space-y-4", children: faqs.slice(0, 4).map((faq, i) => /* @__PURE__ */ jsxs(
          AccordionItem,
          {
            value: `faq-left-${i}`,
            className: "border border-white/10 rounded-xl px-6 bg-white/[0.02] hover:border-white/20 transition-colors data-[state=open]:border-primary/30",
            children: [
              /* @__PURE__ */ jsx(
                AccordionTrigger,
                {
                  className: "text-left text-white hover:no-underline py-5 text-sm font-medium",
                  "data-testid": `accordion-trigger-faq-${i}`,
                  children: faq.question
                }
              ),
              /* @__PURE__ */ jsx(
                AccordionContent,
                {
                  className: "text-slate-400 text-sm leading-relaxed pb-5",
                  "data-testid": `accordion-content-faq-${i}`,
                  children: faq.answer
                }
              )
            ]
          },
          i
        )) }),
        /* @__PURE__ */ jsx(Accordion, { type: "single", collapsible: true, className: "space-y-4", children: faqs.slice(4).map((faq, i) => /* @__PURE__ */ jsxs(
          AccordionItem,
          {
            value: `faq-right-${i}`,
            className: "border border-white/10 rounded-xl px-6 bg-white/[0.02] hover:border-white/20 transition-colors data-[state=open]:border-primary/30",
            children: [
              /* @__PURE__ */ jsx(
                AccordionTrigger,
                {
                  className: "text-left text-white hover:no-underline py-5 text-sm font-medium",
                  "data-testid": `accordion-trigger-faq-${i + 4}`,
                  children: faq.question
                }
              ),
              /* @__PURE__ */ jsx(
                AccordionContent,
                {
                  className: "text-slate-400 text-sm leading-relaxed pb-5",
                  "data-testid": `accordion-content-faq-${i + 4}`,
                  children: faq.answer
                }
              )
            ]
          },
          i
        )) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "py-36 relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.1),transparent_50%)]" }),
      /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 max-w-4xl text-center relative z-10", children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: fadeInUp.initial,
          whileInView: fadeInUp.whileInView,
          viewport: fadeInUp.viewport,
          transition: fadeInUp.transition,
          children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-4xl md:text-6xl font-display font-medium mb-10", children: [
              "Ready to ",
              /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Get Started" }),
              "?"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl text-slate-400 mb-14 max-w-2xl mx-auto leading-relaxed", children: "It starts with a conversation. Tell us about your business and we'll show you what's possible." }),
            /* @__PURE__ */ jsx(
              ContactFormDialog,
              {
                source: "process-cta",
                title: "Start Your Journey",
                description: "Tell us about your business and we'll help you understand where to begin.",
                trigger: /* @__PURE__ */ jsx(
                  Button,
                  {
                    size: "lg",
                    className: "bg-[#1ab1d9] text-primary-foreground hover:bg-cyan-300 rounded-full px-12 h-16 text-lg font-semibold shadow-[0_0_30px_-5px_var(--color-primary)]",
                    "data-testid": "button-process-cta",
                    children: "Schedule a Discovery Call"
                  }
                )
              }
            )
          ]
        }
      ) })
    ] })
  ] });
}
function BorderBeam({
  className,
  size = 200,
  duration = 15,
  anchor = 90,
  borderWidth = 1.5,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  delay = 0
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      style: {
        "--size": size,
        "--duration": duration,
        "--anchor": anchor,
        "--border-width": borderWidth,
        "--color-from": colorFrom,
        "--color-to": colorTo,
        "--delay": delay
      },
      className: cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent]",
        // mask-composite: exclude prevents the mask from covering the content area
        "![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]",
        // The pseudo-element that animates
        "after:absolute after:aspect-square after:w-[calc(var(--size)*1px)] after:animate-border-beam after:[animation-delay:calc(var(--delay)*1s)] after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:calc(var(--anchor)*1%)_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))]",
        className
      )
    }
  );
}
const fadeInUpViewport = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7 }
};
const pricingTiers = [
  {
    number: "01",
    name: "Frontline",
    descriptor: 'The "Human-First" Safety Net',
    buildFee: "$600",
    monthlyFee: "$297/mo",
    ifYouWant: "",
    focusBullets: [],
    expandedBullets: [
      { title: "AI Voice Backup Receptionist", description: "Answers only when your team is busy or after-hours." },
      { title: "24/7 Website AI Chatbot", description: "Engages and books visitors directly from your landing page." },
      { title: "Instant SMS Text-Back", description: "A digital safety net that keeps the conversation alive if a call is missed." },
      { title: "Speed-to-Lead Engine", description: "Ensures new inquiries get a response in under 60 seconds." },
      { title: "Single Intake Pipeline", description: "One unified view for all phone, text, and form leads." }
    ],
    outcome: "Your front desk is now fail-safe. Stop leaking leads to competitors and ensure every caller gets a professional response—even when your team is busy or the office is closed.",
    infrastructureFooter: "INCLUDES: 250 AI Voice Minutes/mo • Standard Security • Optional HIPAA Upgrade (+$300/mo)",
    ctaText: "Start Frontline",
    ctaSource: "frontline"
  },
  {
    number: "02",
    name: "Specialist",
    descriptor: 'The "Revenue & Reputation" Accelerator',
    buildFee: "$1,000",
    monthlyFee: "$497/mo",
    ifYouWant: "",
    clarityLine: "Everything in Frontline, PLUS:",
    focusBullets: [],
    expandedBullets: [
      { title: "Proactive Outbound Engine", description: 'AI calls back "No-Shows" and dormant leads to rebook them.' },
      { title: "Omni-Channel AI Command", description: "Unified messaging for Instagram, Facebook, and WhatsApp." },
      { title: "The Database Reactivator", description: "Automated campaigns to win back old or cold leads." },
      { title: "Auto-Reputation Engine", description: "Captures 5-star reviews and routes negative feedback internally." },
      { title: "Smart Lead Triage", description: 'AI filters spam and prioritizes "Hot Leads" for your team.' }
    ],
    outcome: "Turn your lead list into a revenue engine. You don't just capture data—you drive behavior by dominating every social channel, ranking higher on Google, and winning back 'lost' revenue on autopilot.",
    infrastructureFooter: "INCLUDES: 500 AI Voice Minutes/mo • Commercial Outbound Rights • Optional HIPAA Upgrade (+$300/mo)",
    ctaText: "Start Specialist",
    ctaSource: "specialist",
    isPopular: true
  },
  {
    number: "03",
    name: "Command",
    descriptor: "The Autonomous Operations Engine",
    buildFee: "Starting at $2,000",
    monthlyFee: "Starting at $997/mo",
    ifYouWant: "",
    clarityLine: "Everything in Specialist, PLUS:",
    focusBullets: [],
    expandedBullets: [
      { title: "Internal AI Knowledge Base", description: "Turn your SOPs and PDFs into an instant answer engine for your team." },
      { title: "Custom N8N Integration Layer", description: "We bridge your CRM, PM, and billing tools to eliminate manual data entry." },
      { title: "Service Delivery Automation", description: "Automatically generate contracts, send invoices, and create project files when a deal closes." },
      { title: "Priority Decision Logic", description: "AI handles complex routing—like differentiating between support issues and new sales—without human input." },
      { title: "Monthly Strategic Ops Audit", description: "Human-led consulting to maintain your workflows and identify new efficiencies." }
    ],
    outcome: "Step out of the day-to-day 'weeds' and into the CEO role. We don't just capture leads; we automate your entire fulfillment process—contracts, invoices, and project setup—so your business runs itself.",
    infrastructureFooter: "INCLUDES: 1,000 AI Voice Minutes • Enterprise Speed • Optional HIPAA Upgrade (+$300/mo)",
    ctaText: "Apply for Command",
    ctaSource: "command",
    isApplication: true
  }
];
function AssuranceBox() {
  const [finePrintExpanded, setFinePrintExpanded] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "p-8 rounded-2xl border border-primary/20 bg-gradient-to-b from-primary/5 to-transparent", children: [
    /* @__PURE__ */ jsxs("h3", { className: "text-xl font-display font-semibold mb-4 text-primary flex items-center gap-3", children: [
      /* @__PURE__ */ jsx(Zap, { className: "w-5 h-5" }),
      "90-Day Optimization Assurance"
    ] }),
    /* @__PURE__ */ jsx("p", { className: "text-slate-300 leading-relaxed mb-6", children: "The first 90 days after go-live are your optimization window. We're in this with you, not just turning on a bot and hoping for the best." }),
    /* @__PURE__ */ jsx("p", { className: "text-slate-300 leading-relaxed mb-6", children: "If, after that period, we're still not seeing the movement we both expected in key metrics like responsiveness and show-rate — and your team has actually been using the system, routing leads through it, and implementing the agreed changes — we will:" }),
    /* @__PURE__ */ jsxs("ol", { className: "list-decimal list-inside space-y-2 text-slate-300 mb-6 pl-2", children: [
      /* @__PURE__ */ jsx("li", { children: "Extend your subscription by 30 days at no additional subscription cost while we adjust it together, and" }),
      /* @__PURE__ */ jsx("li", { children: "If you're still not satisfied after that extension, refund 100% of the subscription fees you paid during that period. Your Launch Build fee is not refundable." })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-sm mb-4", children: "This assurance applies to Frontline, Specialist, and Command plans. It does not apply to fully custom builds." }),
    /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 italic mb-6", children: `If you're only looking to "test a bot for a couple weeks," SimpleSequence is probably not the right fit.` }),
    /* @__PURE__ */ jsxs("div", { className: "border-t border-white/10 pt-4", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setFinePrintExpanded(!finePrintExpanded),
          className: "flex items-center gap-2 text-xs text-slate-500 hover:text-slate-400 transition-colors",
          "data-testid": "toggle-fine-print",
          children: [
            /* @__PURE__ */ jsx(motion.div, { animate: { rotate: finePrintExpanded ? 180 : 0 }, transition: { duration: 0.3 }, children: /* @__PURE__ */ jsx(ChevronDown, { className: "w-3 h-3" }) }),
            finePrintExpanded ? "Hide Guarantee Conditions" : "View Guarantee Conditions (Fine Print)"
          ]
        }
      ),
      /* @__PURE__ */ jsx(AnimatePresence, { children: finePrintExpanded && /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, height: 0 },
          animate: { opacity: 1, height: "auto" },
          exit: { opacity: 0, height: 0 },
          transition: { duration: 0.3, ease: "easeInOut" },
          className: "overflow-hidden",
          children: /* @__PURE__ */ jsxs("div", { className: "mt-4 text-xs text-slate-500 leading-relaxed space-y-3", children: [
            /* @__PURE__ */ jsx("p", { children: "To qualify for the 90-Day Optimization Assurance and subscription refund:" }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-2 pl-4", children: [
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-slate-400", children: "Coverage period." }),
                " The assurance covers subscription fees paid in the first 90 days after go-live, plus the 30-day optimization extension we add if results are not on track. It does not cover the Launch Build fee, usage-based fees, or any third-party tool costs."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-slate-400", children: "Plans included." }),
                " The assurance applies to Frontline, Specialist, and Command plans only. It does not apply to fully custom builds or one-off custom projects where scope is jointly designed outside the standard offers."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-slate-400", children: "Go-live definition." }),
                ` "Go-live" means SimpleSequence is actively handling inbound calls/messages for at least one primary phone number or channel, and you've approved the initial flows/scripts in writing (email is sufficient).`
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-slate-400", children: "Minimum usage." }),
                " During the 90-day window, you agree to route at least 75% of relevant inbound leads/calls/messages through SimpleSequence on the agreed channels, and maintain a minimum inbound lead volume that makes evaluation meaningful (at least 30 new leads per month across all channels)."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-slate-400", children: "Participation." }),
                " You or a delegated team member must complete onboarding tasks within the agreed timelines, attend at least 2 out of 3 scheduled optimization calls (or reschedule in good faith), and implement reasonable changes we agree on (routing changes, script updates, or offer tweaks)."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-slate-400", children: "Request process." }),
                " To invoke the assurance, you must request it in writing within 120 days of go-live, allow us to review the metrics and usage together, and participate in the 30-day optimization extension where we attempt fixes."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-slate-400", children: "Refund scope." }),
                " If, after the 30-day extension, we mutually agree that there has not been meaningful improvement in the agreed metrics, we will refund 100% of subscription fees paid during the 90-day window (and the extension if applicable). The Launch Build fee remains non-refundable."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-slate-400", children: "One-time use." }),
                " This assurance may be used once per client organization."
              ] })
            ] })
          ] })
        }
      ) })
    ] })
  ] });
}
function PricingGridSection() {
  const [entryCardsHovered, setEntryCardsHovered] = useState(false);
  const frontline = pricingTiers[0];
  const specialist = pricingTiers[1];
  const command = pricingTiers[2];
  return /* @__PURE__ */ jsx("section", { className: "py-24", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: fadeInUpViewport.initial,
        whileInView: fadeInUpViewport.whileInView,
        viewport: fadeInUpViewport.viewport,
        transition: fadeInUpViewport.transition,
        className: "text-center mb-16",
        children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm font-mono text-primary mb-4 block", children: "SELECT YOUR PLAN" }),
          /* @__PURE__ */ jsx("h2", { className: "text-4xl md:text-5xl font-display font-medium", children: "Find Your Fit" })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: fadeInUpViewport.initial,
        whileInView: fadeInUpViewport.whileInView,
        viewport: fadeInUpViewport.viewport,
        transition: fadeInUpViewport.transition,
        className: "grid md:grid-cols-2 gap-6 mb-6 max-w-5xl mx-auto",
        onMouseEnter: () => setEntryCardsHovered(true),
        onMouseLeave: () => setEntryCardsHovered(false),
        children: [
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: `group p-8 rounded-2xl border bg-gradient-to-b from-white/[0.06] to-transparent transition-all duration-300 ${entryCardsHovered ? "border-primary/30" : "border-white/10 hover:border-primary/30"}`,
              "data-testid": "card-offers-frontline",
              children: [
                /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-4", children: /* @__PURE__ */ jsx("span", { className: "text-xs font-mono text-primary", children: frontline.number }) }),
                /* @__PURE__ */ jsx("h3", { className: "text-2xl font-display font-medium mb-2 text-white", children: frontline.name }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400 mb-4", children: frontline.descriptor }),
                /* @__PURE__ */ jsx("div", { className: "p-4 rounded-xl bg-primary/5 border border-primary/10 mb-6", children: /* @__PURE__ */ jsx("p", { className: "text-slate-300 text-sm", children: frontline.outcome }) }),
                /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
                  /* @__PURE__ */ jsx("div", { className: "text-3xl font-display font-bold text-white mb-1", children: frontline.monthlyFee }),
                  /* @__PURE__ */ jsxs("div", { className: "text-sm text-slate-500", children: [
                    "One-time setup: ",
                    frontline.buildFee
                  ] })
                ] }),
                /* @__PURE__ */ jsx(AnimatePresence, { children: entryCardsHovered && /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, height: 0 },
                    animate: { opacity: 1, height: "auto" },
                    exit: { opacity: 0, height: 0 },
                    transition: { duration: 0.3, ease: "easeInOut" },
                    className: "overflow-hidden",
                    children: [
                      /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
                        /* @__PURE__ */ jsx("h4", { className: "text-xs font-mono text-slate-400 mb-3", children: "CORE CAPABILITIES" }),
                        /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: frontline.expandedBullets.map((bullet, i) => /* @__PURE__ */ jsx("li", { className: "text-sm", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
                          /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 text-primary mt-0.5 flex-shrink-0" }),
                          /* @__PURE__ */ jsxs("div", { children: [
                            /* @__PURE__ */ jsxs("span", { className: "text-white font-medium", children: [
                              bullet.title,
                              ":"
                            ] }),
                            /* @__PURE__ */ jsx("span", { className: "text-slate-400 ml-1", children: bullet.description })
                          ] })
                        ] }) }, i)) })
                      ] }),
                      /* @__PURE__ */ jsx("div", { className: "pt-4 border-t border-white/10", children: /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 font-mono", children: frontline.infrastructureFooter }) })
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsx(
                  ContactFormDialog,
                  {
                    source: "frontline",
                    title: "Start Frontline",
                    description: "Tell us about your business and we'll help you get started with Frontline.",
                    trigger: /* @__PURE__ */ jsxs(
                      Button,
                      {
                        "data-testid": "button-offers-frontline",
                        className: "w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 h-12 rounded-lg font-medium transition-all group-hover:border-primary/30",
                        children: [
                          frontline.ctaText,
                          " ",
                          /* @__PURE__ */ jsx("span", { className: "ml-2 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all", children: "→" })
                        ]
                      }
                    )
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: `group p-8 rounded-2xl border bg-gradient-to-b from-zinc-800/80 to-zinc-950 relative shadow-xl transition-all duration-300 overflow-hidden ${entryCardsHovered ? "border-primary/40" : "border-primary/30 hover:border-primary/40"}`,
              "data-testid": "card-offers-specialist",
              children: [
                /* @__PURE__ */ jsx(BorderBeam, { size: 300, duration: 12, delay: 0, colorFrom: "var(--color-primary)", colorTo: "transparent" }),
                /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-4 py-2 rounded-bl-xl rounded-tr-xl tracking-wider", children: "MOST POPULAR" }),
                /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
                  /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-4", children: /* @__PURE__ */ jsx("span", { className: "text-xs font-mono text-primary", children: specialist.number }) }),
                  /* @__PURE__ */ jsx("h3", { className: "text-2xl font-display font-medium mb-2 text-white", children: specialist.name }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400 mb-4", children: specialist.descriptor }),
                  /* @__PURE__ */ jsx("div", { className: "p-4 rounded-xl bg-primary/5 border border-primary/10 mb-6", children: /* @__PURE__ */ jsx("p", { className: "text-slate-300 text-sm", children: specialist.outcome }) }),
                  /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
                    /* @__PURE__ */ jsx("div", { className: "text-3xl font-display font-bold text-white mb-1", children: specialist.monthlyFee }),
                    /* @__PURE__ */ jsxs("div", { className: "text-sm text-slate-500", children: [
                      "One-time setup: ",
                      specialist.buildFee
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx(AnimatePresence, { children: entryCardsHovered && /* @__PURE__ */ jsxs(
                    motion.div,
                    {
                      initial: { opacity: 0, height: 0 },
                      animate: { opacity: 1, height: "auto" },
                      exit: { opacity: 0, height: 0 },
                      transition: { duration: 0.3, ease: "easeInOut" },
                      className: "overflow-hidden",
                      children: [
                        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
                          specialist.clarityLine && /* @__PURE__ */ jsx("p", { className: "text-sm text-primary font-semibold mb-4", children: specialist.clarityLine }),
                          /* @__PURE__ */ jsx("h4", { className: "text-xs font-mono text-slate-400 mb-3", children: "CORE CAPABILITIES" }),
                          /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: specialist.expandedBullets.map((bullet, i) => /* @__PURE__ */ jsx("li", { className: "text-sm", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
                            /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 text-primary mt-0.5 flex-shrink-0" }),
                            /* @__PURE__ */ jsxs("div", { children: [
                              /* @__PURE__ */ jsxs("span", { className: "text-white font-medium", children: [
                                bullet.title,
                                ":"
                              ] }),
                              /* @__PURE__ */ jsx("span", { className: "text-slate-400 ml-1", children: bullet.description })
                            ] })
                          ] }) }, i)) })
                        ] }),
                        /* @__PURE__ */ jsx("div", { className: "pt-4 border-t border-white/10", children: /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 font-mono", children: specialist.infrastructureFooter }) })
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsx(
                    ContactFormDialog,
                    {
                      source: "specialist",
                      title: "Start Specialist",
                      description: "Tell us about your business and we'll help you get started with Specialist.",
                      trigger: /* @__PURE__ */ jsxs(
                        Button,
                        {
                          "data-testid": "button-offers-specialist",
                          className: "w-full bg-primary text-primary-foreground hover:bg-cyan-300 h-12 rounded-lg font-medium shadow-[0_0_20px_-5px_var(--color-primary)] transition-all",
                          children: [
                            specialist.ctaText,
                            " ",
                            /* @__PURE__ */ jsx("span", { className: "ml-2", children: "→" })
                          ]
                        }
                      )
                    }
                  )
                ] })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: fadeInUpViewport.initial,
        whileInView: fadeInUpViewport.whileInView,
        viewport: { once: true },
        transition: fadeInUpViewport.transition,
        className: "max-w-5xl mx-auto",
        children: /* @__PURE__ */ jsxs("div", { className: "p-10 rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-900/50 to-transparent relative overflow-hidden hover:border-primary/20 transition-all", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 bg-white/10 text-slate-300 text-[10px] font-bold px-4 py-2 rounded-bl-xl rounded-tr-xl tracking-wider border-l border-b border-white/10", children: "BY APPLICATION" }),
          /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-10", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3 mb-4", children: /* @__PURE__ */ jsx("span", { className: "text-xs font-mono text-primary/70", children: command.number }) }),
              /* @__PURE__ */ jsx("h3", { className: "text-3xl font-display font-semibold mb-2 text-white", children: command.name }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400 mb-4", children: command.descriptor }),
              /* @__PURE__ */ jsx("div", { className: "p-4 rounded-xl bg-primary/5 border border-primary/10 mb-6", children: /* @__PURE__ */ jsx("p", { className: "text-slate-300 text-sm", children: command.outcome }) }),
              /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
                /* @__PURE__ */ jsx("div", { className: "text-3xl font-display font-bold text-white mb-1", children: command.monthlyFee }),
                /* @__PURE__ */ jsxs("div", { className: "text-sm text-slate-500", children: [
                  "One-time setup: ",
                  command.buildFee
                ] })
              ] }),
              /* @__PURE__ */ jsx(
                ContactFormDialog,
                {
                  source: "command",
                  title: "Apply for Command",
                  description: "Tell us about your business and we'll help you get started with Command.",
                  trigger: /* @__PURE__ */ jsxs(
                    Button,
                    {
                      "data-testid": "button-offers-command",
                      className: "bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-primary/30 h-14 px-8 rounded-lg font-medium text-base transition-all",
                      children: [
                        command.ctaText,
                        " ",
                        /* @__PURE__ */ jsx("span", { className: "ml-2 opacity-50 group-hover:opacity-100", children: "→" })
                      ]
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
              command.clarityLine && /* @__PURE__ */ jsx("p", { className: "text-sm text-primary font-semibold", children: command.clarityLine }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h4", { className: "text-xs font-mono text-slate-400 mb-3", children: "CORE CAPABILITIES" }),
                /* @__PURE__ */ jsx("ul", { className: "space-y-3 text-sm", children: command.expandedBullets.map((bullet, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
                  /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 text-primary/70 mt-0.5 flex-shrink-0" }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsxs("span", { className: "text-white font-medium", children: [
                      bullet.title,
                      ":"
                    ] }),
                    /* @__PURE__ */ jsx("span", { className: "text-slate-400 ml-1", children: bullet.description })
                  ] })
                ] }, i)) })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "pt-4 border-t border-white/10", children: /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 font-mono", children: command.infrastructureFooter }) })
            ] })
          ] })
        ] })
      }
    )
  ] }) });
}
const comparisonRows = [
  { label: "CORE CAPABILITIES (Frontline)", frontline: "", specialist: "", command: "", isSection: true },
  { label: "AI Voice Backup Receptionist", frontline: "Included", specialist: "Included", command: "Included" },
  { label: "24/7 Website AI Chatbot", frontline: "Included", specialist: "Included", command: "Included" },
  { label: "Instant SMS Text-Back + Speed-to-Lead", frontline: "Included", specialist: "Included", command: "Included" },
  { label: "Single Intake Pipeline", frontline: "Included", specialist: "Included", command: "Included" },
  { label: "GROWTH & REVENUE (Specialist)", frontline: "", specialist: "", command: "", isSection: true },
  { label: "Proactive Outbound Engine (Rebooking)", frontline: "—", specialist: "Included", command: "Included" },
  { label: "Omni-Channel AI (IG, FB, WhatsApp)", frontline: "—", specialist: "Included", command: "Included" },
  { label: "Database Reactivation + Reputation Engine", frontline: "—", specialist: "Included", command: "Included" },
  { label: "Smart Lead Triage", frontline: "—", specialist: "Included", command: "Included" },
  { label: "OPS & AUTONOMY (Command)", frontline: "", specialist: "", command: "", isSection: true },
  { label: "Internal AI Knowledge Base (SOPs)", frontline: "—", specialist: "—", command: "Included" },
  { label: "Custom N8N Integration Layer", frontline: "—", specialist: "—", command: "Included" },
  { label: "Service Delivery Automation", frontline: "—", specialist: "—", command: "Included" },
  { label: "Monthly Strategic Ops Audit", frontline: "—", specialist: "—", command: "Included" },
  { label: "INFRASTRUCTURE & LIMITS", frontline: "", specialist: "", command: "", isSection: true },
  { label: "Included AI Voice Minutes", frontline: "250 Minutes", specialist: "500 Minutes", command: "1,000 Minutes" },
  { label: "Included SMS Segments", frontline: "500", specialist: "2,000", command: "Enterprise Vol." },
  { label: "HIPAA Compliance Server Upgrade", frontline: "Optional (+$300/mo)", specialist: "Optional (+$300/mo)", command: "Optional (+$300/mo)" }
];
function ComparisonCell({ value, isSpecialist = false }) {
  const isEmpty = value === "—" || value === "";
  const isAvailable = value === "Available";
  const isByApplication = value.includes("by application") || value === "By application";
  const isIncluded = value === "Included" || value.startsWith("Included");
  const isOptional = value.includes("Optional");
  let className = "text-xs md:text-sm ";
  if (isEmpty) {
    className += "text-slate-600";
  } else if (isAvailable) {
    className += "text-primary/80 font-medium";
  } else if (isByApplication) {
    className += "text-white/70 italic";
  } else if (isOptional) {
    className += "text-slate-400";
  } else if (isIncluded && isSpecialist) {
    className += "text-primary font-medium";
  } else if (isIncluded) {
    className += "text-slate-300 font-medium";
  } else if (isSpecialist) {
    className += "text-primary/90";
  } else {
    className += "text-slate-300";
  }
  return /* @__PURE__ */ jsx("span", { className, children: value });
}
function ComparePlansSection() {
  return /* @__PURE__ */ jsx("section", { className: "py-24 border-t border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: fadeInUpViewport.initial,
        whileInView: fadeInUpViewport.whileInView,
        viewport: fadeInUpViewport.viewport,
        transition: fadeInUpViewport.transition,
        className: "text-center mb-12",
        children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-display font-medium mb-4", children: "Compare Plans" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-400", children: "Clear tiers without overpromising. Final scope confirmed during Launch Build." })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: fadeInUpViewport.initial,
        whileInView: fadeInUpViewport.whileInView,
        viewport: fadeInUpViewport.viewport,
        transition: fadeInUpViewport.transition,
        className: "max-w-5xl mx-auto",
        children: [
          /* @__PURE__ */ jsx("div", { className: "hidden md:block overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full border-collapse", children: [
            /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/10", children: [
              /* @__PURE__ */ jsx("th", { className: "text-left py-4 pr-6 text-xs font-mono text-slate-500 uppercase tracking-wider w-1/3" }),
              /* @__PURE__ */ jsx("th", { className: "py-4 px-4 text-center text-sm font-semibold text-white", children: "Frontline" }),
              /* @__PURE__ */ jsx("th", { className: "py-4 px-4 text-center text-sm font-semibold text-primary bg-primary/[0.03]", children: "Specialist" }),
              /* @__PURE__ */ jsx("th", { className: "py-4 px-4 text-center text-sm font-semibold text-white/80", children: "Command" })
            ] }) }),
            /* @__PURE__ */ jsx("tbody", { children: comparisonRows.map((row, i) => {
              if (row.isSection) {
                return /* @__PURE__ */ jsx("tr", { className: "border-t border-white/10 bg-white/[0.02]", children: /* @__PURE__ */ jsx("td", { colSpan: 4, className: "py-3 pr-6 text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold text-left", children: row.label }) }, i);
              }
              return /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/5 hover:bg-white/[0.02] transition-colors", children: [
                /* @__PURE__ */ jsx("td", { className: "py-4 pr-6 text-sm text-slate-300 text-left", children: row.label }),
                /* @__PURE__ */ jsx("td", { className: "py-4 px-4 text-center", children: /* @__PURE__ */ jsx(ComparisonCell, { value: row.frontline }) }),
                /* @__PURE__ */ jsx("td", { className: "py-4 px-4 text-center bg-primary/[0.03]", children: /* @__PURE__ */ jsx(ComparisonCell, { value: row.specialist, isSpecialist: true }) }),
                /* @__PURE__ */ jsx("td", { className: "py-4 px-4 text-center", children: /* @__PURE__ */ jsx(ComparisonCell, { value: row.command }) })
              ] }, i);
            }) })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "md:hidden space-y-4", children: comparisonRows.map((row, i) => {
            if (row.isSection) {
              return /* @__PURE__ */ jsx("div", { className: "p-4 rounded-xl border border-white/10 bg-white/[0.02] mt-6", children: /* @__PURE__ */ jsx("p", { className: "text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold text-left", children: row.label }) }, i);
            }
            return /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl border border-white/10 bg-white/[0.02]", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-300 font-medium mb-4 text-left", children: row.label }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-2 text-center", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-500 mb-1", children: "Frontline" }),
                  /* @__PURE__ */ jsx(ComparisonCell, { value: row.frontline })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "bg-primary/[0.03] rounded-lg py-1 px-1", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] text-primary mb-1", children: "Specialist" }),
                  /* @__PURE__ */ jsx(ComparisonCell, { value: row.specialist, isSpecialist: true })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-500 mb-1", children: "Command" }),
                  /* @__PURE__ */ jsx(ComparisonCell, { value: row.command })
                ] })
              ] })
            ] }, i);
          }) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 text-left space-y-2", children: [
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-slate-400", children: [
              /* @__PURE__ */ jsx("span", { className: "font-semibold text-slate-300", children: "Legend:" }),
              " Available = enabled when appropriate based on your workflows + permissions. Confirmed during Launch Build."
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-slate-500", children: [
              /* @__PURE__ */ jsx("span", { className: "font-semibold text-slate-400", children: "Note:" }),
              " We do not claim compliance certification."
            ] })
          ] }),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: fadeInUpViewport.initial,
              whileInView: fadeInUpViewport.whileInView,
              viewport: fadeInUpViewport.viewport,
              transition: { ...fadeInUpViewport.transition, delay: 0.2 },
              className: "mt-12 p-8 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent max-w-md mx-auto text-center",
              "data-testid": "card-offers-custom-enterprise",
              children: [
                /* @__PURE__ */ jsx("h3", { className: "text-2xl font-display font-medium mb-3 text-white", children: "Custom / Enterprise" }),
                /* @__PURE__ */ jsx("p", { className: "text-slate-400 mb-6", children: "Multi-location, unusual workflows, strict compliance, or non-standard tools." }),
                /* @__PURE__ */ jsx(
                  ContactFormDialog,
                  {
                    source: "custom-enterprise",
                    title: "Talk to Us",
                    description: "Tell us about your unique requirements and we'll map out what's possible.",
                    trigger: /* @__PURE__ */ jsxs(
                      Button,
                      {
                        "data-testid": "button-offers-custom-enterprise",
                        className: "w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-primary/30 h-12 rounded-lg font-medium transition-all",
                        children: [
                          "Talk to Us ",
                          /* @__PURE__ */ jsx("span", { className: "ml-2", children: "→" })
                        ]
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 mt-4", children: "We'll map your stack, risks, and required audit trail before quoting." })
              ]
            }
          )
        ]
      }
    )
  ] }) });
}
function Offers() {
  const offerSchemas = pricingTiers.map((tier) => createOfferSchema({
    name: tier.name,
    description: tier.descriptor,
    price: tier.monthlyFee.replace(/[^0-9]/g, ""),
    buildFee: tier.buildFee
  }));
  return /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Pricing & Offers | SimpleSequence",
        description: "Three tiers: Frontline ($297/mo), Specialist ($497/mo), and Command (from $997/mo). AI front desk, follow-up automation, and operational systems.",
        jsonLd: {
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: offerSchemas.map((schema, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: schema
          }))
        }
      }
    ),
    /* @__PURE__ */ jsxs("section", { className: "pt-44 pb-24 relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--primary),0.08),transparent_50%)]" }),
      /* @__PURE__ */ jsx(CircuitBeams, { className: "opacity-40" }),
      /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 relative z-10", children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8 },
          className: "max-w-4xl mx-auto text-center",
          children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm font-mono text-primary mb-6 block", children: "SERVICES & PRICING" }),
            /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-6xl lg:text-7xl font-display font-medium mb-8 tracking-tight", children: [
              "Choose Your ",
              /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Path Forward" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl text-slate-400 leading-relaxed max-w-3xl mx-auto", children: "From AI front desk and follow-up to a full AI operations partner — select the level that matches where you are today." })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx(PricingGridSection, {}),
    /* @__PURE__ */ jsx(ComparePlansSection, {}),
    /* @__PURE__ */ jsxs("section", { id: "ai-clarity-assessment", className: "py-24 relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.1),transparent_50%)]" }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" }),
      /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 relative z-10", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: fadeInUpViewport.initial,
            whileInView: fadeInUpViewport.whileInView,
            viewport: fadeInUpViewport.viewport,
            transition: fadeInUpViewport.transition,
            className: "text-center mb-16",
            children: /* @__PURE__ */ jsxs("h2", { className: "text-4xl md:text-6xl font-display font-medium", children: [
              "Not Sure Where to ",
              /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Start" }),
              "?"
            ] })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row items-center justify-between gap-16 max-w-6xl mx-auto", children: [
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: fadeInUpViewport.initial,
              whileInView: fadeInUpViewport.whileInView,
              viewport: fadeInUpViewport.viewport,
              transition: fadeInUpViewport.transition,
              className: "max-w-2xl",
              children: [
                /* @__PURE__ */ jsx("div", { className: "inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-8 tracking-wide", children: "START HERE IF YOU'RE UNSURE" }),
                /* @__PURE__ */ jsx("h3", { className: "text-3xl md:text-4xl font-medium mb-4 tracking-tight", children: "The AI Clarity Assessment™" }),
                /* @__PURE__ */ jsx("p", { className: "text-lg text-primary/80 mb-8", children: "See how much revenue your front desk is leaking before you choose a plan." }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-lg text-muted-foreground mb-8 leading-relaxed", children: [
                  /* @__PURE__ */ jsx("p", { children: "Before you pick a plan, run the free AI Clarity Assessment™. In a few minutes, we'll map how leads actually move through your phones, forms, and inboxes — where response time breaks, where follow-up stalls, and where your team is carrying work that AI and systems should handle." }),
                  /* @__PURE__ */ jsx("p", { children: "You'll receive an Operational Clarity Score (0–100), a concise breakdown of where you're losing revenue, and a clear recommendation on whether Frontline, Specialist, or Command will create the fastest lift for your business. Therefore you can decide with real data instead of guessing." })
                ] }),
                /* @__PURE__ */ jsxs("ul", { className: "space-y-3 mb-10", children: [
                  /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-slate-300", children: [
                    /* @__PURE__ */ jsx(Check, { className: "w-5 h-5 text-primary mt-0.5 flex-shrink-0" }),
                    /* @__PURE__ */ jsx("span", { children: "How many leads are slipping through the cracks today" })
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-slate-300", children: [
                    /* @__PURE__ */ jsx(Check, { className: "w-5 h-5 text-primary mt-0.5 flex-shrink-0" }),
                    /* @__PURE__ */ jsx("span", { children: "Which parts of your front desk and follow-up can be automated safely" })
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-slate-300", children: [
                    /* @__PURE__ */ jsx(Check, { className: "w-5 h-5 text-primary mt-0.5 flex-shrink-0" }),
                    /* @__PURE__ */ jsx("span", { children: "What your next 90-day focus should be with SimpleSequence" })
                  ] })
                ] }),
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    href: "/assessment",
                    "data-testid": "button-offers-assessment-cta",
                    className: "inline-flex items-center justify-center bg-[#1ab1d9] text-primary-foreground hover:bg-cyan-300 rounded-full px-10 h-14 text-lg font-semibold shadow-[0_0_20px_-5px_var(--color-primary)] transition-colors",
                    children: "Take the Free Assessment"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: 50 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true },
              transition: { duration: 0.8 },
              className: "w-full max-w-md relative",
              children: [
                /* @__PURE__ */ jsx("div", { className: "absolute -inset-1 bg-gradient-to-r from-primary/20 to-cyan-500/20 rounded-2xl blur-lg opacity-50" }),
                /* @__PURE__ */ jsxs("div", { className: "relative bg-zinc-900 p-8 rounded-2xl border border-white/10 shadow-2xl", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-6", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xs font-mono text-zinc-400 tracking-wider", children: "EXECUTIVE AI ANALYSIS" }),
                    /* @__PURE__ */ jsx(FileText, { className: "w-4 h-4 text-primary" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2 mb-6", children: [
                    /* @__PURE__ */ jsx("div", { className: "h-1.5 bg-primary/60 rounded-full w-full" }),
                    /* @__PURE__ */ jsx("div", { className: "h-1.5 bg-primary/40 rounded-full w-4/5" }),
                    /* @__PURE__ */ jsx("div", { className: "h-1.5 bg-primary/20 rounded-full w-3/5" })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "text-xs font-mono text-zinc-500 mb-4 tracking-wider", children: "FRICTION POINT IDENTIFICATION" }),
                  /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-lg bg-zinc-800/50 border border-white/5 mb-4", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                      /* @__PURE__ */ jsx(Activity, { className: "w-4 h-4 text-primary" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-zinc-400", children: "Operational Efficiency Score" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-4xl font-mono font-bold text-white", children: "76" }),
                      /* @__PURE__ */ jsx("span", { className: "text-2xl font-mono text-zinc-600", children: "/100" }),
                      /* @__PURE__ */ jsx(TrendingUp, { className: "w-5 h-5 text-primary ml-auto" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-lg bg-zinc-800/50 border border-white/5", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                      /* @__PURE__ */ jsx(Sparkles, { className: "w-4 h-4 text-primary" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-zinc-400", children: "Potential Revenue Impact" })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "text-3xl font-mono font-bold text-white", children: "$35,000" })
                  ] })
                ] })
              ]
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-20 border-y border-white/5 bg-white/[0.01]", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 max-w-5xl", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: fadeInUpViewport.initial,
        whileInView: fadeInUpViewport.whileInView,
        viewport: fadeInUpViewport.viewport,
        transition: fadeInUpViewport.transition,
        children: [
          /* @__PURE__ */ jsx("h3", { className: "text-3xl font-display font-medium mb-3 text-white text-center", children: "What the Launch Build Includes" }),
          /* @__PURE__ */ jsx("p", { className: "text-lg text-primary/80 text-center mb-6", children: "From kickoff to go-live in days, not months." }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-center max-w-3xl mx-auto mb-12 leading-relaxed", children: "A focused rollout where we design, wire, and test your AI front desk and follow-up system inside the tools you already use." }),
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-6 mb-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-xl border border-white/10 bg-white/[0.02]", children: [
              /* @__PURE__ */ jsx("div", { className: "text-xs font-mono text-primary mb-3", children: "PHASE 1" }),
              /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold text-white mb-2", children: "Clarity & Mapping" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 mb-3", children: "Days 1–2" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400 leading-relaxed", children: "We run the AI Clarity Diagnostic, map where we can make the biggest difference, and define the key scripts, routing rules, and follow-up flows you actually need." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-xl border border-white/10 bg-white/[0.02]", children: [
              /* @__PURE__ */ jsx("div", { className: "text-xs font-mono text-primary mb-3", children: "PHASE 2" }),
              /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold text-white mb-2", children: "Build & Test" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 mb-3", children: "Days 3–7" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400 leading-relaxed", children: "We configure where AI fits best — front desk, pipelines, and sequences — connect phones/forms/calendars/CRM where supported, and test everything with your team." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-xl border border-white/10 bg-white/[0.02]", children: [
              /* @__PURE__ */ jsx("div", { className: "text-xs font-mono text-primary mb-3", children: "PHASE 3" }),
              /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold text-white mb-2", children: "Go-Live & Fine-Tune" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 mb-3", children: "Days 7–14" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400 leading-relaxed", children: "We switch the system on, smooth out rough edges from real conversations, and make sure your team is confident using it." })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 text-center mb-8 italic", children: "Most Frontline and Specialist builds go live inside a week; more complex Command builds may take a bit longer, and we'll agree on that up front." }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-center max-w-3xl mx-auto leading-relaxed", children: `After go-live, we're no longer "building" — we're tuning, focusing the next 60–90 days on data-driven optimization so results compound instead of stalling.` })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxs("section", { className: "py-32 relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(var(--primary),0.05),transparent_60%)]" }),
      /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 relative z-10", children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: fadeInUpViewport.initial,
          whileInView: fadeInUpViewport.whileInView,
          viewport: fadeInUpViewport.viewport,
          transition: fadeInUpViewport.transition,
          className: "max-w-5xl mx-auto",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
              /* @__PURE__ */ jsx(Shield, { className: "w-6 h-6 text-primary" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-mono text-primary", children: "REALISTIC EXPECTATIONS" })
            ] }),
            /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-display font-medium mb-8 text-white", children: "When You'll Actually Feel the Impact" }),
            /* @__PURE__ */ jsx("p", { className: "text-lg text-slate-400 leading-relaxed mb-12", children: "You don't need to wait 30 or 90 days to feel a difference. Most clients notice fewer missed calls and cleaner follow-up in the first few days after go-live. What can take 60–90 days is building stable, trustworthy numbers on response time, show-rates, and reactivation." }),
            /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-6 mb-12", children: [
              /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-xl border border-white/10 bg-white/[0.02]", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold text-white mb-1", children: "Days 1–7" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-primary mb-4", children: "Immediate Relief" }),
                /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-slate-400", children: [
                  /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 text-primary mt-0.5 flex-shrink-0" }),
                    /* @__PURE__ */ jsx("span", { children: "New leads stop disappearing into voicemail or inbox chaos." })
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 text-primary mt-0.5 flex-shrink-0" }),
                    /* @__PURE__ */ jsx("span", { children: 'Your team spends less time chasing "who called about what?".' })
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 text-primary mt-0.5 flex-shrink-0" }),
                    /* @__PURE__ */ jsx("span", { children: "We quickly fix any obvious script or routing issues." })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-xl border border-white/10 bg-white/[0.02]", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold text-white mb-1", children: "Days 8–30" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-primary mb-4", children: "Visible Movement" }),
                /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-slate-400", children: [
                  /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 text-primary mt-0.5 flex-shrink-0" }),
                    /* @__PURE__ */ jsx("span", { children: "Faster responses and more booked appointments show up in your calendar." })
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 text-primary mt-0.5 flex-shrink-0" }),
                    /* @__PURE__ */ jsx("span", { children: "Early patterns in show-rates and reactivations start to emerge." })
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 text-primary mt-0.5 flex-shrink-0" }),
                    /* @__PURE__ */ jsx("span", { children: "We tweak timing and messaging based on real conversations." })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-xl border border-white/10 bg-white/[0.02]", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold text-white mb-1", children: "Days 31–90" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-primary mb-4", children: "Reliable Baseline" }),
                /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-slate-400", children: [
                  /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 text-primary mt-0.5 flex-shrink-0" }),
                    /* @__PURE__ */ jsx("span", { children: "Trends in show-rates, reactivation, and reviews become clear." })
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 text-primary mt-0.5 flex-shrink-0" }),
                    /* @__PURE__ */ jsx("span", { children: "Hand-offs between AI and your team feel natural instead of experimental." })
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 text-primary mt-0.5 flex-shrink-0" }),
                    /* @__PURE__ */ jsx("span", { children: "You get a baseline that shows exactly what SimpleSequence is doing for your revenue and workload." })
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-center mb-16 leading-relaxed max-w-3xl mx-auto", children: "Therefore, we treat the first 90 days after go-live as your optimization runway — the period where quick wins harden into reliable, repeatable performance." }),
            /* @__PURE__ */ jsx(AssuranceBox, {})
          ]
        }
      ) })
    ] })
  ] });
}
const blogPosts = [
  {
    slug: "when-the-business-starts-slipping-through-the-cracks",
    title: "When the Business Starts Slipping Through the Cracks",
    subtitle: "What happens when growth arrives faster than structure.",
    category: "Operations",
    date: "2025-01-14",
    content: [
      `The owner swore things "weren't that bad."
Just a few missed calls. A couple follow-ups that fell through the cracks.
Nothing catastrophic.`,
      "Then the patterns showed up.",
      `Quotes sent but never followed up.
Customers calling back frustrated because nobody replied.
Tasks floating between text messages, sticky notes, and "I'll handle it later."`,
      "No big failure — just a hundred small ones.",
      "Every day felt like catching falling plates.\nEvery win took twice the effort it should.\nEvery opportunity required manual pushing to move forward.",
      "The truth usually hits them in one quiet moment:",
      "The business didn't break.\nIt simply outgrew the way it's being run.",
      "AI doesn't fix everything.\nBut it does create breathing room —\nwhen the work is predictable, repeatable, and stupidly time-consuming.",
      "The owners don't ask for sophistication.\nThey ask for relief.",
      "Relief from juggling everything.\nRelief from babysitting every lead.\nRelief from being the person who remembers everything.",
      "And when the structure becomes visible, the overwhelm finally makes sense.\nThe cracks weren't random.\nThey were predictable."
    ],
    actionSteps: [
      'List every repeated task you touch more than twice a day. This becomes your "automation priority list."',
      "Track response times for one week. Identify where prospects are waiting the longest.",
      "Record one real customer journey. Watch where messages, tasks, and decisions get lost.",
      "Pick ONE friction point and fix it first. Small wins sustain momentum; big overhauls kill it."
    ]
  },
  {
    slug: "the-hidden-drag-inside-daily-decisions",
    title: "The Hidden Drag Inside Daily Decisions",
    subtitle: "Why the owner always feels busy but never fully caught up.",
    category: "Management",
    date: "2025-01-11",
    content: [
      "The owner wasn't drowning.\nNot exactly.\nBut every day felt heavy — like carrying the business on their back.",
      "Not because the work was impossible.\nBut because every single decision passed through them:",
      `"Should we qualify this lead?"
"Can you call this customer back?"
"Did we ever send that quote?"
"What's the status of that job?"`,
      "Dozens of tiny, harmless questions.\nUntil the questions multiplied.\nAnd suddenly the owner isn't running a business —\nthey're running everyone's brain.",
      "The drag is invisible until you name it:",
      "Decision Bottleneck.",
      "The owner becomes the system.\nThe calendar becomes the memory.\nThe inbox becomes the workflow.",
      "And they wonder why they feel exhausted.",
      "AI becomes powerful only when the decisions themselves are clear:\nwhat to ask, what to route, what qualifies, what disqualifies, what moves forward.",
      "Not automating everything —\njust removing the decisions that never needed a human in the first place."
    ],
    actionSteps: [
      "Write down the top 5 questions your team asks you every week. These are your first automation or SOP candidates.",
      'Define "if X, then Y" rules for each one. Turn the decisions into simple sequences.',
      "Move ONE decision out of your inbox and into a system. Let the business rely on the process — not your memory.",
      "Recheck in 7 days. If it saved 30+ minutes, automate the next one."
    ]
  },
  {
    slug: "when-follow-up-becomes-a-full-time-job",
    title: "When Follow-Up Becomes a Full-Time Job",
    subtitle: "The emotional cost nobody admits out loud.",
    category: "Leads",
    date: "2025-01-08",
    content: [
      "Nobody likes admitting they're behind on follow-up.\nIt sounds irresponsible.\nUnprofessional.\nLike they don't care about the business.",
      "But the real problem isn't laziness.\nIt's capacity.",
      "Some days the phone won't stop ringing.\nOther days they're buried on job sites.\nAnd by the time they sit down at night, the messages blur together:",
      `"Who did I promise I'd call back?"
"Did I send that update?"
"Who's waiting on a quote?"`,
      "The owner doesn't see the missed revenue —\nthey feel the guilt.",
      "They know those leads are slipping.\nThey know the conversations went cold.\nThey know the business loses money every time a follow-up gets delayed.",
      "AI doesn't replace the relationship.\nIt simply covers the gaps —\nthe hours the owner can't be everywhere.",
      'Not to "sound robotic."\nBut to make the business feel consistent.',
      "Every lead gets acknowledged.\nEvery message gets answered.\nEvery opportunity moves forward — whether the owner is available or not."
    ],
    actionSteps: [
      "Track the number of follow-ups you send manually for 7 days. The real number will shock you.",
      "List your top 3 message types (quote, reschedule, check-in). These become templates.",
      "Create ONE automated follow-up fallback for after-hours. A simple, human-sounding message.",
      "Measure response lift for 14 days. Even a 20% improvement is a major operational win."
    ]
  }
];
const categoryColors$1 = {
  "Operations": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "Leads": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Management": "bg-amber-500/10 text-amber-400 border-amber-500/20"
};
function formatDate$1(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
function getExcerpt(content) {
  const firstBlock = content[0] || "";
  const lines = firstBlock.split("\n").slice(0, 2);
  return lines.join(" ");
}
function Blog() {
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "SimpleSequence Blog",
    description: "Practical guidance for applying AI to everyday operations",
    blogPost: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.subtitle,
      datePublished: post.date,
      author: {
        "@type": "Organization",
        name: "SimpleSequence"
      }
    }))
  };
  return /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Blog - Insights & How-To Guides | SimpleSequence",
        description: "Practical guidance for applying AI to everyday operations. Insights on front desk automation, follow-up systems, and operational clarity.",
        jsonLd: blogSchema
      }
    ),
    /* @__PURE__ */ jsxs("section", { className: "pt-44 pb-24 relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--primary),0.08),transparent_50%)]" }),
      /* @__PURE__ */ jsx(CircuitBeams, { className: "opacity-40" }),
      /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 relative z-10", children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8 },
          className: "max-w-4xl",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
              /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)]" }),
              /* @__PURE__ */ jsx("span", { className: "text-xs font-mono text-primary uppercase tracking-wider", children: "Blog" })
            ] }),
            /* @__PURE__ */ jsxs("h1", { className: "text-5xl md:text-7xl font-display font-medium tracking-tight mb-8", children: [
              "Insights & ",
              /* @__PURE__ */ jsx("span", { className: "text-primary", children: "How-To Guides" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl text-slate-400 leading-relaxed max-w-3xl", children: "Straightforward, practical guidance for applying AI to everyday operations. No hype — just clarity." })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-20 relative", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: blogPosts.map((post, index) => /* @__PURE__ */ jsx(
      motion.a,
      {
        href: `/blog/${post.slug}`,
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5, delay: index * 0.1 },
        className: "group block",
        "data-testid": `blog-card-${post.slug}`,
        children: /* @__PURE__ */ jsxs("article", { className: "h-full p-6 rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent hover:border-primary/30 hover:bg-white/[0.03] transition-all duration-300", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
            /* @__PURE__ */ jsx("span", { className: `px-3 py-1 rounded-full text-xs font-medium border ${categoryColors$1[post.category] || "bg-slate-500/10 text-slate-400 border-slate-500/20"}`, children: post.category }),
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5 text-xs text-slate-500", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "w-3 h-3" }),
              formatDate$1(post.date)
            ] })
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-display font-medium text-white mb-2 group-hover:text-primary transition-colors leading-tight", children: post.title }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-primary/70 mb-3 italic", children: post.subtitle }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3", children: getExcerpt(post.content) }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-primary text-sm font-medium group-hover:gap-2 transition-all", children: [
            "Read more",
            /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
          ] })
        ] })
      },
      post.slug
    )) }) }) })
  ] });
}
const categoryColors = {
  "Operations": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "Leads": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Management": "bg-amber-500/10 text-amber-400 border-amber-500/20"
};
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
function BlogPostPage() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) {
    return /* @__PURE__ */ jsxs(Layout, { children: [
      /* @__PURE__ */ jsx(
        SEO,
        {
          title: "Post Not Found | SimpleSequence Blog",
          description: "The blog post you're looking for could not be found."
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl font-display font-medium text-white mb-4", children: "Post Not Found" }),
        /* @__PURE__ */ jsx("a", { href: "/blog", className: "text-primary hover:text-cyan-300 transition-colors", children: "← Back to Blog" })
      ] }) })
    ] });
  }
  return /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: `${post.title} | SimpleSequence Blog`,
        description: post.subtitle,
        ogType: "article",
        jsonLd: {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.subtitle,
          datePublished: post.date,
          author: {
            "@type": "Organization",
            name: "SimpleSequence"
          }
        }
      }
    ),
    /* @__PURE__ */ jsxs("section", { className: "pt-44 pb-16 relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--primary),0.08),transparent_50%)]" }),
      /* @__PURE__ */ jsx(CircuitBeams, { className: "opacity-30" }),
      /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 relative z-10", children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8 },
          className: "max-w-3xl mx-auto",
          children: [
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "/blog",
                className: "inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors mb-8 group",
                "data-testid": "link-back-to-blog",
                children: [
                  /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4 group-hover:-translate-x-1 transition-transform" }),
                  "Back to Blog"
                ]
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-6", children: [
              /* @__PURE__ */ jsx("span", { className: `px-3 py-1 rounded-full text-xs font-medium border ${categoryColors[post.category] || "bg-slate-500/10 text-slate-400 border-slate-500/20"}`, children: post.category }),
              /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5 text-sm text-slate-500", children: [
                /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4" }),
                formatDate(post.date)
              ] })
            ] }),
            /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl lg:text-6xl font-display font-medium tracking-tight leading-[1.1] mb-4", children: post.title }),
            /* @__PURE__ */ jsx("p", { className: "text-xl text-primary/80 italic", children: post.subtitle })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-16 relative", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6", children: /* @__PURE__ */ jsxs(
      motion.article,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, delay: 0.2 },
        className: "max-w-3xl mx-auto",
        children: [
          /* @__PURE__ */ jsx("div", { className: "mb-16 space-y-6", children: post.content.map((block, index) => {
            const lines = block.split("\n");
            if (lines.length === 1 && block.length < 60) {
              return /* @__PURE__ */ jsx(
                "p",
                {
                  className: "text-2xl md:text-3xl font-display font-medium text-white",
                  children: block
                },
                index
              );
            }
            return /* @__PURE__ */ jsx("div", { className: "space-y-1", children: lines.map((line, lineIndex) => /* @__PURE__ */ jsx(
              "p",
              {
                className: "text-lg text-slate-300 leading-relaxed",
                children: line
              },
              lineIndex
            )) }, index);
          }) }),
          /* @__PURE__ */ jsxs("div", { className: "p-8 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-transparent relative overflow-hidden", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full" }),
            /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
                /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsx(CheckCircle2, { className: "w-5 h-5 text-primary" }) }),
                /* @__PURE__ */ jsx("span", { className: "text-lg font-display font-medium text-white", children: "Action Steps" })
              ] }),
              /* @__PURE__ */ jsx("ol", { className: "space-y-4", children: post.actionSteps.map((step, index) => /* @__PURE__ */ jsxs("li", { className: "flex gap-4", children: [
                /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-7 h-7 rounded-full bg-primary/20 text-primary text-sm font-medium flex items-center justify-center", children: index + 1 }),
                /* @__PURE__ */ jsx("p", { className: "text-slate-300 leading-relaxed pt-0.5", children: step })
              ] }, index)) })
            ] })
          ] })
        ]
      }
    ) }) })
  ] });
}
const RevenuePainItemSchema = z.object({
  value: z.string(),
  severity: z.number().min(1).max(5)
});
const RevenuePainSchema = z.array(RevenuePainItemSchema).min(1, "Select at least one area that feels familiar").max(3, "Select up to 3 areas");
const IndustrySchema = z.enum([
  "HVAC",
  "Plumbing",
  "Electrical",
  "Roofing",
  "Solar",
  "Remodeling",
  "Landscaping",
  "Windows & Doors",
  "Painting",
  "Cleaning",
  "Pest Control",
  "Legal",
  "Med Spa / Aesthetics",
  "Real Estate",
  "Auto Services",
  "Other"
]);
const TeamSizeSchema = z.enum([
  "Solo",
  "2–5",
  "6–15",
  "16–50",
  "50+"
]);
const MonthlyLeadVolumeSchema = z.enum([
  "1-10 leads/month",
  "11-25 leads/month",
  "26-50 leads/month",
  "51-100 leads/month",
  "101-200 leads/month",
  "200+ leads/month",
  "I don't know"
]);
const FirstContactSpeedSchema = z.enum([
  "Under 5 minutes (excellent—top 10%)",
  "5-30 minutes (good—top 25%)",
  "30 minutes to 2 hours (average—middle 50%)",
  "2-4 hours (slow—bottom 25%)",
  "4-24 hours (very slow—bottom 10%)",
  "24+ hours (critical problem)",
  "It varies wildly (inconsistent)"
]);
const UnavailabilityPctSchema = z.enum([
  "0-10% (Rare—we're almost always available)",
  "11-25% (Occasional—some evenings/weekends)",
  "26-50% (Frequent—about half the time)",
  "51-75% (Most of the time—we miss more than we catch)",
  "76-100% (Nearly constant—we're rarely available when they call)",
  "I don't know (we don't track this)"
]);
const PhoneUnavailableHandlingSchema = z.enum([
  "Voicemail only",
  "Answering service",
  "AI voice assistant",
  "Honestly, most calls get missed"
]);
const DigitalUnavailableHandlingSchema = z.enum([
  "Auto-responder",
  "Self-service booking",
  "We respond when we can",
  "Many slip through"
]);
const NoShowRecoverySchema = z.enum([
  "Yes, automatically (system does it for us)",
  "Yes, manually (someone has to remember to do it)",
  "Sometimes (when we're not too busy)",
  "Rarely (we try but it's inconsistent)",
  "No (once they no-show, they're gone)"
]);
const QuoteFollowUpSchema = z.enum([
  "Automated follow-up sequence (emails/texts until they respond)",
  "Manual follow-up (we call/text when we remember)",
  "One attempt (we follow up once, then stop)",
  "Nothing (once we quote, we wait for them to decide)"
]);
const DormantLeadsSchema = z.enum([
  "Yes, hundreds or thousands (significant untapped opportunity)",
  "Yes, 50-200 leads (moderate database)",
  "Yes, under 50 (small list)",
  "No, we actively work our database (stay on top of it)",
  "I don't know / We don't track leads in a database"
]);
const NoShowRateSchema = z.enum([
  "0-10% (excellent—very reliable customers)",
  "11-20% (average—some no-shows)",
  "21-35% (high—significant problem)",
  "35%+ (critical—major revenue drain)",
  "I don't track this"
]);
const ContactChannelSchema = z.enum([
  "Phone call",
  "Text/SMS",
  "Website form",
  "Social media messages",
  "Chat widget",
  "Email",
  "Online booking",
  "Walk-ins only"
]);
const SocialMediaActivitySchema = z.enum([
  "Yes, very active (post 3+ times/week, respond to comments/DMs)",
  "Somewhat active (have pages, post occasionally)",
  "Barely active (pages exist but rarely use them)",
  "No (don't use social media for business)"
]);
const ReviewRequestSchema = z.enum([
  "Yes, automatically (every customer gets a review request)",
  "Yes, manually (we ask when we remember)",
  "Sometimes (only our best customers)",
  "No (we rely on organic reviews)"
]);
const CloseRateSchema = z.enum([
  "1-2 out of 10 (10-20%)",
  "3-4 out of 10 (30-40%)",
  "5-6 out of 10 (50-60%)",
  "7-8 out of 10 (70-80%)",
  "9-10 out of 10 (90-100%)",
  "I don't know"
]);
const ManualHoursSchema = z.enum([
  "0-2 hours/week (minimal—very streamlined)",
  "3-5 hours/week (manageable)",
  "6-10 hours/week (significant—noticeable drag)",
  "11-20 hours/week (major time sink)",
  "20+ hours/week (overwhelming—drowning in admin)",
  "I'm not sure"
]);
const KnowledgeBottleneckSchema = z.enum([
  "Yes, major bottleneck (constant interruptions for the same questions)",
  "Yes, but manageable (happens occasionally)",
  "No (everything is straightforward or well-documented)"
]);
const OperationalComplexitySchema = z.enum([
  "Single location, focused service (simple)",
  "Single location, multiple service lines (moderate)",
  "Multiple locations, same service (moderate)",
  "Multiple locations, multiple services (complex)",
  "Enterprise/franchise operations (very complex)"
]);
const AssessmentSchema = z.object({
  revenue_pain: RevenuePainSchema,
  business_name: z.string().min(1, "Business name or website is required"),
  industry: IndustrySchema,
  niche_specificity: z.string().min(1, "Select your specialization"),
  team_size: TeamSizeSchema,
  avg_job_value: z.string().min(1, "Required"),
  monthly_lead_volume: MonthlyLeadVolumeSchema,
  first_contact_speed: FirstContactSpeedSchema,
  unavailability_pct: UnavailabilityPctSchema,
  phone_unavailable_handling: PhoneUnavailableHandlingSchema,
  digital_unavailable_handling: DigitalUnavailableHandlingSchema,
  no_show_recovery: NoShowRecoverySchema,
  quote_followup: QuoteFollowUpSchema,
  dormant_leads: DormantLeadsSchema,
  no_show_rate: NoShowRateSchema,
  contact_channels: z.array(ContactChannelSchema).min(1, "Select at least one contact channel"),
  social_media_activity: SocialMediaActivitySchema,
  review_request: ReviewRequestSchema,
  close_rate: CloseRateSchema,
  manual_hours: ManualHoursSchema,
  knowledge_bottleneck: KnowledgeBottleneckSchema,
  operational_complexity: OperationalComplexitySchema,
  contact_name: z.string().min(1, "Name is required"),
  contact_email: z.string().email("Valid email is required"),
  contact_phone: z.string().optional(),
  disclaimer_accepted: z.boolean().refine((val) => val === true, { message: "You must accept the disclaimer" })
});
const STEPS = [
  {
    id: "pain",
    title: "What's Draining Revenue?",
    description: "Select up to 3 areas that feel the most familiar. Don't overthink it - just pick what resonates.",
    fields: ["revenue_pain"],
    progress: 0
  },
  {
    id: "business",
    title: "About Your Business",
    description: "Help us understand your business context so we can calibrate our analysis.",
    fields: ["business_name", "industry", "niche_specificity", "team_size", "avg_job_value", "monthly_lead_volume"],
    progress: 17
  },
  {
    id: "speed",
    title: "The Speed Gap",
    description: "How quickly do leads get a response, and what happens when you're unavailable?",
    fields: ["first_contact_speed", "unavailability_pct", "phone_unavailable_handling", "digital_unavailable_handling"],
    progress: 34
  },
  {
    id: "silence",
    title: "The Silence Gap",
    description: "What happens after the first conversation - do leads get followed up?",
    fields: ["no_show_recovery", "quote_followup", "dormant_leads", "no_show_rate"],
    progress: 51
  },
  {
    id: "engagement",
    title: "Channels & Engagement",
    description: "How do leads reach you, and how do you engage customers?",
    fields: ["contact_channels", "social_media_activity", "review_request", "close_rate"],
    progress: 68
  },
  {
    id: "chaos",
    title: "The Chaos Gap",
    description: "How much operational overhead is slowing you down?",
    fields: ["manual_hours", "knowledge_bottleneck", "operational_complexity"],
    progress: 85
  },
  {
    id: "contact",
    title: "Get Your Results",
    description: "We'll send your personalized Revenue Gap Report to your inbox.",
    fields: ["contact_name", "contact_email", "contact_phone", "disclaimer_accepted"],
    progress: 95
  }
];
const REVENUE_PAIN_OPTIONS = [
  { value: "Leads go cold before we respond", subtitle: "Speed problem" },
  { value: "No-shows and cancellations hurt revenue", subtitle: "Follow-up problem" },
  { value: "Quotes sent but never closed", subtitle: "Persistence problem" },
  { value: "Old leads sitting in the database", subtitle: "Reactivation problem" },
  { value: "Too much time on manual admin work", subtitle: "Efficiency problem" },
  { value: "Inconsistent customer experience", subtitle: "Process problem" },
  { value: "Reputation not growing fast enough", subtitle: "Review problem" },
  { value: "Can't answer calls when busy", subtitle: "Availability problem" }
];
const INDUSTRY_NICHE_MAP = {
  "HVAC": ["Residential HVAC", "Commercial HVAC", "HVAC Installation", "HVAC Maintenance", "HVAC Repair"],
  "Plumbing": ["Residential Plumbing", "Commercial Plumbing", "Emergency Plumbing", "Drain Cleaning", "Water Heater Services"],
  "Electrical": ["Residential Electrical", "Commercial Electrical", "Emergency Electrical", "EV Charger Installation", "Panel Upgrades"],
  "Roofing": ["Residential Roofing", "Commercial Roofing", "Storm Damage Repair", "Roof Replacement", "Metal Roofing"],
  "Solar": ["Residential Solar", "Commercial Solar", "Battery Storage", "Solar Maintenance"],
  "Remodeling": ["Kitchen Remodeling", "Bathroom Remodeling", "Whole Home Renovation", "Basement Finishing", "Room Additions"],
  "Landscaping": ["Lawn Care", "Landscape Design", "Irrigation", "Tree Services", "Hardscaping"],
  "Windows & Doors": ["Window Replacement", "Door Installation", "Entry Doors", "Patio Doors", "Siding"],
  "Painting": ["Interior Painting", "Exterior Painting", "Commercial Painting", "Cabinet Refinishing"],
  "Cleaning": ["Residential Cleaning", "Commercial Cleaning", "Deep Cleaning", "Move-In/Move-Out", "Carpet Cleaning"],
  "Pest Control": ["Residential Pest Control", "Commercial Pest Control", "Termite Control", "Wildlife Removal"],
  "Legal": ["Family Law", "Personal Injury", "Criminal Defense", "Estate Planning", "Business Law", "Immigration"],
  "Med Spa / Aesthetics": ["Injectables", "Body Contouring", "Laser Treatments", "Skin Care", "IV Therapy"],
  "Real Estate": ["Residential Sales", "Commercial Sales", "Property Management", "Luxury Homes"],
  "Auto Services": ["General Repair", "Collision Repair", "Detailing", "Oil Change", "Tire Services"],
  "Other": ["Professional Services", "Healthcare", "Fitness", "Consulting", "Other"]
};
const TEAM_SIZE_OPTIONS = ["Solo", "2–5", "6–15", "16–50", "50+"];
const MONTHLY_LEAD_VOLUME_OPTIONS = [
  "1-10 leads/month",
  "11-25 leads/month",
  "26-50 leads/month",
  "51-100 leads/month",
  "101-200 leads/month",
  "200+ leads/month",
  "I don't know"
];
const FIRST_CONTACT_SPEED_OPTIONS = [
  "Under 5 minutes (excellent—top 10%)",
  "5-30 minutes (good—top 25%)",
  "30 minutes to 2 hours (average—middle 50%)",
  "2-4 hours (slow—bottom 25%)",
  "4-24 hours (very slow—bottom 10%)",
  "24+ hours (critical problem)",
  "It varies wildly (inconsistent)"
];
const UNAVAILABILITY_PCT_OPTIONS = [
  "0-10% (Rare—we're almost always available)",
  "11-25% (Occasional—some evenings/weekends)",
  "26-50% (Frequent—about half the time)",
  "51-75% (Most of the time—we miss more than we catch)",
  "76-100% (Nearly constant—we're rarely available when they call)",
  "I don't know (we don't track this)"
];
const PHONE_UNAVAILABLE_HANDLING_OPTIONS = [
  { value: "Voicemail only", subtitle: "They leave a message, you call back" },
  { value: "Answering service", subtitle: "Live person takes messages" },
  { value: "AI voice assistant", subtitle: "Automated AI handles the call" },
  { value: "Honestly, most calls get missed", subtitle: "No backup system" }
];
const DIGITAL_UNAVAILABLE_HANDLING_OPTIONS = [
  { value: "Auto-responder", subtitle: "Instant email or text reply" },
  { value: "Self-service booking", subtitle: "They can book without you" },
  { value: "We respond when we can", subtitle: "Manual response only" },
  { value: "Many slip through", subtitle: "No system in place" }
];
const NO_SHOW_RECOVERY_OPTIONS = [
  "Yes, automatically (system does it for us)",
  "Yes, manually (someone has to remember to do it)",
  "Sometimes (when we're not too busy)",
  "Rarely (we try but it's inconsistent)",
  "No (once they no-show, they're gone)"
];
const QUOTE_FOLLOWUP_OPTIONS = [
  "Automated follow-up sequence (emails/texts until they respond)",
  "Manual follow-up (we call/text when we remember)",
  "One attempt (we follow up once, then stop)",
  "Nothing (once we quote, we wait for them to decide)"
];
const DORMANT_LEADS_OPTIONS = [
  "Yes, hundreds or thousands (significant untapped opportunity)",
  "Yes, 50-200 leads (moderate database)",
  "Yes, under 50 (small list)",
  "No, we actively work our database (stay on top of it)",
  "I don't know / We don't track leads in a database"
];
const NO_SHOW_RATE_OPTIONS = [
  "0-10% (excellent—very reliable customers)",
  "11-20% (average—some no-shows)",
  "21-35% (high—significant problem)",
  "35%+ (critical—major revenue drain)",
  "I don't track this"
];
const CONTACT_CHANNEL_OPTIONS = [
  { value: "Phone call", subtitle: "Inbound calls" },
  { value: "Text/SMS", subtitle: "Text messages" },
  { value: "Website form", subtitle: "Contact forms" },
  { value: "Social media messages", subtitle: "FB, IG, etc." },
  { value: "Chat widget", subtitle: "Website chat" },
  { value: "Email", subtitle: "Direct email" },
  { value: "Online booking", subtitle: "Self-service" },
  { value: "Walk-ins only", subtitle: "In-person" }
];
const SOCIAL_MEDIA_ACTIVITY_OPTIONS = [
  "Yes, very active (post 3+ times/week, respond to comments/DMs)",
  "Somewhat active (have pages, post occasionally)",
  "Barely active (pages exist but rarely use them)",
  "No (don't use social media for business)"
];
const REVIEW_REQUEST_OPTIONS = [
  "Yes, automatically (every customer gets a review request)",
  "Yes, manually (we ask when we remember)",
  "Sometimes (only our best customers)",
  "No (we rely on organic reviews)"
];
const CLOSE_RATE_OPTIONS = [
  "1-2 out of 10 (10-20%)",
  "3-4 out of 10 (30-40%)",
  "5-6 out of 10 (50-60%)",
  "7-8 out of 10 (70-80%)",
  "9-10 out of 10 (90-100%)",
  "I don't know"
];
const MANUAL_HOURS_OPTIONS = [
  "0-2 hours/week (minimal—very streamlined)",
  "3-5 hours/week (manageable)",
  "6-10 hours/week (significant—noticeable drag)",
  "11-20 hours/week (major time sink)",
  "20+ hours/week (overwhelming—drowning in admin)",
  "I'm not sure"
];
const KNOWLEDGE_BOTTLENECK_OPTIONS = [
  "Yes, major bottleneck (constant interruptions for the same questions)",
  "Yes, but manageable (happens occasionally)",
  "No (everything is straightforward or well-documented)"
];
const OPERATIONAL_COMPLEXITY_OPTIONS = [
  { value: "Single location, focused service (simple)" },
  { value: "Single location, multiple service lines (moderate)" },
  { value: "Multiple locations, same service (moderate)" },
  { value: "Multiple locations, multiple services (complex)" },
  { value: "Enterprise/franchise operations (very complex)" }
];
function parseMonthlyLeads(value) {
  if (value.includes("I don't know")) return 50;
  if (value.includes("200+")) return 250;
  if (value.includes("101-200")) return 150;
  if (value.includes("51-100")) return 75;
  if (value.includes("26-50")) return 38;
  if (value.includes("11-25")) return 18;
  if (value.includes("1-10")) return 5;
  return 50;
}
function parseJobValue(value) {
  const cleaned = value.replace(/[$,]/g, "");
  return parseInt(cleaned) || 2500;
}
function parseCloseRate(value) {
  if (value.includes("I don't know")) return 0.3;
  if (value.includes("9-10")) return 0.95;
  if (value.includes("7-8")) return 0.75;
  if (value.includes("5-6")) return 0.55;
  if (value.includes("3-4")) return 0.35;
  if (value.includes("1-2")) return 0.15;
  return 0.3;
}
function parseUnavailablePercent(value) {
  if (value.includes("0-10%")) return 0;
  if (value.includes("11-25%")) return 18;
  if (value.includes("26-50%")) return 38;
  if (value.includes("51-75%")) return 63;
  if (value.includes("76-100%")) return 88;
  if (value.includes("I don't know")) return 30;
  return 30;
}
function parseNoShowRate(value) {
  if (value.includes("I don't track")) return 15;
  if (value.includes("35%+")) return 40;
  if (value.includes("21-35%")) return 28;
  if (value.includes("11-20%")) return 15;
  if (value.includes("0-10%")) return 5;
  return 15;
}
function parseManualHours(value) {
  if (value.includes("I'm not sure")) return 8;
  if (value.includes("20+")) return 25;
  if (value.includes("11-20")) return 15;
  if (value.includes("6-10")) return 8;
  if (value.includes("3-5")) return 4;
  if (value.includes("0-2")) return 1;
  return 8;
}
function roundToFifty(value) {
  return Math.round(value / 50) * 50;
}
function conservativeEstimate(low, high) {
  return roundToFifty(low * 0.6 + high * 0.4);
}
function calculateSpeedGap(data, monthlyLeads, avgJobValue) {
  const findings = [];
  const causes = [];
  const unavailablePercent = parseUnavailablePercent(data.unavailability_pct);
  if (unavailablePercent === 0) {
    return {
      estimate: 0,
      findings: ["You're available nearly 100% of the time - excellent speed coverage"],
      causes: [],
      calculationDetails: {
        description: "No speed gap - you are always available",
        formula: "0% unavailable = $0 speed gap",
        inputs: { unavailablePercent: 0 }
      }
    };
  }
  const speedLossRates = {
    "Under 5 minutes (excellent—top 10%)": 0.05,
    "5-30 minutes (good—top 25%)": 0.18,
    "30 minutes to 2 hours (average—middle 50%)": 0.3,
    "2-4 hours (slow—bottom 25%)": 0.4,
    "4-24 hours (very slow—bottom 10%)": 0.55,
    "24+ hours (critical problem)": 0.7,
    "It varies wildly (inconsistent)": 0.45
  };
  const responseTime = data.first_contact_speed;
  const speedLossRate = speedLossRates[responseTime] || 0.3;
  const unavailableLeads = monthlyLeads * (unavailablePercent / 100);
  const phoneWeight = 0.7;
  const digitalWeight = 0.3;
  const phoneLossMultipliers = {
    "Voicemail only": 0.8,
    "Answering service": 0.5,
    "AI voice assistant": 0.1,
    "Honestly, most calls get missed": 0.95,
    "I'm not sure": 0.7
  };
  const digitalLossMultipliers = {
    "Auto-responder": 0.3,
    "Self-service booking": 0.1,
    "We respond when we can": 0.6,
    "Many slip through": 0.85,
    "I'm not sure": 0.5
  };
  const phoneMultiplier = phoneLossMultipliers[data.phone_unavailable_handling] || 0.7;
  const digitalMultiplier = digitalLossMultipliers[data.digital_unavailable_handling] || 0.5;
  const leadsLost = unavailableLeads * (phoneMultiplier * phoneWeight + digitalMultiplier * digitalWeight) * speedLossRate;
  const lowEstimate = leadsLost * avgJobValue * 0.5;
  const highEstimate = leadsLost * avgJobValue * 0.7;
  const estimate = conservativeEstimate(lowEstimate, highEstimate);
  const responseLabel = responseTime.split("(")[0].trim();
  findings.push(`Average response time: ${responseLabel}`);
  findings.push(`${unavailablePercent}% of leads arrive when you're unavailable`);
  findings.push(`Phone handling: ${data.phone_unavailable_handling}`);
  findings.push(`Digital handling: ${data.digital_unavailable_handling}`);
  causes.push(`${unavailablePercent}% of your leads arrive when you're unavailable`);
  causes.push(`Phone calls go to: ${data.phone_unavailable_handling}`);
  causes.push(`Digital leads handled via: ${data.digital_unavailable_handling}`);
  causes.push(`You respond in ${responseLabel} when available, but miss this ${unavailablePercent}% entirely`);
  causes.push("Competitors with AI answering capture these leads in under 60 seconds");
  return {
    estimate,
    findings,
    causes,
    calculationDetails: {
      description: "Speed Gap = Unavailable leads x Loss rate x Avg job value",
      formula: `${monthlyLeads} x ${unavailablePercent}% x ${Math.round(speedLossRate * 100)}% x $${avgJobValue}`,
      inputs: {
        monthlyLeads,
        unavailablePercent: `${unavailablePercent}%`,
        lossRate: `${Math.round(speedLossRate * 100)}%`,
        avgJobValue: `$${avgJobValue}`,
        leadsLost: Math.round(leadsLost),
        result: `~$${estimate.toLocaleString()}`
      }
    }
  };
}
function calculateSilenceGap(data, monthlyLeads, avgJobValue, closeRate) {
  const findings = [];
  const causes = [];
  const noShowRate = parseNoShowRate(data.no_show_rate);
  const noShowAppointments = monthlyLeads * closeRate * (noShowRate / 100);
  const noShowRecoveryRate = 0.25;
  const noShowMonthly = noShowAppointments * noShowRecoveryRate * avgJobValue;
  const quotesGiven = monthlyLeads * closeRate;
  const staleQuotes = quotesGiven * 0.5;
  const quoteRecoveryRates = {
    "Automated follow-up sequence": 0.1,
    "Manual follow-up": 0.15,
    "One attempt": 0.2,
    "Nothing": 0.25
  };
  let quoteRecoveryRate = 0.2;
  for (const [key, rate] of Object.entries(quoteRecoveryRates)) {
    if (data.quote_followup.includes(key)) {
      quoteRecoveryRate = rate;
      break;
    }
  }
  const quoteMonthly = staleQuotes * quoteRecoveryRate * avgJobValue;
  const dormantCounts = {
    "hundreds or thousands": 500,
    "50-200": 125,
    "under 50": 25,
    "No, we actively": 0,
    "I don't know": 100
  };
  let dormantCount = 100;
  for (const [key, count2] of Object.entries(dormantCounts)) {
    if (data.dormant_leads.includes(key)) {
      dormantCount = count2;
      break;
    }
  }
  const reactivationRate = 0.08;
  const dormantOneTime = dormantCount * reactivationRate * avgJobValue;
  const dormantMonthly = dormantOneTime / 12;
  const totalLow = (noShowMonthly + quoteMonthly + dormantMonthly) * 0.8;
  const totalHigh = (noShowMonthly + quoteMonthly + dormantMonthly) * 1.2;
  const estimate = conservativeEstimate(totalLow, totalHigh);
  findings.push(`No-show recovery: ${data.no_show_recovery.split("(")[0].trim()}`);
  findings.push(`Quote follow-up: ${data.quote_followup.split("(")[0].trim()}`);
  findings.push(`Dormant database: ${data.dormant_leads.split("(")[0].trim()}`);
  if (!data.no_show_recovery.includes("automatically")) {
    causes.push("No-shows represent lost revenue with inconsistent recovery effort");
  }
  if (data.quote_followup.includes("Nothing") || data.quote_followup.includes("One attempt")) {
    causes.push("Quotes sent without persistent follow-up have significantly lower close rates");
  }
  if (dormantCount > 0) {
    causes.push(`~${dormantCount} dormant leads represent untapped revenue (8% reactivation typical)`);
  }
  return {
    estimate,
    findings,
    causes,
    calculationDetails: {
      description: "Silence Gap = No-show recovery + Quote follow-up + Dormant reactivation",
      formula: `($${Math.round(noShowMonthly)}) + ($${Math.round(quoteMonthly)}) + ($${Math.round(dormantMonthly)}/mo from ${dormantCount} dormant leads)`,
      inputs: {
        noShowRate: `${noShowRate}%`,
        noShowMonthly: `~$${Math.round(noShowMonthly).toLocaleString()}/mo`,
        staleQuotes: Math.round(staleQuotes),
        quoteMonthly: `~$${Math.round(quoteMonthly).toLocaleString()}/mo`,
        dormantCount,
        dormantMonthly: `~$${Math.round(dormantMonthly).toLocaleString()}/mo (amortized over 12 months)`,
        result: `~$${estimate.toLocaleString()}`
      }
    }
  };
}
function calculateChaosGap(data) {
  const findings = [];
  const causes = [];
  const manualHours = parseManualHours(data.manual_hours);
  const hourlyRate = 30;
  const weeksPerMonth = 4.33;
  const monthlyHours = manualHours * weeksPerMonth;
  const lowEstimate = monthlyHours * hourlyRate * 0.8;
  const highEstimate = monthlyHours * hourlyRate * 1.2;
  const estimate = conservativeEstimate(lowEstimate, highEstimate);
  findings.push(`${manualHours} hours/week on manual coordination`);
  findings.push(`Knowledge bottleneck: ${data.knowledge_bottleneck.split("(")[0].trim()}`);
  findings.push(`Operational complexity: ${data.operational_complexity.split("(")[0].trim()}`);
  if (manualHours >= 20) {
    causes.push("Team is drowning in administrative tasks");
  } else if (manualHours >= 11) {
    causes.push("Significant time lost to manual data entry and coordination");
  } else if (manualHours >= 6) {
    causes.push("Noticeable drag from manual processes");
  }
  if (data.knowledge_bottleneck.includes("major bottleneck")) {
    causes.push("Constant interruptions for repeated questions");
  }
  if (data.operational_complexity.includes("complex") || data.operational_complexity.includes("Enterprise")) {
    causes.push("High complexity amplifies operational inefficiencies");
  }
  return {
    estimate,
    findings,
    causes,
    calculationDetails: {
      description: "Chaos Gap = Weekly manual hours x $30/hr x 4.33 weeks",
      formula: `${manualHours} hours x $30 x 4.33 weeks = ~$${estimate.toLocaleString()}/mo`,
      inputs: {
        manualHoursPerWeek: manualHours,
        hourlyRate: "$30",
        monthlyHours: Math.round(monthlyHours),
        result: `~$${estimate.toLocaleString()}`
      }
    }
  };
}
function recommendTier(speedGap, silenceGap, chaosGap, monthlyLeads, complexity) {
  const isComplex = complexity.includes("complex") || complexity.includes("Enterprise");
  const maxGap = Math.max(speedGap, silenceGap, chaosGap);
  let dominantGapName = "Speed";
  let dominantGapValue = speedGap;
  if (silenceGap === maxGap) {
    dominantGapName = "Silence";
    dominantGapValue = silenceGap;
  } else if (chaosGap === maxGap) {
    dominantGapName = "Chaos";
    dominantGapValue = chaosGap;
  }
  if (complexity.includes("Enterprise")) {
    return {
      tier: "Command",
      reason: `Your enterprise-level operations require full automation. Your ${dominantGapName} Gap is ~$${dominantGapValue.toLocaleString()}/mo.`
    };
  }
  if (monthlyLeads > 150) {
    return {
      tier: "Command",
      reason: `With ${monthlyLeads} leads/month, you need enterprise-grade automation. Your ${dominantGapName} Gap is ~$${dominantGapValue.toLocaleString()}/mo.`
    };
  }
  if (chaosGap === maxGap && isComplex) {
    return {
      tier: "Command",
      reason: `Your Chaos Gap (~$${chaosGap.toLocaleString()}/mo) combined with operational complexity requires full automation.`
    };
  }
  if (chaosGap === maxGap) {
    return {
      tier: "Specialist",
      reason: `Your biggest cost is the Chaos Gap (~$${chaosGap.toLocaleString()}/mo). Specialist includes automation that eliminates manual coordination and admin work.`
    };
  }
  if (silenceGap === maxGap || silenceGap > speedGap * 1.5) {
    return {
      tier: "Specialist",
      reason: `Your biggest cost is the Silence Gap (~$${silenceGap.toLocaleString()}/mo). Frontline only fixes Speed—it won't address no-shows, stale quotes, or dormant leads. Specialist addresses both.`
    };
  }
  return {
    tier: "Frontline",
    reason: `Your primary gap is Speed (~$${speedGap.toLocaleString()}/mo). Frontline provides instant response when you're unavailable.`
  };
}
function calculateResults(data) {
  const monthlyLeads = parseMonthlyLeads(data.monthly_lead_volume);
  const avgJobValue = parseJobValue(data.avg_job_value);
  const closeRate = parseCloseRate(data.close_rate);
  const speedGap = calculateSpeedGap(data, monthlyLeads, avgJobValue);
  const silenceGap = calculateSilenceGap(data, monthlyLeads, avgJobValue, closeRate);
  const chaosGap = calculateChaosGap(data);
  const totalMonthlyGap = speedGap.estimate + silenceGap.estimate + chaosGap.estimate;
  const annualizedGap = totalMonthlyGap * 12;
  const { tier, reason } = recommendTier(
    speedGap.estimate,
    silenceGap.estimate,
    chaosGap.estimate,
    monthlyLeads,
    data.operational_complexity
  );
  return {
    businessName: data.business_name || "Your Business",
    industry: data.industry,
    niche: data.niche_specificity,
    teamSize: data.team_size,
    monthlyLeads,
    avgJobValue,
    closeRate,
    speedGap,
    silenceGap,
    chaosGap,
    totalMonthlyGap,
    annualizedGap,
    recommendedTier: tier,
    tierReason: reason
  };
}
const GlassButton = React.forwardRef(
  ({ className, variant = "primary", size = "md", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-bold tracking-wide ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 uppercase",
          {
            "bg-cyan-400 text-black hover:bg-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:shadow-[0_0_25px_rgba(34,211,238,0.5)]": variant === "primary",
            "bg-secondary text-secondary-foreground hover:bg-secondary/80": variant === "secondary",
            "hover:bg-cyan-950/30 hover:text-cyan-400": variant === "ghost",
            "border border-slate-700 bg-transparent hover:border-cyan-500/50 hover:text-cyan-400": variant === "outline",
            "h-9 px-4 py-2": size === "sm",
            "h-12 px-8 py-2": size === "md",
            "h-14 px-10 text-base": size === "lg"
          },
          className
        ),
        ref,
        ...props
      }
    );
  }
);
GlassButton.displayName = "GlassButton";
const GlassCard = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn(
        "rounded-2xl text-card-foreground p-8 md:p-12 transition-all duration-300 w-full bg-[#0d1117] border border-[#1e2830] shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-sm",
        className
      ),
      ...props
    }
  )
);
GlassCard.displayName = "GlassCard";
const GlassInput = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-12 w-full rounded-xl border border-[#2a3038] bg-[#12161a] px-4 py-2 text-base text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#6b7280] focus-visible:outline-none focus-visible:border-[#00D9FF]/60 focus-visible:shadow-[0_0_12px_rgba(0,217,255,0.15),inset_0_1px_0_rgba(0,217,255,0.05)] disabled:cursor-not-allowed disabled:opacity-50 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.02)] hover:border-[#3a4048] hover:shadow-[0_4px_12px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.04)]",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
GlassInput.displayName = "GlassInput";
const GlassLabel = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "label",
    {
      ref,
      className: cn(
        "text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-4 block text-slate-200",
        className
      ),
      ...props
    }
  )
);
GlassLabel.displayName = "GlassLabel";
const GlassSelect = React.forwardRef(
  ({ children, value, onValueChange, placeholder, className }, ref) => {
    return /* @__PURE__ */ jsxs(SelectPrimitive.Root, { value: value || void 0, onValueChange, children: [
      /* @__PURE__ */ jsxs(
        SelectPrimitive.Trigger,
        {
          ref,
          className: cn(
            "flex h-14 w-full items-center justify-between rounded-xl border border-[#2a3038] bg-[#12161a] px-4 py-3 text-base text-white ring-offset-background placeholder:text-[#6b7280] focus:outline-none focus:border-[#00D9FF]/60 focus:shadow-[0_0_12px_rgba(0,217,255,0.15),inset_0_1px_0_rgba(0,217,255,0.05)] disabled:cursor-not-allowed disabled:opacity-50 hover:border-[#3a4048] transition-all shadow-[0_2px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.02)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.04)] data-[state=open]:border-[#00D9FF]/60",
            className
          ),
          children: [
            /* @__PURE__ */ jsx(SelectPrimitive.Value, { placeholder }),
            /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-5 w-5 text-[#6b7280]" }) })
          ]
        }
      ),
      /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsx(
        SelectPrimitive.Content,
        {
          className: "relative z-50 max-h-96 w-[var(--radix-select-trigger-width)] overflow-hidden rounded-xl border border-[#2a3038] bg-[#0d1117] text-white shadow-[0_8px_32px_rgba(0,0,0,0.6)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          position: "popper",
          sideOffset: 4,
          children: /* @__PURE__ */ jsx(SelectPrimitive.Viewport, { className: "p-1", children })
        }
      ) })
    ] });
  }
);
GlassSelect.displayName = "GlassSelect";
const GlassSelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-lg py-3 px-4 text-base outline-none focus:bg-[#00D9FF] focus:text-[#0a0f12] data-[disabled]:pointer-events-none data-[disabled]:opacity-50 transition-colors cursor-pointer hover:bg-[#00D9FF]/90 hover:text-[#0a0f12] data-[state=checked]:bg-[#00D9FF] data-[state=checked]:text-[#0a0f12]",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
  }
));
GlassSelectItem.displayName = SelectPrimitive.Item.displayName;
const GlassRadioGroup = React.forwardRef(
  ({ options, value, onChange, className, columns = 1 }, ref) => {
    const gridClass = columns === 3 ? "grid-cols-1 md:grid-cols-3" : columns === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1";
    return /* @__PURE__ */ jsx("div", { ref, className: cn(`grid ${gridClass} gap-3`, className), children: options.map((option) => {
      const isSelected = value === option.value;
      return /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => onChange?.(option.value),
          className: cn(
            "relative flex flex-col p-4 rounded-xl border text-left transition-all duration-200 overflow-hidden",
            isSelected ? "bg-[#0d1a1f] border-[#00D9FF]/60 shadow-[0_0_20px_rgba(0,217,255,0.2),0_4px_16px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(0,217,255,0.1)]" : "bg-[#12161a] border-[#2a3038] shadow-[0_2px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.02)] hover:bg-[#181d22] hover:border-[#3a4048] hover:shadow-[0_4px_12px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.04)]"
          ),
          children: [
            isSelected && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-[#00D9FF]/[0.08] via-transparent to-transparent pointer-events-none" }),
            /* @__PURE__ */ jsxs("div", { className: "relative flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                isSelected ? "border-[#00D9FF] bg-[#00D9FF] shadow-[0_0_8px_rgba(0,217,255,0.5)]" : "border-[#4a5058]"
              ), children: isSelected && /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-[#0a0f12]" }) }),
              /* @__PURE__ */ jsx("span", { className: cn("font-medium", isSelected ? "text-white" : "text-[#c0c8d0]"), children: option.label })
            ] }),
            option.subtitle && /* @__PURE__ */ jsx("span", { className: "relative text-sm text-[#6b7280] mt-1 ml-8", children: option.subtitle })
          ]
        },
        option.value
      );
    }) });
  }
);
GlassRadioGroup.displayName = "GlassRadioGroup";
const VisualCardSelector = React.forwardRef(
  ({ options, value, onChange, className, columns = 1 }, ref) => {
    const gridClass = columns === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1";
    return /* @__PURE__ */ jsx("div", { ref, className: cn(`grid ${gridClass} gap-3`, className), children: options.map((option) => {
      const isSelected = value === option.value;
      return /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => onChange?.(option.value),
          className: cn(
            "relative flex flex-col p-5 rounded-xl border text-left transition-all duration-200 overflow-hidden",
            isSelected ? "bg-[#0d1a1f] border-[#00D9FF]/60 shadow-[0_0_20px_rgba(0,217,255,0.2),0_4px_16px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(0,217,255,0.1)]" : "bg-[#12161a] border-[#2a3038] shadow-[0_2px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.02)] hover:bg-[#181d22] hover:border-[#3a4048] hover:shadow-[0_4px_12px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.04)]"
          ),
          children: [
            isSelected && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-[#00D9FF]/[0.08] via-transparent to-transparent pointer-events-none" }),
            /* @__PURE__ */ jsx("span", { className: cn("relative text-lg font-medium", isSelected ? "text-white" : "text-[#c0c8d0]"), children: option.label }),
            option.subtitle && /* @__PURE__ */ jsx("span", { className: "relative text-sm text-[#6b7280] mt-1", children: option.subtitle })
          ]
        },
        option.value
      );
    }) });
  }
);
VisualCardSelector.displayName = "VisualCardSelector";
const GlassSlider = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs(
  SliderPrimitive.Root,
  {
    ref,
    className: cn(
      "relative flex w-full touch-none select-none items-center py-4",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx(SliderPrimitive.Track, { className: "relative h-2 w-full grow overflow-hidden rounded-full bg-slate-800 border border-slate-700/50 shadow-inner", children: /* @__PURE__ */ jsx(SliderPrimitive.Range, { className: "absolute h-full bg-gradient-to-r from-cyan-600 to-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.3)]" }) }),
      props.value?.[0] !== -1 && /* @__PURE__ */ jsx(SliderPrimitive.Thumb, { className: "block h-6 w-6 rounded-full border-2 border-cyan-300 bg-slate-950 ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:scale-110 shadow-[0_0_20px_rgba(34,211,238,0.6)] cursor-grab active:cursor-grabbing" })
    ]
  }
));
GlassSlider.displayName = SliderPrimitive.Root.displayName;
function getJobValueConfig(niche) {
  if (!niche) return { min: 100, max: 25e3, step: 100, default: 2500 };
  const highValueNiches = ["Kitchen Remodeling", "Bathroom Remodeling", "Whole Home Renovation", "Room Additions", "Roofing", "Solar", "Legal", "Family Law", "Personal Injury", "Estate Planning"];
  const lowValueNiches = ["Lawn Care", "Cleaning", "Pest Control", "Oil Change"];
  if (highValueNiches.some((n) => niche.includes(n))) {
    return { min: 1e3, max: 1e5, step: 1e3, default: 15e3 };
  }
  if (lowValueNiches.some((n) => niche.includes(n))) {
    return { min: 50, max: 5e3, step: 50, default: 200 };
  }
  return { min: 100, max: 25e3, step: 100, default: 2500 };
}
function Assessment() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, setLocation] = useLocation();
  const {
    register,
    control,
    handleSubmit,
    trigger,
    setValue,
    getValues,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(AssessmentSchema),
    mode: "onChange",
    defaultValues: {
      revenue_pain: [],
      contact_channels: [],
      disclaimer_accepted: false
    }
  });
  const watchedValues = useWatch({ control });
  const currentStep = STEPS[currentStepIndex];
  const handlePainToggle = (value) => {
    const currentPains = watchedValues.revenue_pain || [];
    const existingIndex = currentPains.findIndex((p) => p.value === value);
    if (existingIndex >= 0) {
      setValue("revenue_pain", currentPains.filter((p) => p.value !== value));
    } else if (currentPains.length < 3) {
      setValue("revenue_pain", [...currentPains, { value, severity: 3 }]);
    }
  };
  const handleChannelToggle = (channel) => {
    const current = watchedValues.contact_channels || [];
    if (current.includes(channel)) {
      setValue("contact_channels", current.filter((c) => c !== channel));
    } else {
      setValue("contact_channels", [...current, channel]);
    }
  };
  const handleNext = async () => {
    const fieldsToValidate = currentStep.fields;
    const isValid = await trigger(fieldsToValidate);
    if (!isValid) return;
    if (currentStepIndex === STEPS.length - 1) {
      setIsSubmitting(true);
      const data = getValues();
      try {
        const result = calculateResults(data);
        const response = await fetch("/api/assessment/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            assessmentData: data,
            speedGapScore: result.speedGap.estimate,
            silenceGapScore: result.silenceGap.estimate,
            chaosGapScore: result.chaosGap.estimate,
            totalMonthlyImpactLow: result.totalMonthlyGap * 0.8,
            totalMonthlyImpactHigh: result.totalMonthlyGap * 1.2,
            contactName: data.contact_name,
            contactEmail: data.contact_email,
            contactPhone: data.contact_phone || ""
          })
        });
        const responseData = await response.json();
        sessionStorage.setItem("assessmentResult", JSON.stringify(result));
        sessionStorage.setItem("leadId", responseData.leadId || "");
        setLocation("/results");
      } catch (error) {
        console.error("Error submitting assessment:", error);
      } finally {
        setIsSubmitting(false);
      }
      return;
    }
    setCurrentStepIndex((prev) => Math.min(prev + 1, STEPS.length - 1));
  };
  const handleBack = () => {
    setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
  };
  const renderField = (field) => {
    switch (field) {
      case "revenue_pain":
        return /* @__PURE__ */ jsxs("div", { className: "space-y-4 w-full", children: [
          /* @__PURE__ */ jsx("div", { className: "flex justify-between items-center", children: /* @__PURE__ */ jsxs("span", { className: "text-sm text-slate-500", children: [
            (watchedValues.revenue_pain || []).length,
            "/3 selected"
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: REVENUE_PAIN_OPTIONS.map((option) => {
            const isSelected = (watchedValues.revenue_pain || []).some((p) => p.value === option.value);
            return /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => handlePainToggle(option.value),
                className: `flex flex-col p-4 rounded-xl border text-left transition-all ${isSelected ? "bg-[#0d1a1f] border-[#00D9FF]/60 shadow-[0_0_20px_rgba(0,217,255,0.2)]" : "bg-[#12161a] border-[#2a3038] hover:bg-[#181d22] hover:border-[#3a4048]"}`,
                "data-testid": `button-pain-${option.value.toLowerCase().replace(/\s+/g, "-")}`,
                children: [
                  /* @__PURE__ */ jsx("span", { className: `font-medium ${isSelected ? "text-white" : "text-[#c0c8d0]"}`, children: option.value }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-[#6b7280] mt-1", children: option.subtitle })
                ]
              },
              option.value
            );
          }) }),
          errors.revenue_pain && /* @__PURE__ */ jsx("p", { className: "text-cyan-400 text-xs", children: errors.revenue_pain.message })
        ] });
      case "business_name":
        return /* @__PURE__ */ jsxs("div", { className: "space-y-2 w-full", children: [
          /* @__PURE__ */ jsx(GlassLabel, { htmlFor: "business_name", children: "Business Name or Website" }),
          /* @__PURE__ */ jsx(
            GlassInput,
            {
              id: "business_name",
              placeholder: "Acme HVAC or acmehvac.com",
              ...register("business_name"),
              "data-testid": "input-business-name"
            }
          ),
          errors.business_name && /* @__PURE__ */ jsx("p", { className: "text-cyan-400 text-xs", children: errors.business_name.message })
        ] });
      case "industry":
        return /* @__PURE__ */ jsxs("div", { className: "space-y-2 w-full", children: [
          /* @__PURE__ */ jsx(GlassLabel, { htmlFor: "industry", children: "Industry" }),
          /* @__PURE__ */ jsx(
            Controller,
            {
              control,
              name: "industry",
              render: ({ field: field2 }) => /* @__PURE__ */ jsx(
                GlassSelect,
                {
                  value: field2.value,
                  onValueChange: (value) => {
                    field2.onChange(value);
                    setValue("niche_specificity", "");
                  },
                  placeholder: "Select your industry",
                  children: Object.keys(INDUSTRY_NICHE_MAP).map((industry) => /* @__PURE__ */ jsx(GlassSelectItem, { value: industry, children: industry }, industry))
                }
              )
            }
          ),
          errors.industry && /* @__PURE__ */ jsx("p", { className: "text-cyan-400 text-xs", children: errors.industry.message })
        ] });
      case "niche_specificity":
        const niches = watchedValues.industry ? INDUSTRY_NICHE_MAP[watchedValues.industry] || [] : [];
        return /* @__PURE__ */ jsxs("div", { className: "space-y-2 w-full", children: [
          /* @__PURE__ */ jsx(GlassLabel, { htmlFor: "niche_specificity", children: "Specialization" }),
          /* @__PURE__ */ jsx(
            Controller,
            {
              control,
              name: "niche_specificity",
              render: ({ field: field2 }) => /* @__PURE__ */ jsx(
                GlassSelect,
                {
                  value: field2.value,
                  onValueChange: field2.onChange,
                  placeholder: watchedValues.industry ? "Select your specialization" : "Select industry first",
                  children: niches.map((niche) => /* @__PURE__ */ jsx(GlassSelectItem, { value: niche, children: niche }, niche))
                }
              )
            }
          ),
          errors.niche_specificity && /* @__PURE__ */ jsx("p", { className: "text-cyan-400 text-xs", children: errors.niche_specificity.message })
        ] });
      case "team_size":
        return /* @__PURE__ */ jsxs("div", { className: "space-y-3 w-full", children: [
          /* @__PURE__ */ jsx(GlassLabel, { htmlFor: "team_size", children: "Team Size" }),
          /* @__PURE__ */ jsx(
            Controller,
            {
              control,
              name: "team_size",
              render: ({ field: field2 }) => /* @__PURE__ */ jsx(
                GlassRadioGroup,
                {
                  options: TEAM_SIZE_OPTIONS.map((opt) => ({ value: opt, label: opt })),
                  value: field2.value,
                  onChange: field2.onChange,
                  columns: 3
                }
              )
            }
          ),
          errors.team_size && /* @__PURE__ */ jsx("p", { className: "text-cyan-400 text-xs", children: errors.team_size.message })
        ] });
      case "avg_job_value":
        const config = getJobValueConfig(watchedValues.niche_specificity || "");
        return /* @__PURE__ */ jsxs("div", { className: "space-y-4 w-full", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ jsx(GlassLabel, { htmlFor: "avg_job_value", children: "Average Job Value" }),
            /* @__PURE__ */ jsx("span", { className: `font-mono font-medium ${watchedValues.avg_job_value ? "text-cyan-400" : "text-slate-500"}`, children: watchedValues.avg_job_value ? `$${parseInt(watchedValues.avg_job_value).toLocaleString()}${parseInt(watchedValues.avg_job_value) >= config.max ? "+" : ""}` : "Select" })
          ] }),
          /* @__PURE__ */ jsx(
            Controller,
            {
              control,
              name: "avg_job_value",
              render: ({ field: sliderField }) => {
                const value = sliderField.value ? parseInt(sliderField.value) : config.min;
                return /* @__PURE__ */ jsx(
                  GlassSlider,
                  {
                    min: config.min,
                    max: config.max,
                    step: config.step,
                    value: [value],
                    onValueChange: (vals) => sliderField.onChange(vals[0].toString()),
                    className: !sliderField.value ? "opacity-60" : ""
                  }
                );
              }
            }
          ),
          errors.avg_job_value && /* @__PURE__ */ jsx("p", { className: "text-cyan-400 text-xs", children: errors.avg_job_value.message })
        ] });
      case "monthly_lead_volume":
        return /* @__PURE__ */ jsxs("div", { className: "space-y-3 w-full", children: [
          /* @__PURE__ */ jsx(GlassLabel, { htmlFor: "monthly_lead_volume", children: "Monthly Lead Volume" }),
          /* @__PURE__ */ jsx(
            Controller,
            {
              control,
              name: "monthly_lead_volume",
              render: ({ field: field2 }) => /* @__PURE__ */ jsx(
                GlassRadioGroup,
                {
                  options: MONTHLY_LEAD_VOLUME_OPTIONS.map((opt) => ({ value: opt, label: opt })),
                  value: field2.value,
                  onChange: field2.onChange,
                  columns: 2
                }
              )
            }
          ),
          errors.monthly_lead_volume && /* @__PURE__ */ jsx("p", { className: "text-cyan-400 text-xs", children: errors.monthly_lead_volume.message })
        ] });
      case "first_contact_speed":
        return /* @__PURE__ */ jsxs("div", { className: "space-y-3 w-full", children: [
          /* @__PURE__ */ jsx(GlassLabel, { children: "How fast do you typically make first contact with new leads?" }),
          /* @__PURE__ */ jsx(
            Controller,
            {
              control,
              name: "first_contact_speed",
              render: ({ field: field2 }) => /* @__PURE__ */ jsx(
                GlassRadioGroup,
                {
                  options: FIRST_CONTACT_SPEED_OPTIONS.map((opt) => ({ value: opt, label: opt })),
                  value: field2.value,
                  onChange: field2.onChange,
                  columns: 1
                }
              )
            }
          ),
          errors.first_contact_speed && /* @__PURE__ */ jsx("p", { className: "text-cyan-400 text-xs", children: errors.first_contact_speed.message })
        ] });
      case "unavailability_pct":
        return /* @__PURE__ */ jsxs("div", { className: "space-y-3 w-full pt-4", children: [
          /* @__PURE__ */ jsx(GlassLabel, { children: "If you had to guess, what percentage of leads contact you outside your normal availability?" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 mb-2", children: "Think about after-hours, weekends, busy periods, team in the field, etc." }),
          /* @__PURE__ */ jsx(
            Controller,
            {
              control,
              name: "unavailability_pct",
              render: ({ field: field2 }) => /* @__PURE__ */ jsx(
                GlassRadioGroup,
                {
                  options: UNAVAILABILITY_PCT_OPTIONS.map((opt) => ({ value: opt, label: opt })),
                  value: field2.value,
                  onChange: field2.onChange,
                  columns: 1
                }
              )
            }
          ),
          errors.unavailability_pct && /* @__PURE__ */ jsx("p", { className: "text-cyan-400 text-xs", children: errors.unavailability_pct.message })
        ] });
      case "phone_unavailable_handling":
        return /* @__PURE__ */ jsxs("div", { className: "space-y-4 w-full", children: [
          /* @__PURE__ */ jsx(GlassLabel, { children: "When a phone call comes in and you can't answer, what happens?" }),
          /* @__PURE__ */ jsx(
            Controller,
            {
              control,
              name: "phone_unavailable_handling",
              render: ({ field: field2 }) => /* @__PURE__ */ jsx(
                VisualCardSelector,
                {
                  options: PHONE_UNAVAILABLE_HANDLING_OPTIONS.map((opt) => ({
                    value: opt.value,
                    label: opt.value,
                    subtitle: opt.subtitle
                  })),
                  value: field2.value,
                  onChange: field2.onChange,
                  columns: 2
                }
              )
            }
          ),
          errors.phone_unavailable_handling && /* @__PURE__ */ jsx("p", { className: "text-cyan-400 text-xs", children: errors.phone_unavailable_handling.message })
        ] });
      case "digital_unavailable_handling":
        return /* @__PURE__ */ jsxs("div", { className: "space-y-4 w-full", children: [
          /* @__PURE__ */ jsx(GlassLabel, { children: "When a text, email, or web form comes in and you're busy, what happens?" }),
          /* @__PURE__ */ jsx(
            Controller,
            {
              control,
              name: "digital_unavailable_handling",
              render: ({ field: field2 }) => /* @__PURE__ */ jsx(
                VisualCardSelector,
                {
                  options: DIGITAL_UNAVAILABLE_HANDLING_OPTIONS.map((opt) => ({
                    value: opt.value,
                    label: opt.value,
                    subtitle: opt.subtitle
                  })),
                  value: field2.value,
                  onChange: field2.onChange,
                  columns: 2
                }
              )
            }
          ),
          errors.digital_unavailable_handling && /* @__PURE__ */ jsx("p", { className: "text-cyan-400 text-xs", children: errors.digital_unavailable_handling.message })
        ] });
      case "no_show_recovery":
        const isAppointmentBased = ["Legal", "Med Spa / Aesthetics", "Real Estate", "Other"].includes(watchedValues.industry || "");
        const label = isAppointmentBased ? "Do you systematically follow up with no-shows to rebook them?" : "Do you follow up when customers cancel or aren't home?";
        return /* @__PURE__ */ jsxs("div", { className: "space-y-3 w-full", children: [
          /* @__PURE__ */ jsx(GlassLabel, { children: label }),
          /* @__PURE__ */ jsx(
            Controller,
            {
              control,
              name: "no_show_recovery",
              render: ({ field: field2 }) => /* @__PURE__ */ jsx(
                GlassRadioGroup,
                {
                  options: NO_SHOW_RECOVERY_OPTIONS.map((opt) => ({ value: opt, label: opt })),
                  value: field2.value,
                  onChange: field2.onChange,
                  columns: 1
                }
              )
            }
          ),
          errors.no_show_recovery && /* @__PURE__ */ jsx("p", { className: "text-cyan-400 text-xs", children: errors.no_show_recovery.message })
        ] });
      case "quote_followup":
        return /* @__PURE__ */ jsxs("div", { className: "space-y-3 w-full", children: [
          /* @__PURE__ */ jsx(GlassLabel, { children: "What happens to quotes that don't close immediately?" }),
          /* @__PURE__ */ jsx(
            Controller,
            {
              control,
              name: "quote_followup",
              render: ({ field: field2 }) => /* @__PURE__ */ jsx(
                GlassRadioGroup,
                {
                  options: QUOTE_FOLLOWUP_OPTIONS.map((opt) => ({ value: opt, label: opt })),
                  value: field2.value,
                  onChange: field2.onChange,
                  columns: 1
                }
              )
            }
          ),
          errors.quote_followup && /* @__PURE__ */ jsx("p", { className: "text-cyan-400 text-xs", children: errors.quote_followup.message })
        ] });
      case "dormant_leads":
        return /* @__PURE__ */ jsxs("div", { className: "space-y-3 w-full pt-4", children: [
          /* @__PURE__ */ jsx(GlassLabel, { children: "Do you have old leads (6+ months dormant) sitting in your database?" }),
          /* @__PURE__ */ jsx(
            Controller,
            {
              control,
              name: "dormant_leads",
              render: ({ field: field2 }) => /* @__PURE__ */ jsx(
                GlassRadioGroup,
                {
                  options: DORMANT_LEADS_OPTIONS.map((opt) => ({ value: opt, label: opt })),
                  value: field2.value,
                  onChange: field2.onChange,
                  columns: 1
                }
              )
            }
          ),
          errors.dormant_leads && /* @__PURE__ */ jsx("p", { className: "text-cyan-400 text-xs", children: errors.dormant_leads.message })
        ] });
      case "no_show_rate":
        const rateIsAppointmentBased = ["Legal", "Med Spa / Aesthetics", "Real Estate", "Other"].includes(watchedValues.industry || "");
        const rateLabel = rateIsAppointmentBased ? "What's your appointment no-show rate?" : "What's your average cancellation rate?";
        return /* @__PURE__ */ jsxs("div", { className: "space-y-3 w-full", children: [
          /* @__PURE__ */ jsx(GlassLabel, { children: rateLabel }),
          /* @__PURE__ */ jsx(
            Controller,
            {
              control,
              name: "no_show_rate",
              render: ({ field: field2 }) => /* @__PURE__ */ jsx(
                GlassRadioGroup,
                {
                  options: NO_SHOW_RATE_OPTIONS.map((opt) => ({ value: opt, label: opt })),
                  value: field2.value,
                  onChange: field2.onChange,
                  columns: 2
                }
              )
            }
          ),
          errors.no_show_rate && /* @__PURE__ */ jsx("p", { className: "text-cyan-400 text-xs", children: errors.no_show_rate.message })
        ] });
      case "contact_channels":
        return /* @__PURE__ */ jsxs("div", { className: "space-y-4 w-full", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ jsx(GlassLabel, { children: "How can leads currently contact you?" }),
            /* @__PURE__ */ jsxs("span", { className: "text-sm text-slate-500", children: [
              (watchedValues.contact_channels || []).length,
              "/8 selected"
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500", children: "Select ALL that apply" }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: CONTACT_CHANNEL_OPTIONS.map((option) => {
            const isSelected = (watchedValues.contact_channels || []).includes(option.value);
            return /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => handleChannelToggle(option.value),
                className: `flex flex-col p-3 rounded-lg border text-center transition-all ${isSelected ? "bg-cyan-500/10 border-cyan-500" : "bg-slate-900/40 border-slate-700/50 hover:bg-slate-800/60"}`,
                children: [
                  /* @__PURE__ */ jsx("span", { className: `text-sm font-medium ${isSelected ? "text-white" : "text-slate-300"}`, children: option.value }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-500 mt-1", children: option.subtitle })
                ]
              },
              option.value
            );
          }) }),
          errors.contact_channels && /* @__PURE__ */ jsx("p", { className: "text-cyan-400 text-xs", children: errors.contact_channels.message })
        ] });
      case "social_media_activity":
        return /* @__PURE__ */ jsxs("div", { className: "space-y-3 w-full", children: [
          /* @__PURE__ */ jsx(GlassLabel, { children: "Are you active on social media for your business?" }),
          /* @__PURE__ */ jsx(
            Controller,
            {
              control,
              name: "social_media_activity",
              render: ({ field: field2 }) => /* @__PURE__ */ jsx(
                GlassRadioGroup,
                {
                  options: SOCIAL_MEDIA_ACTIVITY_OPTIONS.map((opt) => ({ value: opt, label: opt })),
                  value: field2.value,
                  onChange: field2.onChange,
                  columns: 1
                }
              )
            }
          ),
          errors.social_media_activity && /* @__PURE__ */ jsx("p", { className: "text-cyan-400 text-xs", children: errors.social_media_activity.message })
        ] });
      case "review_request":
        return /* @__PURE__ */ jsxs("div", { className: "space-y-3 w-full", children: [
          /* @__PURE__ */ jsx(GlassLabel, { children: "Do you systematically ask customers for reviews?" }),
          /* @__PURE__ */ jsx(
            Controller,
            {
              control,
              name: "review_request",
              render: ({ field: field2 }) => /* @__PURE__ */ jsx(
                GlassRadioGroup,
                {
                  options: REVIEW_REQUEST_OPTIONS.map((opt) => ({ value: opt, label: opt })),
                  value: field2.value,
                  onChange: field2.onChange,
                  columns: 2
                }
              )
            }
          ),
          errors.review_request && /* @__PURE__ */ jsx("p", { className: "text-cyan-400 text-xs", children: errors.review_request.message })
        ] });
      case "close_rate":
        return /* @__PURE__ */ jsxs("div", { className: "space-y-3 w-full", children: [
          /* @__PURE__ */ jsx(GlassLabel, { children: "Out of every 10 leads, how many become paying customers?" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 mb-2", children: "This is your close rate - just estimate if you don't track it exactly" }),
          /* @__PURE__ */ jsx(
            Controller,
            {
              control,
              name: "close_rate",
              render: ({ field: field2 }) => /* @__PURE__ */ jsx(
                GlassRadioGroup,
                {
                  options: CLOSE_RATE_OPTIONS.map((opt) => ({ value: opt, label: opt })),
                  value: field2.value,
                  onChange: field2.onChange,
                  columns: 3
                }
              )
            }
          ),
          errors.close_rate && /* @__PURE__ */ jsx("p", { className: "text-cyan-400 text-xs", children: errors.close_rate.message })
        ] });
      case "manual_hours":
        return /* @__PURE__ */ jsxs("div", { className: "space-y-3 w-full", children: [
          /* @__PURE__ */ jsx(GlassLabel, { children: "How many hours per week do you spend on manual coordination?" }),
          /* @__PURE__ */ jsx(
            Controller,
            {
              control,
              name: "manual_hours",
              render: ({ field: field2 }) => /* @__PURE__ */ jsx(
                GlassRadioGroup,
                {
                  options: MANUAL_HOURS_OPTIONS.map((opt) => ({ value: opt, label: opt })),
                  value: field2.value,
                  onChange: field2.onChange,
                  columns: 2
                }
              )
            }
          ),
          errors.manual_hours && /* @__PURE__ */ jsx("p", { className: "text-cyan-400 text-xs", children: errors.manual_hours.message })
        ] });
      case "knowledge_bottleneck":
        return /* @__PURE__ */ jsxs("div", { className: "space-y-3 w-full", children: [
          /* @__PURE__ */ jsx(GlassLabel, { children: "Do you have repetitive questions that create bottlenecks?" }),
          /* @__PURE__ */ jsx(
            Controller,
            {
              control,
              name: "knowledge_bottleneck",
              render: ({ field: field2 }) => /* @__PURE__ */ jsx(
                GlassRadioGroup,
                {
                  options: KNOWLEDGE_BOTTLENECK_OPTIONS.map((opt) => ({ value: opt, label: opt })),
                  value: field2.value,
                  onChange: field2.onChange,
                  columns: 1
                }
              )
            }
          ),
          errors.knowledge_bottleneck && /* @__PURE__ */ jsx("p", { className: "text-cyan-400 text-xs", children: errors.knowledge_bottleneck.message })
        ] });
      case "operational_complexity":
        return /* @__PURE__ */ jsxs("div", { className: "space-y-4 w-full", children: [
          /* @__PURE__ */ jsx(GlassLabel, { children: "How complex are your operations?" }),
          /* @__PURE__ */ jsx(
            Controller,
            {
              control,
              name: "operational_complexity",
              render: ({ field: field2 }) => /* @__PURE__ */ jsx(
                VisualCardSelector,
                {
                  options: OPERATIONAL_COMPLEXITY_OPTIONS.map((opt) => ({
                    value: opt.value,
                    label: opt.value
                  })),
                  value: field2.value,
                  onChange: field2.onChange,
                  columns: 1
                }
              )
            }
          ),
          errors.operational_complexity && /* @__PURE__ */ jsx("p", { className: "text-cyan-400 text-xs", children: errors.operational_complexity.message })
        ] });
      case "contact_name":
        return /* @__PURE__ */ jsxs("div", { className: "space-y-2 w-full", children: [
          /* @__PURE__ */ jsx(GlassLabel, { htmlFor: "contact_name", children: "Your Name" }),
          /* @__PURE__ */ jsx(
            GlassInput,
            {
              id: "contact_name",
              placeholder: "John Doe",
              ...register("contact_name"),
              "data-testid": "input-contact-name"
            }
          ),
          errors.contact_name && /* @__PURE__ */ jsx("p", { className: "text-cyan-400 text-xs", children: errors.contact_name.message })
        ] });
      case "contact_email":
        return /* @__PURE__ */ jsxs("div", { className: "space-y-2 w-full", children: [
          /* @__PURE__ */ jsx(GlassLabel, { htmlFor: "contact_email", children: "Email Address" }),
          /* @__PURE__ */ jsx(
            GlassInput,
            {
              id: "contact_email",
              type: "email",
              placeholder: "john@example.com",
              ...register("contact_email"),
              "data-testid": "input-contact-email"
            }
          ),
          errors.contact_email && /* @__PURE__ */ jsx("p", { className: "text-cyan-400 text-xs", children: errors.contact_email.message })
        ] });
      case "contact_phone":
        return /* @__PURE__ */ jsxs("div", { className: "space-y-2 w-full", children: [
          /* @__PURE__ */ jsx(GlassLabel, { htmlFor: "contact_phone", children: "Cell Phone Number (Optional)" }),
          /* @__PURE__ */ jsx(
            GlassInput,
            {
              id: "contact_phone",
              type: "tel",
              placeholder: "(555) 000-0000",
              ...register("contact_phone"),
              "data-testid": "input-contact-phone"
            }
          )
        ] });
      case "disclaimer_accepted":
        return /* @__PURE__ */ jsxs("div", { className: "space-y-4 w-full pt-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 p-4 rounded-lg bg-slate-900/60 border border-slate-800", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                id: "disclaimer_accepted",
                ...register("disclaimer_accepted"),
                className: "mt-1 h-4 w-4 rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-cyan-500"
              }
            ),
            /* @__PURE__ */ jsx("label", { htmlFor: "disclaimer_accepted", className: "text-xs text-slate-400 leading-relaxed cursor-pointer", children: "I understand that these estimates are conservative benchmarks based on industry data. By submitting, I agree to receive my report and related business insights via email." })
          ] }),
          errors.disclaimer_accepted && /* @__PURE__ */ jsx("p", { className: "text-cyan-400 text-xs", children: errors.disclaimer_accepted.message })
        ] });
      default:
        return null;
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen text-foreground font-sans selection:bg-primary/30 relative overflow-hidden bg-background", children: [
    /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-0 bg-grid-pattern pointer-events-none" }),
    /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" }),
    /* @__PURE__ */ jsxs("header", { className: "fixed top-0 left-0 right-0 z-50 h-20 glass-panel flex items-center px-6 md:px-12 justify-between", children: [
      /* @__PURE__ */ jsx(Link, { href: "/", children: /* @__PURE__ */ jsxs("div", { className: "text-xl font-heading font-bold tracking-tighter hover:opacity-80 transition-opacity flex items-center gap-3 cursor-pointer", children: [
        /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" }),
        /* @__PURE__ */ jsx("span", { className: "text-white text-lg tracking-wide", children: "SimpleSequence" })
      ] }) }),
      /* @__PURE__ */ jsxs(
        Link,
        {
          href: "/",
          className: "flex items-center gap-2 text-sm text-[#6b7280] hover:text-[#00D9FF] transition-colors",
          "data-testid": "link-back-to-main-site",
          children: [
            /* @__PURE__ */ jsx("span", { className: "hidden md:inline", children: "Back to Main Site" }),
            /* @__PURE__ */ jsx(ExternalLink, { size: 16 })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("main", { className: "relative z-10 pt-32 pb-12 px-4 md:px-8 max-w-2xl mx-auto min-h-[calc(100vh-80px)] flex flex-col", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ jsxs("span", { className: "text-sm font-medium text-cyan-400", children: [
            currentStep.progress,
            "% Complete"
          ] }),
          currentStepIndex < STEPS.length - 1 && /* @__PURE__ */ jsxs("span", { className: "text-sm text-slate-500", children: [
            "Step ",
            currentStepIndex + 1,
            " of ",
            STEPS.length - 1
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "w-full h-2 bg-slate-800 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "h-full bg-gradient-to-r from-cyan-500 to-cyan-400",
            initial: { width: 0 },
            animate: { width: `${currentStepIndex === STEPS.length - 1 ? 100 : currentStep.progress}%` },
            transition: { duration: 0.3 }
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, x: 20 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -20 },
          transition: { duration: 0.3 },
          children: /* @__PURE__ */ jsxs(GlassCard, { className: "p-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2 mb-8", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-2xl font-heading font-bold text-white", children: currentStep.title }),
              /* @__PURE__ */ jsx("p", { className: "text-slate-400", children: currentStep.description })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "space-y-6", children: currentStep.fields.map((field) => /* @__PURE__ */ jsx("div", { children: renderField(field) }, field)) }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between mt-8 pt-6 border-t border-slate-700/50", children: [
              /* @__PURE__ */ jsxs(
                GlassButton,
                {
                  type: "button",
                  variant: "ghost",
                  onClick: handleBack,
                  disabled: currentStepIndex === 0,
                  "data-testid": "button-back",
                  children: [
                    /* @__PURE__ */ jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
                    "Back"
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                GlassButton,
                {
                  type: "button",
                  onClick: handleNext,
                  disabled: isSubmitting,
                  "data-testid": "button-next",
                  children: isSubmitting ? /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }),
                    "Analyzing..."
                  ] }) : currentStepIndex === STEPS.length - 1 ? /* @__PURE__ */ jsxs(Fragment, { children: [
                    "Get Results",
                    /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-4 w-4" })
                  ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                    "Continue",
                    /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-4 w-4" })
                  ] })
                }
              )
            ] })
          ] })
        },
        currentStep.id
      ) })
    ] })
  ] });
}
function GapCard({
  title,
  gap,
  description
}) {
  const [showCalculation, setShowCalculation] = useState(false);
  return /* @__PURE__ */ jsxs(GlassCard, { className: "p-6 border-cyan-500/20 bg-cyan-950/10 relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx("h3", { className: "text-xl font-heading font-semibold text-white", children: title }) }),
    /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400 mb-6", children: description }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4 mb-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs text-cyan-400 uppercase tracking-wider mb-2", children: "What We Found" }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-1", children: gap.findings.map((finding, i) => /* @__PURE__ */ jsxs("li", { className: "text-sm text-slate-300 flex gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "text-slate-500", children: "-" }),
          finding
        ] }, i)) })
      ] }),
      gap.causes.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs text-cyan-400 uppercase tracking-wider mb-2", children: "What's Causing This" }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-1", children: gap.causes.map((cause, i) => /* @__PURE__ */ jsxs("li", { className: "text-sm text-slate-300 flex gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "text-slate-500", children: "-" }),
          cause
        ] }, i)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center pt-4 border-t border-slate-700/50", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 uppercase", children: "Estimated Monthly Impact" }),
        /* @__PURE__ */ jsxs("p", { className: "text-2xl font-mono font-bold text-cyan-400", children: [
          "~$",
          gap.estimate.toLocaleString()
        ] })
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setShowCalculation(!showCalculation),
          className: "text-xs text-slate-500 hover:text-cyan-400 flex items-center gap-1 transition-colors",
          children: [
            showCalculation ? "Hide" : "Show",
            " calculation",
            showCalculation ? /* @__PURE__ */ jsx(ChevronUp, { size: 14 }) : /* @__PURE__ */ jsx(ChevronDown, { size: 14 })
          ]
        }
      )
    ] }),
    showCalculation && /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, height: 0 },
        animate: { opacity: 1, height: "auto" },
        className: "mt-4 pt-4 border-t border-slate-700/30",
        children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 mb-2", children: gap.calculationDetails.description }),
          /* @__PURE__ */ jsx("p", { className: "text-xs font-mono text-slate-400 bg-slate-900/50 p-2 rounded", children: gap.calculationDetails.formula })
        ]
      }
    )
  ] });
}
function TierCard({
  tier,
  price,
  setupFee,
  description,
  features,
  isRecommended,
  ctaText,
  badge,
  reason
}) {
  return /* @__PURE__ */ jsxs("div", { className: `relative rounded-2xl p-6 transition-all ${isRecommended ? "bg-gradient-to-br from-cyan-950/40 to-slate-900/80 border-2 border-cyan-500/50 shadow-[0_0_30px_rgba(0,217,255,0.15)]" : "bg-slate-900/40 border border-slate-700/50"}`, children: [
    isRecommended && /* @__PURE__ */ jsx("div", { className: "absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-black text-xs font-bold px-3 py-1 rounded-full", children: "RECOMMENDED" }),
    badge && /* @__PURE__ */ jsx("div", { className: "absolute -top-3 right-4 bg-slate-700 text-white text-xs px-2 py-1 rounded", children: badge }),
    /* @__PURE__ */ jsx("h3", { className: "text-xl font-heading font-bold text-white mb-1", children: tier }),
    /* @__PURE__ */ jsx("p", { className: "text-2xl font-mono font-bold text-cyan-400 mb-1", children: price }),
    /* @__PURE__ */ jsxs("p", { className: "text-xs text-slate-500 mb-4", children: [
      "Setup: ",
      setupFee
    ] }),
    /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400 mb-4", children: description }),
    reason && /* @__PURE__ */ jsx("div", { className: "bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3 mb-4", children: /* @__PURE__ */ jsx("p", { className: "text-xs text-cyan-300", children: reason }) }),
    /* @__PURE__ */ jsx("ul", { className: "space-y-2 mb-6", children: features.map((feature, i) => /* @__PURE__ */ jsxs("li", { className: "text-sm text-slate-300 flex items-start gap-2", children: [
      /* @__PURE__ */ jsx(CheckCircle, { size: 16, className: "text-cyan-400 mt-0.5 flex-shrink-0" }),
      feature
    ] }, i)) }),
    /* @__PURE__ */ jsx(
      Button,
      {
        className: `w-full ${isRecommended ? "bg-cyan-500 hover:bg-cyan-400 text-black" : "bg-slate-700 hover:bg-slate-600"}`,
        "data-testid": `button-tier-${tier.toLowerCase()}`,
        children: ctaText
      }
    )
  ] });
}
function Results() {
  const [, setLocation] = useLocation();
  const [result, setResult] = useState(null);
  const [leadId, setLeadId] = useState("");
  useEffect(() => {
    const storedResult = sessionStorage.getItem("assessmentResult");
    const storedLeadId = sessionStorage.getItem("leadId");
    if (storedResult) {
      setResult(JSON.parse(storedResult));
    }
    if (storedLeadId) {
      setLeadId(storedLeadId);
    }
  }, []);
  useEffect(() => {
    if (!result) {
      const timer = setTimeout(() => {
        if (!result) {
          setLocation("/assessment");
        }
      }, 1e3);
      return () => clearTimeout(timer);
    }
  }, [result, setLocation]);
  if (!result) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-background", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-400", children: "Loading your results..." })
    ] }) });
  }
  const frontlineFeatures = [
    "AI Voice backup when team is busy/after-hours",
    "24/7 website chatbot",
    "Instant SMS text-back",
    "Speed-to-lead engine (<60 seconds)",
    "250 AI Voice Minutes/mo"
  ];
  const specialistFeatures = [
    "Everything in Frontline, plus:",
    "Automated no-show recovery",
    "Quote follow-up sequences",
    "Database reactivation campaigns",
    "Review request automation",
    "500 AI Voice Minutes/mo"
  ];
  const commandFeatures = [
    "Everything in Specialist, plus:",
    "Internal AI Knowledge Base",
    "Custom system integrations",
    "Service delivery automation",
    "Priority decision logic",
    "1,000 AI Voice Minutes/mo"
  ];
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen text-foreground font-sans selection:bg-primary/30 relative overflow-hidden bg-background", children: [
    /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-0 bg-grid-pattern pointer-events-none" }),
    /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" }),
    /* @__PURE__ */ jsxs("header", { className: "fixed top-0 left-0 right-0 z-50 h-20 glass-panel flex items-center px-6 md:px-12 justify-between", children: [
      /* @__PURE__ */ jsx(Link, { href: "/", children: /* @__PURE__ */ jsxs("div", { className: "text-xl font-heading font-bold tracking-tighter hover:opacity-80 transition-opacity flex items-center gap-3 cursor-pointer", children: [
        /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" }),
        /* @__PURE__ */ jsx("span", { className: "text-white text-lg tracking-wide", children: "SimpleSequence" })
      ] }) }),
      /* @__PURE__ */ jsxs(
        Link,
        {
          href: "/",
          className: "flex items-center gap-2 text-sm text-[#6b7280] hover:text-[#00D9FF] transition-colors",
          "data-testid": "link-back-to-main-site",
          children: [
            /* @__PURE__ */ jsx("span", { className: "hidden md:inline", children: "Back to Main Site" }),
            /* @__PURE__ */ jsx(ExternalLink, { size: 16 })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("main", { className: "relative z-10 pt-32 pb-20 px-4 md:px-8 max-w-[900px] mx-auto", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          className: "text-center space-y-4 mb-12",
          children: [
            /* @__PURE__ */ jsxs("h1", { className: "text-3xl md:text-4xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400", children: [
              "Your Revenue Gap Report: ",
              result.businessName
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-300 text-lg", children: "Here's what's really happening in your business - and exactly how much it's costing you." })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 0.05 },
          className: "mb-8",
          children: /* @__PURE__ */ jsxs(GlassCard, { className: "p-6 border-slate-700/50 bg-slate-900/40", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4", children: "Your Business at a Glance" }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-5 gap-4 text-sm", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-slate-500", children: "Industry" }),
                /* @__PURE__ */ jsx("p", { className: "text-white font-medium", children: result.industry })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-slate-500", children: "Specialization" }),
                /* @__PURE__ */ jsx("p", { className: "text-white font-medium", children: result.niche })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-slate-500", children: "Monthly Leads" }),
                /* @__PURE__ */ jsx("p", { className: "text-white font-medium", children: result.monthlyLeads })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-slate-500", children: "Team Size" }),
                /* @__PURE__ */ jsx("p", { className: "text-white font-medium", children: result.teamSize })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-slate-500", children: "Avg Job Value" }),
                /* @__PURE__ */ jsxs("p", { className: "text-white font-medium", children: [
                  "$",
                  result.avgJobValue.toLocaleString()
                ] })
              ] })
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.1 },
          className: "space-y-6 mb-12",
          children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-heading font-bold text-white", children: "Gap Analysis" }),
            /* @__PURE__ */ jsx(
              GapCard,
              {
                title: "Speed Gap",
                gap: result.speedGap,
                description: "Speed-to-lead is the #1 predictor of conversion. Research shows 78% of customers go with whoever responds first."
              }
            ),
            /* @__PURE__ */ jsx(
              GapCard,
              {
                title: "Silence Gap",
                gap: result.silenceGap,
                description: "Most revenue isn't lost at first contact - it's lost in the days and weeks after when no one follows up."
              }
            ),
            /* @__PURE__ */ jsx(
              GapCard,
              {
                title: "Chaos Gap",
                gap: result.chaosGap,
                description: "Time spent on manual coordination and busywork is time not spent serving customers or closing deals."
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.2 },
          className: "mb-12",
          children: /* @__PURE__ */ jsxs(GlassCard, { className: "p-8 border-cyan-500/30 bg-gradient-to-br from-cyan-950/20 to-slate-900/50", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-xl font-heading font-semibold text-cyan-400 flex items-center gap-2 mb-4", children: [
              /* @__PURE__ */ jsx(BarChart3, { size: 24 }),
              " Total Impact Summary"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-center py-6", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400 uppercase tracking-wider mb-3", children: "Total Monthly Revenue Gap" }),
              /* @__PURE__ */ jsxs("p", { className: "text-4xl md:text-5xl font-mono font-bold text-cyan-400 mb-2", children: [
                "$",
                result.totalMonthlyGap.toLocaleString()
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-lg text-slate-300 font-medium", children: [
                "Annualized: $",
                result.annualizedGap.toLocaleString()
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-6 grid grid-cols-3 gap-4 text-center", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-cyan-400 font-semibold", children: "Speed Gap" }),
                  /* @__PURE__ */ jsxs("p", { className: "text-white font-mono", children: [
                    "$",
                    result.speedGap.estimate.toLocaleString()
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-cyan-400 font-semibold", children: "Silence Gap" }),
                  /* @__PURE__ */ jsxs("p", { className: "text-white font-mono", children: [
                    "$",
                    result.silenceGap.estimate.toLocaleString()
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-cyan-400 font-semibold", children: "Chaos Gap" }),
                  /* @__PURE__ */ jsxs("p", { className: "text-white font-mono", children: [
                    "$",
                    result.chaosGap.estimate.toLocaleString()
                  ] })
                ] })
              ] })
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.25 },
          className: "space-y-6 mb-12",
          children: [
            /* @__PURE__ */ jsx("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6", children: /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h2", { className: "text-2xl font-heading font-bold text-white mb-2", children: "Your Prioritized Opportunities" }),
              /* @__PURE__ */ jsx("p", { className: "text-slate-400", children: result.tierReason })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
              /* @__PURE__ */ jsx(
                TierCard,
                {
                  tier: "Frontline",
                  price: "$297/mo",
                  setupFee: "$500",
                  description: "The Human-First Safety Net - Fix the Speed Gap first.",
                  features: frontlineFeatures,
                  isRecommended: result.recommendedTier === "Frontline",
                  ctaText: "Get Started",
                  reason: result.recommendedTier === "Frontline" ? result.tierReason : void 0
                }
              ),
              /* @__PURE__ */ jsx(
                TierCard,
                {
                  tier: "Specialist",
                  price: "$497/mo",
                  setupFee: "$1,000",
                  description: "The Revenue & Reputation Accelerator - Address Speed + Silence Gaps.",
                  features: specialistFeatures,
                  isRecommended: result.recommendedTier === "Specialist",
                  ctaText: "Get Started",
                  reason: result.recommendedTier === "Specialist" ? result.tierReason : void 0
                }
              ),
              /* @__PURE__ */ jsx(
                TierCard,
                {
                  tier: "Command",
                  price: "Starting at $997/mo",
                  setupFee: "$2,500+",
                  description: "The Autonomous Operations Engine - Full operational transformation.",
                  features: commandFeatures,
                  isRecommended: result.recommendedTier === "Command",
                  ctaText: "Apply Now",
                  badge: "By Application",
                  reason: result.recommendedTier === "Command" ? result.tierReason : void 0
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.4 },
          className: "mt-12 text-center",
          children: /* @__PURE__ */ jsxs(
            Link,
            {
              href: "/",
              className: "inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#2a3038] bg-[#12161a] text-[#c0c8d0] hover:text-[#00D9FF] hover:border-[#00D9FF]/40 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_16px_rgba(0,217,255,0.1)]",
              "data-testid": "link-return-to-main-site",
              children: [
                /* @__PURE__ */ jsx(ArrowRight, { size: 16, className: "rotate-180" }),
                "Return to simplesequence.ai"
              ]
            }
          )
        }
      )
    ] })
  ] });
}
function Router() {
  return /* @__PURE__ */ jsxs(Switch, { children: [
    /* @__PURE__ */ jsx(Route$1, { path: "/", component: Home }),
    /* @__PURE__ */ jsx(Route$1, { path: "/solutions", component: Solutions }),
    /* @__PURE__ */ jsx(Route$1, { path: "/industries", component: Industries }),
    /* @__PURE__ */ jsx(Route$1, { path: "/process", component: Process }),
    /* @__PURE__ */ jsx(Route$1, { path: "/offers", component: Offers }),
    /* @__PURE__ */ jsx(Route$1, { path: "/blog", component: Blog }),
    /* @__PURE__ */ jsx(Route$1, { path: "/blog/:slug", component: BlogPostPage }),
    /* @__PURE__ */ jsx(Route$1, { path: "/assessment", component: Assessment }),
    /* @__PURE__ */ jsx(Route$1, { path: "/results", component: Results }),
    /* @__PURE__ */ jsx(Route$1, { component: NotFound })
  ] });
}
function App() {
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxs(TooltipProvider, { children: [
    /* @__PURE__ */ jsx(Toaster, {}),
    /* @__PURE__ */ jsx(Router, {})
  ] }) });
}
const createRoot = ViteReactSSG(/* @__PURE__ */ jsx(App, {}));
export {
  createRoot
};
